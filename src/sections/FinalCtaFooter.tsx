import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants';
import translations from '@/locales/ko-v4.json';

/**
 * v4 Final CTA + Footer (통합 섹션)
 */
export const FinalCtaFooter = () => {
  const { final, footer } = translations;

  return (
    <>
      {/* Final CTA */}
      <section 
        id="final-cta" 
        className="py-22 md:py-26 bg-gradient-to-br from-brand-blue to-brand-blue/80 text-white">
        <div className="max-w-[1120px] mx-auto px-5 md:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            {final.title}
          </h2>
          <p className="text-lg mb-10 opacity-90">
            {final.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={ROUTES.LOGIN}>
              <button className="bg-white hover:bg-neutral-100 text-brand-blue text-lg px-10 py-4 rounded-xl font-bold transition-all duration-300 hover:scale-105 shadow-xl">
                {final.primary}
              </button>
            </Link>
            <Link to={ROUTES.MANUAL}>
              <button className="bg-brand-blue/20 hover:bg-brand-blue/30 text-white border-2 border-white text-lg px-10 py-4 rounded-xl font-bold transition-all duration-300">
                {final.secondary}
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-900 text-white py-12" role="contentinfo">
        <div className="max-w-[1120px] mx-auto px-5 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-8">
            <div>
              <h4 className="font-bold mb-3">{footer.product}</h4>
              <p className="text-sm text-neutral-300">—</p>
            </div>
            <div>
              <h4 className="font-bold mb-3">{footer.docs}</h4>
              <p className="text-sm text-neutral-300">—</p>
            </div>
            <div>
              <h4 className="font-bold mb-3">{footer.support}</h4>
              <p className="text-sm text-neutral-300">—</p>
            </div>
            <div>
              <h4 className="font-bold mb-3">{footer.terms}</h4>
              <p className="text-sm text-neutral-300">—</p>
            </div>
            <div>
              <h4 className="font-bold mb-3">{footer.contact}</h4>
              <p className="text-sm text-neutral-300">—</p>
            </div>
          </div>

          <div className="border-t border-neutral-700 pt-8 text-center">
            <p className="text-sm text-neutral-300 mb-2">
              {footer.university}
            </p>
            <p className="text-xs text-neutral-300">
              {footer.copyright}
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default FinalCtaFooter;

