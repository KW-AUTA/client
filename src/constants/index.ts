export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/reissue'
  },

  // end point는 똑같지만 사용할 HTTP 메서드가 다르므로 의미적으로 구분하기 위해 각각 변수로 설정해주었습니다.
  USER: {
    SIGNUP: '/users',
    EDIT: '/users',
    LEAVE: '/users',
    PROFILE: '/users/me'
  },

  DASHBOARD: '/home',

  PROJECTS: {
    LIST: '/projects',
    CREATE: '/projects',
    DETAIL: '/projects/:projectId',
    UPDATE: '/projects/:projectId',
    DELETE: '/projects/:projectId',
    RUN_TEST: '/projects/:projectId/run-test',

    TESTS: {
      LIST: '/projects/tests',
      DETAIL: '/projects/tests/:projectId',

      PAGES: '/pages/:pageId'
    }
  },

  HEALTH: {
    CHECK: '/health'
  }
};

export const ROUTES = {
  HOME: '/',
  LANDING: '/landing',
  PRODUCT: '/product',
  MANUAL: '/manual',
  LOGIN: '/login',
  SIGNUP: '/signup',
  PROJECTS: '/projects',
  NEW_PROJECT: '/new-project',
  PROJECT_DETAIL: '/projects/:projectId',
  EDIT_PROJECT: `/projects/:projectId/edit`,
  TESTS: '/tests',
  TEST_DETAIL: '/tests/:projectId',
  SETTINGS: '/settings',
  PROFILE: '/settings/profile',
  PASSWORD: '/settings/password'
};

export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken', // 쿠키로 관리되지만 키 이름은 정의해두기
  USER: 'user'
};

export const ERROR_MESSAGES = {
  NETWORK_ERROR: '네트워크 오류가 발생했습니다. 다시 시도해주세요.',
  UNAUTHORIZED: '인증이 필요합니다. 로그인해주세요.',
  FORBIDDEN: '접근 권한이 없습니다.',
  NOT_FOUND: '요청하신 페이지를 찾을 수 없습니다.',
  SERVER_ERROR: '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.'
};
