import StatusBadge from '@/pages/project/_components/StatusBadge';
import { ProjectListData, ProjectStatusType } from '@/types/project.type';
import searchIcon from '@/assets/icons/search.svg';
import { clearRecentSearches, getRecentSearches, saveRecentSearch } from '@/utils/recentSearch';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useRef, useState } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import { useGetProjectList } from '@/store/queries/project/useProjectQueries';
import { setProjectName } from '@/store/redux/reducers/project';
export default function ProjectSearchBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [inputValue, setInputValue] = useState('');
  const [showRecent, setShowRecent] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  const debouncedInputValue = useDebounce(inputValue, 300);
  const inputRef = useRef<HTMLInputElement>(null);
  const { data: suggestedProjects = [] } = useGetProjectList({
    projectName: debouncedInputValue,
    sortBy: '',
    cursor: null
  });

  const handleSearch = (keyword?: string) => {
    const searchWord = keyword ?? inputValue;
    if (!searchWord.trim()) return;
    dispatch(setProjectName(searchWord));
    saveRecentSearch(searchWord);
    setRecentSearches(getRecentSearches()); // 최근 검색어 즉시 갱신
    navigate('/projects');
    setInputValue('');
    setShowRecent(false); // 검색 시 드롭다운 닫기
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
    <div
      className="relative flex-1 max-w-[760px] w-full bg-white ml-8 py-2 px-8 mx-2 rounded-full hidden md:flex"
      tabIndex={-1}
      onFocus={() => setShowRecent(true)}
      onBlur={() => setShowRecent(false)}>
      <button type="button" onClick={() => handleSearch()}>
        <img src={searchIcon} alt="search button" className="absolute left-4 top-2 w-6 h-6" />
      </button>
      <input
        ref={inputRef}
        type="text"
        placeholder="프로젝트 검색"
        className="w-full rounded-full pl-10 text-base"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyUp={(e) => {
          if (e.key === 'Enter') {
            handleSearch();
          }
        }}
        onFocus={handleInputFocus}
      />
      {showRecent && (
        <div
          className="absolute left-0 top-full mt-2 w-full min-w-[180px] max-w-[360px] md:max-w-none bg-white border border-gray-200 rounded-lg shadow-lg p-4 max-h-60 overflow-auto sm:w-full sm:left-0 sm:right-0 sm:mx-auto z-[99999]"
          style={{ minHeight: 48 }}>
          {inputValue.trim() ? (
            suggestedProjects.length > 0 ? (
              <>
                <div className="text-xs text-blue-400 mb-1 mt-2">추천 프로젝트</div>
                <ul>
                  {suggestedProjects.map((proj: ProjectListData) => (
                    <li
                      key={proj.projectName}
                      className="flex items-center justify-between text-blue-700 text-sm py-1 px-2 hover:bg-blue-50 rounded cursor-pointer"
                      onMouseDown={() => {
                        setInputValue(proj.projectName);
                        setTimeout(() => handleSearch(proj.projectName), 0);
                      }}>
                      <span>{proj.projectName}</span>
                      <StatusBadge status={proj.projectStatus as ProjectStatusType} className="ml-2" />
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <p className="text-gray-400 text-sm text-center py-4">일치하는 프로젝트가 없습니다</p>
            )
          ) : recentSearches.length === 0 ? (
            <p className="text-gray-400 text-sm text-center py-4">최근 검색어가 없습니다</p>
          ) : (
            <>
              <button
                className="block w-full text-right text-xs text-gray-400 hover:text-red-400 mb-2"
                onMouseDown={(e) => {
                  e.preventDefault();
                  clearRecentSearches();
                  setRecentSearches([]);
                }}>
                전체 삭제
              </button>
              <div className="text-xs text-gray-400 mb-1">최근 검색어</div>
              <ul className="mb-2">
                {recentSearches.map((item) => {
                  const matched = suggestedProjects.find(
                    (p: ProjectListData) => p.projectName.toLowerCase() === item.toLowerCase()
                  );
                  return (
                    <li
                      key={item}
                      className="flex items-center text-gray-700 text-sm py-1 px-2 hover:bg-gray-100 rounded cursor-pointer group">
                      <span
                        className="flex-1"
                        onMouseDown={() => {
                          setInputValue(item);
                          setTimeout(() => handleSearch(item), 0);
                        }}>
                        {item}
                      </span>
                      {matched && <StatusBadge status={matched.projectStatus as ProjectStatusType} className="ml-2" />}
                      <button
                        className="ml-2 text-gray-400 hover:text-red-400 opacity-70 group-hover:opacity-100 transition"
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
        </div>
      )}
    </div>
  );
}
