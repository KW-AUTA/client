export const colors = {
  // 페이지 색상
  background: '#F5F5F5',
  pointColor: '#97AF8F',

  // AUTA v4 Brand Colors
  brand: {
    blue: '#1E9AF7',
    orange: '#FF7A2F',
    sage: '#A6B6A1'
  },

  // Neutral palette for v4 landing
  neutral: {
    50: '#F8F9FB',
    100: '#EEF1F5',
    300: '#D5DBE4',
    700: '#2E3238',
    900: '#191B1F'
  },

  // 텍스트 색상
  typography: {
    dark: '#191919',
    gray: '#8C8C8C',
    white: '#FFFFFF'
  },

  // 기타 색상 (변수명이 좀 고민돼서 우선 진한순에서 연한순으로 숫자 넣어놓을게요..ㅎ)
  // 청록 계열
  teal_1: '#31A791',
  teal_2: '#EFFEF9',

  // 녹색 계열
  green_1: '#4BA731',
  green_2: '#F0FEED',

  // 보라 계열
  purple_1: '#A731A3',
  purple_2: '#FFE7FE',

  // 남색 계열
  navy_1: '#3F31A7',
  navy_2: '#EDEEFE',

  // 갈색 계열
  brown_1: '#A79131',
  brown_2: '#FFF9E1',

  // 빨강 계열
  red_1: '#A73131',
  red_2: '#FEEDED',

  // 회색 계열
  gray_1: '#707070',
  gray_2: '#e9e9e9',

  // 버튼 상태별 배경, border 색상
  button: {
    default: '#F5F5F5',
    hover: '#E8E8E8',
    press: '#B0B0B0',
    text: '#8C8C8C',
    border: '#8C8C8C'
  },

  TEST_TYPE_DOT: {
    ROUTING: '#31A791',
    INTERACTION: '#A731A3',
    MAPPING: '#A79131'
  },
  TEST_TYPE_TEXT: {
    ROUTING: '#31A791',
    INTERACTION: '#A731A3',
    MAPPING: '#A79131'
  }
} as const;
