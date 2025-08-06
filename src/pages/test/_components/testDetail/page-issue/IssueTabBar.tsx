export interface TabMeta {
  category: 'routing' | 'mapping' | 'interaction';
  index: number;
  label: string;
}

interface IssueTabBarProps {
  tabMeta: TabMeta[];
  activeTab: number;
  onSelectTab: (idx: number) => void;
}

export default function IssueTabBar({ tabMeta, activeTab, onSelectTab }: IssueTabBarProps) {
  return (
    <div className="flex items-center border-b border-gray-200 overflow-x-auto">
      <div className="flex w-[calc(9*120px+9*16px)] overflow-x-auto space-x-4">
        {tabMeta.map((meta, idx) => {
          const isActive = idx === activeTab;
          return (
            <button
              key={`${meta.category}-${meta.index}`}
              onClick={() => onSelectTab(idx)}
              className={`flex-shrink-0 min-w-[120px] whitespace-nowrap px-4 py-2 font-bold text-14 
                ${isActive ? 'text-typography-dark border-b-[5px] border-[#AF97AF]' : 'text-typography-dark'}
                transition-colors duration-150
                `}>
              {meta.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
