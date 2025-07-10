interface ProjectPageTableProps {
  pages: Array<{
    pageName: string;
    pageBaseUrl: string;
  }>;
}

export default function ProjectPageTable({ pages = [] }: ProjectPageTableProps) {
  return (
    <div className="p-6 basis-1/3 w-full h-full flex flex-col">
      <div className="overflow-y-auto flex-1">
        <table className="w-full text-center table-fixed">
          <thead>
            <tr className="text-14 text-typography-dark font-bold border-b border-b-[#CCCCCC]">
              <th className="py-2 w-1/2 overflow-hidden truncate whitespace-nowrap">페이지명</th>
              <th className="py-2 w-1/2 overflow-hidden truncate whitespace-nowrap">페이지 URL</th>
            </tr>
          </thead>
          <tbody>
            {pages.length > 0 ? (
              pages.map((page, index) => (
                <tr key={index} className="children:font-medium text-11 text-typography-dark hover:bg-pointColor/20">
                  <td className="py-2 w-1/2 overflow-hidden truncate whitespace-nowrap">{page.pageName}</td>
                  <td className="py-2 w-1/2 overflow-hidden truncate whitespace-nowrap">{page.pageBaseUrl}</td>
                </tr>
              ))
            ) : (
              <tr className="children:font-medium text-11 text-typography-gray">
                <td colSpan={2} className="py-4 font-medium text-14 text-typography-gray align-middle h-32">
                  탐지된 페이지가 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
