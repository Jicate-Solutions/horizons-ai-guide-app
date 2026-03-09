import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronDown, BookOpen, Target, Clock, Brain, 
  Lightbulb, CheckCircle2, AlertTriangle, Trophy,
  Shield, Train, FileText, Landmark, MapPin, Building2
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/hooks/useLanguage';

interface CategoryTips {
  category: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  tips: {
    title: string;
    titleTamil: string;
    description: string;
    descriptionTamil: string;
    icon: React.ElementType;
  }[];
  subjects: string[];
  subjectsTamil: string[];
  importantBooks: string[];
  importantBooksTamil: string[];
  timeRecommendation: string;
  timeRecommendationTamil: string;
}

const preparationTips: CategoryTips[] = [
  {
    category: 'defence',
    icon: Shield,
    color: 'from-red-500 to-rose-600',
    bgColor: 'bg-red-50',
    tips: [
      {
        title: 'Physical Fitness is Key',
        titleTamil: 'உடல் தகுதி முக்கியம்',
        description: 'Start running 5km daily, practice push-ups, sit-ups, and chin-ups. Physical test is eliminatory!',
        descriptionTamil: 'தினமும் 5 கி.மீ ஓடுங்கள், புஷ்-அப்ஸ், சிட்-அப்ஸ் பயிற்சி செய்யுங்கள். உடல் தகுதி தேர்வு முக்கியமானது!',
        icon: Target,
      },
      {
        title: 'Focus on Current Affairs',
        titleTamil: 'நடப்பு நிகழ்வுகளில் கவனம்',
        description: 'Read newspapers daily. Defence exams heavily test current affairs and general knowledge.',
        descriptionTamil: 'தினமும் செய்தித்தாள் படியுங்கள். பாதுகாப்புத் தேர்வுகளில் நடப்பு நிகழ்வுகள் முக்கியம்.',
        icon: BookOpen,
      },
      {
        title: 'SSB Interview Preparation',
        titleTamil: 'SSB நேர்காணல் தயாரிப்பு',
        description: 'Develop OLQ (Officer Like Qualities). Practice group discussions and personal interviews.',
        descriptionTamil: 'OLQ (அதிகாரி போன்ற குணங்கள்) வளர்க்கவும். குழு விவாதம் மற்றும் நேர்காணல் பயிற்சி செய்யவும்.',
        icon: Brain,
      },
    ],
    subjects: ['Mathematics', 'English', 'General Knowledge', 'Science', 'Reasoning'],
    subjectsTamil: ['கணிதம்', 'ஆங்கிலம்', 'பொது அறிவு', 'அறிவியல்', 'தர்க்கம்'],
    importantBooks: ['Arihant NDA Guide', 'Pathfinder CDS', 'RS Aggarwal Maths'],
    importantBooksTamil: ['அரிஹந்த் NDA வழிகாட்டி', 'பாத்ஃபைண்டர் CDS', 'RS அகர்வால் கணிதம்'],
    timeRecommendation: '6-8 months of dedicated preparation',
    timeRecommendationTamil: '6-8 மாதங்கள் அர்ப்பணிப்புடன் தயாரிப்பு',
  },
  {
    category: 'railway',
    icon: Train,
    color: 'from-blue-500 to-indigo-600',
    bgColor: 'bg-blue-50',
    tips: [
      {
        title: 'Master Mathematics',
        titleTamil: 'கணிதத்தில் தேர்ச்சி',
        description: 'Railway exams have 25-30 marks from Maths. Practice percentage, ratio, time-speed-distance daily.',
        descriptionTamil: 'ரயில்வே தேர்வில் கணிதத்தில் 25-30 மதிப்பெண்கள். சதவீதம், விகிதம், நேரம்-வேகம்-தூரம் தினமும் பயிற்சி செய்யுங்கள்.',
        icon: Target,
      },
      {
        title: 'Speed is Essential',
        titleTamil: 'வேகம் அவசியம்',
        description: 'Practice with timer. RRB exams have negative marking - accuracy with speed wins!',
        descriptionTamil: 'நேர கணக்கீட்டுடன் பயிற்சி செய்யுங்கள். RRB தேர்வுகளில் எதிர்மறை மதிப்பெண் உள்ளது!',
        icon: Clock,
      },
      {
        title: 'General Science Focus',
        titleTamil: 'பொது அறிவியல் கவனம்',
        description: 'NCERT Science books are sufficient. Focus on Physics and Chemistry from 10th standard.',
        descriptionTamil: 'NCERT அறிவியல் புத்தகங்கள் போதுமானது. 10ஆம் வகுப்பு இயற்பியல், வேதியியல் கவனியுங்கள்.',
        icon: Lightbulb,
      },
    ],
    subjects: ['Mathematics', 'General Intelligence', 'General Science', 'General Awareness'],
    subjectsTamil: ['கணிதம்', 'பொது புத்திசாலித்தனம்', 'பொது அறிவியல்', 'பொது விழிப்புணர்வு'],
    importantBooks: ['RRB NTPC by Kiran', 'Lucent GK', 'NCERT Science 9-10'],
    importantBooksTamil: ['RRB NTPC கிரண்', 'லூசென்ட் GK', 'NCERT அறிவியல் 9-10'],
    timeRecommendation: '4-6 months of focused study',
    timeRecommendationTamil: '4-6 மாதங்கள் கவனமான படிப்பு',
  },
  {
    category: 'ssc',
    icon: FileText,
    color: 'from-purple-500 to-violet-600',
    bgColor: 'bg-purple-50',
    tips: [
      {
        title: 'English is Game Changer',
        titleTamil: 'ஆங்கிலம் முக்கியம்',
        description: 'SSC CHSL has 200 marks from English in Tier-2. Master grammar, vocabulary, and comprehension.',
        descriptionTamil: 'SSC CHSL Tier-2 இல் ஆங்கிலத்திற்கு 200 மதிப்பெண்கள். இலக்கணம், சொற்களஞ்சியம் தேர்ச்சி பெறுங்கள்.',
        icon: BookOpen,
      },
      {
        title: 'Reasoning Shortcuts',
        titleTamil: 'தர்க்க குறுக்குவழிகள்',
        description: 'Learn shortcuts for coding-decoding, series, analogies. These are easy scoring areas.',
        descriptionTamil: 'கோடிங்-டிகோடிங், தொடர், ஒப்புமைகளுக்கு குறுக்குவழிகள் கற்றுக்கொள்ளுங்கள்.',
        icon: Brain,
      },
      {
        title: 'Typing Speed for CHSL',
        titleTamil: 'CHSL க்கு டைப்பிங் வேகம்',
        description: 'Start typing practice now! CHSL requires 35 WPM in English. Practice daily for 1 hour.',
        descriptionTamil: 'இப்போதே டைப்பிங் பயிற்சி தொடங்குங்கள்! CHSL க்கு ஆங்கிலத்தில் 35 WPM தேவை.',
        icon: Target,
      },
    ],
    subjects: ['English Language', 'General Intelligence', 'Quantitative Aptitude', 'General Awareness'],
    subjectsTamil: ['ஆங்கில மொழி', 'பொது புத்திசாலித்தனம்', 'எண்ணியல் திறன்', 'பொது விழிப்புணர்வு'],
    importantBooks: ['Kiran SSC CHSL', 'Neetu Singh English', 'Rakesh Yadav Maths'],
    importantBooksTamil: ['கிரண் SSC CHSL', 'நீது சிங் ஆங்கிலம்', 'ரமேஷ் யாதவ் கணிதம்'],
    timeRecommendation: '5-6 months with mock tests',
    timeRecommendationTamil: '5-6 மாதங்கள் மாதிரி தேர்வுகளுடன்',
  },
  {
    category: 'central',
    icon: Landmark,
    color: 'from-green-500 to-emerald-600',
    bgColor: 'bg-green-50',
    tips: [
      {
        title: 'Quantitative Aptitude Focus',
        titleTamil: 'எண்ணியல் திறன் கவனம்',
        description: 'Banking exams are Quant heavy. Master DI, Number Series, Simplification for quick solving.',
        descriptionTamil: 'வங்கித் தேர்வுகளில் எண்ணியல் முக்கியம். DI, எண் தொடர், எளிமைப்படுத்துதல் கற்றுக்கொள்ளுங்கள்.',
        icon: Target,
      },
      {
        title: 'Banking Awareness',
        titleTamil: 'வங்கி விழிப்புணர்வு',
        description: 'Learn RBI policies, banking terms, financial news. This is unique to banking exams.',
        descriptionTamil: 'RBI கொள்கைகள், வங்கி சொற்கள், நிதி செய்திகள் கற்றுக்கொள்ளுங்கள்.',
        icon: Lightbulb,
      },
      {
        title: 'Computer Awareness',
        titleTamil: 'கணினி விழிப்புணர்வு',
        description: 'Basic computer knowledge, MS Office, shortcuts are frequently asked. Easy marks!',
        descriptionTamil: 'அடிப்படை கணினி அறிவு, MS Office, குறுக்குவழிகள் அடிக்கடி கேட்கப்படும்.',
        icon: Brain,
      },
    ],
    subjects: ['Quantitative Aptitude', 'Reasoning', 'English', 'General Awareness', 'Computer'],
    subjectsTamil: ['எண்ணியல் திறன்', 'தர்க்கம்', 'ஆங்கிலம்', 'பொது விழிப்புணர்வு', 'கணினி'],
    importantBooks: ['RS Aggarwal Quant', 'Arun Sharma Reasoning', 'SP Bakshi English'],
    importantBooksTamil: ['RS அகர்வால் எண்ணியல்', 'அருண் சர்மா தர்க்கம்', 'SP பக்ஷி ஆங்கிலம்'],
    timeRecommendation: '4-5 months with daily practice',
    timeRecommendationTamil: '4-5 மாதங்கள் தினசரி பயிற்சியுடன்',
  },
  {
    category: 'state',
    icon: MapPin,
    color: 'from-orange-500 to-amber-600',
    bgColor: 'bg-orange-50',
    tips: [
      {
        title: 'Tamil Nadu GK is Must',
        titleTamil: 'தமிழ்நாடு பொது அறிவு அவசியம்',
        description: 'TNPSC focuses heavily on TN history, geography, culture. Study Samacheer Kalvi Social Science.',
        descriptionTamil: 'TNPSC தமிழ்நாடு வரலாறு, புவியியல், கலாச்சாரத்தில் கவனம். சமச்சீர் சமூக அறிவியல் படியுங்கள்.',
        icon: BookOpen,
      },
      {
        title: 'Aptitude & Reasoning',
        titleTamil: 'திறன் & தர்க்கம்',
        description: 'Group 4 has dedicated aptitude section. Practice mental ability and quantitative aptitude.',
        descriptionTamil: 'குரூப் 4 இல் திறன் பிரிவு உண்டு. மன திறன் மற்றும் எண்ணியல் திறன் பயிற்சி செய்யுங்கள்.',
        icon: Brain,
      },
      {
        title: 'Current Affairs Tamil Nadu',
        titleTamil: 'தமிழ்நாடு நடப்பு நிகழ்வுகள்',
        description: 'Follow Tamil Nadu government schemes, policies, and recent developments closely.',
        descriptionTamil: 'தமிழ்நாடு அரசு திட்டங்கள், கொள்கைகள், சமீபத்திய முன்னேற்றங்களை கவனியுங்கள்.',
        icon: Lightbulb,
      },
    ],
    subjects: ['Tamil', 'English', 'General Studies', 'Aptitude', 'TN History & Culture'],
    subjectsTamil: ['தமிழ்', 'ஆங்கிலம்', 'பொது படிப்பு', 'திறன்', 'தமிழ்நாடு வரலாறு & கலாச்சாரம்'],
    importantBooks: ['Samacheer Kalvi 6-12', 'TNPSC Group 4 Guide', 'Tamil Nadu Yearbook'],
    importantBooksTamil: ['சமச்சீர் கல்வி 6-12', 'TNPSC குரூப் 4 வழிகாட்டி', 'தமிழ்நாடு ஆண்டு புத்தகம்'],
    timeRecommendation: '6-8 months comprehensive preparation',
    timeRecommendationTamil: '6-8 மாதங்கள் விரிவான தயாரிப்பு',
  },
  {
    category: 'central',
    icon: Building2,
    color: 'from-indigo-500 to-blue-600',
    bgColor: 'bg-indigo-50',
    tips: [
      {
        title: 'NCERT is Foundation',
        titleTamil: 'NCERT அடித்தளம்',
        description: 'All central govt exams are based on NCERT 6-12. Complete NCERT first before any guide.',
        descriptionTamil: 'எல்லா மத்திய அரசு தேர்வுகளும் NCERT 6-12 அடிப்படையிலானவை. முதலில் NCERT முடிக்கவும்.',
        icon: BookOpen,
      },
      {
        title: 'Practice Previous Papers',
        titleTamil: 'முந்தைய வினாத்தாள் பயிற்சி',
        description: 'Solve last 5 years papers. Question patterns repeat! This is the best strategy.',
        descriptionTamil: 'கடந்த 5 ஆண்டு வினாத்தாள்களை தீர்க்கவும். கேள்வி வடிவங்கள் மீண்டும் வரும்!',
        icon: Target,
      },
      {
        title: 'Mock Tests Weekly',
        titleTamil: 'வாராந்திர மாதிரி தேர்வு',
        description: 'Take full-length mock tests every week. Analyze mistakes and improve weak areas.',
        descriptionTamil: 'ஒவ்வொரு வாரமும் முழு மாதிரி தேர்வு எழுதுங்கள். தவறுகளை பகுப்பாய்வு செய்யுங்கள்.',
        icon: CheckCircle2,
      },
    ],
    subjects: ['General Knowledge', 'Reasoning', 'Mathematics', 'English', 'General Science'],
    subjectsTamil: ['பொது அறிவு', 'தர்க்கம்', 'கணிதம்', 'ஆங்கிலம்', 'பொது அறிவியல்'],
    importantBooks: ['NCERT 6-12', 'Lucent GK', 'Kiran Previous Papers'],
    importantBooksTamil: ['NCERT 6-12', 'லூசென்ட் GK', 'கிரண் முந்தைய வினாத்தாள்கள்'],
    timeRecommendation: '4-6 months with mock tests',
    timeRecommendationTamil: '4-6 மாதங்கள் மாதிரி தேர்வுகளுடன்',
  },
];

