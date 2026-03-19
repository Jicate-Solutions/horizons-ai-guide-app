import { useState, useMemo } from "react";
import { BookOpen, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import StreamSection from "./StreamSection";
import CourseResults from "./CourseResults";
import CourseDetailModal from "./CourseDetailModal";
import { boards, getCoursesForGroup, getStreamsForBoard } from "./courseExplorerData";
import type { CourseInfo } from "./courseExplorerData";

const CourseExplorer = () => {
  const [selectedBoard, setSelectedBoard] = useState("tn");
  const [selectedStream, setSelectedStream] = useState<string | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<CourseInfo | null>(null);

  const currentStreams = useMemo(() => getStreamsForBoard(selectedBoard), [selectedBoard]);
  const streamKeys = useMemo(() => Object.keys(currentStreams), [currentStreams]);
  const courseCategories = selectedGroup ? getCoursesForGroup(selectedGroup) : [];

  const boardInfo = boards.find(b => b.id === selectedBoard);

  const handleBoardChange = (boardId: string) => {
    setSelectedBoard(boardId);
    setSelectedStream(null);
    setSelectedGroup(null);
  };

  const handleStreamSelect = (key: string) => {
    if (selectedStream === key) {
      setSelectedStream(null);
      setSelectedGroup(null);
    } else {
      setSelectedStream(key);
      setSelectedGroup(null);
    }
  };

  return (
    <div className="space-y-5">

      {/* ── HERO BANNER ── */}
      <div className="relative rounded-2xl overflow-hidden shadow-xl" style={{ minHeight: '220px' }}>
        <img src="https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=1200&h=500&fit=crop&auto=format" alt="" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-br from-violet-900/95 via-purple-800/92 to-violet-900/95" />
        <div className="absolute -top-20 -right-20 w-60 h-60 bg-fuchsia-500/15 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-violet-500/10 rounded-full blur-3xl" />

        <div className="relative z-10 p-6 md:p-8 flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center shadow-xl shadow-purple-500/25 mb-4">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-white mb-1">
            Course <span className="text-amber-300">Explorer</span>
          </h1>
          <p className="text-sm text-violet-300 font-medium mb-1">உங்கள் எதிர்காலப் படிப்பைக் கண்டறியுங்கள்</p>
          <p className="text-xs text-violet-200/60 max-w-md mb-5">
            Discover the perfect course for your future — select your board, stream, and group to explore 144+ courses
          </p>

          <div className="flex items-center gap-6 md:gap-8 mb-4">
            {[
              { value: '144+', label: 'Courses', color: 'text-white' },
              { value: String(boards.length), label: 'Boards', color: 'text-amber-300' },
              { value: '5', label: 'Streams', color: 'text-violet-300' },
              { value: '20+', label: 'Groups', color: 'text-emerald-300' },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <p className={cn("text-2xl md:text-3xl font-black leading-none", s.color)}>{s.value}</p>
                <p className="text-[10px] text-purple-400 mt-1">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="inline-flex items-center gap-2 bg-violet-500/20 backdrop-blur-sm px-4 py-2 rounded-full border border-violet-400/30">
            <span className="text-xs">📋</span>
            <span className="text-xs font-bold text-violet-200">Board → Stream → Group → Courses</span>
          </div>
        </div>
      </div>

      {/* ── HOW IT WORKS STRIP ── */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { step: '1', emoji: '📚', label: 'Select Board', desc: 'TN, CBSE, ICSE...' },
          { step: '2', emoji: '🔬', label: 'Pick Stream', desc: 'Science, Commerce...' },
          { step: '3', emoji: '🎯', label: 'Explore Courses', desc: '144+ options' },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-xl p-3 border border-gray-200 text-center shadow-sm">
            <div className="text-2xl mb-1">{s.emoji}</div>
            <p className="text-xs font-bold text-gray-800">Step {s.step}: {s.label}</p>
            <p className="text-[10px] text-gray-500">{s.desc}</p>
          </div>
        ))}
      </div>

      {/* ── STEP 1: BOARD SELECTOR ── */}
      <div>
        <p className="text-sm font-bold text-gray-800 mb-2 flex items-center gap-2">
          <span className="w-5 h-5 rounded-full bg-violet-600 text-white text-xs font-bold flex items-center justify-center">1</span>
          Select Your Board
        </p>
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-hide">
          {boards.map((board) => (
            <button
              key={board.id}
              className={cn(
                "flex items-center gap-2 px-4 py-2.5 rounded-xl whitespace-nowrap transition-all text-sm font-semibold border-2",
                selectedBoard === board.id
                  ? "bg-violet-600 text-white border-violet-600 shadow-lg shadow-violet-200"
                  : "bg-white text-gray-700 border-gray-200 hover:border-violet-300"
              )}
              onClick={() => handleBoardChange(board.id)}
            >
              <span className="text-base">{board.icon}</span>
              <span>{board.id === 'tn' ? 'TN Board' : board.id === 'icse' ? 'ICSE' : board.id === 'nios' ? 'NIOS' : board.id === 'other' ? 'Others' : board.name}</span>
            </button>
          ))}
        </div>
        {boardInfo && (
          <p className="text-xs text-gray-500 mt-1.5 ml-7">
            {boardInfo.icon} {boardInfo.name}
            {boardInfo.id === 'tn' && ' — HSC Group Codes (101, 201, 301, 401)'}
            {boardInfo.id === 'cbse' && ' — PCM, PCB, Commerce, Humanities'}
            {boardInfo.id === 'icse' && ' — ISC Science, Commerce, Humanities'}
            {boardInfo.id === 'nios' && ' — Flexible subject combinations'}
          </p>
        )}
      </div>

      {/* ── STEP 2: STREAM SELECTOR ── */}
      <div>
        <p className="text-sm font-bold text-gray-800 mb-2 flex items-center gap-2">
          <span className="w-5 h-5 rounded-full bg-violet-600 text-white text-xs font-bold flex items-center justify-center">2</span>
          Select Your Stream
          {selectedStream && (
            <button
              onClick={() => { setSelectedStream(null); setSelectedGroup(null); }}
              className="ml-auto text-xs font-bold text-violet-600 flex items-center gap-1"
            >
              <ArrowLeft className="w-3 h-3" /> All Streams
            </button>
          )}
        </p>

        {/* Stream Cards — full width on mobile */}
        {!selectedStream && (
          <div className="space-y-2">
            {streamKeys.map((key) => {
              const stream = currentStreams[key];
              return (
                <button
                  key={key}
                  onClick={() => handleStreamSelect(key)}
                  className={cn(
                    "w-full flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all active:scale-[0.98]",
                    stream.bgClass, stream.borderClass, "hover:shadow-md"
                  )}
                >
                  <span className="text-2xl flex-shrink-0">{stream.title.split(' ')[0]}</span>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-sm text-gray-900">{stream.title.replace(/^[^\s]+\s/, '')}</h4>
                    <p className="text-xs text-gray-500 mt-0.5">{stream.subtitle} · {stream.groups.length} group{stream.groups.length > 1 ? "s" : ""}</p>
                  </div>
                  <span className="text-xs font-bold text-gray-400">→</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Groups for selected stream */}
        {selectedStream && currentStreams[selectedStream] && (
          <StreamSection
            stream={currentStreams[selectedStream]}
            selectedGroup={selectedGroup}
            onGroupSelect={setSelectedGroup}
          />
        )}
      </div>

      {/* ── STEP 3: COURSE RESULTS ── */}
      {selectedGroup && (
        <div>
          <p className="text-sm font-bold text-gray-800 mb-2 flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-violet-600 text-white text-xs font-bold flex items-center justify-center">3</span>
            Available Courses
          </p>
          <CourseResults
            categories={courseCategories}
            groupCode={selectedGroup}
            onViewDetails={setSelectedCourse}
          />
        </div>
      )}

      {/* Course Detail Modal */}
      <CourseDetailModal
        course={selectedCourse}
        isOpen={!!selectedCourse}
        onClose={() => setSelectedCourse(null)}
      />
    </div>
  );
};

export default CourseExplorer;
