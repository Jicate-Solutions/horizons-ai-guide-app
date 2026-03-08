import { useState } from 'react';
import { 
  BookOpen, ChevronRight, ArrowLeft, Target, BarChart3, 
  Flame, Sparkles, GraduationCap
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { QuestionViewer } from './QuestionViewer';
import { TopicWiseView } from './TopicWiseView';
import { SubjectWeightageView } from './SubjectWeightageView';

// ──────────── DATA ────────────

interface ExamSubjectMap {
  exam: string;
  subcategory: string;
  subjects: string[];
}

interface CategoryData {
  id: string;
  label: string;
  labelTamil: string;
  icon: string;
  color: string;
  bgColor: string;
  borderColor: string;
  exams: ExamSubjectMap[];
}

const categories: CategoryData[] = [
  {
    id: 'engineering', label: 'Engineering', labelTamil: 'பொறியியல்', icon: '⚙️',
    color: 'text-blue-700', bgColor: 'bg-blue-50', borderColor: 'border-blue-200',
    exams: [
      { exam: 'JEE Main', subcategory: 'jee-main', subjects: ['Physics', 'Chemistry', 'Mathematics'] },
      { exam: 'JEE Advanced', subcategory: 'jee-advanced', subjects: ['Physics', 'Chemistry', 'Mathematics'] },
      { exam: 'BITSAT', subcategory: 'bitsat', subjects: ['Physics', 'Chemistry', 'Mathematics'] },
      { exam: 'VITEEE', subcategory: 'viteee', subjects: ['Physics', 'Chemistry', 'Mathematics'] },
      { exam: 'SRMJEEE', subcategory: 'srmjeee', subjects: ['Physics', 'Chemistry', 'Mathematics'] },
      { exam: 'MHT CET', subcategory: 'mht-cet', subjects: ['Mathematics', 'Physics', 'Chemistry'] },
      { exam: 'COMEDK', subcategory: 'comedk', subjects: ['Physics', 'Chemistry', 'Mathematics'] },
      { exam: 'WB JEE', subcategory: 'wb-jee', subjects: ['Physics', 'Chemistry', 'Mathematics'] },
    ],
  },
  {
    id: 'medical', label: 'Medical', labelTamil: 'மருத்துவம்', icon: '🏥',
    color: 'text-emerald-700', bgColor: 'bg-emerald-50', borderColor: 'border-emerald-200',
    exams: [
      { exam: 'NEET UG', subcategory: 'neet', subjects: ['Physics', 'Chemistry', 'Biology'] },
      { exam: 'NEET PG', subcategory: 'neet-pg', subjects: ['Anatomy', 'Physiology', 'Biochemistry', 'Pharmacology', 'Pathology', 'Microbiology', 'Medicine', 'Surgery'] },
      { exam: 'AIIMS (Old)', subcategory: 'aiims', subjects: ['Physics', 'Chemistry', 'Biology', 'GK'] },
    ],
  },
  {
    id: 'law', label: 'Law', labelTamil: 'சட்டம்', icon: '⚖️',
    color: 'text-amber-700', bgColor: 'bg-amber-50', borderColor: 'border-amber-200',
    exams: [
      { exam: 'CLAT', subcategory: 'clat', subjects: ['English', 'Legal Reasoning', 'GK', 'Quantitative', 'Logical'] },
      { exam: 'AILET', subcategory: 'ailet', subjects: ['English', 'Legal Aptitude', 'GK', 'Reasoning'] },
    ],
  },
  {
    id: 'civil', label: 'Civil Services', labelTamil: 'அரசு பணி', icon: '🏛️',
    color: 'text-rose-700', bgColor: 'bg-rose-50', borderColor: 'border-rose-200',
    exams: [
      { exam: 'UPSC Prelims', subcategory: 'upsc-prelims', subjects: ['General Studies', 'CSAT'] },
      { exam: 'TNPSC Group 1', subcategory: 'tnpsc-group1', subjects: ['GS', 'Aptitude', 'Tamil'] },
      { exam: 'TNPSC Group 2/2A', subcategory: 'tnpsc-group2', subjects: ['GS', 'Tamil', 'Aptitude'] },
      { exam: 'TNPSC Group 4', subcategory: 'tnpsc-group4', subjects: ['GS', 'Tamil', 'Aptitude'] },
    ],
  },
  {
    id: 'banking', label: 'Banking & SSC', labelTamil: 'வங்கி & எஸ்எஸ்சி', icon: '🏦',
    color: 'text-indigo-700', bgColor: 'bg-indigo-50', borderColor: 'border-indigo-200',
    exams: [
      { exam: 'SBI PO', subcategory: 'sbi-po', subjects: ['Reasoning', 'Quantitative', 'English', 'Banking'] },
      { exam: 'IBPS PO', subcategory: 'ibps-po', subjects: ['Reasoning', 'Quantitative', 'English'] },
      { exam: 'SSC CGL', subcategory: 'ssc-cgl', subjects: ['Reasoning', 'Quantitative', 'English', 'GK'] },
      { exam: 'RRB NTPC', subcategory: 'rrb-ntpc', subjects: ['Maths', 'Reasoning', 'GK'] },
    ],
  },
  {
    id: 'defence', label: 'Defence', labelTamil: 'பாதுகாப்பு', icon: '🎖️',
    color: 'text-green-700', bgColor: 'bg-green-50', borderColor: 'border-green-200',
    exams: [
      { exam: 'NDA', subcategory: 'nda', subjects: ['Maths', 'GAT'] },
      { exam: 'CDS', subcategory: 'cds', subjects: ['English', 'GK', 'Maths'] },
      { exam: 'AFCAT', subcategory: 'afcat', subjects: ['Verbal', 'Numerical', 'Reasoning'] },
    ],
  },
];

const subjectIcon = (s: string) => {
  const map: Record<string, string> = {
    'Physics': '⚡', 'Chemistry': '🧪', 'Mathematics': '📐', 'Biology': '🧬',
    'English': '📝', 'GK': '🌍', 'Reasoning': '🧠', 'Quantitative': '🔢',
    'Tamil': '🏛️', 'GS': '📖', 'CSAT': '🎯', 'Aptitude': '💡',
    'Maths': '📐', 'Verbal': '📝', 'Numerical': '🔢', 'Legal Reasoning': '⚖️',
    'Legal Aptitude': '⚖️', 'Logical': '🧠', 'Banking': '🏦',
  };
  return map[s] || '📖';
};

// ──────────── COMPONENT ────────────

type Step = 'category' | 'exam' | 'subject' | 'action' | 'topics' | 'questions' | 'weightage';

export const PreviousYearQuestions = () => {
  const [step, setStep] = useState<Step>('category');
  const [selectedCategory, setSelectedCategory] = useState<CategoryData | null>(null);
  const [selectedExam, setSelectedExam] = useState<ExamSubjectMap | null>(null);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');

  const goBack = () => {
    switch (step) {
      case 'exam': setStep('category'); setSelectedCategory(null); break;
      case 'subject': setStep('exam'); setSelectedExam(null); break;
      case 'action': setStep('subject'); setSelectedSubject(''); break;
      case 'topics': setStep('action'); break;
      case 'questions': setStep('topics'); setSelectedTopic(''); break;
      case 'weightage': setStep('action'); break;
      default: break;
    }
  };

  const resetAll = () => {
    setStep('category');
    setSelectedCategory(null);
    setSelectedExam(null);
    setSelectedSubject('');
    setSelectedTopic('');
  };

  // ──── Breadcrumb ────
  const breadcrumb = [
    selectedCategory?.label,
    selectedExam?.exam,
    selectedSubject,
  ].filter(Boolean);

  return (
    <div className="space-y-4">
      {/* Breadcrumb + Back */}
      {step !== 'category' && (
        <div className="flex items-center gap-2">
          <button onClick={goBack} className="flex items-center gap-1.5 text-sm text-indigo-600 font-medium hover:text-indigo-800 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <div className="flex items-center gap-1 text-xs text-gray-400 ml-2">
            {breadcrumb.map((item, i) => (
              <span key={i} className="flex items-center gap-1">
                {i > 0 && <ChevronRight className="w-3 h-3" />}
                <span className={i === breadcrumb.length - 1 ? 'text-gray-700 font-medium' : ''}>{item}</span>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* ═══════ STEP 1: PICK CATEGORY ═══════ */}
      {step === 'category' && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center">
              <GraduationCap className="w-4 h-4 text-indigo-600" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800 text-base">Choose Your Category</h3>
              <p className="text-xs text-gray-500">உங்கள் பிரிவைத் தேர்ந்தெடுக்கவும்</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => { setSelectedCategory(cat); setStep('exam'); }}
                className={cn(
                  "flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all",
                  "hover:shadow-lg hover:-translate-y-1 active:scale-95",
                  cat.bgColor, cat.borderColor
                )}
              >
                <span className="text-3xl">{cat.icon}</span>
                <span className={cn("font-semibold text-sm", cat.color)}>{cat.label}</span>
                <span className="text-[10px] text-gray-500 font-tamil">{cat.labelTamil}</span>
                <Badge className="bg-white/80 text-gray-600 text-[10px] border-0">
                  {cat.exams.length} exams
                </Badge>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ═══════ STEP 2: PICK EXAM ═══════ */}
      {step === 'exam' && selectedCategory && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">{selectedCategory.icon}</span>
            <div>
              <h3 className="font-bold text-gray-800 text-base">{selectedCategory.label} Exams</h3>
              <p className="text-xs text-gray-500">Select an exam to practice</p>
            </div>
          </div>

          <div className="space-y-2">
            {selectedCategory.exams.map((exam) => (
              <button
                key={exam.subcategory}
                onClick={() => { setSelectedExam(exam); setStep('subject'); }}
                className="w-full flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100 hover:border-indigo-200 hover:bg-indigo-50/30 transition-all text-left group"
              >
                <div className="flex items-center gap-3">
                  <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", selectedCategory.bgColor)}>
                    <BookOpen className={cn("w-5 h-5", selectedCategory.color)} />
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-gray-800 group-hover:text-indigo-700 transition-colors">{exam.exam}</div>
                    <div className="text-[11px] text-gray-400">{exam.subjects.length} subjects</div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-indigo-500 transition-colors" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ═══════ STEP 3: PICK SUBJECT ═══════ */}
      {step === 'subject' && selectedExam && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
              <Target className="w-4 h-4 text-purple-600" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800 text-base">{selectedExam.exam} — Choose Subject</h3>
              <p className="text-xs text-gray-500">பாடத்தைத் தேர்ந்தெடுக்கவும்</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-2">
            {selectedExam.subjects.map((subject) => (
              <button
                key={subject}
                onClick={() => { setSelectedSubject(subject); setStep('action'); }}
                className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100 hover:border-purple-200 hover:bg-purple-50/30 transition-all text-left group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{subjectIcon(subject)}</span>
                  <span className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">{subject}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-purple-500 transition-colors" />
              </button>
            ))}
          </div>

          {/* Quick: Subject Weightage */}
          <Button
            variant="outline"
            onClick={() => { setStep('weightage'); }}
            className="w-full mt-4 border-purple-200 text-purple-700 hover:bg-purple-50 py-5 rounded-xl"
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            View Subject Weightage Overview
          </Button>
        </div>
      )}

      {/* ═══════ STEP 4: CHOOSE ACTION ═══════ */}
      {step === 'action' && selectedExam && selectedSubject && (
        <div>
          <div className="text-center mb-5">
            <span className="text-3xl">{subjectIcon(selectedSubject)}</span>
            <h3 className="font-bold text-gray-800 text-lg mt-2">{selectedExam.exam} — {selectedSubject}</h3>
            <p className="text-xs text-gray-500 mt-1">What would you like to do?</p>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => setStep('topics')}
              className="w-full flex items-center gap-4 p-5 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl border-2 border-indigo-200 hover:border-indigo-400 hover:shadow-lg transition-all text-left group"
            >
              <div className="w-12 h-12 rounded-xl bg-indigo-500 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <Flame className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-bold text-indigo-800">Topic-wise Analysis</div>
                <div className="text-xs text-indigo-600 mt-0.5">See which topics are most important, trending, and frequently asked</div>
              </div>
              <ChevronRight className="w-5 h-5 text-indigo-300 flex-shrink-0" />
            </button>

            <button
              onClick={() => setStep('weightage')}
              className="w-full flex items-center gap-4 p-5 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border-2 border-purple-200 hover:border-purple-400 hover:shadow-lg transition-all text-left group"
            >
              <div className="w-12 h-12 rounded-xl bg-purple-500 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-bold text-purple-800">Subject Weightage</div>
                <div className="text-xs text-purple-600 mt-0.5">Marks distribution, important chapters, scoring strategy</div>
              </div>
              <ChevronRight className="w-5 h-5 text-purple-300 flex-shrink-0" />
            </button>
          </div>
        </div>
      )}

      {/* ═══════ TOPIC-WISE VIEW ═══════ */}
      {step === 'topics' && selectedExam && selectedSubject && (
        <TopicWiseView
          examId={selectedExam.subcategory}
          examName={selectedExam.exam}
          subject={selectedSubject}
          onBack={goBack}
          onViewQuestions={(topicName: string) => {
            setSelectedTopic(topicName);
            setStep('questions');
          }}
        />
      )}

      {/* ═══════ QUESTION VIEWER ═══════ */}
      {step === 'questions' && selectedExam && selectedSubject && selectedTopic && (
        <QuestionViewer
          examId={selectedExam.subcategory}
          examName={selectedExam.exam}
          subject={selectedSubject}
          topicName={selectedTopic}
          onBack={goBack}
        />
      )}

      {/* ═══════ SUBJECT WEIGHTAGE ═══════ */}
      {step === 'weightage' && selectedExam && (
        <SubjectWeightageView
          examId={selectedExam.subcategory}
          examName={selectedExam.exam}
          onBack={goBack}
          onSelectSubject={(subject: string) => {
            setSelectedSubject(subject);
            setStep('topics');
          }}
        />
      )}
    </div>
  );
};
