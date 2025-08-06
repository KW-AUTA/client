import { useEffect, useState } from 'react';
import { Code, Palette, BarChart3, X, Check } from 'lucide-react';

interface ProblemSectionProps {
  className?: string;
}

const ProblemSection = ({ className = '' }: ProblemSectionProps) => {
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

    const element = document.getElementById('problem-section');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  const problems = [
    {
      role: 'Developers',
      title: '끝없는 픽셀 단위 수정 요청',
      description: '반복적인 UI 테스트에 드는 시간을 핵심 기능 개발에 사용하세요.',
      icon: Code,
      color: 'blue'
    },
    {
      role: 'Designers',
      title: '스크린샷과 문서 정리의 번거로움',
      description:
        '내가 의도한 디자인이 정확히 구현되었는지 확인하기 위해 스크린샷을 찍고 문서로 정리하는 번거로움을 해결하세요.',
      icon: Palette,
      color: 'purple'
    },
    {
      role: 'PMs & QAs',
      title: '수동 테스트로 인한 병목 현상',
      description: '수동 테스트로 인한 병목 현상을 제거하고, 프로젝트 출시 일정을 앞당기세요.',
      icon: BarChart3,
      color: 'green'
    }
  ];

  const colorClasses = {
    blue: 'bg-blue-50 border-blue-200 text-blue-800',
    purple: 'bg-purple-50 border-purple-200 text-purple-800',
    green: 'bg-green-50 border-green-200 text-green-800'
  };

  return (
    <section id="problem-section" className={`py-20 bg-white ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            className={`text-4xl md:text-5xl font-bold text-gray-900 mb-6 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
            "이 버튼, 디자인이랑 다른데요?"
          </h2>
          <p
            className={`text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
            반복되는 UI 수정, 지치지 않으셨나요?
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {problems.map((problem, index) => (
            <div
              key={index}
              className={`p-8 rounded-2xl border-2 transition-all duration-500 delay-${index * 200} ${
                colorClasses[problem.color as keyof typeof colorClasses]
              } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="text-center">
                <div className="mb-4 flex justify-center">
                  <problem.icon className="w-16 h-16 text-gray-700" />
                </div>
                <h3 className="text-xl font-bold mb-4">{problem.role}</h3>
                <h4 className="text-lg font-semibold mb-4">{problem.title}</h4>
                <p className="text-sm leading-relaxed">{problem.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Visual Transition */}
        <div
          className={`text-center transition-all duration-1000 delay-600 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-red-50 to-green-50 rounded-2xl p-8 border-2 border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-red-600 mb-4">Before AUTA</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <X className="w-5 h-5 text-red-500" />
                      <span className="text-sm">복잡한 피드백 과정</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <X className="w-5 h-5 text-red-500" />
                      <span className="text-sm">수동 테스트의 번거로움</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <X className="w-5 h-5 text-red-500" />
                      <span className="text-sm">시간과 비용 낭비</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-green-600 mb-4">After AUTA</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Check className="w-5 h-5 text-green-500" />
                      <span className="text-sm">자동화된 테스트</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Check className="w-5 h-5 text-green-500" />
                      <span className="text-sm">명확한 리포트</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Check className="w-5 h-5 text-green-500" />
                      <span className="text-sm">효율적인 협업</span>
                    </div>
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

export default ProblemSection;
