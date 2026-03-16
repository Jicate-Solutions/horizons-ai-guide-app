import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { EntranceExam } from './types';
import { examCategories } from './examData';
import { examPracticeQuestions } from './practiceQuestionsData';
import { PracticeQuestions } from './PracticeQuestions';
import { ExamPrepGuide } from './ExamPrepGuide';
import { generateStudyPlannerPDF } from './generateStudyPlannerPDF';
import { useState } from 'react';
import { 
  ExternalLink, 
  Calendar, 
  IndianRupee, 
  Clock, 
  FileText, 
  Bell, 
  Building2,
  Users,
  Bookmark,
  BookmarkCheck,
  Star,
  MapPin,
  Download,
  BookOpen,
  Target
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface ExamCardProps {
  exam: EntranceExam;
  isBookmarked?: boolean;
  onToggleBookmark?: (examId: string) => void;
}

export const ExamCard = ({ exam, isBookmarked = false, onToggleBookmark }: ExamCardProps) => {
  const { toast } = useToast();
  const [showPractice, setShowPractice] = useState(false);
  const [showPrepGuide, setShowPrepGuide] = useState(false);
  const practiceQs = examPracticeQuestions[exam.id];
  const categoryInfo = examCategories.find(c => c.id === exam.category);

  const handleSetReminder = () => {
    toast({
      title: "Reminder Set! 🔔",
      description: `You'll be notified about ${exam.name} important dates.`,
    });
  };

  const handleDownloadStudyPlan = () => {
    generateStudyPlannerPDF(exam);
    toast({
      title: "Study Planner Downloaded! 📚",
      description: `${exam.name} preparation guide saved as PDF.`,
    });
  };

  const handleToggleBookmark = () => {
    if (onToggleBookmark) {
      onToggleBookmark(exam.id);
      toast({
        title: isBookmarked ? "Removed from Saved" : "Saved! ⭐",
        description: isBookmarked 
          ? `${exam.name} removed from your saved exams.`
          : `${exam.name} added to your saved exams.`,
      });
    }
  };

  return (
    <Card className={cn(
      "bg-white border-l-4 hover:shadow-xl transition-all duration-300 hover:-translate-y-1",
      "border-[#2E7D32]"
    )}>
      <CardHeader className="pb-3 bg-gradient-to-r from-[#E8F5E9] to-[#FFF8E1]">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge className={cn("text-xs font-medium", categoryInfo?.bgColor, categoryInfo?.color)}>
              {categoryInfo?.icon} {categoryInfo?.label}
            </Badge>
            {false && (
              <Badge className="text-xs bg-gradient-to-r from-[#F59E0B] to-[#D97706] text-white border-0">
                <Star className="h-3 w-3 mr-1 fill-white" />
                JKKN
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "h-8 w-8",
                isBookmarked 
                  ? "text-[#F59E0B] hover:text-[#D97706]" 
                  : "text-[#6B7280] hover:text-[#F59E0B]"
              )}
              onClick={handleToggleBookmark}
            >
              {isBookmarked ? (
                <BookmarkCheck className="h-5 w-5 fill-current" />
              ) : (
                <Bookmark className="h-5 w-5" />
              )}
            </Button>
            <Badge variant="outline" className="text-xs bg-[#FFF8E1] text-[#B8860B] border-[#F59E0B]">
              2026
            </Badge>
          </div>
        </div>
        
        {/* Exam Name - English & Tamil */}
        <div className="mt-3">
          <h3 className="font-bold text-xl text-[#1B5E20]">
            {exam.name}
          </h3>
          <p className="text-sm text-[#B8860B] font-tamil">{exam.tamilName}</p>
          <p className="text-xs text-[#6B7280] mt-1">{exam.fullForm}</p>
        </div>
      </CardHeader>

      <CardContent className="space-y-3 pt-4">
        {/* ═══ TOP ACTIONS — Most important, visible first ═══ */}
        <div className="grid grid-cols-2 gap-2">
          {practiceQs && practiceQs.length > 0 && (
            <Button
              size="sm"
              className={cn(
                "h-12",
                showPractice
                  ? "bg-violet-600 hover:bg-violet-700 text-white"
                  : "bg-violet-50 border-2 border-violet-300 text-violet-700 hover:bg-violet-100"
              )}
              onClick={() => { setShowPractice(!showPractice); setShowPrepGuide(false); }}
            >
              <div className="flex flex-col items-center">
                <BookOpen className="h-4 w-4 mb-0.5" />
                <span className="text-xs font-bold">Practice ({practiceQs.length})</span>
              </div>
            </Button>
          )}
          <Button
            size="sm"
            className={cn(
              "h-12",
              showPrepGuide
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-blue-50 border-2 border-blue-300 text-blue-700 hover:bg-blue-100"
            )}
            onClick={() => { setShowPrepGuide(!showPrepGuide); setShowPractice(false); }}
          >
            <div className="flex flex-col items-center">
              <Target className="h-4 w-4 mb-0.5" />
              <span className="text-xs font-bold">How to Pass</span>
            </div>
          </Button>
        </div>

        {/* Practice Questions — shows immediately when tapped */}
        {showPractice && practiceQs && (
          <PracticeQuestions questions={practiceQs} examName={exam.name} />
        )}

        {/* How to Pass Guide — shows immediately when tapped */}
        {showPrepGuide && (
          <ExamPrepGuide examId={exam.id} examName={exam.name} />
        )}

        {/* ═══ KEY INFO — Compact summary ═══ */}
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="bg-[#F0FDF4] rounded-lg p-2">
            <p className="text-[10px] text-[#6B7280]">Mode</p>
            <p className="text-xs font-bold text-[#1B5E20]">{exam.examMode.split(' ')[0]}</p>
          </div>
          <div className="bg-[#F0FDF4] rounded-lg p-2">
            <p className="text-[10px] text-[#6B7280]">Duration</p>
            <p className="text-xs font-bold text-[#1B5E20]">{exam.duration}</p>
          </div>
          <div className="bg-[#FFF8E1] rounded-lg p-2">
            <p className="text-[10px] text-[#6B7280]">Fee</p>
            <p className="text-xs font-bold text-[#B8860B]">{exam.applicationFee.general}</p>
          </div>
        </div>

        {/* Important Dates — compact */}
        <div className="bg-[#E8F5E9] rounded-lg p-2.5">
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div>
              <p className="text-[10px] text-[#6B7280]">Registration</p>
              <p className="font-bold text-[#1B5E20]">{exam.importantDates.registration}</p>
            </div>
            <div>
              <p className="text-[10px] text-[#6B7280]">Exam Date</p>
              <p className="font-bold text-[#1B5E20]">{exam.importantDates.examDate}</p>
            </div>
            <div>
              <p className="text-[10px] text-[#6B7280]">Results</p>
              <p className="font-bold text-[#1B5E20]">{exam.importantDates.resultDate}</p>
            </div>
          </div>
        </div>

        {/* TN Eligibility — compact */}
        <div className="bg-[#FFF8E1] rounded-lg p-2.5 border border-[#FFE082]">
          <p className="text-xs text-[#374151]"><span className="font-bold text-[#B8860B]">TN Students:</span> {exam.tnEligibility}</p>
        </div>

        {/* TN Colleges — compact */}
        <div className="flex flex-wrap gap-1">
          {exam.tnCollegesAccepting.slice(0, 3).map((college, idx) => (
            <Badge key={idx} variant="outline" className="text-[10px] bg-[#E8F5E9] text-[#2E7D32] border-[#A5D6A7]">
              {college}
            </Badge>
          ))}
          {exam.tnCollegesAccepting.length > 3 && (
            <Badge variant="outline" className="text-[10px] bg-white text-[#2E7D32] border-[#2E7D32]">
              +{exam.tnCollegesAccepting.length - 3} more
            </Badge>
          )}
        </div>

        {/* Bottom Actions */}
        <div className="flex gap-2 pt-1">
          <Button variant="outline" size="sm" className="flex-1 h-9 border-[#2E7D32] text-[#2E7D32] hover:bg-[#E8F5E9] text-xs" onClick={handleSetReminder}>
            <Bell className="h-3 w-3 mr-1" /> Reminder
          </Button>
          <Button variant="outline" size="sm" className="flex-1 h-9 border-[#1976D2] text-[#1976D2] hover:bg-[#E3F2FD] text-xs" onClick={handleDownloadStudyPlan}>
            <Download className="h-3 w-3 mr-1" /> Study Plan
          </Button>
        </div>
        <Button size="sm" className="w-full h-10 bg-gradient-to-r from-[#F59E0B] to-[#D97706] hover:from-[#D97706] hover:to-[#B8860B] text-white font-bold"
          onClick={() => window.open(exam.officialWebsite, '_blank')}>
          Apply Now <ExternalLink className="h-3 w-3 ml-1" />
        </Button>
      </CardContent>
    </Card>
  );
};
