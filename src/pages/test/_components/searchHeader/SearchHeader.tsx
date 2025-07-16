import { KeyboardEvent, useRef, useState, useEffect } from 'react';
import Input from '@/components/ui/input/Input';
import Select from '@/components/ui/select/Select';
import Button from '@/components/ui/button/Button';
import searchIcon from '@/assets/icons/search.svg';
import ResetIcon from '@/assets/icons/refresh.svg?react';

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
  const [showRecent, setShowRecent] = useState(false);

  const handleInputFocus = () => {
    setShowRecent(true);
    // 최근 검색어 불러오기 등 추가 로직
  };

  useEffect(() => {
    if (!showRecent) return;
    function handleClickOutside(e: MouseEvent | TouchEvent) {
      const input = inputRef.current;
      const dropdown = document.getElementById('search-dropdown');
      if (input && !input.contains(e.target as Node) && dropdown && !dropdown.contains(e.target as Node)) {
        setShowRecent(false);
      }
    }
    window.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('touchstart', handleClickOutside);
    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('touchstart', handleClickOutside);
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
          <div
            id="search-dropdown"
            className="absolute left-0 top-full mt-2 w-full min-w-[180px] max-w-[510px] md:max-w-none bg-white border border-gray-200 rounded-lg shadow-lg p-4 max-h-60 overflow-auto z-[9999]"
            style={{ minHeight: 48 }}>
            {/* 드롭다운 내용 */}
          </div>
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
