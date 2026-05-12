/**
 * SHAREABLE RESULT CARD
 *
 * A premium-looking summary card that the student sees on their results page.
 * - Beautiful gradient design with VAZHIKATTI branding
 * - Shows their sport, level, TNEA score, top qualifying colleges, key deadlines
 * - "Download as image" → uses html-to-image to capture the rendered card
 * - "Share on WhatsApp" → opens WhatsApp with a pre-filled message
 *
 * Goal: make this card so good that a student WANTS to share it with parents
 * and friends. Every share = a new user discovers VAZHIKATTI.
 */

import { useRef, useState } from 'react';
import { toPng } from 'html-to-image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Download, Share2, Trophy, Calendar, Phone, MapPin,
  Award, CheckCircle2, Sparkles, Loader2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  TNEA_RULES, getSportLabel, getLevelLabel,
  Sport, SportLevel, EligibilityResult,
} from '@/data/sportsQuotaData';
import type { CollegeMatch } from '@/data/sportsQuotaHelpers';

interface ShareableResultCardProps {
  lang: 'en' | 'ta';
  sport: Sport;
  level: SportLevel;
  marks12th: number;
  district?: string;
  eligibility: EligibilityResult;
  tneaScore: number;
  qualifiedColleges: CollegeMatch[];
}

