import { useEffect, useState } from 'react';

interface FAQ {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  className?: string;
  faqs?: FAQ[];
}

const FAQSection = ({
  className = '',
  faqs = [
    {
      question: '광운대학교 캡스톤 프로젝트인데, 계속 운영되나요?',
      answer:
        '본 프로젝트는 광운대학교 인공지능융합대학 정보융합학부 학생들의 열정으로 시작되었습니다. 성공적인 운영을 통해 지속 가능한 서비스로 발전시키는 것을 목표로 하고 있습니다.'
    },
    {
      question: '어떤 웹사이트에서 사용 가능한가요?',
      answer:
        '현재 React 프레임워크로 제작된 웹 환경을 중심으로 지원하고 있으며, 지원 범위를 계속해서 넓혀갈 예정입니다.'
    },
    {
      question: '사용 요금은 어떻게 되나요?',
      answer:
        '현재는 베타 서비스 기간으로 모든 기능을 무료로 사용하실 수 있습니다. 마음껏 테스트하고 피드백을 들려주세요!'
    },
    {
      question: '제 피그마 파일과 데이터는 안전하게 관리되나요?',
      answer: '그럼요. 사용자의 데이터는 안전하게 암호화되어 관리되며, 테스트 목적 외에는 절대 사용되지 않습니다.'
    },
    {
      question: 'AUTA는 어떤 기술을 사용하나요?',
      answer:
        'AUTA는 YOLO 모델을 통해 Figma JSON을 추출하고 실제 웹사이트와 상호 비교하는 기술을 사용합니다. 이를 통해 디자인과 구현의 정합성을 정확하게 검증할 수 있습니다.'
    },
    {
      question: '팀 규모에 상관없이 사용할 수 있나요?',
      answer:
        '네, 1인 개발자부터 대규모 팀까지 모두 사용할 수 있습니다. 프로젝트 규모에 맞는 유연한 설정이 가능하며, 팀 협업 기능도 제공합니다.'
    }
  ]
}: FAQSectionProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
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

    const element = document.getElementById('faq-section');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq-section" className={`py-20 bg-white ${className}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            className={`text-4xl md:text-5xl font-bold text-gray-900 mb-6 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
            궁금증을 미리 해결하다
          </h2>
          <p
            className={`text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
            자주 묻는 질문들을 모았습니다. 더 궁금한 점이 있으시면 언제든 문의해주세요!
          </p>
        </div>

        <div
          className={`space-y-4 transition-all duration-1000 delay-400 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`bg-gray-50 rounded-xl border border-gray-200 transition-all duration-300 ${
                openIndex === index ? 'shadow-lg' : 'hover:shadow-md'
              }`}>
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-100 transition-colors duration-200 rounded-xl">
                <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
                <span
                  className={`text-gray-500 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}>
                  ▼
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                <div className="px-6 pb-4 text-gray-600 leading-relaxed">{faq.answer}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Info */}
        <div
          className={`mt-16 text-center transition-all duration-1000 delay-600 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 border-2 border-green-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">더 궁금한 점이 있으신가요?</h3>
            <p className="text-gray-600 mb-6">언제든지 카카오톡 오픈채팅방으로 편하게 문의해주세요.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center space-x-2">
                <span>💬</span>
                <span>카카오톡 문의하기</span>
              </button>
              <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200">
                무료로 시작하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
