import { typography } from './src/styles/theme/typography';
import { colors } from './src/styles/theme/colors';
import { shape } from './src/styles/theme/shape';
import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */

// const angleDeg = 33.4396 + 90;
// const angleRad = (angleDeg * Math.PI) / 180;
// const dist = 500;

// const dx = Math.cos(angleRad) * dist; // x 이동 거리
// const dy = Math.sin(angleRad) * dist; // y 이동 거리

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ['Pretendard', ...defaultTheme.fontFamily.sans],
        bm: ['BMDOHYEON', ...defaultTheme.fontFamily.sans],
        sans: ['Pretendard', ...defaultTheme.fontFamily.sans]
      },
      colors: colors,
      borderRadius: shape.radius,
      boxShadow: shape.boxShadow,
      fontSize: typography.fontSize,
      screens: {
        xl2: '1250px'
      }
    },
    keyframes: {
      'fade-in-up': {
        '0%': { opacity: '0', transform: 'translateY(20px)' },
        '100%': { opacity: '1', transform: 'translateY(0)' }
      },
      'slide-in-right': {
        '0%': { opacity: '0', transform: 'translateX(20px)' },
        '100%': { opacity: '1', transform: 'translateX(0)' }
      },
      'scale-in': {
        '0%': { opacity: '0', transform: 'scale(0.9)' },
        '100%': { opacity: '1', transform: 'scale(1)' }
      },
      'bounce-subtle': {
        '0%, 20%, 50%, 80%, 100%': { transform: 'translateY(0)' },
        '40%': { transform: 'translateY(-4px)' },
        '60%': { transform: 'translateY(-2px)' }
      },
      // 떠있는 듯한 애니메이션
      floatCloud: {
        '0%, 100%': { transform: 'scale(1)' }, // 원래 크기
        '25%': { transform: 'scale(1.01)' }, // 살짝 커짐
        '50%': { transform: 'scale(0.99)' }, // 살짝 작아짐
        '75%': { transform: 'scale(1.01)' }
      }
      // 예전 landing 배경에 적용한 애니메이션인데 지금 안 쓰여서 주석처리
      // flowAlongLine: {
      //   '0%': { transform: 'translate(0, 0)' },
      //   '100%': { transform: `translate(${dx}px, ${dy}px)` }
      // }
    },
    animation: {
      'fade-in-up': 'fade-in-up 0.8s ease-out',
      'slide-in-right': 'slide-in-right 0.8s ease-out',
      'scale-in': 'scale-in 0.6s ease-out',
      'bounce-subtle': 'bounce-subtle 3s infinite',
      // 떠있는 듯한 애니메이션: wobble-slow
      'float-cloud': 'floatCloud 3s ease-in-out infinite'
      // 'flow-line': 'flowAlongLine 30s linear infinite'
    }
  },
  plugins: [
    function ({ addVariant }) {
      addVariant('children', '& > *'); // 직계 자식 선택
      addVariant('all', '& *'); // 모든 후손 선택
    }
  ]
};
