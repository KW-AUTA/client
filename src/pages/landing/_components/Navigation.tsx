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
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Link
              to="#about"
              className="text-gray-700 hover:text-green-600 transition-colors duration-200 font-medium text-sm sm:text-base hidden sm:block">
              팀 소개
            </Link>
            <Link to={ROUTES.LOGIN}>
              <Button
                text="무료로 시작하기"
                className="bg-green-600 hover:bg-green-700 text-white border-green-600 hover:border-green-700 text-sm sm:text-base px-3 sm:px-4 py-2"
              />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
