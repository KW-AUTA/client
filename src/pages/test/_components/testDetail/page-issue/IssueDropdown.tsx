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
          className="w-full flex items-center justify-between px-4 py-3 bg-white border border-gray_2 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#AF97AF] focus:border-transparent transition-colors">
          <div className="flex items-center space-x-2">
            <span className="px-2 py-1 rounded text-xs font-medium" style={getCategoryColor(selectedItem.category)}>
              {getCategoryLabel(selectedItem.category)}
            </span>
            <span className="text-typography-dark font-medium text-14 truncate">{selectedItem.label}</span>
          </div>
          <svg
            className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* 드롭다운 메뉴 */}
        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
            {tabMeta.map((meta, idx) => {
              const isSelected = idx === selectedIssueIndex;
              return (
                <button
                  key={`${meta.category}-${meta.index}`}
                  onClick={() => handleSelectItem(idx)}
                  className={`w-full flex items-center space-x-2 px-4 py-3 text-left hover:bg-[#AF97AF] hover:bg-opacity-25
                    ${isSelected ? 'bg-[#AF97AF] bg-opacity-20 border-[#AF97AF]' : ''}
                    ${idx === tabMeta.length - 1 ? '' : 'border-b border-gray-100'}
                  `}>
                  <span className="px-2 py-1 rounded text-xs font-medium" style={getCategoryColor(meta.category)}>
                    {getCategoryLabel(meta.category)}
                  </span>
                  <span
                    className={`text-14 truncate ${isSelected ? 'font-medium text-[#AF97AF]' : 'text-typography-dark'}`}>
                    {meta.label}
                  </span>
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
