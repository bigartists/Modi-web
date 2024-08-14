// ----------------------------------------------------------------------
export const _id = [...Array(40)].map(
  (_, index) => `e99f09a7-dd88-49d5-b1c8-1daf80c2d7b${index + 1}`
);
const MOCK_ID = _id[1];
const ROOTS = {
  AUTH: '/auth',
  DASHBOARD: '/dashboard',
};

// ----------------------------------------------------------------------

export const paths = {
  faqs: '/faqs',
  minimalStore: 'https://mui.com/store/items/minimal-dashboard/',
  // AUTH
  auth: {
    amplify: {
      signIn: `${ROOTS.AUTH}/amplify/sign-in`,
      verify: `${ROOTS.AUTH}/amplify/verify`,
      signUp: `${ROOTS.AUTH}/amplify/sign-up`,
      updatePassword: `${ROOTS.AUTH}/amplify/update-password`,
      resetPassword: `${ROOTS.AUTH}/amplify/reset-password`,
    },
    jwt: {
      signIn: `${ROOTS.AUTH}/jwt/sign-in`,
      signUp: `${ROOTS.AUTH}/jwt/sign-up`,
    },
    firebase: {
      signIn: `${ROOTS.AUTH}/firebase/sign-in`,
      verify: `${ROOTS.AUTH}/firebase/verify`,
      signUp: `${ROOTS.AUTH}/firebase/sign-up`,
      resetPassword: `${ROOTS.AUTH}/firebase/reset-password`,
    },
    auth0: {
      signIn: `${ROOTS.AUTH}/auth0/sign-in`,
    },
    supabase: {
      signIn: `${ROOTS.AUTH}/supabase/sign-in`,
      verify: `${ROOTS.AUTH}/supabase/verify`,
      signUp: `${ROOTS.AUTH}/supabase/sign-up`,
      updatePassword: `${ROOTS.AUTH}/supabase/update-password`,
      resetPassword: `${ROOTS.AUTH}/supabase/reset-password`,
    },
  },
  // DASHBOARD
  dashboard: {
    root: ROOTS.DASHBOARD,
    deployment: {
      root: `${ROOTS.DASHBOARD}/deployment`,
      details: (ns: string, name: string) => `${ROOTS.DASHBOARD}/deployment/${ns}/${name}`,
      new: `${ROOTS.DASHBOARD}/deployment/new`,
    },
    pod: {
      root: `${ROOTS.DASHBOARD}/pod`,
      details: (ns: string, name: string) => `${ROOTS.DASHBOARD}/pod/${ns}/${name}`,
    },
    service: `${ROOTS.DASHBOARD}/service`,

    configmap: {
      root: `${ROOTS.DASHBOARD}/configmap`,
      new: `${ROOTS.DASHBOARD}/configmap/new`,
      // details: (id: string) => `${ROOTS.DASHBOARD}/configmap/${id}`,
      // edit: (id: string) => `${ROOTS.DASHBOARD}/configmap/${id}/edit`,
    },
    secret: {
      root: `${ROOTS.DASHBOARD}/secret`,
      new: `${ROOTS.DASHBOARD}/secret/new`,
      // details: (id: string) => `${ROOTS.DASHBOARD}/secret/${id}`,
      // edit: (id: string) => `${ROOTS.DASHBOARD}/secret/${id}/edit`,
    },

    app: {
      root: `${ROOTS.DASHBOARD}/app`,
      list: `${ROOTS.DASHBOARD}/app/list`,
      info: `${ROOTS.DASHBOARD}/app/info`,
    },
    product: {
      root: `${ROOTS.DASHBOARD}/product`,
      new: `${ROOTS.DASHBOARD}/product/new`,
      details: (id: string) => `${ROOTS.DASHBOARD}/product/${id}`,
      edit: (id: string) => `${ROOTS.DASHBOARD}/product/${id}/edit`,
      demo: {
        details: `${ROOTS.DASHBOARD}/product/${MOCK_ID}`,
        edit: `${ROOTS.DASHBOARD}/product/${MOCK_ID}/edit`,
      },
    },
  },
};
