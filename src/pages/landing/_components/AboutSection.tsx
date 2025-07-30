interface FAQ {
  question: string;
  answer: string;
}

interface TeamMember {
  name: string;
  role: string;
  image?: string;
}

interface AboutSectionProps {
  className?: string;
  title?: string;
  description?: string;
  faqs?: FAQ[];
  teamMembers?: TeamMember[];
}

const AboutSection = ({
  className = '',
  title = '더 나은 제품 개발 문화를 꿈꾸는 우리는 AUTA 팀입니다.',
  description = '저희는 광운대학교 인공지능융합대학 정보융합학부 학생들로, 개발자와 디자이너의 협업 과정에서 발생하는 비효율에 깊이 공감하며 이 프로젝트를 시작했습니다. AUTA를 통해 반복적인 테스트 시간을 줄이고, 모두가 더 가치 있는 일에 집중하는 문화를 만들고 싶습니다.',
  faqs = [
    {
      question: '무료로 사용할 수 있나요?',
      answer: '네, 현재 모든 기능을 무료로 제공하고 있습니다. 마음껏 사용해보시고 피드백을 들려주세요!'
    },
    {
      question: '제 데이터는 안전한가요?',
      answer: '그럼요. 사용자의 소중한 데이터는 테스트 목적 외에는 절대 사용되지 않으며 안전하게 관리됩니다.'
    },
    {
      question: '문의는 어디로 하나요?',
      answer: '궁금한 점은 카카오톡 오픈채팅방으로 언제든지 편하게 질문해주세요.'
    }
  ],
  teamMembers = [
    { name: '오준혁', role: '백엔드/인프라 개발' },
    { name: '송인섭', role: 'AI 개발' },
    { name: '최현준', role: '프론트엔드 개발' },
    { name: '홍유진', role: '프론트엔드 개발' }
  ]
}: AboutSectionProps) => {
  return (
    <section id="about" className={`py-20 bg-white ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">{title}</h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">{description}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
          {/* Team Members */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-8">팀원 소개</h3>
            <div className="grid grid-cols-2 gap-6">
              {teamMembers.map((member, index) => (
                <div key={index} className="text-center p-6 bg-gray-50 rounded-xl">
                  <div className="w-20 h-20 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl">👤</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">{member.name}</h4>
                  <p className="text-sm text-gray-600">{member.role}</p>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-8">자주 묻는 질문</h3>
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-3">{faq.question}</h4>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