export function ShareableResultCard({
  lang, sport, level, marks12th, district,
  eligibility, tneaScore, qualifiedColleges,
}: ShareableResultCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    if (!cardRef.current) return;
    setDownloading(true);
    try {
      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        pixelRatio: 2, // crisp on retina screens
        backgroundColor: '#ffffff',
      });
      const link = document.createElement('a');
      link.download = `vazhikatti-sports-quota-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Download failed:', err);
      alert(lang === 'ta'
        ? 'பதிவிறக்கம் தோல்வியடைந்தது. மீண்டும் முயற்சிக்கவும்.'
        : 'Download failed. Please try again.');
    } finally {
      setDownloading(false);
    }
  };

  const verdictMeta = {
    qualified: {
      en: 'YOU QUALIFY',
      ta: 'நீங்கள் தகுதியானவர்',
      bg: 'from-emerald-500 to-green-600',
      icon: <CheckCircle2 className="w-6 h-6" />,
    },
    borderline: {
      en: 'BORDERLINE',
      ta: 'எல்லைக்கோடு',
      bg: 'from-amber-500 to-orange-500',
      icon: <Award className="w-6 h-6" />,
    },
    'aim-higher': {
      en: 'AIM HIGHER',
      ta: 'மேலும் முயற்சி',
      bg: 'from-rose-500 to-pink-600',
      icon: <Sparkles className="w-6 h-6" />,
    },
  }[eligibility.verdict];

  // Pre-filled WhatsApp share text
  const shareUrl = 'https://horizons-ai-guide-app.vercel.app/sports-quota-check';
  const shareText = encodeURIComponent(
    lang === 'ta'
      ? `🏆 எனது விளையாட்டு கோட்டா முடிவு (VAZHIKATTI)\n\n` +
        `விளையாட்டு: ${getSportLabel(sport, 'ta')}\n` +
        `அளவு: ${getLevelLabel(level, 'ta')}\n` +
        `TNEA விளையாட்டு மதிப்பெண்: ${tneaScore}\n` +
        `தகுதியான கல்லூரிகள்: ${qualifiedColleges.length}\n\n` +
        `நீங்களும் இலவசமாக சரிபார்க்கலாம் 👇\n${shareUrl}`
      : `🏆 My Sports Quota result (VAZHIKATTI)\n\n` +
        `Sport: ${getSportLabel(sport, 'en')}\n` +
        `Level: ${getLevelLabel(level, 'en')}\n` +
        `TNEA Sports Score: ${tneaScore}\n` +
        `Qualifying colleges: ${qualifiedColleges.length}\n\n` +
        `You can check yours too (free):\n${shareUrl}`
  );

  // Top 5 qualifying colleges
  const top5 = qualifiedColleges.slice(0, 5);

  return (
    <Card className="border-emerald-200 overflow-hidden">
      <CardContent className="p-0">
        {/* The card the student sees & captures */}
        <div
          ref={cardRef}
          className="bg-white relative"
          style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
        >
          {/* Header with brand */}
          <div className="bg-gradient-to-br from-emerald-700 via-emerald-600 to-amber-600 px-6 py-5 text-white">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[11px] font-medium opacity-90 tracking-wider">
                  VAZHIKATTI · JKKN
                </div>
                <div className="text-lg font-bold leading-tight mt-0.5">
                  {lang === 'ta' ? 'விளையாட்டு கோட்டா முடிவு' : 'Sports Quota Result'}
                </div>
                <div className="text-[10px] opacity-80 mt-0.5">
                  TNEA 2026 · {new Date().toLocaleDateString(lang === 'ta' ? 'ta-IN' : 'en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                </div>
              </div>
              <Trophy className="w-12 h-12 opacity-90" />
            </div>
          </div>

          {/* Verdict band */}
          <div className={cn('bg-gradient-to-r text-white px-6 py-3 flex items-center gap-3', verdictMeta.bg)}>
            {verdictMeta.icon}
            <div className="text-lg font-black tracking-wide">
              {lang === 'ta' ? verdictMeta.ta : verdictMeta.en}
            </div>
          </div>

          {/* Body */}
          <div className="p-6 space-y-5">
            {/* Profile summary */}
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <div className="text-[10px] uppercase tracking-wide text-gray-500">
                  {lang === 'ta' ? 'விளையாட்டு' : 'Sport'}
                </div>
                <div className="font-bold text-emerald-900 text-base">
                  {getSportLabel(sport, lang)}
                </div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wide text-gray-500">
                  {lang === 'ta' ? 'அளவு' : 'Level'}
                </div>
                <div className="font-bold text-emerald-900 text-base">
                  {getLevelLabel(level, lang)}
                </div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wide text-gray-500">
                  {lang === 'ta' ? '12-ஆம் வகுப்பு' : '12th marks'}
                </div>
                <div className="font-bold text-emerald-900 text-base">
                  {marks12th}%
                </div>
              </div>
              {district && (
                <div>
                  <div className="text-[10px] uppercase tracking-wide text-gray-500 flex items-center gap-0.5">
                    <MapPin className="w-2.5 h-2.5" />
                    {lang === 'ta' ? 'மாவட்டம்' : 'District'}
                  </div>
                  <div className="font-bold text-emerald-900 text-base">
                    {district}
                  </div>
                </div>
              )}
            </div>

            {/* TNEA Score — the showpiece */}
            {tneaScore > 0 && (
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl p-4 text-center">
                <div className="text-[10px] uppercase tracking-wider text-purple-700 font-semibold">
                  {lang === 'ta' ? 'உங்கள் TNEA விளையாட்டு மதிப்பெண்' : 'Your TNEA Sports Score'}
                </div>
                <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-purple-600 to-pink-600 mt-1">
                  {tneaScore}
                </div>
                <div className="text-[10px] text-purple-700 mt-1 italic">
                  {lang === 'ta'
                    ? '* அதிகாரப்பூர்வ DoTE மதிப்பெண் முறை அடிப்படையில் மதிப்பீடு'
                    : '* Estimated using official DoTE marks system'}
                </div>
              </div>
            )}

            {/* Top colleges */}
            {top5.length > 0 && (
              <div>
                <div className="text-[10px] uppercase tracking-wide text-gray-500 font-semibold mb-2">
                  {lang === 'ta'
                    ? `சிறந்த ${top5.length} தகுதியான கல்லூரிகள்`
                    : `Top ${top5.length} qualifying colleges`}
                </div>
                <div className="space-y-1.5">
                  {top5.map((m, i) => (
                    <div key={m.college.id} className="flex items-start gap-2 text-xs">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-[10px]">
                        {i + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-emerald-900 leading-tight">
                          {m.college.collegeName}
                        </div>
                        <div className="text-[10px] text-gray-500">
                          {m.college.district} · {m.college.type}
                          {m.college.verification === 'verified' && ' · ✓ Verified'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {qualifiedColleges.length > 5 && (
                  <div className="text-[10px] text-gray-500 mt-2 italic">
                    + {qualifiedColleges.length - 5} {lang === 'ta' ? 'மேலும் கல்லூரிகள்' : 'more colleges in the app'}
                  </div>
                )}
              </div>
            )}

            {/* Deadline */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-2">
              <Calendar className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
              <div className="text-xs">
                <div className="font-bold text-red-900">
                  {lang === 'ta' ? 'TNEA விண்ணப்ப கடைசி நாள்' : 'TNEA application deadline'}: {TNEA_RULES.dates.registrationDeadline}
                </div>
                <div className="text-red-700 mt-0.5">
                  tneaonline.org
                </div>
              </div>
            </div>

            {/* Helpline */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex items-start gap-2">
              <Phone className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
              <div className="text-xs">
                <div className="font-bold text-amber-900">
                  {lang === 'ta' ? 'TNEA உதவி எண்' : 'TNEA helpline'}: {TNEA_RULES.helpline.phone}
                </div>
                <div className="text-amber-700 mt-0.5">
                  {TNEA_RULES.helpline.timing}
                </div>
              </div>
            </div>
          </div>

          {/* Footer with URL */}
          <div className="bg-gray-50 border-t border-gray-200 px-6 py-3 text-center">
            <div className="text-[10px] text-gray-500">
              {lang === 'ta' ? 'சரிபார்க்கப்பட்ட தரவு · இலவசம் · உள்நுழைவு தேவையில்லை' : 'Verified data · Free · No login required'}
            </div>
            <div className="text-xs font-semibold text-emerald-700 mt-0.5">
              horizons-ai-guide-app.vercel.app/sports-quota-check
            </div>
          </div>
        </div>

        {/* Action buttons — outside the captured area */}
        <div className="bg-white border-t border-gray-200 p-3 grid grid-cols-2 gap-2">
          <Button
            onClick={handleDownload}
            disabled={downloading}
            className="bg-emerald-600 hover:bg-emerald-700 text-white h-11"
          >
            {downloading ? (
              <Loader2 className="w-4 h-4 mr-1.5 animate-spin" />
            ) : (
              <Download className="w-4 h-4 mr-1.5" />
            )}
            {lang === 'ta' ? 'படமாக பதிவிறக்கம்' : 'Download as image'}
          </Button>
          <a
            href={`https://wa.me/?text=${shareText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 bg-green-600 hover:bg-green-700 text-white rounded-md font-medium text-sm h-11 transition"
          >
            <Share2 className="w-4 h-4" />
            {lang === 'ta' ? 'WhatsApp-ல் பகிர்' : 'Share on WhatsApp'}
          </a>
        </div>
      </CardContent>
    </Card>
  );
}

export default ShareableResultCard;
