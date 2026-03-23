import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, ChevronDown, ChevronUp, ChevronRight, Search, Zap, CheckCircle2 } from 'lucide-react';
import { syllabusData } from '@/data/syllabusData';
import { studyGuideContent } from '@/data/studyGuideContent';
import { questionBank } from '@/data/questionBank';
import { pyqQuestions } from '@/components/PreviousYearQuestions/pyqQuestionsData';
import { chapterToPyqMap } from '@/data/chapterToPyqMap';
import { PracticeQuestions } from '@/components/EntranceExams/PracticeQuestions';
import { cn } from '@/lib/utils';

const PK = 'vzk_topic_progress';
const getP = (): Record<string, {studied:boolean;quizBest:number;pyqDone:boolean}> => { try{return JSON.parse(localStorage.getItem(PK)||'{}');}catch{return {};} };
const setP = (id:string, d:any) => { const a=getP(); a[id]={...(a[id]||{studied:false,quizBest:0,pyqDone:false}),...d}; localStorage.setItem(PK,JSON.stringify(a)); };

const TopicHub = () => {
  const navigate = useNavigate();
  const [selExam, setSelExam] = useState<string|null>(null);
  const [openSub, setOpenSub] = useState<string|null>(null);
  const [activeCh, setActiveCh] = useState<{id:string;name:string;class?:string}|null>(null);
  const [tab, setTab] = useState<'study'|'practice'|'pyq'>('study');
  const [searchQ, setSearchQ] = useState('');
  const [quizMode, setQuizMode] = useState(false);
  const [, forceUpdate] = useState(0);

  const exam = selExam ? syllabusData[selExam] : null;
  const progress = getP();

  const chStudy = activeCh ? studyGuideContent[activeCh.id] : null;
  const chQB = activeCh ? (questionBank[activeCh.id]||[]) : [];
  const chPYQ = useMemo(() => {
    if(!activeCh) return [];
    return (chapterToPyqMap[activeCh.id]||[]).flatMap(k => pyqQuestions[k]||[]);
  }, [activeCh]);

  const quizQs = chQB.map((q,i) => ({
    id:`${activeCh?.id}-${i}`,question:q.q,options:q.o,answer:q.a,
    explanation:q.e,difficulty:q.d,subject:activeCh?.name||'',topic:activeCh?.name||'',
  }));

  // Quiz mode
  if(quizMode && activeCh && quizQs.length>0) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-4 pb-24">
        <div className="max-w-lg mx-auto space-y-4">
          <button onClick={()=>setQuizMode(false)} className="text-sm text-gray-500 flex items-center gap-1"><ArrowLeft className="w-4 h-4"/> Back to {activeCh.name}</button>
          <PracticeQuestions questions={quizQs} examName={activeCh.name} showSetup={true}/>
        </div>
      </div>
    );
  }

  // Chapter detail view
  if(activeCh) {
    const p = progress[activeCh.id]||{studied:false,quizBest:0,pyqDone:false};
    const done = [p.studied,p.quizBest>0,p.pyqDone].filter(Boolean).length;

    return (
      <div className="min-h-screen bg-gray-50 px-4 py-4 pb-24">
        <div className="max-w-lg mx-auto space-y-4">
          <button onClick={()=>setActiveCh(null)} className="text-sm text-gray-500 flex items-center gap-1"><ArrowLeft className="w-4 h-4"/> Back</button>

          <div className="bg-white rounded-2xl p-4 border border-gray-200">
            <p className="text-base font-bold text-gray-900">{activeCh.name}</p>
            {activeCh.class && <p className="text-[10px] text-gray-400 mt-0.5">Class {activeCh.class}</p>}
            <div className="flex items-center gap-2 mt-3">
              <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full transition-all" style={{width:`${(done/3)*100}%`}}/>
              </div>
              <span className="text-[10px] font-bold text-gray-500">{done}/3</span>
            </div>
            <div className="flex gap-2 mt-2">
              <span className={cn("text-[9px] px-2 py-0.5 rounded-full font-bold",p.studied?'bg-emerald-100 text-emerald-700':'bg-gray-100 text-gray-400')}>📖 {p.studied?'Studied':'Not studied'}</span>
              <span className={cn("text-[9px] px-2 py-0.5 rounded-full font-bold",p.quizBest>0?'bg-emerald-100 text-emerald-700':'bg-gray-100 text-gray-400')}>📝 {p.quizBest>0?`Best ${p.quizBest}%`:'Not tested'}</span>
              <span className={cn("text-[9px] px-2 py-0.5 rounded-full font-bold",p.pyqDone?'bg-emerald-100 text-emerald-700':'bg-gray-100 text-gray-400')}>📜 {p.pyqDone?'PYQ done':'PYQ pending'}</span>
            </div>
          </div>

          {/* 3 tabs */}
          <div className="flex gap-2">
            {([{id:'study' as const,l:'📖 Study',c:'indigo',n:chStudy?.keyConcepts?.length||0},{id:'practice' as const,l:'📝 Test',c:'violet',n:chQB.length},{id:'pyq' as const,l:'📜 PYQ',c:'amber',n:chPYQ.length}]).map(t=>(
              <button key={t.id} onClick={()=>setTab(t.id)}
                className={cn("flex-1 py-2.5 rounded-xl text-xs font-bold text-center border-2 transition-all",
                  tab===t.id ? t.c==='indigo'?'bg-indigo-600 text-white border-indigo-600':t.c==='violet'?'bg-violet-600 text-white border-violet-600':'bg-amber-500 text-white border-amber-500'
                  : t.c==='indigo'?'bg-indigo-50 text-indigo-700 border-indigo-200':t.c==='violet'?'bg-violet-50 text-violet-700 border-violet-200':'bg-amber-50 text-amber-700 border-amber-200'
                )}>
                {t.l} ({t.n})
              </button>
            ))}
          </div>

          {/* Study tab */}
          {tab==='study' && chStudy && (
            <div className="space-y-3">
              <div><p className="text-[10px] font-bold text-indigo-700 mb-1.5">🎯 Key Concepts</p>
                <div className="space-y-1">{chStudy.keyConcepts.map((c,i)=>(<p key={i} className="text-[11px] text-gray-700 bg-indigo-50 rounded-lg px-3 py-2 leading-relaxed">• {c}</p>))}</div>
              </div>
              {chStudy.formulas && chStudy.formulas.length>0 && (
                <div><p className="text-[10px] font-bold text-purple-700 mb-1">📝 Formulas</p>
                  <div className="bg-purple-50 rounded-lg p-3 space-y-0.5">{chStudy.formulas.map((f,i)=>(<p key={i} className="text-[11px] font-mono text-purple-800">{f}</p>))}</div>
                </div>
              )}
              <div><p className="text-[10px] font-bold text-emerald-700 mb-1">📚 Books</p>
                {chStudy.books.map((b,i)=>(<p key={i} className="text-[11px] text-gray-600">• {b}</p>))}
              </div>
              <div className="bg-amber-50 rounded-lg p-3 border border-amber-200"><p className="text-[11px] text-amber-700">💡 {chStudy.tip}</p></div>
              {!p.studied ? (
                <button onClick={()=>{setP(activeCh.id,{studied:true});forceUpdate(n=>n+1);}}
                  className="w-full py-3 rounded-xl bg-indigo-600 text-white text-xs font-bold flex items-center justify-center gap-2 active:scale-[0.98]">
                  <CheckCircle2 className="w-4 h-4"/> Mark as Studied
                </button>
              ) : <p className="text-xs text-emerald-600 font-bold text-center py-2">✅ Studied! Try Practice Test →</p>}
            </div>
          )}
          {tab==='study' && !chStudy && <p className="text-xs text-gray-400 text-center py-8">Study content coming soon.</p>}

          {/* Practice tab */}
          {tab==='practice' && (
            <div className="space-y-3">
              {chQB.length>0 ? (
                <>
                  <div className="bg-violet-50 rounded-xl p-4 border border-violet-200 text-center">
                    <p className="text-2xl font-black text-violet-700">{chQB.length}</p>
                    <p className="text-xs text-violet-600 mt-1">questions for this chapter</p>
                  </div>
                  <button onClick={()=>setQuizMode(true)}
                    className="w-full py-3.5 rounded-xl bg-violet-600 text-white text-sm font-bold flex items-center justify-center gap-2 active:scale-[0.98]">
                    <Zap className="w-4 h-4"/> Start Practice Test
                  </button>
                  <p className="text-[10px] text-gray-400 text-center">Pick 5 / 10 / 20 / All questions on next screen</p>
                </>
              ) : <p className="text-xs text-gray-400 text-center py-8">Practice questions coming soon.</p>}
            </div>
          )}

          {/* PYQ tab */}
          {tab==='pyq' && (
            <div className="space-y-3">
              {chPYQ.length>0 ? (
                <>
                  <p className="text-[10px] font-bold text-gray-500">{chPYQ.length} Previous Year Questions</p>
                  {chPYQ.map((q:any,i:number)=>{
                    const [show,setShow]=useState(false);
                    return (
                      <div key={i} className="bg-white rounded-xl p-4 border border-gray-200 space-y-2">
                        <div className="flex items-center gap-2"><span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">{q.exam}</span><span className="text-[9px] text-gray-400">{q.year}</span></div>
                        <p className="text-xs font-medium text-gray-800 leading-relaxed">{q.question}</p>
                        <div className="space-y-1">
                          {q.options.map((o:string,j:number)=>(<p key={j} className={cn("text-[11px] px-3 py-1.5 rounded-lg",show&&j===q.answer?'bg-emerald-100 text-emerald-800 font-bold':'bg-gray-50 text-gray-600')}>{String.fromCharCode(65+j)}. {o}</p>))}
                        </div>
                        <button onClick={()=>setShow(!show)} className="text-[10px] font-bold text-violet-600">{show?'Hide Answer':'Show Answer'}</button>
                      </div>
                    );
                  })}
                  {!p.pyqDone && (
                    <button onClick={()=>{setP(activeCh.id,{pyqDone:true});forceUpdate(n=>n+1);}}
                      className="w-full py-3 rounded-xl bg-amber-500 text-white text-xs font-bold flex items-center justify-center gap-2 active:scale-[0.98]">
                      <CheckCircle2 className="w-4 h-4"/> Mark PYQ Done
                    </button>
                  )}
                </>
              ) : <p className="text-xs text-gray-400 text-center py-8">No PYQ for this chapter yet. Use Practice Test instead.</p>}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Exam selection
  if(!selExam) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-4 pb-24">
        <div className="max-w-lg mx-auto space-y-5">
          <button onClick={()=>navigate(-1)} className="text-sm text-gray-500 flex items-center gap-1"><ArrowLeft className="w-4 h-4"/> Back</button>
          <div className="text-center py-6">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center text-3xl shadow-lg mb-4">🎯</div>
            <h1 className="text-2xl font-bold text-gray-900">Topic Hub</h1>
            <p className="text-sm text-gray-500 mt-1">Study + Practice + PYQ — chapter by chapter</p>
          </div>
          {Object.values(syllabusData).map(ex=>{
            const total=ex.totalChapters;
            const done=ex.subjects.reduce((s,sub)=>s+sub.chapters.filter(ch=>progress[ch.id]?.studied).length,0);
            return (
              <button key={ex.examId} onClick={()=>setSelExam(ex.examId)}
                className="w-full bg-white rounded-2xl p-5 border-2 border-gray-100 hover:border-emerald-400 hover:shadow-lg transition-all text-left flex items-center gap-4 active:scale-[0.98]">
                <span className="text-3xl">{ex.emoji}</span>
                <div className="flex-1">
                  <p className="text-base font-bold text-gray-900">{ex.examName}</p>
                  <p className="text-xs text-gray-500">{total} chapters</p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden"><div className="h-full bg-emerald-500 rounded-full" style={{width:`${total>0?(done/total)*100:0}%`}}/></div>
                    <span className="text-[10px] font-bold text-gray-400">{done}/{total}</span>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-300"/>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // Subject & chapter browser
  const filtered = exam!.subjects.map(sub=>({...sub,chapters:searchQ?sub.chapters.filter(ch=>ch.name.toLowerCase().includes(searchQ.toLowerCase())):sub.chapters})).filter(s=>s.chapters.length>0);

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-4 pb-24">
      <div className="max-w-lg mx-auto space-y-4">
        <button onClick={()=>{setSelExam(null);setOpenSub(null);setSearchQ('');}} className="text-sm text-gray-500 flex items-center gap-1"><ArrowLeft className="w-4 h-4"/> Change Exam</button>

        <div className="bg-white rounded-2xl p-4 border border-gray-200 flex items-center gap-3">
          <span className="text-2xl">{exam!.emoji}</span>
          <div className="flex-1">
            <p className="text-lg font-bold text-gray-900">{exam!.examName}</p>
            <p className="text-xs text-gray-500">Tap chapter → Study + Test + PYQ</p>
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"/>
          <input type="text" placeholder="Search chapters..." value={searchQ} onChange={e=>setSearchQ(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border-2 border-gray-200 text-sm focus:border-emerald-400 outline-none"/>
        </div>

        <div className="space-y-3">
          {filtered.map(sub=>{
            const isOpen=openSub===sub.id;
            const subDone=sub.chapters.filter(ch=>progress[ch.id]?.studied).length;
            return (
              <div key={sub.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                <button onClick={()=>setOpenSub(isOpen?null:sub.id)} className="w-full p-4 text-left flex items-center gap-3 hover:bg-gray-50">
                  <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center text-white text-lg",sub.color)}>{sub.emoji}</div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-gray-900">{sub.name}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[10px] text-gray-500">{sub.chapters.length} ch</span>
                      <span className="text-[10px] font-bold text-emerald-600">{subDone} done</span>
                    </div>
                  </div>
                  {isOpen?<ChevronUp className="w-4 h-4 text-gray-400"/>:<ChevronDown className="w-4 h-4 text-gray-400"/>}
                </button>
                {isOpen && (
                  <div className="border-t border-gray-100 px-3 pb-3 pt-2 space-y-1.5">
                    {sub.chapters.map(ch=>{
                      const pr=progress[ch.id]||{studied:false,quizBest:0,pyqDone:false};
                      const qbn=(questionBank[ch.id]||[]).length;
                      const pyqn=(chapterToPyqMap[ch.id]||[]).reduce((s,k)=>s+(pyqQuestions[k]?.length||0),0);
                      const dn=[pr.studied,pr.quizBest>0,pr.pyqDone].filter(Boolean).length;
                      return (
                        <button key={ch.id} onClick={()=>{setActiveCh({id:ch.id,name:ch.name,class:ch.class});setTab('study');}}
                          className="w-full flex items-center gap-3 px-3 py-3 rounded-xl border border-gray-200 hover:border-emerald-400 hover:bg-emerald-50/50 text-left transition-all active:scale-[0.98]">
                          <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0",
                            dn===3?'bg-emerald-500 text-white':dn>0?'bg-emerald-100 text-emerald-700':'bg-gray-100 text-gray-400')}>
                            {dn===3?'✓':`${dn}/3`}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold text-gray-800 leading-tight">{ch.name}</p>
                            <div className="flex items-center gap-2 mt-1 flex-wrap">
                              <span className="text-[9px] text-gray-400">Class {ch.class}</span>
                              {ch.priority==='high' && <span className="text-[8px] font-bold px-1.5 py-0.5 rounded bg-red-100 text-red-700">HIGH</span>}
                              {qbn>0 && <span className="text-[8px] font-bold text-violet-600">{qbn}Q</span>}
                              {pyqn>0 && <span className="text-[8px] font-bold text-amber-600">{pyqn} PYQ</span>}
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-gray-300 flex-shrink-0"/>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TopicHub;
