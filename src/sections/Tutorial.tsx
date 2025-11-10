import GlassCard from '../components/atoms/GlassCard';
import translations from '@/locales/ko-v4.json';

/**
 * v4 Tutorial 섹션 (유튜브 영상 고정)
 */
export const Tutorial = () => {
  const { video } = translations;

  return (
    <section 
      id="video-tutorial" 
      className="py-22 md:py-26 bg-neutral-50">
      <div className="max-w-[1120px] mx-auto px-5 md:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-neutral-900 mb-4">
            {video.title}
          </h2>
          <p className="text-lg text-neutral-700">
            {video.subtitle}
          </p>
        </div>

        <GlassCard className="max-w-4xl mx-auto overflow-hidden">
          <div className="aspect-video bg-neutral-900">
            <iframe
              src={`https://www.youtube.com/embed/${video.url.split('/').pop()}`}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              allowFullScreen
              className="w-full h-full"
              loading="lazy"
            />
          </div>
        </GlassCard>

        <p className="text-xs text-neutral-300 mt-4 text-center">
          *{video.note}
        </p>
      </div>
    </section>
  );
};

export default Tutorial;

