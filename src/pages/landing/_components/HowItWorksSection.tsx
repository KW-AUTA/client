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
      title: '프로젝트 생성',
      description: '테스트할 프로젝트 이름과 서비스 URL을 입력합니다. 간단한 설정으로 바로 시작할 수 있습니다.',
      features: ['간단설정', '빠른시작', '직관적UI'],
      icon: '🚀'
    },
    {
      title: 'Figma JSON 추출',
      description:
        'YOLO 모델을 통해 Figma 파일에서 JSON 데이터를 추출합니다. 디자이너의 원본이 곧 테스트 기준이 됩니다.',
      features: ['YOLO모델', 'JSON추출', '원본기준'],
      icon: '📁'
    },
    {
      title: '자동 테스트 실행',
      description: '추출된 Figma JSON과 실제 웹사이트를 비교 분석합니다. 정확한 비교로 놓치는 부분이 없습니다.',
      features: ['JSON비교', '자동분석', '정확한검증'],
      icon: '🔍'
    },
    {
      title: '시각적 리포트 확인',
      description:
        '한눈에 들어오는 리포트로 불일치 항목을 즉시 확인하고 수정합니다. 팀원과 쉽게 공유할 수 있는 명확한 결과를 제공합니다.',
      features: ['시각적리포트', '즉시확인', '팀공유'],
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
            AUTA는 4단계로 구성되어 있습니다.
            <br />
            Figma json 파일을 올리고 결과를 확인하세요.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
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
