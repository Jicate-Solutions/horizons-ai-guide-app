import { Facebook, Instagram, Linkedin, Youtube, MessageCircle, Mail } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { Link } from "react-router-dom";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-primary py-10" id="contact">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Brand */}
          <div className="text-center md:text-left">
            <h3 className="font-serif text-xl font-bold italic text-primary-foreground mb-1">
              VAZHIKATTI — வழிகாட்டி
            </h3>
            <p className="text-xs text-primary-foreground/60 mb-1">
              AI-Powered Career Guidance for 12th Students
            </p>
            <p className="text-xs text-primary-foreground/60 mb-3">
              12ஆம் வகுப்பு மாணவர்களுக்கான AI தொழில் வழிகாட்டி
            </p>
            <p className="text-sm text-primary-foreground/70">
              © 2026 VAZHIKATTI. All Rights Reserved.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-5">
            {/* Contact */}
            <div className="flex items-center gap-3">
              <a
                href="https://wa.me/919444444444?text=Hi%20VAZHIKATTI%2C%20I%20need%20help%20with%20career%20guidance"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white text-xs font-semibold px-4 py-2 rounded-full transition-all"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                WhatsApp Us
              </a>
              <a
                href="mailto:support@vazhikatti.app"
                className="flex items-center gap-2 bg-primary-foreground/10 hover:bg-primary-foreground/20 text-primary-foreground text-xs font-semibold px-4 py-2 rounded-full transition-all"
              >
                <Mail className="w-3.5 h-3.5" />
                Email Us
              </a>
            </div>

            {/* Nav Links */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link to="/career-assessment/colleges" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                Career Guide
              </Link>
              <Link to="/government-exams" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                Govt Exams
              </Link>
              <Link to="/career-assessment/colleges/scholarships" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                Scholarships
              </Link>
              <Link to="/auth" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                Sign In
              </Link>
              <Link to="/admin/monitor" className="text-xs text-primary-foreground/30 hover:text-primary-foreground/50 transition-colors">
                v2.0
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
