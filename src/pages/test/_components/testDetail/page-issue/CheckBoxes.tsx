import { useEffect, useRef } from 'react';
import checkIcon from '@/assets/icons/check.svg';

export interface Filters {
  routing: boolean;
  interaction: boolean;
  mapping: boolean;
}

export interface IssueCounts {
  routing: number;
  interaction: number;
  mapping: number;
}

interface CheckBoxesProps {
  filters: Filters;
  onChange: (newFilters: Filters) => void;
  issueCounts: IssueCounts;
}

export default function CheckBoxes({ filters, onChange, issueCounts }: CheckBoxesProps) {
  const masterRef = useRef<HTMLInputElement>(null);

  const allChecked = filters.routing && filters.interaction && filters.mapping;
  const noneChecked = !filters.routing && !filters.interaction && !filters.mapping;

  useEffect(() => {
    if (!masterRef.current) return;
    masterRef.current.checked = allChecked;
    masterRef.current.indeterminate = !allChecked && !noneChecked;
  }, [allChecked, noneChecked]);

  const toggleMaster = () => {
    const newValue = !allChecked;
    onChange({
      routing: newValue,
      interaction: newValue,
      mapping: newValue
    });
  };
  const toggleField = (field: keyof Filters) => {
    onChange({ ...filters, [field]: !filters[field] });
  };

  const items: Array<{
    key: keyof Filters;
    label: string;
    checked: boolean;
    count: number;
  }> = [
    { key: 'routing', label: '라우팅 이슈', checked: filters.routing, count: issueCounts.routing },
    { key: 'interaction', label: '인터랙션 이슈', checked: filters.interaction, count: issueCounts.interaction },
    { key: 'mapping', label: '컴포넌트 이슈', checked: filters.mapping, count: issueCounts.mapping }
  ];

  // 전체 이슈 개수 계산하기
  const totalIssueCount = issueCounts.routing + issueCounts.interaction + issueCounts.mapping;

  return (
    <div className="flex items-center space-x-2 px-8 pb-5 all:max-sm:text-[10px]">
      <label className="flex items-center gap-2 text-typography-dark font-medium text-11 select-none">
        <div className="relative flex items-center">
          <input
            type="checkbox"
            ref={masterRef}
            onChange={toggleMaster}
            className="
              appearance-none
              w-[15px] h-[15px]
              rounded-[3px]
              border-none
              bg-[#D9D9D9]
              checked:bg-[#AF97AF]
              focus:outline-none
              transition duration-150 ease-in-out
            "
          />
          {allChecked && (
            <img src={checkIcon} alt="check" className="absolute top-0 left-0 w-[15px] h-[15px] pointer-events-none" />
          )}
        </div>
        <span>전체 보기 ({totalIssueCount})</span>
      </label>

      <span className="text-[#D9D9D9]">ㅣ</span>

      {items.map(({ key, label, checked, count }) => (
        <label key={key} className="flex items-center gap-2 text-typography-dark font-medium text-11 select-none">
          <div className="relative flex items-center">
            <input
              type="checkbox"
              checked={checked}
              onChange={() => toggleField(key)}
              className="
                appearance-none
                w-[15px] h-[15px]
                rounded-[3px]
                border-none
                bg-[#D9D9D9]
                checked:bg-[#AF97AF]
                focus:outline-none
                transition duration-150 ease-in-out
              "
            />
            {checked && (
              <img
                src={checkIcon}
                alt="check"
                className="absolute top-0 left-0 w-[15px] h-[15px] pointer-events-none"
              />
            )}
          </div>
          <span>
            {label} ({count})
          </span>
        </label>
      ))}
    </div>
  );
}
