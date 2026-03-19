 import { useState } from 'react';
 import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
 import { Card, CardContent } from '@/components/ui/card';
 import { Badge } from '@/components/ui/badge';
 import NavigationBar from '@/components/NavigationBar';
 import Footer from '@/components/Footer';
 import { EngineeringCalculator, EngineeringResult } from '@/components/EduCutoff/EngineeringCalculator';
 import { MedicalEligibilityChecker, MedicalResult } from '@/components/EduCutoff/MedicalEligibilityChecker';
 import { CollegePredictor } from '@/components/EduCutoff/CollegePredictor';
 import { Calculator, Stethoscope, Building2, GraduationCap, MapPin, CheckCircle } from 'lucide-react';
 
 const EduCutoffPage = () => {
   const [activeTab, setActiveTab] = useState('engineering');
   const [engineeringResult, setEngineeringResult] = useState<EngineeringResult | null>(null);
   const [medicalResult, setMedicalResult] = useState<MedicalResult | null>(null);
 
   return (
     <div className="min-h-screen bg-background">
       <NavigationBar />
       
       <main className="container mx-auto px-4 py-8">
         {/* Hero Header */}
         <div className="rounded-2xl mb-8 relative overflow-hidden shadow-xl" style={{ minHeight: '260px' }}>
           {/* Background Image */}
           <img src="https://images.unsplash.com/photo-1562774053-701939374585?w=1200&h=400&fit=crop&auto=format" alt="" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
           <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/93 via-green-800/90 to-emerald-900/93" />
           
           {/* Decorative */}
           <div className="absolute top-0 right-0 w-72 h-72 bg-amber-400/10 rounded-full -translate-y-1/3 translate-x-1/3" />
           <div className="absolute bottom-0 left-0 w-48 h-48 bg-green-300/10 rounded-full translate-y-1/3 -translate-x-1/3" />
           
           <div className="relative z-10 p-6 md:p-10 flex flex-col items-center text-center">
             <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center mb-4 shadow-xl shadow-amber-500/25">
               <Calculator className="h-8 w-8 text-white" />
             </div>
             
             <h1 className="text-3xl md:text-4xl font-serif font-bold text-white mb-1">
               EduCutoff — Admission Predictor
             </h1>
             <p className="text-amber-300 text-base md:text-lg font-tamil mb-2">
               கல்வி கட்ஆஃப் — சேர்க்கை கணிப்பான்
             </p>
             <p className="text-emerald-100/80 text-sm max-w-xl mb-6">
               Calculate your Engineering Cutoff (TNEA) or check Medical College eligibility (NEET) and discover which colleges you can get admission to in Tamil Nadu
             </p>
 
             {/* Stats */}
             <div className="flex items-center gap-6 md:gap-10 mb-2">
               {[
                 { icon: GraduationCap, value: '550+', label: 'Engineering Colleges' },
                 { icon: Stethoscope, value: '50+', label: 'Medical Colleges' },
                 { icon: MapPin, value: '38', label: 'Districts' },
                 { icon: CheckCircle, value: '100%', label: 'Accurate Formula' },
               ].map((s, i) => (
                 <div key={i} className="text-center">
                   <s.icon className="h-5 w-5 mx-auto mb-1 text-amber-300" />
                   <div className="text-xl md:text-2xl font-black text-white">{s.value}</div>
                   <div className="text-[10px] text-emerald-200/70 uppercase tracking-wider">{s.label}</div>
                 </div>
               ))}
             </div>
           </div>
           
           {/* Quick info strip */}
           <div className="relative z-10 bg-white/10 backdrop-blur-sm border-t border-white/10 px-4 py-2.5 flex items-center justify-center gap-4 md:gap-8 text-xs text-emerald-100/80">
             <span className="flex items-center gap-1.5">📐 <strong className="text-white">TNEA Formula:</strong> Maths + Physics/2 + Chemistry/2</span>
             <span className="hidden md:flex items-center gap-1.5">🏥 <strong className="text-white">NEET:</strong> Score out of 720</span>
             <span className="hidden md:flex items-center gap-1.5">📊 <strong className="text-white">Data:</strong> 2024 Verified Cutoffs</span>
           </div>
         </div>
 
         {/* Main Tabs */}
         <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
           <TabsList className="grid w-full grid-cols-2 max-w-[500px] h-16 p-1.5 bg-muted/50 rounded-2xl mx-auto md:mx-0">
             <TabsTrigger value="engineering" className="text-sm md:text-base gap-2 rounded-xl data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-lg h-full font-bold">
               <Calculator className="h-5 w-5" />
               <div className="text-left">
                 <div>Engineering</div>
                 <div className="text-[10px] font-normal opacity-80">TNEA Cutoff</div>
               </div>
             </TabsTrigger>
             <TabsTrigger value="medical" className="text-sm md:text-base gap-2 rounded-xl data-[state=active]:bg-green-600 data-[state=active]:text-white data-[state=active]:shadow-lg h-full font-bold">
               <Stethoscope className="h-5 w-5" />
               <div className="text-left">
                 <div>Medical</div>
                 <div className="text-[10px] font-normal opacity-80">NEET Score</div>
               </div>
             </TabsTrigger>
           </TabsList>
 
           {/* Engineering Tab */}
           <TabsContent value="engineering" className="space-y-8">
             {/* Info Card */}
             <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200">
               <CardContent className="py-4">
                 <div className="flex flex-wrap items-center gap-4">
                   <div className="flex-1">
                     <h3 className="font-semibold text-foreground flex items-center gap-2">
                       <Calculator className="h-4 w-4 text-primary" />
                       TNEA Engineering Cutoff Calculator
                     </h3>
                     <p className="text-sm text-muted-foreground mt-1">
                       For B.E/B.Tech admission in Anna University affiliated colleges through TNEA Counseling
                     </p>
                   </div>
                   <div className="flex gap-2">
                     <Badge variant="outline">Formula: M + P/2 + C/2</Badge>
                     <Badge variant="secondary">Max: 200</Badge>
                   </div>
                 </div>
               </CardContent>
             </Card>
 
             {/* Engineering Calculator */}
             <EngineeringCalculator onResultChange={setEngineeringResult} />
 
             {/* College Predictor */}
             {engineeringResult && (
               <div className="mt-8">
                 <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                   <Building2 className="h-5 w-5 text-primary" />
                   Predicted Colleges for You
                   <span className="text-sm font-normal text-muted-foreground font-tamil ml-2">
                     உங்களுக்கான கல்லூரிகள்
                   </span>
                 </h2>
                 <CollegePredictor engineeringResult={engineeringResult} />
               </div>
             )}
           </TabsContent>
 
           {/* Medical Tab */}
           <TabsContent value="medical" className="space-y-8">
             {/* Info Card */}
             <Card className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-green-200">
               <CardContent className="py-4">
                 <div className="flex flex-wrap items-center gap-4">
                   <div className="flex-1">
                     <h3 className="font-semibold text-foreground flex items-center gap-2">
                       <Stethoscope className="h-4 w-4 text-green-600" />
                       NEET Medical Eligibility Checker
                     </h3>
                     <p className="text-sm text-muted-foreground mt-1">
                       Check your eligibility for MBBS, BDS, BAMS, BHMS and other medical courses in Tamil Nadu
                     </p>
                   </div>
                   <div className="flex gap-2">
                     <Badge variant="outline" className="border-green-300">Score out of 720</Badge>
                     <Badge variant="secondary" className="bg-green-100 text-green-700">NEET Based</Badge>
                   </div>
                 </div>
               </CardContent>
             </Card>
 
             {/* Medical Checker */}
             <MedicalEligibilityChecker onResultChange={setMedicalResult} />
           </TabsContent>
         </Tabs>
 
         {/* Important Notice */}
         <Card className="mt-8 border-yellow-200 bg-yellow-50/50 dark:bg-yellow-950/10">
           <CardContent className="py-4">
             <p className="text-sm text-yellow-800 dark:text-yellow-200">
               ⚠️ <strong>Important:</strong> This tool provides predictions based on previous year data. 
               Actual admission depends on counseling rules which may change each year. 
               Always verify from official <strong>TNEA</strong> / <strong>NEET-MCC</strong> counseling websites.
             </p>
             <p className="text-xs text-yellow-700/80 dark:text-yellow-300/80 mt-2 font-tamil">
               முக்கிய குறிப்பு: இது முந்தைய ஆண்டு தரவுகளின் அடிப்படையில் கணிப்புகளை வழங்குகிறது. 
               உண்மையான சேர்க்கை ஆலோசனை விதிகளைப் பொறுத்தது.
             </p>
           </CardContent>
         </Card>
       </main>
 
       <Footer />
     </div>
   );
 };
 
 export default EduCutoffPage;