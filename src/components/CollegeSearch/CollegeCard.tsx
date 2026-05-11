import { useState } from 'react';
import { Phone, Globe, MapPin, Calendar, GraduationCap, Award, ChevronDown, ChevronUp, ExternalLink, Trophy, ShieldCheck, Flag, Info } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { College, COLLEGE_TYPE_INFO, COLLEGE_CATEGORIES, isAutonomousCollege } from './types';

interface CollegeCardProps {
  college: College;
}


export const CollegeCard = ({ college }: CollegeCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const typeInfo = COLLEGE_TYPE_INFO[college.type];
  const collegeUrl = college.website
    ? (college.website.startsWith('http://') || college.website.startsWith('https://'))
      ? college.website
      : `https://${college.website}`
    : null;
  const isAutonom = isAutonomousCollege(college);

  return (
    <Card className={`border-l-4 transition-all hover:shadow-md ${
      false 
        ? 'border-l-[#FFB800] bg-gradient-to-r from-yellow-50/50 to-transparent' 
        : isAutonom
          ? 'border-l-[#7B1FA2] bg-gradient-to-r from-purple-50/40 to-transparent'
          : 'border-l-[#0A2E1F]'
    }`}>
      <CardHeader className="pb-2 px-3 md:px-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
          <div className="flex-1">
            <div className="flex items-center gap-1.5 flex-wrap mb-1">
              {false && (
                <Badge className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black font-semibold text-[10px] md:text-xs">
                  Featured
                </Badge>
              )}
              {isAutonom && !false && (
                <Badge className="bg-gradient-to-r from-[#9C27B0] to-[#7B1FA2] text-white font-semibold text-[10px] md:text-xs">
                  Autonomous
                </Badge>
              )}
              <Badge variant="outline" className="text-[10px] md:text-xs">
                {typeInfo.badge} {typeInfo.label}
              </Badge>
              {college.naacGrade && college.naacGrade !== 'null' && (
                <Badge variant="secondary" className="text-[10px] md:text-xs bg-emerald-100 text-emerald-800">
                  NAAC {college.naacGrade}
                </Badge>
              )}
              {college.sports?.sportsQuota && (
                <Badge variant="secondary" className="text-[10px] md:text-xs bg-amber-100 text-amber-800 border border-amber-200">
                  🏆 Sports Quota
                </Badge>
              )}
            </div>
            <a 
              href={collegeUrl || `https://www.google.com/search?q=${encodeURIComponent(college.name + ' official website')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-sm md:text-lg leading-tight cursor-pointer hover:text-emerald-700 hover:underline transition-colors block"
            >
              {college.name}
            </a>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0 px-3 md:px-6">
        <div className="space-y-2 md:space-y-3">
          {/* Quick Info */}
          <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs md:text-sm text-muted-foreground">
            {college.establishedYear && (
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                Est. {college.establishedYear}
              </span>
            )}
            {college.accreditation && (
              <span className="flex items-center gap-1">
                <Award className="h-3 w-3" />
                {college.accreditation}
              </span>
            )}
          </div>

          {/* Courses */}
          <div className="flex items-start gap-2">
            <GraduationCap className="h-4 w-4 mt-0.5 text-muted-foreground shrink-0" />
            <p className="text-xs md:text-sm">{college.courses}</p>
          </div>

          {/* Fee Range */}
          {college.feeRange && (
            <p className="text-xs md:text-sm text-muted-foreground">
              💰 Fee: {college.feeRange}
            </p>
          )}

          {/* Facilities — ONLY if real data exists */}
          {college.facilities && college.facilities.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {college.facilities.map((facility, idx) => (
                <span key={idx} className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] md:text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                  {facility}
                </span>
              ))}
            </div>
          )}

          {/* Contact Info */}
          <div className="flex flex-wrap gap-3 text-xs md:text-sm">
            {college.contact && (
              <a href={`tel:${college.contact}`} className="flex items-center gap-1 text-[#0A2E1F] hover:underline">
                <Phone className="h-3 w-3" /> {college.contact}
              </a>
            )}
            {collegeUrl && (
              <a href={collegeUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-[#0A2E1F] hover:underline">
                <Globe className="h-3 w-3" /> Website <ExternalLink className="h-3 w-3" />
              </a>
            )}
          </div>

          {/* Apply, Contact & Facilities */}
          <div className="flex flex-wrap gap-2 mt-1">
            {collegeUrl && (
              <a
                href={collegeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1 px-3 md:px-4 py-1.5 md:py-2 rounded-md text-xs md:text-sm font-medium bg-[#FF6B35] hover:bg-[#e55a2a] text-white no-underline"
              >
                <ExternalLink className="h-3 w-3" /> Apply
              </a>
            )}
            <a
              href={`https://www.google.com/search?q=${encodeURIComponent(college.name + ' admission contact phone')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1 px-3 md:px-4 py-1.5 md:py-2 rounded-md text-xs md:text-sm font-medium border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 no-underline"
            >
              <Phone className="h-3 w-3" /> Contact
            </a>
            <a
              href={`https://www.google.com/search?q=${encodeURIComponent(college.name + ' hostel bus facilities placements')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1 px-3 md:px-4 py-1.5 md:py-2 rounded-md text-xs md:text-sm font-medium bg-emerald-600 hover:bg-emerald-700 text-white no-underline"
            >
              <Globe className="h-3 w-3" /> Facilities
            </a>
          </div>

          {/* Expandable Details */}
          <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="w-full mt-1">
                {isExpanded ? (
                  <><ChevronUp className="h-4 w-4 mr-2" /> Show Less</>
                ) : (
                  <><ChevronDown className="h-4 w-4 mr-2" /> View More Details</>
                )}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-3 pt-3 border-t space-y-3">
              {college.address && (
                <div className="flex items-start gap-2 text-xs md:text-sm">
                  <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground shrink-0" />
                  <p>{college.address}</p>
                </div>
              )}
              {college.placementStats && (
                <div className="text-xs md:text-sm">
                  <span className="font-medium">📊 Placements:</span> {college.placementStats}
                </div>
              )}

              {/* Sports Section */}
              <div className="rounded-lg border border-amber-200 bg-amber-50/60 p-2.5 md:p-3 space-y-2">
                <div className="flex items-center gap-1.5">
                  <Trophy className="h-4 w-4 text-amber-600" />
                  <span className="text-xs md:text-sm font-semibold text-amber-900">Sports & Athletics</span>
                </div>

                {college.sports?.sports && college.sports.sports.length > 0 && (
                  <div>
                    <p className="text-[10px] md:text-xs font-medium text-amber-900/80 mb-1">Sports offered:</p>
                    <div className="flex flex-wrap gap-1">
                      {college.sports.sports.map((s, i) => (
                        <span key={i} className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] md:text-xs font-medium bg-white text-amber-800 border border-amber-200">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {college.sports?.facilities && college.sports.facilities.length > 0 && (
                  <div>
                    <p className="text-[10px] md:text-xs font-medium text-amber-900/80 mb-1">Facilities:</p>
                    <div className="flex flex-wrap gap-1">
                      {college.sports.facilities.map((f, i) => (
                        <span key={i} className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] md:text-xs font-medium bg-white text-amber-800 border border-amber-200">
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {college.sports?.sportsQuota && (
                  <div className="flex items-center gap-1.5 text-[10px] md:text-xs text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-md px-2 py-1 w-fit">
                    <Award className="h-3 w-3" />
                    Admits under Sports Quota
                  </div>
                )}

                {college.sports?.achievements && college.sports.achievements.length > 0 && (
                  <div>
                    <p className="text-[10px] md:text-xs font-medium text-amber-900/80 mb-1">Achievements:</p>
                    <ul className="list-disc list-inside text-[10px] md:text-xs text-amber-900 space-y-0.5">
                      {college.sports.achievements.map((a, i) => (
                        <li key={i}>{a}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Always show a way to look up sports info on the official site */}
                <div className="flex flex-wrap gap-2 pt-1">
                  <a
                    href={`https://www.google.com/search?q=${encodeURIComponent(college.name + ' sports facilities athletics department')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] md:text-xs font-medium bg-amber-600 hover:bg-amber-700 text-white no-underline"
                  >
                    <Trophy className="h-3 w-3" /> Look up sports info
                  </a>
                  {!college.sports && (
                    <span className="text-[10px] md:text-xs text-amber-900/70 italic">
                      Detailed sports data not yet verified for this college — please check the official source.
                    </span>
                  )}
                </div>
              </div>

              {/* Data Accuracy & Verification */}
              <div className="rounded-lg border border-sky-200 bg-sky-50/60 p-2.5 md:p-3 space-y-2">
                <div className="flex items-start gap-1.5">
                  <Info className="h-4 w-4 text-sky-700 mt-0.5 shrink-0" />
                  <p className="text-[10px] md:text-xs text-sky-900 leading-snug">
                    <span className="font-semibold">Verify before you decide.</span> College fees, courses, NAAC grades and contact numbers change year to year. Always confirm on the official source below before applying or paying.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <a
                    href={collegeUrl || `https://www.google.com/search?q=${encodeURIComponent(college.name + ' official website')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] md:text-xs font-medium bg-sky-700 hover:bg-sky-800 text-white no-underline"
                  >
                    <ShieldCheck className="h-3 w-3" /> Verify on official site
                  </a>
                  <a
                    href="https://www.naac.gov.in/index.php/en/assessment-accreditation/accredited-institutions"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] md:text-xs font-medium border border-sky-300 bg-white hover:bg-sky-50 text-sky-800 no-underline"
                  >
                    <Award className="h-3 w-3" /> NAAC database
                  </a>
                  <a
                    href={`mailto:support@vazhikatti.app?subject=${encodeURIComponent('Report inaccurate data: ' + college.name)}&body=${encodeURIComponent('Please describe the inaccuracy you noticed about ' + college.name + ':\n\n')}`}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] md:text-xs font-medium border border-red-300 bg-white hover:bg-red-50 text-red-700 no-underline"
                  >
                    <Flag className="h-3 w-3" /> Report inaccurate info
                  </a>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </CardContent>
    </Card>
  );
};
