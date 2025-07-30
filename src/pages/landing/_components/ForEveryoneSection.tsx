import { useEffect, useState } from 'react';

interface RoleContent {
  role: string;
  title: string;
  description: string;
  icon: string;
  benefits: string[];
  color: string;
}

interface ForEveryoneSectionProps {
  className?: string;
  roles?: RoleContent[];
}

const ForEveryoneSection = ({
  className = '',
  roles = [
    {
      role: 'Developers',
      title: '반복 작업은 AUTA에게 맡기고, 창의적인 코드에 집중하세요',
      description: 'YOLO 모델을 통한 정확한 UI 비교로 반복적인 테스트 작업을 자동화합니다.',
      icon: '👨‍💻',
      benefits: ['반복적인 UI 테스트 자동화', '정확한 픽셀 단위 비교', '핵심 기능 개발에 집중'],
      color: 'blue'
    },
    {
      role: 'Designers',
      title: '더 이상 말로 설명하지 마세요',
      description: 'AUTA 리포트로 명확하게 피드백하고, 당신의 디자인 시스템이 잘 지켜지는지 직접 확인하세요.',
      icon: '🎨',
      benefits: ['명확한 시각적 피드백', '디자인 시스템 검증', '의도한 디자인 구현 확인'],
      color: 'purple'
    },
    {
      role: 'PMs & QAs',
      title: '프로젝트의 품질과 팀의 생산성을 동시에 높이세요',
      description: '정량적인 데이터로 UI 완성도를 관리하고, 반복 테스트 비용을 획기적으로 줄일 수 있습니다.',
      icon: '📊',
      benefits: ['정량적 품질 관리', '테스트 비용 절약', '프로젝트 일정 단축'],
      color: 'green'
    }
  ]
}: ForEveryoneSectionProps) => {
  const [activeTab, setActiveTab] = useState(0);
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

    const element = document.getElementById('for-everyone-section');
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
    blue: 'bg-blue-50 border-blue-200 text-blue-800',
    purple: 'bg-purple-50 border-purple-200 text-purple-800',
    green: 'bg-green-50 border-green-200 text-green-800'
  };

  return (
    <section id="for-everyone-section" className={`py-20 bg-gray-50 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            className={`text-4xl md:text-5xl font-bold text-gray-900 mb-6 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
            당신의 역할에 딱 맞는 스마트한 테스트 파트너
          </h2>
          <p
            className={`text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
            각자의 역할에 맞는 AUTA의 활용법을 확인해보세요
          </p>
        </div>

        {/* Tab Navigation */}
        <div
          className={`flex justify-center mb-12 transition-all duration-1000 delay-400 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
          <div className="flex space-x-2 bg-white rounded-xl p-2 shadow-lg">
            {roles.map((role, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === index
                    ? 'bg-green-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}>
                {role.role}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div
          className={`transition-all duration-1000 delay-600 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
          {roles.map((role, index) => (
            <div
              key={index}
              className={`transition-all duration-500 ${
                activeTab === index ? 'block opacity-100' : 'hidden opacity-0'
              }`}>
              <div className="max-w-4xl mx-auto">
                <div className={`p-8 rounded-2xl border-2 ${colorClasses[role.color as keyof typeof colorClasses]}`}>
                  <div className="text-center mb-8">
                    <div className="text-6xl mb-4">{role.icon}</div>
                    <h3 className="text-2xl font-bold mb-4">{role.title}</h3>
                    <p className="text-lg leading-relaxed">{role.description}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {role.benefits.map((benefit, benefitIndex) => (
                      <div key={benefitIndex} className="text-center p-4 bg-white/50 rounded-lg">
                        <div className="text-2xl mb-2">
                          {benefitIndex === 0 && '⚡'}
                          {benefitIndex === 1 && '🎯'}
                          {benefitIndex === 2 && '📈'}
                        </div>
                        <p className="text-sm font-medium">{benefit}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Additional Info */}
                <div className="mt-8 text-center">
                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <h4 className="text-xl font-bold text-gray-900 mb-4">{role.role}를 위한 특별한 기능</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                      {role.benefits.map((benefit, benefitIndex) => (
                        <div key={benefitIndex} className="flex items-center space-x-3">
                          <span className="text-green-500 text-xl">✓</span>
                          <span className="text-gray-700">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div
          className={`mt-16 text-center transition-all duration-1000 delay-800 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
          <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-8 text-white max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">모든 역할에서 AUTA를 활용하세요</h3>
            <p className="text-green-100 mb-6">팀 전체의 생산성을 높이고, 더 나은 제품을 만들어보세요.</p>
            <button className="bg-white text-green-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors duration-200">
              지금 시작하기
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForEveryoneSection;