export const PreparationTipsSection = () => {
  const { language, t } = useLanguage();
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const categoryLabels: Record<string, { en: string; ta: string }> = {
    defence: { en: 'Defence & Paramilitary', ta: 'பாதுகாப்பு & துணை ராணுவம்' },
    railway: { en: 'Railway Jobs', ta: 'ரயில்வே வேலைகள்' },
    ssc: { en: 'SSC Exams', ta: 'SSC தேர்வுகள்' },
    banking: { en: 'Banking & Insurance', ta: 'வங்கி & காப்பீடு' },
    state: { en: 'Tamil Nadu State', ta: 'தமிழ்நாடு மாநிலம்' },
    central: { en: 'Central Government', ta: 'மத்திய அரசு' },
  };

  return (
    <div className="mb-8">
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-full mb-3">
          <span className="text-xl">📚</span>
          <span className="font-semibold text-purple-800">
            {language === 'ta' ? 'தேர்வு தயாரிப்பு குறிப்புகள்' : 'Exam Preparation Tips'}
          </span>
        </div>
        <h3 className="text-xl font-bold text-gray-800">
          {language === 'ta' 
            ? 'ஒவ்வொரு தேர்வு வகைக்கும் நிபுணர் உத்திகள்'
            : 'Expert Strategies for Each Exam Category'}
        </h3>
      </div>

      <div className="grid gap-4">
        {preparationTips.map((categoryTip) => {
          const CategoryIcon = categoryTip.icon;
          const isExpanded = expandedCategory === categoryTip.category;
          const label = categoryLabels[categoryTip.category];

          return (
            <Card 
              key={categoryTip.category} 
              className={`${categoryTip.bgColor} border-2 transition-all duration-300 cursor-pointer`}
              onClick={() => setExpandedCategory(isExpanded ? null : categoryTip.category)}
            >
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-xl bg-gradient-to-br ${categoryTip.color} text-white`}>
                      <CategoryIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-lg font-bold">
                        {language === 'ta' ? label.ta : label.en}
                      </div>
                      <div className="text-sm text-gray-600">
                        {language === 'ta' ? categoryTip.timeRecommendationTamil : categoryTip.timeRecommendation}
                      </div>
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  </motion.div>
                </CardTitle>
              </CardHeader>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <CardContent className="pt-4 space-y-6">
                      {/* Tips */}
                      <div className="grid gap-3">
                        {categoryTip.tips.map((tip, idx) => {
                          const TipIcon = tip.icon;
                          return (
                            <div 
                              key={idx}
                              className="bg-white/80 rounded-xl p-4 border border-gray-100"
                            >
                              <div className="flex items-start gap-3">
                                <div className={`p-2 rounded-lg bg-gradient-to-br ${categoryTip.color} text-white flex-shrink-0`}>
                                  <TipIcon className="h-4 w-4" />
                                </div>
                                <div>
                                  <h4 className="font-semibold text-gray-800">
                                    {language === 'ta' ? tip.titleTamil : tip.title}
                                  </h4>
                                  <p className="text-sm text-gray-600 mt-1">
                                    {language === 'ta' ? tip.descriptionTamil : tip.description}
                                  </p>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Subjects */}
                      <div>
                        <h4 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                          <BookOpen className="h-4 w-4" />
                          {language === 'ta' ? 'முக்கிய பாடங்கள்' : 'Important Subjects'}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {(language === 'ta' ? categoryTip.subjectsTamil : categoryTip.subjects).map((subject, idx) => (
                            <Badge key={idx} variant="secondary" className="bg-white">
                              {subject}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Books */}
                      <div>
                        <h4 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                          <Trophy className="h-4 w-4" />
                          {language === 'ta' ? 'பரிந்துரைக்கப்பட்ட புத்தகங்கள்' : 'Recommended Books'}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {(language === 'ta' ? categoryTip.importantBooksTamil : categoryTip.importantBooks).map((book, idx) => (
                            <Badge key={idx} className={`bg-gradient-to-r ${categoryTip.color} text-white`}>
                              📖 {book}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Time Recommendation */}
                      <div className="bg-white/80 rounded-xl p-4 border-2 border-dashed border-gray-300">
                        <div className="flex items-center gap-2 text-gray-700">
                          <Clock className="h-5 w-5" />
                          <span className="font-semibold">
                            {language === 'ta' ? 'தயாரிப்பு நேரம்:' : 'Preparation Time:'}
                          </span>
                          <span className="text-gray-600">
                            {language === 'ta' ? categoryTip.timeRecommendationTamil : categoryTip.timeRecommendation}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
