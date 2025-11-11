import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { ProjectDetailData } from '@/types/project.type';

interface TestResultProps {
  projectDetail: ProjectDetailData;
}

export default function LLMResult({ projectDetail }: TestResultProps) {
  const handleImageClick = (imageUrl: string) => {
    window.open(imageUrl, '_blank');
  };

  return (
    <>
      <div className="my-6 flex flex-col gap-4">
        <p className="font-bold text-14 text-typography-dark pl-4">LLM UX/UI 평가 결과</p>
        <div className="grid grid-cols-5 grid-rows-2 gap-4 max-xl2:flex flex-col">
          {projectDetail?.uiInfo?.score && (
            <div className="flex flex-col items-center justify-center gap-2 bg-[#5CA585]/20 backdrop-blur-lg ring-2 ring-[#5CA585]/40 rounded-2xl shadow-md children:cursor-default aspect-square max-w-[200px] max-h-[200px]">
              <p className="font-bold text-[48px] text-typography-dark">{projectDetail.uiInfo.score}</p>
              <div className="text-14 flex flex-col items-center">
                <p className="font-semibold">점수</p>
                <p className="text-neutral-500">100점 만점</p>
              </div>
            </div>
          )}

          {projectDetail?.uiInfo?.uiTests && projectDetail?.uiInfo?.uiTests?.length > 0 ? (
            <Swiper
              className="col-span-4 row-span-2 max-h-[500px] bg-white/80 backdrop-blur-lg ring-1 ring-white/40 rounded-2xl shadow-md overflow-hidden"
              style={
                {
                  width: '100%',
                  height: '100%',
                  '--swiper-navigation-color': '#5CA585',
                  '--swiper-pagination-color': '#5CA585'
                } as React.CSSProperties
              }
              cssMode={true}
              navigation={true}
              pagination={{
                type: 'fraction'
              }}
              mousewheel={true}
              keyboard={true}
              modules={[Navigation, Pagination, Mousewheel, Keyboard]}>
              {projectDetail.uiInfo.uiTests.map((uiTest, index) => (
                <SwiperSlide key={index}>
                  <div className="p-7 grid grid-cols-5 gap-8 w-full h-[98%]">
                    <div className="bg-gray-50/80 backdrop-blur-sm ring-1 ring-gray-200/50 rounded-xl place-items-center mx-4 col-span-3 flex items-center justify-center group relative overflow-hidden">
                      <img
                        src={uiTest?.UIPageUrl}
                        alt="uipageUrl"
                        className="object-contain max-w-full h-full cursor-pointer hover:opacity-80 transition-opacity"
                        onClick={() => handleImageClick(uiTest?.UIPageUrl)}
                      />
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/70 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-lg shadow-lg">
                        클릭하여 원본 보기
                      </div>
                    </div>

                    <div className="flex gap-2 py-8 col-span-2">
                      <span className="flex-shrink-0 w-6 h-6 bg-[#5CA585] text-white rounded-full flex items-center justify-center text-sm font-bold shadow-sm">
                        {index + 1}
                      </span>
                      <div className="overflow-hidden mr-4">{uiTest?.UIDescription}</div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="p-7 col-span-5 row-span-3 flex items-center justify-center text-center text-typography-gray bg-gray-50/60 backdrop-blur-lg ring-1 ring-gray-200/50 rounded-2xl shadow-md">
              평가된 LLM 테스트가 없습니다.
            </div>
          )}
        </div>
      </div>
    </>
  );
}
