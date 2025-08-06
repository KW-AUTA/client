interface TeamMember {
  name: string;
  role: string;
  image?: string;
}

interface AboutSectionProps {
  className?: string;
  title?: string;
  description?: string;
  teamMembers?: TeamMember[];
}

const AboutSection = ({
  className = '',
  title = '더 나은 제품 개발 문화를 꿈꾸는 우리는 AUTA 팀입니다.',
  description = '저희는 광운대학교 인공지능융합대학 정보융합학부 학생들로, 개발자와 디자이너의 협업 과정에서 발생하는 비효율에 깊이 공감하며 이 프로젝트를 시작했습니다. AUTA를 통해 반복적인 테스트 시간을 줄이고, 모두가 더 가치 있는 일에 집중하는 문화를 만들고 싶습니다.',
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

        <div className="max-w-4xl mx-auto">
          {/* Team Members */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">팀원 소개</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamMembers.map((member, index) => (
                <div
                  key={index}
                  className="text-center p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow duration-300">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl text-white font-bold">{member.name.charAt(0)}</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">{member.name}</h4>
                  <p className="text-sm text-gray-600">{member.role}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Vision Statement */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 border-2 border-green-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">우리의 비전</h3>
            <p className="text-gray-700 leading-relaxed text-center">
              저희는 개발자와 디자이너의 협업 효율을 높이는 문제에 깊이 공감하며 이 프로젝트를 시작했습니다. AUTA를 통해
              반복적인 테스트 시간을 줄이고, 모두가 더 가치 있는 일에 집중하는 문화를 만들고 싶습니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
