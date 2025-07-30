import smallLogo from '@/assets/logos/AUTA_small.svg';

interface FooterProps {
  className?: string;
  links?: Array<{ text: string; href: string }>;
}

const Footer = ({
  className = '',
  links = [
    { text: '카카오톡 문의', href: '#' },
    { text: '이용약관', href: '#' },
    { text: '개인정보처리방침', href: '#' }
  ]
}: FooterProps) => {
  return (
    <footer className={`bg-gray-900 text-white py-12 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <img src={smallLogo} alt="AUTA" className="h-8 w-auto mr-4" />
            <span className="text-gray-400">© 2025 AUTA. All rights reserved.</span>
          </div>
          <div className="flex items-center space-x-6">
            {links.map((link, index) => (
              <a key={index} href={link.href} className="text-gray-400 hover:text-white transition-colors duration-200">
                {link.text}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
