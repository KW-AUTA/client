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
        <div className="grid grid-cols-5 grid-rows-3 gap-4 children:shadow-custom children:rounded-15 max-xl2:flex flex-col">
          {projectDetail?.uiInfo?.score && (
            <div className="flex flex-col items-center justify-center gap-2 border-pointColor border-2 bg-pointColor/30 children:cursor-default aspect-square max-w-[200px] max-h-[200px]">
              <p className="font-bold text-[48px] text-[#3C69EE]">{projectDetail.uiInfo.score}</p>
              <div className="text-14 flex flex-col items-center">
                <p>점수</p>
                <p className="text-[#8c8c8c]">100점 만점</p>
              </div>
            </div>
          )}

          {projectDetail?.uiInfo?.uiTests && projectDetail?.uiInfo?.uiTests?.length > 0 ? (
            <Swiper
              className="col-span-4 row-span-3"
              style={
                {
                  width: '100%',
                  height: '100%',
                  '--swiper-navigation-color': '#97AF8F',
                  '--swiper-pagination-color': '#97AF8F'
                } as React.CSSProperties
              }
              cssMode={true}
              navigation={true}
              pagination={true}
              mousewheel={true}
              keyboard={true}
              modules={[Navigation, Pagination, Mousewheel, Keyboard]}>
              {projectDetail.uiInfo.uiTests.map((uiTest, index) => (
                <SwiperSlide key={index}>
                  <div className="p-7 grid grid-cols-5 gap-8 w-full h-full">
                    <div className="bg-[#E5EBF2] place-items-center mx-4 col-span-3 flex items-center justify-center group relative">
                      <img
                        src={uiTest?.UIPageUrl}
                        alt="uipageUrl"
                        className="object-contain max-w-full max-h-full cursor-pointer hover:opacity-80 transition-opacity"
                        onClick={() => handleImageClick(uiTest?.UIPageUrl)}
                      />
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                        클릭하여 원본 보기
                      </div>
                    </div>

                    <div className="flex gap-2 py-8 col-span-2">
                      <span className="flex-shrink-0 w-6 h-6 bg-pointColor text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </span>
                      <div className="overflow-hidden mr-4">{uiTest?.UIDescription}</div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="p-7 col-span-5 row-span-3 flex items-center justify-center text-center text-typography-gray bg-gray-50 rounded-15">
              평가된 LLM 테스트가 없습니다.
            </div>
          )}
        </div>
      </div>
    </>
  );
}
