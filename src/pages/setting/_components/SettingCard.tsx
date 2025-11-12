interface SettingItemProps {
  title: string;
  onClick?: () => void;
  isClickable?: boolean;
}

export default function SettingCard({ title, onClick, isClickable = true }: SettingItemProps) {
  return (
    <div
      onClick={isClickable ? onClick : undefined}
      className={`w-full bg-white/80 backdrop-blur-lg ring-1 ring-white/40 rounded-2xl py-5 px-7 shadow-md transition-all duration-300 
        ${isClickable ? 'cursor-pointer hover:bg-white/90 hover:shadow-lg hover:scale-[1.01]' : 'cursor-default'}`}>
      <p className="font-medium text-20 text-neutral-800">{title}</p>
    </div>
  );
}
