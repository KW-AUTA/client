import { useLocation, useNavigate } from 'react-router-dom';
import { MenuItemType } from './SidebarData';

interface MenuItemProps {
  item: MenuItemType;
  fontSize?: string;
  onClick?: () => void;
}

export default function MenuItem({ item, fontSize = 'text-20', onClick }: MenuItemProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = item.path === '/' ? location.pathname === '/' : location.pathname.startsWith(item.path);

  const handleClick = () => {
    navigate(item.path);
    if (onClick) onClick();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`flex px-12 py-5 items-center gap-3 transition-colors w-full text-left ${isActive ? 'bg-button-default' : 'hover:bg-button-default'}`}>
      <img src={item.icon} alt={item.alt} />
      <span className={`font-bm ${fontSize}`}>{item.title}</span>
    </button>
  );
}
