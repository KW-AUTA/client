import { Suspense, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants';
import CheckeredBackground from '@/components/CheckPatternBackground';
import Button from '@/components/ui/button/Button';
import { X, AlertTriangle, Check, BarChart3 } from 'lucide-react';

interface HeroSectionProps {
  className?: string;
}

const HeroSection = ({ className = '' }: HeroSectionProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className={`relative min-h-screen flex items-center justify-center overflow-hidden ${className}`}>
      <Suspense fallback={<div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100" />}>
        <CheckeredBackground />
      </Suspense>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div
          className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h1
            className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight ${isVisible ? 'animate-fade-in-up' : ''}`}>
            <span className="block sm:inline">당신의 디자인,</span>
            <span className="block sm:inline"> 코드와 완벽하게</span>
            <br />
            <span className="text-green-600">
              <span className="block sm:inline">일치하나요?</span>
            </span>
          </h1>

          <p
            className={`text-lg sm:text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed px-2 sm:px-0 ${isVisible ? 'animate-fade-in-up' : ''}`}
            style={{ animationDelay: '200ms' }}>
            AUTA는 YOLO 모델을 통해 Figma JSON을 추출하고 실제 웹사이트와 비교하는 UI 테스트 솔루션입니다.
            <br className="hidden sm:block" />
            개발자와 디자이너의 소모적인 커뮤니케이션을 끝내세요.
          </p>

          <div
            className={`flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 ${isVisible ? 'animate-fade-in-up' : ''}`}
            style={{ animationDelay: '400ms' }}>
            <Link to={ROUTES.LOGIN}>
              <Button
                text="지금 바로 무료로 시작하기"
                className="bg-green-600 hover:bg-green-700 text-white border-green-600 hover:border-green-700 text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 transition-all duration-300 hover:scale-105"
              />
            </Link>
            <button
              onClick={() => scrollToSection('video-guide-section')}
              className="text-green-600 hover:text-green-700 font-medium text-base sm:text-lg flex items-center gap-2 transition-colors duration-200 hover:scale-105">
              3분 사용법 영상 보기 ↓
            </button>
          </div>

          {/* Visual Animation */}
          <div
            className={`relative max-w-4xl mx-auto px-2 sm:px-0 ${isVisible ? 'animate-fade-in-up' : ''}`}
            style={{ animationDelay: '600ms' }}>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-2xl hover:shadow-3xl transition-all duration-300">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-center">
                <div className="space-y-4">
                  <div className="bg-red-100 border-2 border-red-300 rounded-lg p-4 hover:scale-105 transition-transform duration-300">
                    <div className="text-red-600 font-semibold mb-2 flex items-center gap-2">
                      <X className="w-5 h-5" />
                      불일치
                    </div>
                    <div className="text-sm text-red-700">Figma 디자인과 실제 구현이 다름</div>
                  </div>
                  <div className="bg-yellow-100 border-2 border-yellow-300 rounded-lg p-4 hover:scale-105 transition-transform duration-300">
                    <div className="text-yellow-600 font-semibold mb-2 flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5" />
                      수동 검증
                    </div>
                    <div className="text-sm text-yellow-700">개발자가 직접 확인해야 함</div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-green-100 border-2 border-green-300 rounded-lg p-4 hover:scale-105 transition-transform duration-300">
                    <div className="text-green-600 font-semibold mb-2 flex items-center gap-2">
                      <Check className="w-5 h-5" />
                      완벽 일치
                    </div>
                    <div className="text-sm text-green-700">AUTA가 자동으로 검증 완료</div>
                  </div>
                  <div className="bg-blue-100 border-2 border-blue-300 rounded-lg p-4 hover:scale-105 transition-transform duration-300">
                    <div className="text-blue-600 font-semibold mb-2 flex items-center gap-2">
                      <BarChart3 className="w-5 h-5" />
                      자동 리포트
                    </div>
                    <div className="text-sm text-blue-700">문제점을 한눈에 확인</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
