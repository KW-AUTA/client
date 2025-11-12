import StatusBadge from '@/pages/project/_components/StatusBadge';
import { ProjectListData, ProjectStatusType } from '@/types/project.type';
import searchIcon from '@/assets/icons/search.svg';
import { clearRecentSearches, getRecentSearches, saveRecentSearch } from '@/utils/recentSearch';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import { useGetProjectList } from '@/store/queries/project/useProjectQueries';
import { setProjectName } from '@/store/redux/reducers/project';

import { createPortal } from 'react-dom';

export default function ProjectSearchBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [inputValue, setInputValue] = useState('');
  const [showRecent, setShowRecent] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });

  const debouncedInputValue = useDebounce(inputValue, 300);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { data: suggestedProjects = [] } = useGetProjectList({
    projectName: debouncedInputValue,
    sortBy: '',
    cursor: null
  });

  // 드롭다운 위치 계산
  useEffect(() => {
    if (showRecent && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + 8,
        left: rect.left,
        width: rect.width
      });
    }
  }, [showRecent]);

  const handleSearch = (keyword?: string) => {
    const searchWord = keyword ?? inputValue;
    if (!searchWord.trim()) return;
    dispatch(setProjectName(searchWord));
    saveRecentSearch(searchWord);
    setRecentSearches(getRecentSearches());
    navigate('/projects');
    setInputValue('');
    setShowRecent(false);
  };

  const handleInputFocus = () => {
    setShowRecent(true);
    setRecentSearches(getRecentSearches());
  };

  function removeRecentSearch(keyword: string) {
    const updated = recentSearches.filter((item) => item !== keyword);
    localStorage.setItem('recent_searches', JSON.stringify(updated));
    setRecentSearches(updated);
  }

  return (
    <>
      <div
        ref={containerRef}
        className="relative flex-1 max-w-[760px] w-full bg-white/70 backdrop-blur-lg ring-1 ring-white/40 ml-8 py-2 px-8 mx-2 rounded-full hidden md:flex shadow-md transition-all duration-300 hover:bg-white/85 hover:ring-white/60 hover:shadow-md"
        tabIndex={-1}
        onFocus={() => setShowRecent(true)}
        onBlur={() => setShowRecent(false)}>
        <button type="button" onClick={() => handleSearch()}>
          <img
            src={searchIcon}
            alt="search button"
            className="absolute left-4 top-2 w-6 h-6 transition-transform duration-300 hover:scale-110"
          />
        </button>
        <input
          ref={inputRef}
          type="text"
          placeholder="프로젝트 검색"
          className="w-full rounded-full pl-10 text-base bg-transparent outline-none placeholder:text-neutral-400"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyUp={(e) => {
            if (e.key === 'Enter') {
              handleSearch();
            }
          }}
          onFocus={handleInputFocus}
        />
      </div>

      {/* Portal로 드롭다운 렌더링 */}
      {showRecent &&
        createPortal(
          <div
            className="fixed bg-white/95 backdrop-blur-xl ring-1 ring-white/40 rounded-2xl shadow-2xl p-4 max-h-60 overflow-auto z-[9999]"
            style={{
              minHeight: 48,
              top: `${dropdownPosition.top}px`,
              left: `${dropdownPosition.left}px`,
              width: `${dropdownPosition.width}px`,
              maxWidth: '760px'
            }}
            onMouseDown={(e) => e.preventDefault()}>
            {inputValue.trim() ? (
              suggestedProjects.length > 0 ? (
                <>
                  <div className="text-xs text-[#5CA585] font-semibold mb-2 mt-2">추천 프로젝트</div>
                  <ul>
                    {suggestedProjects.map((proj: ProjectListData) => (
                      <li
                        key={proj.projectName}
                        className="flex items-center justify-between text-neutral-800 text-sm py-2 px-3 hover:bg-white/80 rounded-lg cursor-pointer transition-all duration-300 hover:shadow-sm"
                        onMouseDown={() => {
                          setInputValue(proj.projectName);
                          setTimeout(() => handleSearch(proj.projectName), 0);
                        }}>
                        <span className="font-medium">{proj.projectName}</span>
                        <StatusBadge status={proj.projectStatus as ProjectStatusType} className="ml-2" />
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <p className="text-neutral-400 text-sm text-center py-4">일치하는 프로젝트가 없습니다</p>
              )
            ) : recentSearches.length === 0 ? (
              <p className="text-neutral-400 text-sm text-center py-4">최근 검색어가 없습니다</p>
            ) : (
              <>
                <button
                  className="block w-full text-right text-xs text-neutral-400 hover:text-red-400 mb-2 transition-colors duration-300"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    clearRecentSearches();
                    setRecentSearches([]);
                  }}>
                  전체 삭제
                </button>
                <div className="text-xs text-neutral-500 font-semibold mb-2">최근 검색어</div>
                <ul className="mb-2">
                  {recentSearches.map((item) => {
                    const matched = suggestedProjects.find(
                      (p: ProjectListData) => p.projectName.toLowerCase() === item.toLowerCase()
                    );
                    return (
                      <li
                        key={item}
                        className="flex items-center text-neutral-700 text-sm py-2 px-3 hover:bg-white/80 rounded-lg cursor-pointer group transition-all duration-300 hover:shadow-sm">
                        <span
                          className="flex-1 font-medium"
                          onMouseDown={() => {
                            setInputValue(item);
                            setTimeout(() => handleSearch(item), 0);
                          }}>
                          {item}
                        </span>
                        {matched && (
                          <StatusBadge status={matched.projectStatus as ProjectStatusType} className="ml-2" />
                        )}
                        <button
                          className="ml-2 text-neutral-400 hover:text-red-400 opacity-70 group-hover:opacity-100 transition-all duration-300"
                          onMouseDown={(e) => {
                            e.stopPropagation();
                            removeRecentSearch(item);
                          }}
                          tabIndex={-1}
                          aria-label="검색어 삭제">
                          ×
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </>
            )}
          </div>,
          document.body
        )}
    </>
  );
}
