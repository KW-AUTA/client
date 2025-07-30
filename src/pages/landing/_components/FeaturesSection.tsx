import { useEffect, useState } from 'react';
import FeatureBadge from './FeatureBadge';
import { Palette, Search, RefreshCw, BarChart3, Zap, Target, TrendingUp } from 'lucide-react';

interface Feature {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  features: string[];
  color: string;
}

interface FeaturesSectionProps {
  className?: string;
  features?: Feature[];
}

const FeaturesSection = ({
  className = '',
  features = [
    {
      title: 'Figma JSON 기반 자동 테스트',
      description:
        'YOLO 모델을 통해 Figma JSON을 추출하여 실제 웹사이트와 비교합니다. 디자이너의 원본이 곧 테스트 케이스가 됩니다.',
      icon: Palette,
      features: ['YOLO모델', 'FigmaJSON추출', '자동테스트'],
      color: 'blue'
    },
    {
      title: '컴포넌트 & 레이아웃 정합성 검증',
      description:
        'YOLO 모델을 통해 추출된 Figma JSON과 실제 웹사이트의 위치, 크기, 색상 등을 비교하여 불일치 항목을 자동으로 감지합니다.',
      icon: Search,
      features: ['JSON비교', '자동감지', '정확한분석'],
      color: 'green'
    },
    {
      title: '사용자 플로우 (라우팅) 검증',
      description:
        '"로그인 버튼을 누르면 마이페이지로 이동한다"와 같은 페이지 간 이동 흐름이 정확하게 작동하는지 자동으로 테스트합니다.',
      icon: RefreshCw,
      features: ['라우팅검증', '플로우테스트', '인터랙션'],
      color: 'purple'
    },
    {
      title: '한눈에 보는 시각적 리포트',
      description: '어디가 어떻게 다른지 직관적으로 보여주는 리포트와 통계로 프로젝트의 UI 품질을 손쉽게 관리하세요.',
      icon: BarChart3,
      features: ['시각적리포트', '통계분석', '품질관리'],
      color: 'orange'
    }
  ]
}: FeaturesSectionProps) => {
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

    const element = document.getElementById('features-section');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  const colorClasses = {
    blue: 'bg-blue-50 border-blue-200 hover:bg-blue-100',
    green: 'bg-green-50 border-green-200 hover:bg-green-100',
    purple: 'bg-purple-50 border-purple-200 hover:bg-purple-100',
    orange: 'bg-orange-50 border-orange-200 hover:bg-orange-100'
  };

  return (
    <section id="features-section" className={`py-20 bg-gray-50 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            className={`text-4xl md:text-5xl font-bold text-gray-900 mb-6 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
            핵심 기능을 매력적으로 소개하다
          </h2>
          <p
            className={`text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
            AUTA의 강력한 기능들로 당신의 프로젝트를 완벽하게 만들어보세요
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`p-8 rounded-2xl border-2 transition-all duration-500 delay-${index * 200} ${
                colorClasses[feature.color as keyof typeof colorClasses]
              } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} hover:shadow-xl hover:scale-105`}>
              <div className="text-center mb-6">
                <div className="mb-4 flex justify-center">
                  <feature.icon className="w-16 h-16 text-gray-700" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-6">{feature.description}</p>
              </div>

              <div className="flex flex-wrap gap-2 justify-center">
                {feature.features.map((tag, tagIndex) => (
                  <FeatureBadge key={tagIndex} text={tag} variant="primary" size="sm" />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div
          className={`mt-16 text-center transition-all duration-1000 delay-800 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">모든 기능이 하나로 통합</h3>
            <p className="text-gray-600 mb-6">
              AUTA는 단순한 UI 테스트 도구가 아닙니다. 디자인부터 개발, QA까지 전체 프로세스를 자동화하여 팀의 생산성을
              극대화합니다.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="mb-2 flex justify-center">
                  <Zap className="w-8 h-8 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">빠른 설정</h4>
                <p className="text-sm text-gray-600">3분 만에 완료</p>
              </div>
              <div className="text-center">
                <div className="mb-2 flex justify-center">
                  <Target className="w-8 h-8 text-green-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">정확한 분석</h4>
                <p className="text-sm text-gray-600">픽셀 단위 비교</p>
              </div>
              <div className="text-center">
                <div className="mb-2 flex justify-center">
                  <TrendingUp className="w-8 h-8 text-orange-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">효율성 증대</h4>
                <p className="text-sm text-gray-600">90% 시간 절약</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
