import { useState, useRef, useEffect } from 'react';
import IssueContents from './IssueContents';
import { PageIssue } from '@/types/test.type';
import { colors } from '@/styles/theme/colors';

export interface TabMeta {
  category: 'routing' | 'mapping' | 'interaction';
  index: number;
  label: string;
}

interface IssueDropdownProps {
  tabMeta: TabMeta[];
  selectedIssueIndex: number;
  onSelectIssue: (idx: number) => void;
  issueData: PageIssue;
}

export default function IssueDropdown({ tabMeta, selectedIssueIndex, onSelectIssue, issueData }: IssueDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelectItem = (idx: number) => {
    onSelectIssue(idx);
    setIsOpen(false);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'routing':
        return {
          backgroundColor: 'transparent',
          border: `1px solid ${colors.TEST_TYPE_DOT.ROUTING}`
        };
      case 'mapping':
        return {
          backgroundColor: 'transparent',
          border: `1px solid ${colors.TEST_TYPE_DOT.MAPPING}`
        };
      case 'interaction':
        return {
          backgroundColor: 'transparent',
          border: `1px solid ${colors.TEST_TYPE_DOT.INTERACTION}`
        };
      default:
        return {
          backgroundColor: colors.gray_1,
          color: 'white'
        };
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'routing':
        return '라우팅';
      case 'mapping':
        return '컴포넌트';
      case 'interaction':
        return '인터랙션';
      default:
        return category;
    }
  };

  if (tabMeta.length === 0) {
    return null;
  }

  const selectedItem = tabMeta[selectedIssueIndex];

  return (
    <div className="w-full">
      {/* 드롭다운 버튼 */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between px-4 py-3 bg-white/60 backdrop-blur-md ring-1 ring-gray-200/50 rounded-xl shadow-md hover:bg-white/75 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#5CA585]/30 transition-all duration-300">
          <div className="flex items-center space-x-2">
            <span className="px-2 py-1 rounded text-xs font-medium" style={getCategoryColor(selectedItem.category)}>
              {getCategoryLabel(selectedItem.category)}
            </span>
            <span className="text-typography-dark font-medium text-14 truncate">{selectedItem.label}</span>
          </div>
          <svg
            className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* 드롭다운 메뉴 */}
        {isOpen && (
          <div className="absolute z-10 w-full mt-2 bg-white/95 backdrop-blur-xl ring-1 ring-white/40 rounded-2xl shadow-2xl max-h-60 overflow-y-auto">
            {tabMeta.map((meta, idx) => {
              const isSelected = idx === selectedIssueIndex;
              return (
                <button
                  key={`${meta.category}-${meta.index}`}
                  onClick={() => handleSelectItem(idx)}
                  className={`w-full flex items-center space-x-2 px-4 py-3 text-left transition-colors duration-200
                    ${isSelected ? 'bg-[#5CA585]/30 font-medium' : 'hover:bg-[#5CA585]/15 text-typography-dark'}
                    ${idx === tabMeta.length - 1 ? '' : 'border-b border-gray-100'}
                  `}>
                  <span className="px-2 py-1 rounded text-xs font-medium" style={getCategoryColor(meta.category)}>
                    {getCategoryLabel(meta.category)}
                  </span>
                  <span className="text-14 truncate">{meta.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div className="mt-4">
        <IssueContents issueData={issueData} tabMeta={selectedItem} />
      </div>
    </div>
  );
}
