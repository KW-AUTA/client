import GlassCard from '../atoms/GlassCard';
import translations from '@/locales/ko-v4.json';

/**
 * 모델 성능 카드 (mAP@50, mAP@50-95, Precision, Recall)
 * 포스터 수치 그대로 표기
 */
export const MetricCards = () => {
  const { metrics } = translations.proof;

  return (
    <div>
      <h3 className="text-2xl font-bold text-neutral-900 mb-6 text-center">
        {metrics.title}
      </h3>
      <p className="text-sm text-neutral-700 mb-6 text-center">
        {metrics.note}
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {metrics.items.map((metric, idx) => (
          <GlassCard key={idx} className="p-5 text-center" hoverEffect>
            <div className="text-xs text-neutral-700 font-medium mb-2">
              {metric.label}
            </div>
            <div className="text-2xl font-bold text-brand-blue mb-1">
              {metric.value}
            </div>
            <div className="text-[10px] text-neutral-300">
              {metric.desc}
            </div>
            <div className="text-[9px] text-neutral-300 mt-2">
              *{metric.source}
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};

export default MetricCards;

