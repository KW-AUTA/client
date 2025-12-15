import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { PlayCircle, CheckCircle2, AlertCircle, BarChart3, ChevronLeft, ChevronRight } from 'lucide-react';
import { ROUTES } from '@/constants';
import Badge from '../components/atoms/Badge';
import GlassCard from '../components/atoms/GlassCard';
import translations from '@/locales/ko-v4.json';
import CircleProgressBar from '@/components/ui/progressBar/CircleProgressBar';
import { colors } from '@/styles/theme/colors';
import ProjectIcon from '@/assets/icons/dash-project.svg?react';
import TestIcon from '@/assets/icons/dash-projecting.svg?react';
import IncompleteIcon from '@/assets/icons/dash-test.svg?react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import sampleKwImage from '@/assets/images/sample-kw.png';
import MetricCards from '../components/molecules/MetricCards';
import EfficiencyCompare from '../components/molecules/EfficiencyCompare';

/**
 * v4 Hero 섹션 (Above the fold, Glassmorphism 대시보드)
 * Glassmorphism 기반 데이터 인사이트 대시보드
 */
export const Hero = () => {
  const { hero } = translations;
  const [isVisible, setIsVisible] = useState(false);
  const dashboardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.01 }
    );

    if (dashboardRef.current) {
      observer.observe(dashboardRef.current);
    }

    return () => {
      if (dashboardRef.current) {
        observer.unobserve(dashboardRef.current);
      }
    };
  }, []);

  // 테스트 통계 데이터 (기존 CircleProgressBar용)
  const testStatsData = [
    { label: 'TOTAL', value: 89, color: '#E48989' },
    { label: 'ROUTING', value: 100, color: colors.teal_1 },
    { label: 'INTERACTION', value: 80, color: colors.purple_1 },
    { label: 'COMPONENT', value: 90, color: colors.brown_1 }
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-start overflow-hidden pt-24 pb-32 md:pb-40">
      <div className="relative z-10 max-w-[1120px] mx-auto px-5 md:px-8 py-20 w-full">
        <div className="text-center max-w-4xl mx-auto relative w-full">
          {/* Badges (2개) */}
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            <Badge variant="brand" className="inline-flex">
              {hero.badge1}
            </Badge>
            <Badge variant="brand" className="inline-flex">
              {hero.badge2}
            </Badge>
          </div>

          {/* 메인 헤드라인 */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-neutral-900 mb-6 leading-tight">
            <span className="text-3xl md:text-5xl lg:text-4xl">{hero.title1}</span>
            <br />
            <span className="text-4xl md:text-6xl lg:text-7xl">{hero.title2}</span>
          </h1>

          {/* 서브헤드라인 (3줄) */}
          <div className="text-lg md:text-xl text-neutral-700 mb-10 leading-relaxed max-w-3xl mx-auto space-y-3">
            <p>{hero.subtitle}</p>
            <p>{hero.subtitle2}</p>
            <p className="font-semibold text-neutral-900">{hero.subtitle3}</p>
          </div>

          {/* CTA 버튼 */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-24">
            <Link to={ROUTES.LOGIN}>
              <button className="bg-[#5CA585] hover:bg-[#5CA585]/90 text-white text-lg px-10 py-4 rounded-xl font-bold transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl">
                {hero.primary}
              </button>
            </Link>
            <a href="#video-tutorial">
              <button className="flex items-center space-x-2 text-[#5CA585] hover:text-[#5CA585]/80 text-lg font-medium transition-colors">
                <PlayCircle className="w-6 h-6" />
                <span>{hero.secondary}</span>
              </button>
            </a>
          </div>

          {/* 모델 성능 & 효율 비교 섹션 */}
          <div
            className={`w-full max-w-6xl mx-auto mt-48 mb-32 transition-all duration-1000 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
              {/* 모델 성능 카드 (2/3 영역) */}
              <div className="lg:col-span-2 h-full">
                <MetricCards />
              </div>

              {/* 효율 비교 (1/3 영역) */}
              <div className="lg:col-span-1 h-full">
                <EfficiencyCompare />
              </div>
            </div>
          </div>

          {/* Glassmorphism 대시보드 캐러셀 */}
          <div
            ref={dashboardRef}
            className={`relative w-full max-w-6xl mx-auto mt-48 mb-0 hidden md:block transition-all duration-1000 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}>
            {/* 커스텀 네비게이션 버튼 (카드 밖, 중앙) */}
            <button className="swiper-button-prev-custom absolute left-[-60px] top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm shadow-lg border border-[#e9f3ef] flex items-center justify-center hover:bg-white transition-colors">
              <ChevronLeft className="w-6 h-6 text-[#5CA585]" />
            </button>
            <button className="swiper-button-next-custom absolute right-[-60px] top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm shadow-lg border border-[#e9f3ef] flex items-center justify-center hover:bg-white transition-colors">
              <ChevronRight className="w-6 h-6 text-[#5CA585]" />
            </button>

            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              navigation={{
                nextEl: '.swiper-button-next-custom',
                prevEl: '.swiper-button-prev-custom'
              }}
              pagination={{
                clickable: true,
                bulletClass: 'swiper-pagination-bullet-custom',
                bulletActiveClass: 'swiper-pagination-bullet-active-custom'
              }}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false
              }}
              loop={true}
              className="dashboard-carousel"
              style={
                {
                  '--swiper-navigation-color': '#5CA585',
                  '--swiper-pagination-color': '#5CA585',
                  '--swiper-pagination-bullet-size': '8px'
                } as React.CSSProperties
              }>
              {/* 슬라이드 1: 대시보드 (이미지 1) */}
              <SwiperSlide>
                <div className="flex flex-col items-center gap-2 h-[600px] justify-center">
                  <div className="text-center w-full mb-1">
                    <h3 className="text-2xl font-bold text-neutral-900 mb-1">대시보드</h3>
                    <p className="text-sm text-neutral-600 mb-2">전체 프로젝트와 테스트 현황을 한눈에 확인하세요</p>
                    <p className="text-xs text-neutral-500 leading-relaxed max-w-2xl mx-auto whitespace-nowrap overflow-hidden text-ellipsis">
                      진행 중인 프로젝트, 완료된 테스트, 미완료 테스트를 실시간으로 모니터링하고, 프로젝트 관리와 테스트
                      관리를 통합적으로 관리할 수 있습니다.
                    </p>
                  </div>
                  <div className="w-full space-y-2 flex-1 flex flex-col justify-center">
                    {/* Overview 카드 3개 */}
                    <div className="grid grid-cols-3 gap-2">
                      <GlassCard className="p-6 h-full min-h-[200px]">
                        <div className="flex flex-col justify-between h-full">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 rounded-lg bg-[#D5B8D5]">
                              <ProjectIcon className="w-4 h-4 text-neutral-900" />
                            </div>
                            <h3 className="text-[14px] font-bold text-neutral-900">진행 중인 프로젝트</h3>
                          </div>
                          <div className="flex items-end gap-2">
                            <span className="text-4xl font-extrabold text-neutral-900">4</span>
                            <span className="text-base font-bold text-neutral-600 mb-1">개</span>
                          </div>
                        </div>
                      </GlassCard>
                      <GlassCard className="p-6 h-full min-h-[200px]">
                        <div className="flex flex-col justify-between h-full">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 rounded-lg bg-[#D5B8D5]">
                              <TestIcon className="w-4 h-4 text-neutral-900" />
                            </div>
                            <h3 className="text-[14px] font-bold text-neutral-900">완료된 테스트</h3>
                          </div>
                          <div className="flex items-end gap-2">
                            <span className="text-4xl font-extrabold text-neutral-900">160</span>
                            <span className="text-base font-bold text-neutral-600 mb-1">개</span>
                          </div>
                        </div>
                      </GlassCard>
                      <GlassCard className="p-6 h-full min-h-[200px]">
                        <div className="flex flex-col justify-between h-full">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 rounded-lg bg-[#D5B8D5]">
                              <IncompleteIcon className="w-4 h-4 text-neutral-900" />
                            </div>
                            <h3 className="text-[14px] font-bold text-neutral-900">미완료 테스트</h3>
                          </div>
                          <div className="flex items-end gap-2">
                            <span className="text-4xl font-extrabold text-neutral-900">23</span>
                            <span className="text-base font-bold text-neutral-600 mb-1">개</span>
                          </div>
                        </div>
                      </GlassCard>
                    </div>

                    {/* 프로젝트 관리 & 테스트 관리 테이블 */}
                    <div className="grid grid-cols-2 gap-4">
                      {/* 프로젝트 관리 */}
                      <GlassCard className="p-4 h-full">
                        <h3 className="text-[14px] font-bold text-neutral-900 mb-2">프로젝트 관리</h3>
                        <div className="overflow-hidden rounded-lg">
                          <div className="grid grid-cols-4 bg-[#e9f3ef]/50 p-2 gap-2 text-xs font-bold text-neutral-900">
                            <div className="text-center">프로젝트 명</div>
                            <div className="text-center">프로젝트 관리자</div>
                            <div className="text-center">마감일</div>
                            <div className="text-center">진행 상태</div>
                          </div>
                          <div className="space-y-0">
                            <div className="grid grid-cols-4 p-2 hover:bg-white/30 transition-colors border-t border-[#e9f3ef] text-xs">
                              <div className="text-center font-medium text-neutral-900 truncate">
                                AUTA 테스트 프로젝트
                              </div>
                              <div className="text-center font-medium text-neutral-900">테스트유저</div>
                              <div className="text-center font-medium text-neutral-900">2025-11-29</div>
                              <div className="text-center font-medium text-neutral-900">
                                <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500 mr-1"></span>
                                완료
                              </div>
                            </div>
                            <div className="grid grid-cols-4 p-2 hover:bg-white/30 transition-colors border-t border-[#e9f3ef] text-xs">
                              <div className="text-center font-medium text-neutral-900 truncate">Jane의 프로젝트</div>
                              <div className="text-center font-medium text-neutral-900">테스트유저</div>
                              <div className="text-center font-medium text-neutral-900">2025-11-14</div>
                              <div className="text-center font-medium text-neutral-900">
                                <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500 mr-1"></span>
                                완료
                              </div>
                            </div>
                            <div className="grid grid-cols-4 p-2 hover:bg-white/30 transition-colors border-t border-[#e9f3ef] text-xs">
                              <div className="text-center font-medium text-neutral-900 truncate">광운대 홈페이지</div>
                              <div className="text-center font-medium text-neutral-900">테스트유저</div>
                              <div className="text-center font-medium text-neutral-900">2025-11-14</div>
                              <div className="text-center font-medium text-neutral-900">
                                <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500 mr-1"></span>
                                완료
                              </div>
                            </div>
                            <div className="grid grid-cols-4 p-2 hover:bg-white/30 transition-colors border-t border-[#e9f3ef] text-xs">
                              <div className="text-center font-medium text-neutral-900 truncate">
                                광운대 홈페이지 프로젝트
                              </div>
                              <div className="text-center font-medium text-neutral-900">테스트유저</div>
                              <div className="text-center font-medium text-neutral-900">2025-11-08</div>
                              <div className="text-center font-medium text-neutral-900">
                                <span className="inline-block w-1.5 h-1.5 rounded-full bg-gray-400 mr-1"></span>
                                진행 전
                              </div>
                            </div>
                          </div>
                        </div>
                      </GlassCard>

                      {/* 테스트 관리 */}
                      <GlassCard className="p-4 h-full">
                        <h3 className="text-[14px] font-bold text-neutral-900 mb-2">테스트 관리</h3>
                        <div className="overflow-hidden rounded-lg">
                          <div className="grid grid-cols-4 bg-[#e9f3ef]/50 p-2 gap-2 text-xs font-bold text-neutral-900">
                            <div className="text-center">프로젝트 명</div>
                            <div className="text-center">테스트 유형</div>
                            <div className="text-center">성공 여부</div>
                            <div className="text-center">페이지 명</div>
                          </div>
                          <div className="space-y-0">
                            <div className="grid grid-cols-4 p-2 hover:bg-white/30 transition-colors border-t border-[#e9f3ef] text-xs">
                              <div className="text-center font-medium text-neutral-900 truncate">
                                광운대 홈페이지 프로젝트
                              </div>
                              <div className="text-center font-medium text-neutral-900">
                                <span className="inline-flex items-center font-bold">
                                  <span className="w-2 h-2 rounded-sm mr-1 bg-yellow-400"></span>
                                  MAPPING
                                </span>
                              </div>
                              <div className="text-center font-medium text-neutral-900">
                                <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-500 mr-1"></span>
                                실패
                              </div>
                              <div className="text-center font-medium text-neutral-900 truncate">산학협력단</div>
                            </div>
                            <div className="grid grid-cols-4 p-2 hover:bg-white/30 transition-colors border-t border-[#e9f3ef] text-xs">
                              <div className="text-center font-medium text-neutral-900 truncate">
                                광운대 홈페이지 프로젝트
                              </div>
                              <div className="text-center font-medium text-neutral-900">
                                <span className="inline-flex items-center font-bold">
                                  <span className="w-2 h-2 rounded-sm mr-1 bg-yellow-400"></span>
                                  MAPPING
                                </span>
                              </div>
                              <div className="text-center font-medium text-neutral-900">
                                <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500 mr-1"></span>
                                통과
                              </div>
                              <div className="text-center font-medium text-neutral-900 truncate">산학협력단</div>
                            </div>
                            <div className="grid grid-cols-4 p-2 hover:bg-white/30 transition-colors border-t border-[#e9f3ef] text-xs">
                              <div className="text-center font-medium text-neutral-900 truncate">
                                광운대 홈페이지 프로젝트
                              </div>
                              <div className="text-center font-medium text-neutral-900">
                                <span className="inline-flex items-center font-bold">
                                  <span className="w-2 h-2 rounded-sm mr-1 bg-yellow-400"></span>
                                  MAPPING
                                </span>
                              </div>
                              <div className="text-center font-medium text-neutral-900">
                                <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500 mr-1"></span>
                                통과
                              </div>
                              <div className="text-center font-medium text-neutral-900 truncate">산학협력단</div>
                            </div>
                            <div className="grid grid-cols-4 p-2 hover:bg-white/30 transition-colors border-t border-[#e9f3ef] text-xs">
                              <div className="text-center font-medium text-neutral-900 truncate">
                                광운대 홈페이지 프로젝트
                              </div>
                              <div className="text-center font-medium text-neutral-900">
                                <span className="inline-flex items-center font-bold">
                                  <span className="w-2 h-2 rounded-sm mr-1 bg-yellow-400"></span>
                                  MAPPING
                                </span>
                              </div>
                              <div className="text-center font-medium text-neutral-900">
                                <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500 mr-1"></span>
                                통과
                              </div>
                              <div className="text-center font-medium text-neutral-900 truncate">산학협력단</div>
                            </div>
                          </div>
                        </div>
                      </GlassCard>
                    </div>
                  </div>
                </div>
              </SwiperSlide>

              {/* 슬라이드 2: 프로젝트 상세 페이지 */}
              <SwiperSlide>
                <div className="flex flex-col items-center gap-2 h-[600px] justify-center">
                  <div className="text-center w-full mb-1">
                    <h3 className="text-2xl font-bold text-neutral-900 mb-1">프로젝트 상세 페이지</h3>
                    <p className="text-sm text-neutral-600 mb-2 whitespace-nowrap">
                      LLM 평가 결과와 테스트 결과를 확인하세요
                    </p>
                    <p className="text-xs text-neutral-500 leading-relaxed max-w-2xl mx-auto whitespace-nowrap overflow-hidden text-ellipsis">
                      LLM 기반 UX/UI 평가 점수와 상세 피드백을 확인하고, ROUTING, INTERACTION, COMPONENT 매칭 테스트
                      결과를 페이지별로 분석할 수 있습니다.
                    </p>
                  </div>
                  <div className="w-full space-y-2 flex-1 flex flex-col justify-center overflow-hidden">
                    {/* LLM UX/UI 평가 결과 */}
                    <GlassCard className="p-3">
                      <div className="flex flex-col">
                        <h4 className="text-[14px] font-bold text-neutral-900 mb-2">LLM UX/UI 평가 결과</h4>
                        <div className="flex gap-3 items-stretch">
                          {/* 왼쪽: 점수 표시 */}
                          <div className="flex flex-col items-center justify-center px-5 border-2 border-[#5CA585] rounded-xl bg-[#5CA585]/10 flex-shrink-0 min-w-[140px] self-stretch">
                            <p className="text-3xl font-bold text-[#5CA585] mb-1">85</p>
                            <div className="text-[10px] text-center">
                              <p className="font-semibold text-neutral-900">점수</p>
                              <p className="text-neutral-600">100점 만점</p>
                            </div>
                          </div>
                          {/* 오른쪽: 웹페이지 미리보기 + 피드백 */}
                          <div className="flex-1 flex flex-col gap-2">
                            {/* 웹페이지 미리보기 영역 */}
                            <div className="bg-gray-100 rounded-lg border border-gray-200 overflow-hidden h-[160px] flex items-center justify-center">
                              <img
                                src={sampleKwImage}
                                alt="웹페이지 미리보기"
                                className="max-w-full max-h-full object-contain"
                              />
                            </div>
                            {/* 피드백 */}
                            <div className="bg-gray-50/80 rounded-lg p-2 border border-gray-200">
                              <div className="flex items-center gap-1.5 text-[9px]">
                                <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full bg-green-500 text-white font-bold flex-shrink-0 text-[12px]">
                                  1
                                </span>
                                <span className="text-neutral-700 text-[12px]">
                                  화면은 정보가 많고 시각적 흐름이 부족하여 사용자 경험이 다소 복잡할 수 있습니다.
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </GlassCard>
                    {/* 테스트 결과 */}
                    <GlassCard className="p-3">
                      <div className="flex flex-col">
                        <h4 className="text-[14px] font-bold text-neutral-900 mb-2">테스트 결과</h4>
                        <div className="flex gap-3">
                          {/* 테스트 그래프 */}
                          <div className="flex flex-col gap-1.5 flex-1 py-1">
                            <div className="w-full">
                              <div className="flex justify-center mb-1">
                                <span className="font-bold text-[10px] text-neutral-900">ROUTING</span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <div className="w-full bg-[#DDDDDD] rounded-full h-4 overflow-hidden relative">
                                  <div
                                    className="h-full rounded-full transition-all duration-300 ease-in-out"
                                    style={{ width: '3%', backgroundColor: colors.teal_1 }}
                                  />
                                </div>
                                <span className="font-bold text-[10px] text-neutral-900">3%</span>
                              </div>
                            </div>
                            <div className="w-full">
                              <div className="flex justify-center mb-1">
                                <span className="font-bold text-[10px] text-neutral-900">INTERACTION</span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <div className="w-full bg-[#DDDDDD] rounded-full h-4 overflow-hidden relative">
                                  <div
                                    className="h-full rounded-full transition-all duration-300 ease-in-out"
                                    style={{ width: '7%', backgroundColor: colors.purple_1 }}
                                  />
                                </div>
                                <span className="font-bold text-[10px] text-neutral-900">7%</span>
                              </div>
                            </div>
                            <div className="w-full">
                              <div className="flex justify-center mb-1">
                                <span className="font-bold text-[10px] text-neutral-900">COMPONENT</span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <div className="w-full bg-[#DDDDDD] rounded-full h-4 overflow-hidden relative">
                                  <div
                                    className="h-full rounded-full transition-all duration-300 ease-in-out"
                                    style={{ width: '91%', backgroundColor: colors.brown_1 }}
                                  />
                                </div>
                                <span className="font-bold text-[10px] text-neutral-900">91%</span>
                              </div>
                            </div>
                          </div>
                          {/* 페이지 테이블 */}
                          <div className="flex-1 overflow-hidden">
                            <div className="overflow-y-auto">
                              <table className="w-full text-center table-fixed text-[9px]">
                                <thead>
                                  <tr className="text-neutral-900 font-bold border-b border-[#CCCCCC]">
                                    <th className="py-1.5 w-1/2">페이지명</th>
                                    <th className="py-1.5 w-1/2">페이지 URL</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr className="hover:bg-white/30 transition-colors">
                                    <td className="py-1.5 text-neutral-600 truncate">home</td>
                                    <td className="py-1.5 text-neutral-600 truncate">https://www.kw.ac.kr/ko</td>
                                  </tr>
                                  <tr className="hover:bg-white/30 transition-colors">
                                    <td className="py-1.5 text-neutral-600 truncate">kw출첵</td>
                                    <td className="py-1.5 text-neutral-600 truncate">https://klas.kw.ac.kr/...</td>
                                  </tr>
                                  <tr className="hover:bg-white/30 transition-colors">
                                    <td className="py-1.5 text-neutral-600 truncate">산학협력단</td>
                                    <td className="py-1.5 text-neutral-600 truncate">https://iacf.kw.ac.kr/</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </GlassCard>
                  </div>
                </div>
              </SwiperSlide>

              {/* 슬라이드 3: 테스트 상세 페이지 */}
              <SwiperSlide>
                <div className="flex flex-col items-center gap-2 h-[600px] justify-center">
                  <div className="text-center w-full mb-1">
                    <h3 className="text-2xl font-bold text-neutral-900 mb-1">테스트 상세 페이지</h3>
                    <p className="text-sm text-neutral-600 mb-2 whitespace-nowrap">
                      테스트 통계와 상세 이슈 정보를 확인하세요
                    </p>
                    <p className="text-xs text-neutral-500 leading-relaxed max-w-2xl mx-auto whitespace-nowrap overflow-hidden text-ellipsis">
                      TOTAL, ROUTING, INTERACTION, COMPONENT 테스트 통계를 원형 그래프로 확인하고, 컴포넌트 매핑 이슈의
                      상세 내용과 위치를 정확히 파악할 수 있습니다.
                    </p>
                  </div>
                  <div className="w-full space-y-2 flex-1 flex flex-col justify-center">
                    {/* 테스트 통계 */}
                    <GlassCard className="p-6 flex-shrink-0">
                      <div className="flex flex-col">
                        <h4 className="text-[14px] font-bold text-neutral-900 mb-5">테스트 통계</h4>
                        <div className="grid grid-cols-4 gap-3 items-center">
                          {testStatsData.map((stat, idx) => (
                            <CircleProgressBar
                              key={idx}
                              value={stat.value}
                              label={stat.label}
                              color={stat.color}
                              size={75}
                              thickness={6}
                            />
                          ))}
                        </div>
                      </div>
                    </GlassCard>
                    {/* 컴포넌트 이슈 상세 */}
                    <GlassCard className="p-5 flex-shrink-0">
                      <div className="flex flex-col">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-[14px] font-bold text-neutral-900">컴포넌트 매핑 이슈 1</h4>
                          <button className="text-[16px] text-neutral-600 hover:text-neutral-900">
                            <ChevronRight className="w-3 h-3" />
                          </button>
                        </div>
                        <div className="flex flex-row gap-2 mb-3">
                          {/* 이슈 상세 */}
                          <div className="bg-red-50/80 border border-red-200/50 rounded-lg p-3 backdrop-blur-sm flex-1 flex flex-col justify-center max-h-[100px]">
                            <div className="text-[14px] font-bold text-red-800 mb-0.5">interaction 작동 안됨</div>
                            <div className="text-[12px] text-red-700 space-y-0">
                              <div>컴포넌트 이름: notice봉사</div>
                              <div>실패 이유: interaction 작동 안됨</div>
                            </div>
                          </div>
                          {/* 해결 제안 */}
                          <div className="bg-blue-50/80 border border-blue-200/50 rounded-lg p-3 backdrop-blur-sm flex-1 flex flex-col justify-center max-h-[100px]">
                            <div className="text-[14px] font-bold text-blue-800 mb-0.5">해결 제안</div>
                            <div className="text-[11px] text-blue-700 space-y-0">
                              <div>피그마 요소가 Y축으로 14.5px 아래에 있습니다</div>
                              <div>높이가 123.3px 크게 되어 있습니다</div>
                              <div>가로세로 비율이 다릅니다 (피그마: 1.07, 웹: 4.11)</div>
                            </div>
                          </div>
                        </div>
                        <button className="w-full px-3 py-1.5 bg-[#5CA585] text-white rounded-lg text-[14px] font-bold hover:bg-[#5CA585]/90 transition-colors">
                          해당 피그마 프레임으로 바로가기
                        </button>
                      </div>
                    </GlassCard>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>

          {/* 모바일용 간단한 통계 */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto md:hidden">
            <GlassCard className="p-6" hoverEffect>
              <div className="flex flex-col items-center justify-between h-full">
                <div className="mb-4 flex items-center justify-center w-16 h-16 rounded-[16px] bg-[#5CA585]/20">
                  <BarChart3 className="w-8 h-8 text-[#5CA585]" />
                </div>
                <div className="text-sm font-bold text-neutral-900 mb-2">진행 중인 프로젝트</div>
                <div className="flex items-end">
                  <span className="text-4xl font-extrabold text-neutral-900 leading-none">4</span>
                  <span className="text-lg font-bold ml-1 text-neutral-600">개</span>
                </div>
              </div>
            </GlassCard>
            <GlassCard className="p-6" hoverEffect>
              <div className="flex flex-col items-center justify-between h-full">
                <div className="mb-4 flex items-center justify-center w-16 h-16 rounded-[16px] bg-[#5CA585]/20">
                  <CheckCircle2 className="w-8 h-8 text-[#5CA585]" />
                </div>
                <div className="text-sm font-bold text-neutral-900 mb-2">완료된 테스트</div>
                <div className="flex items-end">
                  <span className="text-4xl font-extrabold text-neutral-900 leading-none">160</span>
                  <span className="text-lg font-bold ml-1 text-neutral-600">개</span>
                </div>
              </div>
            </GlassCard>
            <GlassCard className="p-6" hoverEffect>
              <div className="flex flex-col items-center justify-between h-full">
                <div className="mb-4 flex items-center justify-center w-16 h-16 rounded-[16px] bg-[#5CA585]/20">
                  <AlertCircle className="w-8 h-8 text-[#5CA585]" />
                </div>
                <div className="text-sm font-bold text-neutral-900 mb-2">미완료 테스트</div>
                <div className="flex items-end">
                  <span className="text-4xl font-extrabold text-neutral-900 leading-none">0</span>
                  <span className="text-lg font-bold ml-1 text-neutral-600">개</span>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
