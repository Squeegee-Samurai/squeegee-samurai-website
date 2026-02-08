import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Phone, Mail, CheckCircle, ArrowRight } from 'lucide-react';

const ThankYou = () => {
  const location = useLocation();
  const estimatedQuote = location.state?.estimatedQuote;
  const tier = location.state?.tier;
  const isEstimate = location.state?.isEstimate;

  return (
    <div className="bg-washi-50 py-20">
      <div className="section-container">
        <div className="mx-auto max-w-2xl bg-white border border-sumi-100 p-10 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center bg-indigo-50">
            <CheckCircle className="h-8 w-8 text-indigo-600" />
          </div>
          <h1 className="font-display text-3xl font-bold text-sumi-800 mb-4">Quote Request Received</h1>

          {isEstimate && estimatedQuote !== undefined && (
            <div className="mb-8 bg-sumi-50 border border-sumi-100 p-5">
              <p className="text-sm text-sumi-500 mb-2">Your estimated pricing</p>
              <div className="text-3xl font-bold text-sumi-800">
                ${estimatedQuote.toFixed(2)}
                {tier && <span className="ml-2 text-base font-normal text-sumi-400">({tier})</span>}
              </div>
              <p className="mt-2 text-xs text-sumi-400">Estimate only. Final pricing confirmed after review.</p>
            </div>
          )}

          <p className="text-lg text-sumi-600 mb-8 leading-relaxed">
            {"Your information has been received. We'll review and send a detailed quote shortly."}
          </p>

          <div className="mb-8 bg-washi-100 border border-washi-200 p-6 text-left">
            <h3 className="font-display font-semibold text-sumi-800 mb-3">What happens next</h3>
            <ul className="space-y-2 text-sm text-sumi-600">
              <li className="flex items-start gap-2">
                <ArrowRight className="mt-0.5 h-4 w-4 text-indigo-500 flex-shrink-0" />
                {"We'll review your information within 24 hours"}
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="mt-0.5 h-4 w-4 text-indigo-500 flex-shrink-0" />
                {"You'll receive a detailed quote via email"}
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="mt-0.5 h-4 w-4 text-indigo-500 flex-shrink-0" />
                A team member will contact you to discuss your needs
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="mt-0.5 h-4 w-4 text-indigo-500 flex-shrink-0" />
                Final pricing is confirmed after review
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <a href="tel:5403351059" className="btn-primary gap-2">
              <Phone className="h-4 w-4" />
              Call (540) 335-1059
            </a>
            <a href="mailto:james@squeegee-samurai.com" className="btn-outline gap-2">
              <Mail className="h-4 w-4" />
              Email Us
            </a>
          </div>

          <div className="mt-8 pt-6 border-t border-sumi-100">
            <Link to="/" className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
