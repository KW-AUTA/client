import GlassCard from '../atoms/GlassCard';
import translations from '@/locales/ko-v4.json';

/**
 * 효율 비교 테이블 (포스터 수치)
 */
export const CompareTable = () => {
  const { compare } = translations.proof;

  return (
    <GlassCard className="p-6 md:p-8">
      <h3 className="text-2xl font-bold text-neutral-900 mb-6 text-center">
        {compare.title}
      </h3>
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-neutral-300">
              {compare.headers.map((header, idx) => (
                <th 
                  key={idx} 
                  className={`py-3 px-4 font-bold text-neutral-900 ${idx === 0 ? 'text-left' : 'text-center'}`}>
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {compare.rows.map((row, rowIdx) => (
              <tr key={rowIdx} className="border-b border-neutral-100 hover:bg-white/50 transition-colors">
                {row.map((cell, cellIdx) => (
                  <td 
                    key={cellIdx}
                    className={`py-4 px-4 ${cellIdx === 0 ? 'text-left font-medium text-neutral-700' : 'text-center'}`}>
                    {cellIdx === 1 ? (
                      <span className="text-red-600">{cell}</span>
                    ) : cellIdx === 2 ? (
                      <span className="text-brand-blue font-bold">{cell}</span>
                    ) : (
                      cell
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-neutral-300 mt-4 text-right">
        {compare.source}
      </p>
    </GlassCard>
  );
};

export default CompareTable;

