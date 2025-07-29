// 나중에 LLM description 길어지면 그 때 추가

// import { Swiper, SwiperSlide } from 'swiper/react';

// import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';

// import 'swiper/css';
// import 'swiper/css/pagination';
// import 'swiper/css/navigation';
// import { ProjectDetailData } from '@/types/project.type';

// interface LLMResultModalProps {
//   isLLMModalOpen: boolean;
//   setIsLLMModalOpen: (isLLMModalOpen: boolean) => void;
//   projectDetail: ProjectDetailData;
// }

// export default function LLMResultModal({ isLLMModalOpen, setIsLLMModalOpen, projectDetail }: LLMResultModalProps) {
//   if (!isLLMModalOpen) return null;

//   return (
//     <div className="fixed inset-0 z-[1000] flex items-center justify-center">
//       <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
//       <div className="relative bg-[#F7F7F7] rounded-15 w-full h-full max-w-[90vw] max-h-[90vh] py-[40px] flex flex-col items-center overflow-hidden">
//         <p
//           className="absolute top-7 right-10 font-bold text-xl cursor-pointer hover:text-pointColor"
//           onClick={() => setIsLLMModalOpen(false)}>
//           X
//         </p>

//         <div className="flex justify-center items-center w-full h-full">
//           <Swiper
//             style={
//               {
//                 width: '100%',
//                 height: 'auto',
//                 '--swiper-navigation-color': '#97AF8F',
//                 '--swiper-pagination-color': '#97AF8F'
//               } as React.CSSProperties
//             }
//             cssMode={true}
//             navigation={true}
//             pagination={true}
//             mousewheel={true}
//             keyboard={true}
//             modules={[Navigation, Pagination, Mousewheel, Keyboard]}>
//             {projectDetail?.uiInfo?.uiTests &&
//               projectDetail?.uiInfo?.uiTests?.length > 0 &&
//               projectDetail.uiInfo.uiTests.map((uiTest, index) => (
//                 <SwiperSlide style={{ height: '600px' }} key={index}>
//                   <div className="p-7 grid grid-cols-5 gap-8 w-full h-full">
//                     <div className="bg-[#E5EBF2] place-items-center mx-4 col-span-3 flex items-center justify-center">
//                       <img
//                         src={uiTest?.uipageUrl}
//                         alt="uipageUrl"
//                         className="object-contain max-w-full max-h-full cursor-pointer"
//                       />
//                     </div>

//                     <div className="flex gap-2 py-8 col-span-2">
//                       <span className="flex-shrink-0 w-6 h-6 bg-pointColor text-white rounded-full flex items-center justify-center text-sm font-bold">
//                         {index + 1}
//                       </span>
//                       <div className="overflow-hidden mr-4">{uiTest?.uidescription}</div>
//                     </div>
//                   </div>
//                 </SwiperSlide>
//               ))}
//           </Swiper>
//         </div>
//       </div>
//     </div>
//   );
// }
