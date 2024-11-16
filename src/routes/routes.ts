import React from 'react';
import { ROUTER_PATHS } from './constants';
const AuthPage = React.lazy(() => import('@/pages/auth/views/Auth'));

const routes = [
  {
    path: ROUTER_PATHS.auth.url,
    exact: true,
    name: ROUTER_PATHS.auth.name,
    component: AuthPage,
  },
];

export default routes;
