import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useUserProfile } from '@/store/queries/user/useUserQueries';
import searchIcon from '@/assets/icons/search.svg';
import notificationIcon from '@/assets/icons/notification.svg';
import profileImg from '@/assets/images/짱구.jpg';
import { setProjectName } from '@/store/redux/reducers/project';
import { saveRecentSearch, getRecentSearches, clearRecentSearches } from '@/utils/recentSearch';
import { useGetProjectList } from '@/store/queries/project/useProjectQueries';
import { useDebounce } from '@/hooks/useDebounce';
import BellBadge from '@/components/ui/BellBadge';
import { ProjectListData, ProjectStatusType } from '@/types/project.type';
import StatusBadge from '@/pages/project/_components/StatusBadge';
// import { RootState } from '@/store/redux/store';

export default function Header({ onMenuClick }: { onMenuClick?: () => void }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState('');
  const [showRecent, setShowRecent] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [showNotification, setShowNotification] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  const debouncedInputValue = useDebounce(inputValue, 300);
  const inputRef = useRef<HTMLInputElement>(null);
  // const [dropdownPos, setDropdownPos] = useState({ left: 0, top: 0, width: 0 });
  // const projectName = useSelector((state: RootState) => state.searchReducer.projectName);
  const { data: suggestedProjects = [] } = useGetProjectList({
    projectName: debouncedInputValue,
    sortBy: '',
    cursor: null
  });
  // 전체 프로젝트 리스트 불러오기 (진행상태 태그용)
  // const { data: allProjects = [] }: { data?: ProjectListData[] } = useGetProjectList(
  //   {
  //     projectName,
  //     sortBy: '',
  //     cursor: null
  //   },
  //   { enabled: !!debouncedInputValue }
  // );

  // function updateDropdownPos() {
  //   if (inputRef.current) {
  //     const rect = inputRef.current.getBoundingClientRect();
  //     setDropdownPos({ left: rect.left, top: rect.bottom, width: rect.width });
  //   }
  // }

  // useEffect(() => {
  //   if (!showRecent) return;
  //   updateDropdownPos();
  //   window.addEventListener('resize', updateDropdownPos);
  //   return () => {
  //     window.removeEventListener('resize', updateDropdownPos);
  //   };
  // }, [showRecent]);

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

  const { data: profile } = useUserProfile();

  // 알림 여부 예시 (실제 알림 데이터 연동 시 수정)
  const hasNotification = false; // 알림이 있을 때 true로 변경

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-[999] w-[95vw] max-w-2xl bg-background/90 backdrop-blur-md flex items-center justify-between px-4 py-2 rounded-full shadow-lg transition-all md:static md:top-0 md:left-0 md:translate-x-0 md:w-full md:max-w-full md:rounded-none md:shadow-none md:px-8 md:py-6">
      {/* 모바일 햄버거 메뉴 */}
      {onMenuClick && (
        <button className="block lg:hidden mr-2 p-2 rounded-full hover:bg-gray-100 transition" onClick={onMenuClick}>
          <svg width="28" height="28" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeWidth="2" d="M4 7h20M4 14h20M4 21h20" />
          </svg>
        </button>
      )}
      {/* 현재 페이지 이름 */}
      {/* <h1 className="font-bm font-medium text-lg md:text-2xl cursor-default flex-shrink-0 truncate max-w-[120px] md:max-w-[200px]">
        {currentPage}
      </h1> */}
      {/* 검색창 (모바일에서는 숨김) */}
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
                        {matched && (
                          <StatusBadge status={matched.projectStatus as ProjectStatusType} className="ml-2" />
                        )}
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
      <div className="flex items-center gap-2 mr-8 lg:gap-4 min-w-0">
        {/* 알림 버튼 (모바일에서는 숨김) */}
        <div className="hidden lg:flex mr-0 items-center relative" ref={notificationRef}>
          <button className="relative" onClick={() => setShowNotification((prev) => !prev)} tabIndex={0}>
            <BellBadge show={hasNotification}>
              <img src={notificationIcon} alt="notification button" />
            </BellBadge>
            {showNotification && (
              <div
                className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-50"
                style={{ minHeight: 48 }}>
                <p className="text-gray-400 text-sm text-center">최근 알림이 없습니다</p>
              </div>
            )}
          </button>
        </div>
        {/* 프로필 버튼 */}
        <button className="flex items-center min-w-0 max-w-[120px] lg:max-w-44 gap-2 rounded-full px-3 py-1 bg-white shadow lg:shadow-none overflow-hidden">
          <div className="w-8 h-8 lg:w-9 lg:h-9 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden flex-shrink-0">
            <img src={profileImg} alt="profile img" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col justify-center items-start min-w-0">
            <p className="font-bm text-xs lg:text-sm truncate max-w-[60px] lg:max-w-[100px]">{profile?.username}</p>
            <p className="font-medium text-[10px] lg:text-7 text-typography-gray truncate max-w-[60px] lg:max-w-[100px]">
              Test Automation Developer
            </p>
          </div>
        </button>
      </div>
    </header>
  );
}
