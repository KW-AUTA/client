import { useState } from 'react';
import UseIntersectionObserver from '@/utils/useIntersectionObserver';
import { useGetTestListInfinite } from '@/store/queries/test/useTestQueries';
import ScrollToTopButton from '@/components/ui/scrollTopButton/ScrollToTopButton';
import TestTitle from '@/pages/test/_components/TestTitle';
import SearchHeader from '@/pages/test/_components/searchHeader/SearchHeader';
import TestList from '@/pages/test/_components/testList/TestList';
import PageLoader from '@/components/ui/loader/PageLoader';

export default function TestManagePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [nameSort, setNameSort] = useState('');
  const [dateSort, setDateSort] = useState('');

  const {
    data: testList,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
    isError
  } = useGetTestListInfinite({
    projectName: searchTerm,
    sortBy: [nameSort, dateSort].filter(Boolean).join(',')
  });

  const bottomRef = UseIntersectionObserver({
    onIntersect: fetchNextPage,
    enabled: !!hasNextPage
  });

  const handleSearch = () => {
    setSearchTerm(inputValue);
  };

  const handleReset = () => {
    setSearchTerm('');
    setInputValue('');
    setNameSort('');
    setDateSort('');
  };

  if (isPending) return <PageLoader />;
  if (isError)
    return (
      <div className="col-span-3 text-center pt-40">
        <div className="inline-block bg-red-50/80 backdrop-blur-lg ring-1 ring-red-200/50 rounded-2xl px-8 py-4 text-red-600 shadow-md">
          오류가 발생했습니다.
        </div>
      </div>
    );

  const tests = testList?.pages.flatMap((page) => page.tests) || [];

  return (
    <div className="w-[90%] flex flex-col m-auto">
      <TestTitle />
      <SearchHeader
        inputValue={inputValue}
        onInputChange={setInputValue}
        onSearch={handleSearch}
        onReset={handleReset}
        nameSort={nameSort}
        dateSort={dateSort}
        onNameSortChange={setNameSort}
        onDateSortChange={setDateSort}
      />

      <TestList tests={tests} isFetchingNextPage={isFetchingNextPage} hasNextPage={hasNextPage} ref={bottomRef} />

      <ScrollToTopButton />
    </div>
  );
}
