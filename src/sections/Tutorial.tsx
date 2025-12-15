import GlassCard from '../components/atoms/GlassCard';
import translations from '@/locales/ko-v4.json';

/**
 * YouTube URL에서 video ID 추출 함수
 */
const getYouTubeVideoId = (url: string): string => {
  if (!url) return '';

  // youtu.be 형식
  if (url.includes('youtu.be/')) {
    const match = url.match(/youtu\.be\/([^?&]+)/);
    return match ? match[1] : '';
  }

  // youtube.com/watch?v= 형식
  if (url.includes('youtube.com/watch')) {
    const match = url.match(/[?&]v=([^&]+)/);
    return match ? match[1] : '';
  }

  return '';
};

/**
 * v4 Tutorial 섹션 (유튜브 영상 2열)
 */
export const Tutorial = () => {
  const { video } = translations;
  const videos = video.videos || [
    {
      title: video.title,
      subtitle: video.subtitle,
      url: video.url
    }
  ];

  return (
    <section id="video-tutorial" className="relative py-32 md:py-40">
      <div className="max-w-[1120px] mx-auto px-5 md:px-8">
        <div className="text-center mb-12">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-neutral-900 mb-4">{video.title}</h2>
          <p
            className="text-sm md:text-base text-neutral-600 max-w-3xl mx-auto leading-relaxed"
            dangerouslySetInnerHTML={{ __html: video.subtitle }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {videos.map((vid, idx) => {
            const videoId = getYouTubeVideoId(vid.url);
            if (!videoId) return null;

            return (
              <div key={idx} className="flex flex-col">
                <GlassCard className="overflow-hidden flex-1">
                  <div className="aspect-video bg-neutral-900">
                    <iframe
                      src={`https://www.youtube.com/embed/${videoId}`}
                      title={vid.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                      allowFullScreen
                      className="w-full h-full"
                      loading="lazy"
                    />
                  </div>
                </GlassCard>
                <div className="mt-4 text-center">
                  <h3 className="text-lg font-bold text-neutral-900 mb-1">{vid.title}</h3>
                  <p className="text-sm text-neutral-600">{vid.subtitle}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Tutorial;
