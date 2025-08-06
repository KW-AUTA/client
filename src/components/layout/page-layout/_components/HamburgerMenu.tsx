interface HamburgerMenuProps {
  onMenuClick: () => void;
}

export default function HamburgerMenu({ onMenuClick }: HamburgerMenuProps) {
  return (
    <>
      <button className="block lg:hidden mr-2 p-2 rounded-full hover:bg-gray-100 transition" onClick={onMenuClick}>
        <svg width="28" height="28" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeWidth="2" d="M4 7h20M4 14h20M4 21h20" />
        </svg>
      </button>
    </>
  );
}
