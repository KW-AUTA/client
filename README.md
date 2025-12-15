# AUTA Frontend



## 목차
- [프로젝트 개요](#프로젝트-개요)
- [기술 스택](#기술-스택)
- [설치 및 실행](#설치-및-실행)
- [주요 기능](#주요-기능)
- [폴더 구조](#폴더-구조)
- [코딩 & Git 컨벤션](#코딩--git-컨벤션)
- [프로젝트 구성원](#프로젝트-구성원)
- [User Flow & Sitemap](#user-flow--sitemap)

---

## 프로젝트 개요
AUTA는 Figma 기반 UI/UX를 "코드 구현 결과물"과 자동으로 대조·검증해 주는 AI UI 테스트 자동화 플랫폼입니다.
디자인 시안과 실제 화면(웹/앱)의 스크린샷을 비교해 레이아웃/컴포넌트 불일치, 스타일 편차, 반응형 깨짐 같은 문제를 빠르게 탐지하고, 결과를 리포트·대시보드 형태로 정리해 QA 시간을 줄이고 디자인 준수 품질을 표준화하는 것을 목표로 합니다.

**개발 기간**
- 기획: `2025.1~2025.4`
- 개발: `2025.4~2025.9`

---

## 기술 스택

<div align="center">

![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=Vite&logoColor=white)
![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-764ABC?style=for-the-badge&logo=Redux&logoColor=white)
![TanStack Query](https://img.shields.io/badge/TanStack_Query-FF4154?style=for-the-badge&logo=React-Query&logoColor=white)
![SSE](https://img.shields.io/badge/SSE-FF6600?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0id2hpdGUiIGQ9Ik0yMiA2djEySDJWNmgyMG0wLTJIMkMyIDMgMCA1IDAgNnYxMmMwIDEgMiAzIDIgM2gyMGMyIDAgMi0yIDItM1Y2YzAtMi0yLTMtMi0zeiIvPjwvc3ZnPg==&logoColor=white)
![MUI](https://img.shields.io/badge/MUI-007FFF?style=for-the-badge&logo=MUI&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=Tailwind-CSS&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=React-Router&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=Axios&logoColor=white)
![Swiper](https://img.shields.io/badge/Swiper-6332F6?style=for-the-badge&logo=Swiper&logoColor=white)
![Husky](https://img.shields.io/badge/Husky-181717?style=for-the-badge&logo=Git&logoColor=white)

</div>

🔗 [Backend Repository 바로가기](https://github.com/KW-AUTA/server)

🔗 [AI Repository 바로가기](https://github.com/KW-AUTA/AI)

---

## 설치 및 실행

**1. 저장소 복제**
```bash
git clone https://github.com/KW-AUTA/client.git
cd client
```

**2. 종속성 설치**
```bash
npm install
```

**3. Git Hooks 설정**
```bash
npm run prepare  # husky 명시적으로 실행하기 위한 추가적인 명령어
```

**4. 개발 서버 실행**
```bash
npm run dev
```

---

## 주요 기능
<!-- gif, 이미지, 기능 설명 -->

---

## 폴더 구조
```
front/
├── src/
│   ├── assets/           # 이미지, 폰트 등 정적 리소스
│   ├── components/       # 재사용 가능한 UI 컴포넌트
│   ├── pages/            # 페이지 컴포넌트
│   ├── hooks/            # 커스텀 React Hooks
│   ├── store/            # Redux Toolkit, TanStack Query 상태 관리
│   ├── services/api/     # API 통신 로직
│   ├── routes/           # React Router 라우팅 설정
│   ├── types/            # TypeScript 타입 정의
│   ├── utils/            # 유틸리티 함수
│   ├── constants/        # 상수 정의
│   ├── styles/           # 전역 스타일
│   └── App.tsx           # 루트 컴포넌트
├── public/               # 정적 파일 (favicon, images 등)
├── .husky/               # Git hooks (Husky)
└── scripts/              # 빌드/배포 스크립트
```

---

## 코딩 & Git 컨벤션

🔗 [코딩 컨벤션 바로가기](https://lovely-juniper-c4d.notion.site/1811c6afab8c80fcb7dfd49c974d5836)

🔗 [Git 컨벤션 바로가기](https://lovely-juniper-c4d.notion.site/Git-Github-flow-1811c6afab8c809d951ed06288f0009f?pvs=73)

---

## 프로젝트 구성원

<div align="center">

| Frontend | Frontend |
| :---: | :---: |
| **최현준** | **홍유진** |
| [<img src="https://github.com/hywznn.png" width="150" style="display: block; margin: 0 auto;"> <br/> @hywznn](https://github.com/hywznn) | [<img src="https://github.com/youjin-hong.png" width="150" style="display: block; margin: 0 auto;"> <br/> @youjin-hong](https://github.com/youjin-hong) |

</div> 


## User Flow & Sitemap
![AUTA userflow](image.png)

![로그인 flow](image-1.png)

![대시보드 flow](image-2.png)
