import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants';
import smallLogo from '@/assets/logos/AUTA_small.svg';
import Button from '@/components/ui/button/Button';

interface NavigationProps {
  className?: string;
}

const Navigation = ({ className = '' }: NavigationProps) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${className} ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <img src={smallLogo} alt="AUTA" className="h-8 w-auto" />
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="text-gray-700 hover:text-green-600 transition-colors duration-200 font-medium">
              사용법
            </button>
            <button
              onClick={() => scrollToSection('features-section')}
              className="text-gray-700 hover:text-green-600 transition-colors duration-200 font-medium">
              주요 기능
            </button>
            <button
              onClick={() => scrollToSection('faq-section')}
              className="text-gray-700 hover:text-green-600 transition-colors duration-200 font-medium">
              FAQ
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-gray-700 hover:text-green-600 transition-colors duration-200 font-medium">
              팀 소개
            </button>
          </div>
          <div className="flex items-center space-x-3">
            <Link to={ROUTES.LOGIN}>
              <Button
                text="로그인"
                className="bg-transparent hover:bg-gray-100 text-gray-700 border-gray-300 hover:border-gray-400 text-sm px-4 py-2"
              />
            </Link>
            <Link to={ROUTES.LOGIN}>
              <Button
                text="무료로 시작하기"
                className="bg-green-600 hover:bg-green-700 text-white border-green-600 hover:border-green-700 text-sm px-4 py-2"
              />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
