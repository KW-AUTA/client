import React from 'react';

interface OverviewCardProps {
  icon: React.ReactNode;
  title: string;
  value: number | string;
  unit?: string;
}

const OverviewCard: React.FC<OverviewCardProps> = ({ icon, title, value, unit }) => (
  <div
    className="flex flex-col items-center md:items-start justify-between
               w-full max-w-[90vw] sm:max-w-[322px] min-w-[180px] h-[200px] md:h-[219px]
               px-6 md:px-[32px] py-6 md:py-[24px]
               rounded-2xl bg-white/80 backdrop-blur-lg ring-1 ring-white/40
               shadow-md hover:shadow-xl hover:bg-white/90 hover:scale-[1.02]
               transition-all duration-300">
    {/* 아이콘 영역 */}
    <div className="mb-0 flex items-center justify-center w-16 h-16 rounded-2xl bg-[#5CA585]/50 backdrop-blur-md shadow-md">
      {icon}
    </div>

    {/* 타이틀 */}
    <div className="text-[12px] md:text-[16px] font-bold text-neutral-700">{title}</div>

    {/* 값 + 단위 */}
    <div className="flex items-end">
      <span className="text-[40px] md:text-[48px] font-extrabold text-neutral-800 leading-none">{value}</span>
      {unit && <span className="text-[14px] md:text-[18px] font-bold ml-1 text-neutral-700">{unit}</span>}
    </div>
  </div>
);

export default OverviewCard;
