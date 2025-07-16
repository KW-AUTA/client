import { KeyboardEvent, useRef, useState, useEffect } from 'react';
import Input from '@/components/ui/input/Input';
import Select from '@/components/ui/select/Select';
import Button from '@/components/ui/button/Button';
import searchIcon from '@/assets/icons/search.svg';
import ResetIcon from '@/assets/icons/refresh.svg?react';
import Portal from '@/components/layout/page-layout/Portal'; // Portal 경로에 맞게 import

interface SearchHeaderProps {
  inputValue: string;
  onInputChange: (value: string) => void;
  onSearch: () => void;
  onReset: () => void;
  nameSort: string;
  dateSort: string;
  onNameSortChange: (value: string) => void;
  onDateSortChange: (value: string) => void;
}

const sortOptions = [{ label: '이름순', value: 'name' }];
const dateOptions = [{ label: '최신순', value: 'createdDate' }];

export default function SearchHeader({
  inputValue,
  onInputChange,
  onSearch,
  onReset,
  nameSort,
  dateSort,
  onNameSortChange,
  onDateSortChange
}: SearchHeaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dropdownPos, setDropdownPos] = useState({ left: 0, top: 0, width: 0 });
  const [showRecent, setShowRecent] = useState(false);

  function updateDropdownPos() {
    if (inputRef.current) {
      const rect = inputRef.current.getBoundingClientRect();
      setDropdownPos({ left: rect.left, top: rect.bottom, width: rect.width });
    }
  }

  const handleInputFocus = () => {
    updateDropdownPos();
    setShowRecent(true);
    // 최근 검색어 불러오기 등 추가 로직
  };

  useEffect(() => {
    if (!showRecent) return;
    updateDropdownPos();
    window.addEventListener('resize', updateDropdownPos);
    return () => {
      window.removeEventListener('resize', updateDropdownPos);
    };
  }, [showRecent]);

  return (
    <section className="flex items-center justify-between w-full gap-4 pt-5 pb-9">
      <div className="relative flex-1 max-w-[510px] min-w-0">
        <img
          src={searchIcon}
          alt="search button"
          className="absolute top-2.5 left-4 w-4 cursor-pointer"
          onClick={onSearch}
        />
        <Input
          ref={inputRef}
          type="text"
          placeholder="프로젝트 검색"
          className="w-full max-h-[35px] rounded-20 pl-10 border-[0.5px] border-typography-gray max-md:placeholder:text-[12px]"
          value={inputValue}
          onChange={(e) => onInputChange(e.target.value)}
          onKeyUp={(e: KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Enter') {
              onSearch();
            }
          }}
          onFocus={handleInputFocus}
        />
        {showRecent && (
          <Portal>
            <div
              className="fixed z-[9999] bg-white border border-gray-200 rounded-lg shadow-lg p-4 max-h-60 overflow-auto"
              style={{
                left: dropdownPos.left,
                top: dropdownPos.top + 8,
                width: dropdownPos.width,
                minWidth: 180,
                maxWidth: 510 // 필요시 input의 max-width와 맞춤
              }}>
              {/* 드롭다운 내용 */}
            </div>
          </Portal>
        )}
      </div>

      <div className="flex gap-2">
        <Button
          leftIcon={<ResetIcon className="transition-transform duration-500 ease-out group-hover:rotate-90" />}
          className="group [&>span:first-child]:mr-0 justify-center items-center"
          onClick={onReset}
        />
        <Select
          value={nameSort}
          onChange={onNameSortChange}
          options={sortOptions}
          className="bg-button-default hover:bg-button-hover"
          placeholder="정렬"
        />
        <Select
          value={dateSort}
          onChange={onDateSortChange}
          options={dateOptions}
          className="bg-[#9991F4] border-none hover:bg-[#9981f4]"
          placeholder="날짜순"
        />
      </div>
    </section>
  );
}
