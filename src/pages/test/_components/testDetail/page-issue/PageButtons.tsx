import { PageArrayProps } from '@/types/test.type';
import Button from '@/components/ui/button/Button';

interface PageButtonProps {
  pages: PageArrayProps[];
  activePageIndex: number;
  onSelectPage: (pageId: number) => void;
}

export default function PageButtons({ pages, activePageIndex, onSelectPage }: PageButtonProps) {
  return (
    <div className="flex items-center justify-start gap-5 pt-14 pb-6 px-2 overflow-x-auto">
      {pages.map((page, pageId) => {
        const isActive = pageId === activePageIndex;

        return (
          <Button
            key={pageId}
            onClick={() => onSelectPage(pageId)}
            text={`${page?.pageName} 페이지`}
            variant={isActive ? 'primary' : 'default'}
            className={`px-[23px] py-[10px] whitespace-nowrap hover:bg-[#5CA585]/20 ${isActive ? 'bg-[#5CA585]/60' : ''}`}
          />
        );
      })}
    </div>
  );
}
