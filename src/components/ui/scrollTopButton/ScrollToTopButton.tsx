export default function ScrollToTopButton() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-16 right-12 w-12 h-12 p-3 rounded-full bg-[#5CA585]/90 backdrop-blur-lg ring-1 ring-white/40 text-white shadow-xl hover:bg-[#5CA585] hover:scale-110 hover:shadow-2xl transition-all duration-300"
      aria-label="맨 위로 스크롤">
      ↑
    </button>
  );
}
