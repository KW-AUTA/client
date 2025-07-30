import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants';
import Button from '@/components/ui/button/Button';

interface FinalCTASectionProps {
  className?: string;
  title?: string;
  buttonText?: string;
  buttonLink?: string;
}

const FinalCTASection = ({
  className = '',
  title = '지금 바로, 당신의 프로젝트에 완벽함을 더하세요.',
  buttonText = 'AUTA 무료로 시작하기',
  buttonLink = ROUTES.LOGIN
}: FinalCTASectionProps) => {
  return (
    <section className={`py-16 sm:py-20 bg-gradient-to-br from-green-600 to-green-700 text-white ${className}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 leading-tight">{title}</h2>
        <div className="flex justify-center items-center">
          <Link to={buttonLink} className="inline-block">
            <Button
              text={buttonText}
              className="bg-white text-green-600 hover:bg-gray-100 border-white hover:border-gray-100 text-lg sm:text-xl px-10 sm:px-12 py-5 sm:py-6"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FinalCTASection;
