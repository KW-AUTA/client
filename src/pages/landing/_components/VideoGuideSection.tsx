import { useEffect, useState } from 'react';
import { Rocket, Search, BarChart3 } from 'lucide-react';

interface VideoGuideSectionProps {
  className?: string;
  videoUrl?: string;
  videoTitle?: string;
}

const VideoGuideSection = ({
  className = '',
  videoUrl = 'https://www.youtube.com/embed/pZ-hYhXEerU?autoplay=0&mute=1&loop=1&playlist=pZ-hYhXEerU',
  videoTitle = 'AUTA 플러그인 사용법 안내'
}: VideoGuideSectionProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('video-guide-section');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  return (
    <section id="video-guide-section" className={`py-20 bg-white ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            className={`text-4xl md:text-5xl font-bold text-gray-900 mb-6 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
            AUTA, 실제로 어떻게 동작할까요?
          </h2>
          <p
            className={`text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
            3분 만에 끝내는 AUTA 플러그인 설정 및 테스트 가이드
          </p>
        </div>

        <div
          className={`max-w-4xl mx-auto transition-all duration-1000 delay-400 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
          <div className="relative bg-[#DDEDD8] rounded-2xl shadow-2xl overflow-hidden">
            <iframe
              src={videoUrl}
              title={videoTitle}
              allow="fullscreen; picture-in-picture"
              allowFullScreen
              className="w-full aspect-video"
              loading="lazy"
            />
          </div>
        </div>

        {/* Video Description */}
        <div
          className={`mt-12 text-center transition-all duration-1000 delay-600 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
          <div className="max-w-3xl mx-auto">
            <div className="bg-gray-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">영상에서 확인할 수 있는 내용</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="mb-3 flex justify-center">
                    <Rocket className="w-8 h-8 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">빠른 설정</h4>
                  <p className="text-sm text-gray-600">Figma 파일 업로드부터 테스트 실행까지</p>
                </div>
                <div className="text-center">
                  <div className="mb-3 flex justify-center">
                    <Search className="w-8 h-8 text-green-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">실시간 분석</h4>
                  <p className="text-sm text-gray-600">자동으로 진행되는 UI 정합성 검증</p>
                </div>
                <div className="text-center">
                  <div className="mb-3 flex justify-center">
                    <BarChart3 className="w-8 h-8 text-orange-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">결과 확인</h4>
                  <p className="text-sm text-gray-600">직관적인 리포트와 문제점 분석</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div
          className={`mt-12 text-center transition-all duration-1000 delay-800 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
          <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">지금 바로 시작해보세요!</h3>
            <p className="text-green-100 mb-6">
              영상을 보셨다면 이제 실제로 AUTA를 사용해보세요. 무료로 모든 기능을 체험할 수 있습니다.
            </p>
            <button className="bg-white text-green-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors duration-200">
              무료로 시작하기
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoGuideSection;
