import { useEffect, useState } from 'react';
import FeatureBadge from './FeatureBadge';

interface Step {
  title: string;
  description: string;
  features: string[];
  icon: string;
}

interface HowItWorksSectionProps {
  className?: string;
  steps?: Step[];
  videoUrl?: string;
  videoTitle?: string;
}

const HowItWorksSection = ({
  className = '',
  steps = [
    {
      title: '연동하고 비교하기',
      description:
        'Figma 파일을 올리고 서비스 URL을 입력하세요. AUTA가 즉시 디자인과 실제 구현 화면의 모든 요소를 픽셀 단위로 비교하여 정합성을 분석합니다.',
      features: ['No-Code', 'Figma연동', '컴포넌트_정합성'],
      icon: '📁'
    },
    {
      title: '흐름과 동작 검증하기',
      description:
        '페이지 이동(라우팅)은 정확한지, 버튼 클릭이나 Hover 같은 핵심 인터랙션은 의도대로 작동하는지 자동으로 검증하여 놓치기 쉬운 오류까지 잡아냅니다.',
      features: ['라우팅_검증', '인터랙션_테스트'],
      icon: '🔄'
    },
    {
      title: '한눈에 리포트 확인하기',
      description:
        '어디가 어떻게 다른지 직관적인 시각적 리포트로 확인하세요. 문제점을 바로 파악하고 팀원과 손쉽게 공유할 수 있습니다.',
      features: ['시각적_리포트', '문제점_자동감지'],
      icon: '📊'
    }
  ],
  videoUrl = 'https://www.youtube.com/embed/pZ-hYhXEerU?autoplay=0&mute=1&loop=1&playlist=pZ-hYhXEerU',
  videoTitle = 'AUTA 플러그인 사용법 안내'
}: HowItWorksSectionProps) => {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [steps.length]);

  return (
    <section id="how-it-works" className={`py-20 bg-gray-50 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Figma 업로드부터 리포트까지, 단 3단계면 충분합니다.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`relative p-8 rounded-2xl transition-all duration-500 ${
                activeStep === index ? 'bg-white shadow-2xl scale-105' : 'bg-white/60 shadow-lg'
              }`}>
              <div className="text-center">
                <div
                  className={`text-6xl mb-4 transition-transform duration-500 ${
                    activeStep === index ? 'scale-110' : 'scale-100'
                  }`}>
                  {step.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{step.description}</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {step.features.map((feature, featureIndex) => (
                    <FeatureBadge key={featureIndex} text={feature} variant="primary" size="sm" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Video Section */}
        <div className="text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-8">실제로 보면 더 쉬워집니다</h3>
          <div className="max-w-4xl mx-auto">
            <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden">
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
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
