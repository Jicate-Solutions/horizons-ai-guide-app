import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, Loader2, CheckCircle2, Mail, User, ArrowRight, Phone } from 'lucide-react';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  // Common fields
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Sign Up only fields
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [passOutYear, setPassOutYear] = useState('');
  const [stream, setStream] = useState('');
  const [district, setDistrict] = useState('');
  const [careerInterest, setCareerInterest] = useState('');

  const { signIn, signUp, user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const searchParams = new URLSearchParams(location.search);
  const redirectParam = searchParams.get('redirect');

  // Convert mobile to auth email (Supabase needs email for auth)
  const phoneToEmail = (phone: string) => `${phone}@vazhikatti.app`;

  useEffect(() => {
    if (user && !loading) {
      const redirectUrl = redirectParam || '/career-assessment/colleges';
      navigate(redirectUrl, { replace: true });
    }
  }, [user, loading, redirectParam, navigate]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!mobileNumber || mobileNumber.length !== 10) {
      newErrors.mobileNumber = 'Enter a valid 10-digit mobile number';
    }
    if (!password || password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!isLogin) {
      if (!displayName || displayName.trim().length < 2) {
        newErrors.displayName = 'Full name must be at least 2 characters';
      }
      if (!confirmPassword || password !== confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
      if (!schoolName.trim()) newErrors.schoolName = 'School name is required';
      if (!passOutYear) newErrors.passOutYear = 'Please select your pass-out year';
      if (!stream) newErrors.stream = 'Please select your stream';
      if (!district) newErrors.district = 'Please select your district';
      if (!careerInterest) newErrors.careerInterest = 'Please select your career interest';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    const authEmail = phoneToEmail(mobileNumber);

    try {
      if (isLogin) {
        const { error } = await signIn(authEmail, password);
        if (error) {
          if (error.message.includes('Invalid login credentials')) {
            toast({
              title: "Login Failed",
              description: "Invalid mobile number or password. Please check and try again.",
              variant: "destructive",
            });
          } else {
            toast({
              title: "Login Failed",
              description: error.message,
              variant: "destructive",
            });
          }
        } else {
          toast({
            title: "Welcome back!",
            description: "You have successfully logged in.",
          });
        }
      } else {
        const { error, data: signUpData } = await signUp(authEmail, password, displayName, {
          phone: mobileNumber,
          schoolName: schoolName,
          stream: stream,
          passOutYear: passOutYear,
          district: district,
          careerInterest: careerInterest,
          userEmail: email,
        });
        if (error) {
          if (error.message.includes('User already registered') || error.message.includes('already been registered')) {
            toast({
              title: "Mobile Number Already Registered",
              description: "An account with this mobile number already exists. Please click 'Sign In' below.",
              variant: "destructive",
            });
          } else if (error.message.includes('rate limit') || error.message.includes('too many')) {
            toast({
              title: "Too Many Attempts",
              description: "Please wait a few minutes and try again.",
              variant: "destructive",
            });
          } else {
            toast({
              title: "Sign Up Failed",
              description: error.message || "Something went wrong. Please try again.",
              variant: "destructive",
            });
          }
        } else {
          toast({
            title: "Account Created!",
            description: "Welcome! Your account has been created successfully.",
          });

          // === BULLETPROOF DATA SAVING — 3 LAYERS ===
          // Layer 1: Auth metadata already saved via signUp (guaranteed)
          console.log('[VAZHIKATTI] Layer 1: User metadata saved in auth ✅');

          // Get userId from signUp response directly (not getUser - avoids race condition)
          const userId = signUpData?.user?.id || null;
          console.log('[VAZHIKATTI] User ID:', userId);

          // Small delay to let auth session establish fully
          await new Promise(resolve => setTimeout(resolve, 1000));

          // Layer 2: Server-side API (uses service key, bypasses RLS)
          try {
            const apiRes = await fetch('/api/save-registration', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                user_id: userId,
                full_name: displayName,
                phone: mobileNumber,
                email: email || null,
                school_name: schoolName,
                stream: stream,
                pass_out_year: passOutYear,
                district: district,
                career_interest: careerInterest,
              }),
            });
            const apiData = await apiRes.json();
            console.log('[VAZHIKATTI] Layer 2: Server API result:', apiData);
          } catch (apiErr) {
            console.warn('[VAZHIKATTI] Layer 2: Server API failed:', apiErr);
          }

          // Layer 3: Direct database insert (session should be ready after delay)
          try {
            const { error: insertErr } = await supabase.from('registrations_12th_learners').insert({
              user_id: userId,
              full_name: displayName,
              phone: mobileNumber,
              email: email || null,
              school_name: schoolName,
              stream: stream,
              preferred_course: passOutYear,
              preferred_institution: district,
              career_interests: careerInterest ? [careerInterest] : [],
            });
            if (insertErr) {
              console.warn('[VAZHIKATTI] Layer 3: Insert error:', insertErr.message);
              // Retry without user_id
              const { error: retryErr } = await supabase.from('registrations_12th_learners').insert({
                user_id: null,
                full_name: displayName,
                phone: mobileNumber,
                email: email || null,
                school_name: schoolName,
                stream: stream,
                preferred_course: passOutYear,
                preferred_institution: district,
                career_interests: careerInterest ? [careerInterest] : [],
              });
              if (retryErr) console.warn('[VAZHIKATTI] Layer 3: Retry also failed:', retryErr.message);
              else console.log('[VAZHIKATTI] Layer 3: Retry without user_id succeeded ✅');
            } else {
              console.log('[VAZHIKATTI] Layer 3: Direct insert succeeded ✅');
            }
          } catch (dbErr) {
            console.warn('[VAZHIKATTI] Layer 3: Exception:', dbErr);
          }

          // Also save to profiles as backup
          try {
            if (userId) {
              const bioData = [mobileNumber, email || '', schoolName || '', stream || '', passOutYear || '', district || '', careerInterest || ''].join(' | ');
              await supabase.from('profiles').upsert({
                user_id: userId,
                display_name: displayName || mobileNumber,
                bio: bioData,
              }, { onConflict: 'user_id' });
              console.log('[VAZHIKATTI] Profile backup saved ✅');
            }
          } catch (e) { /* silent */ }

          setRegistrationSuccess(true);

          // Send welcome email if provided
          if (email) {
            try {
              await fetch('/api/send-welcome-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, displayName: displayName || mobileNumber }),
              });
            } catch (e) { /* silent */ }
            try {
              await supabase.functions.invoke('send-registration-email', {
                body: { fullName: displayName, email, phone: mobileNumber, school: schoolName, board: '-', stream, expectedYear: passOutYear },
              });
            } catch (e) { /* silent */ }
          }
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setErrors({});
    setPassword('');
    setConfirmPassword('');
    setMobileNumber('');
    setDisplayName('');
    setEmail('');
    setSchoolName('');
    setPassOutYear('');
    setStream('');
    setDistrict('');
    setCareerInterest('');
  };

  return (
    <div className="fresh-page-wrapper page-transition flex items-start sm:items-center justify-center p-4 min-h-screen overflow-y-auto py-8">
      {registrationSuccess ? (
        <Card className="fresh-card w-full max-w-md relative z-10 overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-700 via-emerald-600 to-yellow-600 p-6 text-center text-white">
            <div className="flex justify-center mb-3">
              <div className="bg-white/20 rounded-full p-3">
                <CheckCircle2 className="h-10 w-10" />
              </div>
            </div>
            <h2 className="text-2xl font-bold">Registration Successful! 🎉</h2>
            <p className="text-sm mt-1 opacity-90">Welcome to AI Vazhikatti</p>
          </div>
          <CardContent className="p-6 space-y-5">
            <div className="text-center">
              <p className="text-gray-600 text-sm">
                Thank you for signing up, <strong className="text-emerald-700">{displayName || 'Learner'}</strong>!
                Your career journey starts now.
              </p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-yellow-50 rounded-xl p-5 border border-green-200">
              <h3 className="text-sm font-semibold text-emerald-800 mb-3">📋 Your Registration Details</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-3 bg-white rounded-lg p-2.5 shadow-sm">
                  <div className="bg-emerald-100 rounded-full p-1.5"><User className="h-3.5 w-3.5 text-emerald-700" /></div>
                  <div className="flex-1">
                    <p className="text-[10px] text-gray-500">Name</p>
                    <p className="text-xs font-medium text-gray-800">{displayName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-white rounded-lg p-2.5 shadow-sm">
                  <div className="bg-emerald-100 rounded-full p-1.5"><Phone className="h-3.5 w-3.5 text-emerald-700" /></div>
                  <div className="flex-1">
                    <p className="text-[10px] text-gray-500">Mobile</p>
                    <p className="text-xs font-medium text-gray-800">{mobileNumber}</p>
                  </div>
                </div>
                {email && (
                  <div className="flex items-center gap-3 bg-white rounded-lg p-2.5 shadow-sm">
                    <div className="bg-emerald-100 rounded-full p-1.5"><Mail className="h-3.5 w-3.5 text-emerald-700" /></div>
                    <div className="flex-1">
                      <p className="text-[10px] text-gray-500">Email</p>
                      <p className="text-xs font-medium text-gray-800">{email}</p>
                    </div>
                  </div>
                )}
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-white rounded-lg p-2.5 shadow-sm">
                    <p className="text-[10px] text-gray-500">School</p>
                    <p className="text-xs font-medium text-gray-800">{schoolName || '-'}</p>
                  </div>
                  <div className="bg-white rounded-lg p-2.5 shadow-sm">
                    <p className="text-[10px] text-gray-500">Stream</p>
                    <p className="text-xs font-medium text-gray-800">{stream || '-'}</p>
                  </div>
                  <div className="bg-white rounded-lg p-2.5 shadow-sm">
                    <p className="text-[10px] text-gray-500">Pass-Out Year</p>
                    <p className="text-xs font-medium text-gray-800">{passOutYear || '-'}</p>
                  </div>
                  <div className="bg-white rounded-lg p-2.5 shadow-sm">
                    <p className="text-[10px] text-gray-500">District</p>
                    <p className="text-xs font-medium text-gray-800">{district || '-'}</p>
                  </div>
                </div>
                <div className="bg-white rounded-lg p-2.5 shadow-sm">
                  <p className="text-[10px] text-gray-500">Career Interest</p>
                  <p className="text-xs font-medium text-gray-800">{careerInterest || '-'}</p>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-gray-700">🚀 What you can do next:</h4>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-gray-50 rounded-lg p-2.5 text-center text-xs text-gray-600">🤖 AI Career Chat</div>
                <div className="bg-gray-50 rounded-lg p-2.5 text-center text-xs text-gray-600">📊 Career Assessment</div>
                <div className="bg-gray-50 rounded-lg p-2.5 text-center text-xs text-gray-600">🏛️ Find Colleges</div>
                <div className="bg-gray-50 rounded-lg p-2.5 text-center text-xs text-gray-600">💼 Job Portal</div>
              </div>
            </div>
            <Button
              className="w-full bg-gradient-to-r from-[#FF6B35] to-[#e55a2a] hover:from-[#e55a2a] hover:to-[#d44a1a] text-white font-semibold py-5 text-base"
              onClick={() => navigate(redirectParam || '/career-assessment/colleges')}
            >
              Start Exploring AI Vazhikatti
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card className="fresh-card w-full max-w-md border-l-fresh-green-medium relative z-10 notranslate">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-serif text-fresh-green-dark">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </CardTitle>
            <CardDescription className="fresh-body">
              {isLogin
                ? 'Sign in with your mobile number and password'
                : 'Fill in your details to get started'}
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">

              {/* Full Name — signup only */}
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="displayName" className="fresh-label">Full Name *</Label>
                  <Input id="displayName" type="text" placeholder="Enter your full name"
                    value={displayName} onChange={(e) => setDisplayName(e.target.value)}
                    className={`fresh-input ${errors.displayName ? 'border-destructive' : ''}`} disabled={isLoading} />
                  {errors.displayName && <p className="text-sm text-destructive">{errors.displayName}</p>}
                </div>
              )}

              {/* Mobile Number — both */}
              <div className="space-y-2">
                <Label htmlFor="mobileNumber" className="fresh-label">Mobile Number *</Label>
                <div className="flex gap-2">
                  <div className="flex items-center justify-center px-3 bg-gray-100 border border-input rounded-md text-sm text-gray-600 font-medium">+91</div>
                  <Input id="mobileNumber" type="tel" placeholder="9876543210"
                    value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    className={`fresh-input flex-1 ${errors.mobileNumber ? 'border-destructive' : ''}`} disabled={isLoading} />
                </div>
                {errors.mobileNumber && <p className="text-sm text-destructive">{errors.mobileNumber}</p>}
              </div>

              {/* Signup only fields */}
              {!isLogin && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="fresh-label">Email <span className="text-gray-400 text-xs">(Optional)</span></Label>
                    <Input id="email" type="email" placeholder="name@example.com"
                      value={email} onChange={(e) => setEmail(e.target.value)}
                      className="fresh-input" disabled={isLoading} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="schoolName" className="fresh-label">School Name *</Label>
                    <Input id="schoolName" type="text" placeholder="Enter your school name"
                      value={schoolName} onChange={(e) => setSchoolName(e.target.value)}
                      className={`fresh-input ${errors.schoolName ? 'border-destructive' : ''}`} disabled={isLoading} />
                    {errors.schoolName && <p className="text-sm text-destructive">{errors.schoolName}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label htmlFor="passOutYear" className="fresh-label">Pass-Out Year *</Label>
                      <select id="passOutYear" value={passOutYear} onChange={(e) => setPassOutYear(e.target.value)}
                        className={`fresh-input w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ${errors.passOutYear ? 'border-destructive' : ''}`} disabled={isLoading}>
                        <option value="">Select Year</option>
                        {Array.from({ length: 2050 - 1990 + 1 }, (_, i) => 2050 - i).map(year => (
                          <option key={year} value={String(year)}>{year}</option>
                        ))}
                      </select>
                      {errors.passOutYear && <p className="text-sm text-destructive">{errors.passOutYear}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="stream" className="fresh-label">Stream *</Label>
                      <select id="stream" value={stream} onChange={(e) => setStream(e.target.value)}
                        className={`fresh-input w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ${errors.stream ? 'border-destructive' : ''}`} disabled={isLoading}>
                        <option value="">Select Stream</option>
                        <option value="Science (Bio)">Science (Bio)</option>
                        <option value="Science (Maths)">Science (Maths)</option>
                        <option value="Science (CS)">Science (CS)</option>
                        <option value="Commerce">Commerce</option>
                        <option value="Arts / Humanities">Arts / Humanities</option>
                        <option value="Vocational">Vocational</option>
                      </select>
                      {errors.stream && <p className="text-sm text-destructive">{errors.stream}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="district" className="fresh-label">District *</Label>
                    <select id="district" value={district} onChange={(e) => setDistrict(e.target.value)}
                      className={`fresh-input w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ${errors.district ? 'border-destructive' : ''}`} disabled={isLoading}>
                      <option value="">Select District</option>
                      <option value="Ariyalur">Ariyalur</option>
                      <option value="Chengalpattu">Chengalpattu</option>
                      <option value="Chennai">Chennai</option>
                      <option value="Coimbatore">Coimbatore</option>
                      <option value="Cuddalore">Cuddalore</option>
                      <option value="Dharmapuri">Dharmapuri</option>
                      <option value="Dindigul">Dindigul</option>
                      <option value="Erode">Erode</option>
                      <option value="Kallakurichi">Kallakurichi</option>
                      <option value="Kanchipuram">Kanchipuram</option>
                      <option value="Kanyakumari">Kanyakumari</option>
                      <option value="Karur">Karur</option>
                      <option value="Krishnagiri">Krishnagiri</option>
                      <option value="Madurai">Madurai</option>
                      <option value="Mayiladuthurai">Mayiladuthurai</option>
                      <option value="Nagapattinam">Nagapattinam</option>
                      <option value="Namakkal">Namakkal</option>
                      <option value="Nilgiris">Nilgiris</option>
                      <option value="Perambalur">Perambalur</option>
                      <option value="Pudukkottai">Pudukkottai</option>
                      <option value="Ramanathapuram">Ramanathapuram</option>
                      <option value="Ranipet">Ranipet</option>
                      <option value="Salem">Salem</option>
                      <option value="Sivaganga">Sivaganga</option>
                      <option value="Tenkasi">Tenkasi</option>
                      <option value="Thanjavur">Thanjavur</option>
                      <option value="Theni">Theni</option>
                      <option value="Thoothukudi">Thoothukudi</option>
                      <option value="Tiruchirappalli">Tiruchirappalli</option>
                      <option value="Tirunelveli">Tirunelveli</option>
                      <option value="Tirupathur">Tirupathur</option>
                      <option value="Tiruppur">Tiruppur</option>
                      <option value="Tiruvallur">Tiruvallur</option>
                      <option value="Tiruvannamalai">Tiruvannamalai</option>
                      <option value="Tiruvarur">Tiruvarur</option>
                      <option value="Vellore">Vellore</option>
                      <option value="Viluppuram">Viluppuram</option>
                      <option value="Virudhunagar">Virudhunagar</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.district && <p className="text-sm text-destructive">{errors.district}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="careerInterest" className="fresh-label">Career Interest *</Label>
                    <select id="careerInterest" value={careerInterest} onChange={(e) => setCareerInterest(e.target.value)}
                      className={`fresh-input w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ${errors.careerInterest ? 'border-destructive' : ''}`} disabled={isLoading}>
                      <option value="">Select Career Interest</option>
                      <option value="Engineering">Engineering</option>
                      <option value="Medicine / MBBS">Medicine / MBBS</option>
                      <option value="Nursing / Paramedical">Nursing / Paramedical</option>
                      <option value="Agriculture">Agriculture</option>
                      <option value="Arts & Science">Arts & Science</option>
                      <option value="B.Com / CA / Finance">B.Com / CA / Finance</option>
                      <option value="Law">Law</option>
                      <option value="Teaching / B.Ed">Teaching / B.Ed</option>
                      <option value="IT / Software">IT / Software</option>
                      <option value="Design / Architecture">Design / Architecture</option>
                      <option value="Government Jobs">Government Jobs</option>
                      <option value="Defence / Armed Forces">Defence / Armed Forces</option>
                      <option value="Business / Entrepreneurship">Business / Entrepreneurship</option>
                      <option value="Hotel Management">Hotel Management</option>
                      <option value="Media / Journalism">Media / Journalism</option>
                      <option value="Not Sure Yet">Not Sure Yet</option>
                    </select>
                    {errors.careerInterest && <p className="text-sm text-destructive">{errors.careerInterest}</p>}
                  </div>
                </>
              )}

              {/* Password — both */}
              <div className="space-y-2">
                <Label htmlFor="password" className="fresh-label">Password *</Label>
                <div className="relative">
                  <Input id="password" type={showPassword ? 'text' : 'password'} placeholder="••••••••"
                    value={password} onChange={(e) => setPassword(e.target.value)}
                    className={`fresh-input pr-10 ${errors.password ? 'border-destructive' : ''}`} disabled={isLoading} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-fresh-gold-dark hover:text-fresh-gold-rich transition-colors">
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
              </div>

              {/* Confirm Password — signup only */}
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="fresh-label">Confirm Password *</Label>
                  <Input id="confirmPassword" type={showPassword ? 'text' : 'password'} placeholder="••••••••"
                    value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                    className={`fresh-input ${errors.confirmPassword ? 'border-destructive' : ''}`} disabled={isLoading} />
                  {errors.confirmPassword && <p className="text-sm text-destructive">{errors.confirmPassword}</p>}
                </div>
              )}

            </CardContent>

            <CardFooter className="flex flex-col space-y-4">
              <Button type="submit" className="w-full btn-fresh-primary" disabled={isLoading}>
                {isLoading ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" />{isLogin ? 'Signing In...' : 'Creating Account...'}</>
                ) : (
                  isLogin ? 'Sign In' : 'Create Account'
                )}
              </Button>
              <div className="text-center text-sm">
                <span className="fresh-muted">{isLogin ? "Don't have an account? " : "Already have an account? "}</span>
                <button type="button" onClick={toggleMode}
                  className="text-fresh-green-medium hover:text-fresh-green-dark font-medium transition-colors" disabled={isLoading}>
                  {isLogin ? 'Sign Up' : 'Sign In'}
                </button>
              </div>
            </CardFooter>
          </form>
        </Card>
      )}
    </div>
  );
};

export default Auth;
