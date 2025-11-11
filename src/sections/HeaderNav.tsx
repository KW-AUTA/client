import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { ROUTES } from '@/constants';
import autaLogo from '@/assets/logos/auta-newlogo.svg';
import translations from '@/locales/ko-v4.json';

/**
 * v4 Header + Navigation (Sticky, Glass morphism)
 */
export const HeaderNav = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ESC 키로 드로어 닫기
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) setIsMobileMenuOpen(false);
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isMobileMenuOpen]);

  // Body 스크롤 방지
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const navItems: Array<{ label: string; href: string; isRoute: boolean }> = [];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white/80 backdrop-blur-xl shadow-glass' : 'bg-transparent'
        }`}
        role="banner">
        <nav
          className="max-w-[1120px] mx-auto px-5 md:px-8 h-20 flex items-center justify-between"
          aria-label="메인 네비게이션">
          <Link to={ROUTES.LANDING} aria-label="AUTA 홈" className="flex items-center">
            <img src={autaLogo} alt="AUTA" className="h-44 w-auto" />
          </Link>

          {/* 데스크톱 메뉴 */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item, idx) =>
              item.isRoute ? (
                <Link
                  key={idx}
                  to={item.href}
                  className="text-sm font-medium text-neutral-700 hover:text-brand-blue transition-colors">
                  {item.label}
                </Link>
              ) : (
                <a
                  key={idx}
                  href={item.href}
                  className="text-sm font-medium text-neutral-700 hover:text-brand-blue transition-colors">
                  {item.label}
                </a>
              )
            )}
          </div>

          {/* 우측 버튼 */}
          <div className="flex items-center space-x-3">
            <Link to={ROUTES.LOGIN} className="hidden sm:inline-block">
              <button className="text-sm text-neutral-700 hover:text-brand-blue transition-colors">
                {translations.nav.login}
              </button>
            </Link>
            <Link to={ROUTES.LOGIN}>
              <button className="bg-brand-blue hover:bg-brand-blue/90 text-white text-sm px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105">
                {translations.nav.start}
              </button>
            </Link>

            {/* 모바일 햄버거 */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 hover:bg-neutral-100 rounded-lg transition-colors"
              aria-label={translations.nav.menu}
              aria-controls="mobile-drawer"
              aria-expanded={isMobileMenuOpen}>
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </nav>
      </header>

      {/* 모바일 드로어 오버레이 */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[60] md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* 모바일 드로어 */}
      <aside
        ref={drawerRef}
        id="mobile-drawer"
        role="dialog"
        aria-modal="true"
        aria-label={translations.nav.menu}
        className={`fixed inset-y-0 right-0 w-80 max-w-[85vw] bg-white shadow-2xl z-[70] md:hidden transform transition-transform duration-300 ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center px-4 py-3 border-b w-full">
            <img src={autaLogo} alt="AUTA" className="h-16 w-auto flex-shrink-0" />
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 hover:bg-neutral-100 rounded-lg transition-colors flex-shrink-0"
              aria-label={translations.nav.closeMenu}>
              <X className="w-6 h-6" />
            </button>
          </div>

          <nav className="flex-1 p-6">
            <ul className="space-y-2">
              {navItems.map((item, idx) => (
                <li key={idx}>
                  {item.isRoute ? (
                    <Link
                      to={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block px-4 py-3 text-base font-medium text-neutral-700 hover:text-brand-blue hover:bg-neutral-50 rounded-lg transition-colors">
                      {item.label}
                    </Link>
                  ) : (
                    <a
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block px-4 py-3 text-base font-medium text-neutral-700 hover:text-brand-blue hover:bg-neutral-50 rounded-lg transition-colors">
                      {item.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>

            <div className="mt-6 space-y-2">
              <Link to={ROUTES.LOGIN} className="block" onClick={() => setIsMobileMenuOpen(false)}>
                <button className="w-full text-left px-4 py-3 text-base font-medium text-neutral-700 hover:bg-neutral-50 rounded-lg transition-colors">
                  {translations.nav.login}
                </button>
              </Link>
              <Link to={ROUTES.LOGIN} className="block" onClick={() => setIsMobileMenuOpen(false)}>
                <button className="w-full bg-brand-blue hover:bg-brand-blue/90 text-white px-4 py-3 rounded-lg transition-colors">
                  {translations.nav.start}
                </button>
              </Link>
            </div>
          </nav>
        </div>
      </aside>
    </>
  );
};

export default HeaderNav;
