import {
  Briefcase,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="py-12 px-4 sm:px-6 md:px-12 bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300 font-rubik">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="relative w-10 h-10 rounded-full bg-gradient-to-r from-primary to-blue-500 flex items-center justify-center text-white">
                <Briefcase className="text-lg" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full"></div>
              </div>
              <div className="text-xl font-bold whitespace-nowrap">
                <span className="text-gray-800 dark:text-gray-200">Job</span>
                <span className="bg-gradient-to-r from-primary to-blue-500 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent drop-shadow-sm">
                  Wave
                </span>
              </div>
            </Link>

            <p className="text-sm text-gray-600 dark:text-gray-400">
              Building a better job market for everyone. We connect talented
              individuals with opportunities that match their skills and career
              aspirations.
            </p>

            <div className="flex items-center gap-4 pt-2">
              <a
                href="#"
                className="w-8 h-8 rounded-full flex items-center justify-center transition-all bg-gray-200 text-gray-600 hover:bg-primary hover:text-white dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-purple-900 dark:hover:text-purple-400"
              >
                <Twitter size={14} />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full flex items-center justify-center transition-all bg-gray-200 text-gray-600 hover:bg-primary hover:text-white dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-purple-900 dark:hover:text-purple-400"
              >
                <Facebook size={14} />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full flex items-center justify-center transition-all bg-gray-200 text-gray-600 hover:bg-primary hover:text-white dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-purple-900 dark:hover:text-purple-400"
              >
                <Linkedin size={14} />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full flex items-center justify-center transition-all bg-gray-200 text-gray-600 hover:bg-primary hover:text-white dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-purple-900 dark:hover:text-purple-400"
              >
                <Instagram size={14} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h6 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
              Quick Links
            </h6>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/jobs"
                  className="text-sm transition-colors duration-300 text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-purple-400"
                >
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link
                  href="/companies"
                  className="text-sm transition-colors duration-300 text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-purple-400"
                >
                  Companies
                </Link>
              </li>
              <li>
                <Link
                  href="/about-us"
                  className="text-sm transition-colors duration-300 text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-purple-400"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-sm transition-colors duration-300 text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-purple-400"
                >
                  Career Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm transition-colors duration-300 text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-purple-400"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h6 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
              Services
            </h6>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-sm transition-colors duration-300 text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-purple-400"
                >
                  Resume Building
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm transition-colors duration-300 text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-purple-400"
                >
                  Career Coaching
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm transition-colors duration-300 text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-purple-400"
                >
                  Recruitment Solutions
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm transition-colors duration-300 text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-purple-400"
                >
                  Job Posting
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm transition-colors duration-300 text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-purple-400"
                >
                  Employer Branding
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h6 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
              Contact Us
            </h6>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="mt-1 text-primary dark:text-purple-400" />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  123 Innovation Drive, Tech District
                  <br />
                  San Francisco, CA 94107
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-primary dark:text-purple-400" />
                <a
                  href="tel:+1234567890"
                  className="text-sm transition-colors duration-300 text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-purple-400"
                >
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-primary dark:text-purple-400" />
                <a
                  href="mailto:info@jobwave.com"
                  className="text-sm transition-colors duration-300 text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-purple-400"
                >
                  info@jobwave.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-600 dark:text-gray-500">
              © {new Date().getFullYear()} JobWave Ltd. All rights reserved.
            </p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Link
                href="/privacy"
                className="text-xs transition-colors duration-300 text-gray-600 hover:text-primary dark:text-gray-500 dark:hover:text-purple-400"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-xs transition-colors duration-300 text-gray-600 hover:text-primary dark:text-gray-500 dark:hover:text-purple-400"
              >
                Terms of Use
              </Link>
              <Link
                href="/cookies"
                className="text-xs transition-colors duration-300 text-gray-600 hover:text-primary dark:text-gray-500 dark:hover:text-purple-400"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
