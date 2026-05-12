import { useLanguage } from "@/hooks/useLanguage";

const newsItemsByLang: Record<string, string[]> = {
  en: [
    "🔴 TNEA 2026 Brochure LIVE — Min 45% PCM (OC) / 40% (BC/SC/ST) | Cutoff = M + P/2 + C/2 (max 200)",
    "📋 TNEA Reservation 2026 — OC 31% · BC 26.5% · BCM 3.5% · MBC&DNC 20% · SC 15% · SCA 3% · ST 1%",
    "🎓 7.5% Govt-School Quota — Full fee waiver under G.O.221/2021 (covers tuition, hostel & development)",
    "💰 TNEA Registration Fee — ₹500 (OC/BC/BCM/MBC&DNC) · ₹250 (SC/SCA/ST) — UPI/Card/Net Banking accepted",
    "♿ 5% PwD Reservation — 21 disabilities covered | CS/IT family suitable for ALL disabilities",
    "🏅 Sports Quota 500 Seats — Last 4 years (2022–26) achievements, official certificates only",
    "🪖 Ex-Servicemen Wards — 150 seats reserved | Certificate from Asst. Director of ESM Welfare Board",
    "📅 TNEA Counselling — 4 stages per round: Choice Filling (3d) → Allotment → Confirm (2d) → Report (5d)",
    "🎯 Open the TNEA 2026 Hub on VAZHIKATTI — Community lookup, PwD checker, fee calculator, flow simulator",
  ],
  ta: [
    "🔴 TNEA 2026 விவரக்குறிப்பு வெளியீடு — குறைந்தபட்சம் 45% PCM (OC) / 40% (BC/SC/ST) | கட்-ஆஃப் = M + P/2 + C/2 (அதிகபட்சம் 200)",
    "📋 TNEA இடஒதுக்கீடு 2026 — OC 31% · BC 26.5% · BCM 3.5% · MBC&DNC 20% · SC 15% · SCA 3% · ST 1%",
    "🎓 7.5% அரசுப் பள்ளி ஒதுக்கீடு — G.O.221/2021 படி முழுக் கட்டண விலக்கு (கல்வி, விடுதி, மேம்பாடு)",
    "💰 TNEA பதிவு கட்டணம் — ₹500 (OC/BC/BCM/MBC&DNC) · ₹250 (SC/SCA/ST) — UPI/அட்டை/நெட் பேங்கிங்",
    "♿ 5% PwD இடஒதுக்கீடு — 21 வகை குறைபாடுகள் | CS/IT கிளைகள் அனைத்து குறைபாடுகளுக்கும் ஏற்றது",
    "🏅 விளையாட்டு ஒதுக்கீடு 500 இடங்கள் — கடந்த 4 ஆண்டு சாதனைகள் (2022–26), அதிகாரப்பூர்வ சான்றிதழ்கள் மட்டுமே",
    "🪖 முன்னாள் இராணுவத்தினர் வாரிசுகள் — 150 இடங்கள் ஒதுக்கப்பட்டுள்ளன",
    "📅 TNEA ஆலோசனை — ஒரு சுற்றுக்கு 4 நிலைகள்: தேர்வு (3 நாள்) → ஒதுக்கீடு → உறுதி (2 நாள்) → சேர்க்கை (5 நாள்)",
    "🎯 வழிகாட்டியில் TNEA 2026 ஹப் — சமூகம் தேடல், PwD சரிபார்ப்பு, கட்டணம், ஓட்ட சிமுலேட்டர்",
  ],
  hi: [
    "🔴 TNEA 2026 ब्रोशर जारी — न्यूनतम 45% PCM (OC) / 40% (BC/SC/ST) | कटऑफ = M + P/2 + C/2 (अधिकतम 200)",
    "📋 TNEA आरक्षण 2026 — OC 31% · BC 26.5% · BCM 3.5% · MBC&DNC 20% · SC 15% · SCA 3% · ST 1%",
    "🎓 7.5% सरकारी स्कूल कोटा — G.O.221/2021 के तहत पूर्ण फीस माफी",
    "💰 TNEA पंजीकरण शुल्क — ₹500 (OC/BC/BCM/MBC&DNC) · ₹250 (SC/SCA/ST)",
    "♿ 5% PwD आरक्षण — 21 दिव्यांगता श्रेणियाँ | CS/IT सभी के लिए उपयुक्त",
    "🏅 खेल कोटा 500 सीटें — पिछले 4 साल की उपलब्धियाँ (2022–26)",
    "📅 TNEA काउंसलिंग — हर राउंड में 4 चरण: चॉइस → आवंटन → पुष्टि → रिपोर्टिंग",
    "🆕 VAZHIKATTI पर TNEA 2026 हब अब उपलब्ध!",
  ],
  te: [
    "🔴 TNEA 2026 బ్రోషర్ విడుదల — కనీసం 45% PCM (OC) / 40% (BC/SC/ST) | కటాఫ్ = M + P/2 + C/2",
    "📋 TNEA రిజర్వేషన్ 2026 — OC 31% · BC 26.5% · BCM 3.5% · MBC&DNC 20% · SC 15% · SCA 3% · ST 1%",
    "🎓 7.5% ప్రభుత్వ పాఠశాల కోటా — G.O.221/2021 ప్రకారం పూర్తి ఫీజు మినహాయింపు",
    "💰 TNEA రిజిస్ట్రేషన్ ఫీజు — ₹500 (OC/BC/BCM/MBC&DNC) · ₹250 (SC/SCA/ST)",
    "♿ 5% PwD రిజర్వేషన్ — 21 వైకల్య రకాలు",
    "🏅 క్రీడల కోటా 500 సీట్లు — గత 4 సంవత్సరాల విజయాలు (2022–26)",
    "📅 TNEA కౌన్సెలింగ్ — రౌండ్‌కి 4 దశలు",
    "🆕 VAZHIKATTI పై TNEA 2026 హబ్!",
  ],
  kn: [
    "🔴 TNEA 2026 ಬ್ರೋಷರ್ ಬಿಡುಗಡೆ — ಕನಿಷ್ಠ 45% PCM (OC) / 40% (BC/SC/ST) | ಕಟ್‌ಆಫ್ = M + P/2 + C/2",
    "📋 TNEA ಮೀಸಲಾತಿ 2026 — OC 31% · BC 26.5% · BCM 3.5% · MBC&DNC 20% · SC 15% · SCA 3% · ST 1%",
    "🎓 7.5% ಸರ್ಕಾರಿ ಶಾಲಾ ಕೋಟಾ — G.O.221/2021 ಪ್ರಕಾರ ಸಂಪೂರ್ಣ ಶುಲ್ಕ ವಿನಾಯಿತಿ",
    "💰 TNEA ನೋಂದಣಿ ಶುಲ್ಕ — ₹500 (OC/BC/BCM/MBC&DNC) · ₹250 (SC/SCA/ST)",
    "♿ 5% PwD ಮೀಸಲಾತಿ — 21 ಅಂಗವೈಕಲ್ಯ ವಿಧಗಳು",
    "🏅 ಕ್ರೀಡಾ ಕೋಟಾ 500 ಸೀಟುಗಳು — ಕಳೆದ 4 ವರ್ಷಗಳ ಸಾಧನೆಗಳು (2022–26)",
    "📅 TNEA ಕೌನ್ಸೆಲಿಂಗ್ — ಸುತ್ತಿಗೆ 4 ಹಂತಗಳು",
    "🆕 VAZHIKATTI ನಲ್ಲಿ TNEA 2026 ಹಬ್!",
  ],
  ml: [
    "🔴 TNEA 2026 ബ്രോഷർ പ്രസിദ്ധീകരിച്ചു — കുറഞ്ഞത് 45% PCM (OC) / 40% (BC/SC/ST) | കട്ട്ഓഫ് = M + P/2 + C/2",
    "📋 TNEA സംവരണം 2026 — OC 31% · BC 26.5% · BCM 3.5% · MBC&DNC 20% · SC 15% · SCA 3% · ST 1%",
    "🎓 7.5% സർക്കാർ സ്കൂൾ ക്വാട്ട — G.O.221/2021 പ്രകാരം പൂർണ്ണ ഫീസ് ഇളവ്",
    "💰 TNEA രജിസ്ട്രേഷൻ ഫീസ് — ₹500 (OC/BC/BCM/MBC&DNC) · ₹250 (SC/SCA/ST)",
    "♿ 5% PwD സംവരണം — 21 വൈകല്യ വിഭാഗങ്ങൾ",
    "🏅 സ്പോർട്സ് ക്വാട്ട 500 സീറ്റുകൾ — കഴിഞ്ഞ 4 വർഷങ്ങളിലെ നേട്ടങ്ങൾ (2022–26)",
    "📅 TNEA കൗൺസിലിംഗ് — റൗണ്ടിന് 4 ഘട്ടങ്ങൾ",
    "🆕 VAZHIKATTI-ൽ TNEA 2026 ഹബ്!",
  ],
  bn: [
    "🔴 TNEA 2026 ব্রোশিওর প্রকাশিত — ন্যূনতম 45% PCM (OC) / 40% (BC/SC/ST) | কাটঅফ = M + P/2 + C/2",
    "📋 TNEA সংরক্ষণ 2026 — OC 31% · BC 26.5% · BCM 3.5% · MBC&DNC 20% · SC 15% · SCA 3% · ST 1%",
    "🎓 7.5% সরকারি স্কুল কোটা — G.O.221/2021 অনুসারে সম্পূর্ণ ফি মকুব",
    "💰 TNEA নিবন্ধন ফি — ₹500 (OC/BC/BCM/MBC&DNC) · ₹250 (SC/SCA/ST)",
    "♿ 5% PwD সংরক্ষণ — 21টি প্রতিবন্ধী বিভাগ",
    "🏅 ক্রীড়া কোটা 500 আসন — গত 4 বছরের অর্জন (2022–26)",
    "📅 TNEA কাউন্সেলিং — প্রতি রাউন্ডে 4টি ধাপ",
    "🆕 VAZHIKATTI-তে TNEA 2026 হাব!",
  ],
};

const badgeLabel: Record<string, string> = {
  en: "Latest:",
  ta: "சமீபத்தியது:",
  hi: "नवीनतम:",
  te: "తాజా:",
  kn: "ಇತ್ತೀಚಿನ:",
  ml: "ഏറ്റവും പുതിയത്:",
  bn: "সর্বশেষ:",
  mr: "नवीनतम:",
  gu: "તાજેતરનું:",
  pa: "ਨਵੀਨਤਮ:",
};

const NewsTicker = () => {
  const { language } = useLanguage();
  const items = newsItemsByLang[language] || newsItemsByLang['en'];
  const badge = badgeLabel[language] || badgeLabel['en'];

  return (
    <div className="bg-gradient-to-r from-emerald-700 via-emerald-600 to-emerald-700 text-white py-2.5 overflow-hidden shadow-sm">
      <div className="flex items-center">
        <span className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-4 py-1 text-sm font-bold flex-shrink-0 ml-4 mr-4 rounded shadow-md">
          {badge}
        </span>
        <div className="overflow-hidden flex-1">
          <div className="animate-ticker flex whitespace-nowrap">
            {[...items, ...items].map((news, index) => (
              <span key={index} className="mx-8 text-sm font-medium tracking-wide">
                {news}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsTicker;
