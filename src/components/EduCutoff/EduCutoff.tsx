import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { GroupSelector, groupCategories } from './GroupSelector';
import { MarksEntryForm } from './MarksEntryForm';
import { CategorySelector } from './CategorySelector';
import { CutoffResults } from './CutoffResults';
import { EligibleCourses } from './EligibleCourses';
import { CollegePredictor } from './CollegePredictor';
import { PreviousYearCutoffs } from './PreviousYearCutoffs';
import { CounsellingGuide } from './CounsellingGuide';
import { CounsellingTracker } from './CounsellingTracker';
import { StudentGroup, Category, CutoffResult, getGroupCategory, isEligibleForTNEA } from './types';
import { Calculator, GraduationCap, ClipboardList, Calendar, ChevronRight, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';

type PageTab = 'calculator' | 'cutoffs' | 'counselling' | 'tracker';

export const EduCutoff = () => {
  const [activeTab, setActiveTab] = useState<PageTab>('calculator');
  const [selectedGroup, setSelectedGroup] = useState<StudentGroup | null>(null);
  const [marks, setMarks] = useState<Record<string, number | null>>({});
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [additionalOptions, setAdditionalOptions] = useState<string[]>([]);
  const [result, setResult] = useState<CutoffResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleMarksChange = useCallback((newMarks: Record<string, number | null>) => {
    setMarks(newMarks);
    setResult(null);
  }, []);

  const calculateCutoff = () => {
    if (!selectedGroup) return;
    setIsCalculating(true);

    setTimeout(() => {
      let tneaCutoff: number | undefined;
      let overallPercentage = 0;
      let percentile = 0;

      const validMarks = Object.entries(marks)
        .filter(([key, val]) => val !== null && !['tamil', 'english', 'neet'].includes(key))
        .map(([_, val]) => val as number);

      if (validMarks.length > 0) {
        overallPercentage = Math.round((validMarks.reduce((a, b) => a + b, 0) / validMarks.length) * 10) / 10;
      }

      let tneaCutoff100: number | undefined;
      if (isEligibleForTNEA(selectedGroup)) {
        const maths = marks.Mathematics ?? 0;
        const physics = marks.Physics ?? 0;
        const chemistry = marks.Chemistry ?? 0;
        tneaCutoff100 = (maths / 2) + (physics / 4) + (chemistry / 4);
        tneaCutoff100 = Math.round(tneaCutoff100 * 10) / 10;
        tneaCutoff = Math.round(tneaCutoff100 * 2 * 10) / 10;
      }

      if (overallPercentage >= 95) percentile = 99;
      else if (overallPercentage >= 90) percentile = 95;
      else if (overallPercentage >= 85) percentile = 90;
      else if (overallPercentage >= 80) percentile = 85;
      else if (overallPercentage >= 75) percentile = 75;
      else if (overallPercentage >= 70) percentile = 65;
      else if (overallPercentage >= 60) percentile = 50;
      else if (overallPercentage >= 50) percentile = 35;
      else percentile = 20;

      setResult({
        tneaCutoff,
        tneaCutoff100,
        overallPercentage,
        percentile,
        neetScore: marks.neet ?? undefined,
      });
      setIsCalculating(false);
    }, 800);
  };

  const canCalculate = () => {
    if (!selectedGroup) return false;
    if (isEligibleForTNEA(selectedGroup)) {
      return marks.Mathematics != null && marks.Physics != null && marks.Chemistry != null;
    }
    let requiredSubjects: string[] = [];
    for (const cat of groupCategories) {
      const group = cat.groups.find(g => g.id === selectedGroup);
      if (group) { requiredSubjects = group.subjects; break; }
    }
    return requiredSubjects.filter(s => marks[s] !== null && marks[s] !== undefined).length >= 3;
  };

  const pageTabs = [
    { id: 'calculator' as PageTab, label: 'Calculate Cutoff', tamil: 'கட்ஆஃப் கணக்கிடு', icon: Calculator, desc: 'Enter marks → Get cutoff → See colleges' },
    { id: 'cutoffs' as PageTab, label: 'Previous Cutoffs', tamil: 'முந்தைய கட்ஆஃப்', icon: ClipboardList, desc: 'Browse last year marks' },
    { id: 'counselling' as PageTab, label: 'Counselling', tamil: 'கலந்தாய்வு', icon: Calendar, desc: 'Dates, steps & apply links' },
    { id: 'tracker' as PageTab, label: 'My Tracker', tamil: 'எனது நிலை', icon: Shield, desc: 'Track your application status' },
  ];

  return (
    <div className="space-y-4">

      {/* ═══ COMPACT HEADER ═══ */}
      <div className="bg-gradient-to-r from-violet-700 to-purple-700 rounded-2xl p-5 text-white">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-extrabold">Cutoff & College Predictor</h2>
            <p className="text-xs text-violet-200">கல்வி கட்ஆஃப் & கல்லூரி கணிப்பான்</p>
          </div>
        </div>
        <p className="text-sm text-violet-200 mt-2">Enter your 12th marks → Calculate cutoff → See which colleges & courses you can get.</p>
      </div>

      {/* ═══ 3 TAB SELECTOR ═══ */}
      <div className="bg-white rounded-2xl border-2 border-gray-200 p-1.5">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-1.5">
          {pageTabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex flex-col items-center py-3 px-2 rounded-xl transition-all text-center",
                activeTab === tab.id
                  ? tab.id === 'tracker' ? "bg-red-600 text-white shadow-lg" : "bg-violet-700 text-white shadow-lg"
                  : "bg-gray-50 text-gray-600 hover:bg-gray-100"
              )}
            >
              <tab.icon className={cn("w-5 h-5 mb-1", activeTab === tab.id ? "text-white" : "text-gray-400")} />
              <span className="text-xs font-bold leading-tight">{tab.label}</span>
              <span className={cn("text-[10px] leading-tight mt-0.5", activeTab === tab.id ? (tab.id === 'tracker' ? "text-red-200" : "text-violet-200") : "text-gray-400")}>{tab.tamil}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ═══ TAB 1: CALCULATOR ═══ */}
      {activeTab === 'calculator' && (
        <div className="space-y-4">

          {/* Quick How-It-Works */}
          <div className="bg-gray-50 rounded-xl border border-gray-200 p-4">
            <p className="text-xs font-bold text-gray-700 mb-2">How it works:</p>
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <span className="bg-violet-100 text-violet-700 font-bold px-2 py-0.5 rounded-md">1</span>
              <span>Select Group</span>
              <ChevronRight className="w-3 h-3 text-gray-400" />
              <span className="bg-violet-100 text-violet-700 font-bold px-2 py-0.5 rounded-md">2</span>
              <span>Enter Marks</span>
              <ChevronRight className="w-3 h-3 text-gray-400" />
              <span className="bg-violet-100 text-violet-700 font-bold px-2 py-0.5 rounded-md">3</span>
              <span>See Results</span>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <div className="text-xs bg-blue-50 border border-blue-200 rounded-lg p-2">
                <p className="font-bold text-blue-800">Engineering (TNEA)</p>
                <p className="text-blue-600">Cutoff = Maths/2 + Phy/4 + Chem/4</p>
              </div>
              <div className="text-xs bg-green-50 border border-green-200 rounded-lg p-2">
                <p className="font-bold text-green-800">Medical (NEET)</p>
                <p className="text-green-600">Based on NEET score / 720</p>
              </div>
            </div>
          </div>

          {/* Step 1: Group Selection */}
          <div className="bg-white rounded-xl border-2 border-gray-200 p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-7 h-7 rounded-full bg-violet-700 text-white text-xs font-bold flex items-center justify-center">1</span>
              <p className="text-sm font-bold text-gray-900">Select Your Group</p>
            </div>
            <GroupSelector selectedGroup={selectedGroup} onSelectGroup={setSelectedGroup} />
          </div>

          {/* Step 2: Marks Entry */}
          {selectedGroup && (
            <div className="bg-white rounded-xl border-2 border-gray-200 p-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-7 h-7 rounded-full bg-violet-700 text-white text-xs font-bold flex items-center justify-center">2</span>
                <p className="text-sm font-bold text-gray-900">Enter Your 12th Marks</p>
              </div>
              <MarksEntryForm group={selectedGroup} onMarksChange={handleMarksChange} />
            </div>
          )}

          {/* Step 3: Category Selection */}
          {selectedGroup && (
            <div className="bg-white rounded-xl border-2 border-gray-200 p-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-7 h-7 rounded-full bg-violet-700 text-white text-xs font-bold flex items-center justify-center">3</span>
                <p className="text-sm font-bold text-gray-900">Select Your Community</p>
              </div>
              <CategorySelector
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                additionalOptions={additionalOptions}
                onAdditionalOptionsChange={setAdditionalOptions}
              />
            </div>
          )}

          {/* Calculate Button */}
          {selectedGroup && (
            <Button
              size="lg"
              className="w-full h-14 text-base font-bold rounded-xl bg-violet-700 hover:bg-violet-800 active:scale-[0.98]"
              onClick={calculateCutoff}
              disabled={!canCalculate() || isCalculating}
            >
              {isCalculating ? (
                <><span className="animate-spin mr-2">⏳</span> Calculating...</>
              ) : (
                <>🧮 Calculate My Cutoff & Eligibility</>
              )}
            </Button>
          )}

          {/* Results */}
          {result && selectedGroup && (
            <div className="space-y-4">
              <CutoffResults result={result} group={selectedGroup} marks={marks} category={selectedCategory || undefined} />
              <EligibleCourses
                group={selectedGroup}
                cutoffScore={result.tneaCutoff ?? 0}
                percentage={result.overallPercentage}
                neetScore={result.neetScore}
              />
              {isEligibleForTNEA(selectedGroup) && result.tneaCutoff && (
                <CollegePredictor
                  cutoffScore={result.tneaCutoff}
                  categoryCode={selectedCategory || 'OC'}
                />
              )}
            </div>
          )}
        </div>
      )}

      {/* ═══ TAB 2: PREVIOUS YEAR CUTOFFS ═══ */}
      {activeTab === 'cutoffs' && <PreviousYearCutoffs />}

      {/* ═══ TAB 3: COUNSELLING GUIDE ═══ */}
      {activeTab === 'counselling' && <CounsellingGuide />}

      {/* ═══ TAB 4: COUNSELLING TRACKER ═══ */}
      {activeTab === 'tracker' && <CounsellingTracker />}
    </div>
  );
};
