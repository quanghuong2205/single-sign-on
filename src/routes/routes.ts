import React from 'react';
import { ROUTER_PATHS } from './constants';
const AuthPage = React.lazy(() => import('@/pages/auth/views/Auth'));

const routes = [
  {
    path: ROUTER_PATHS.auth.url,
    exact: true,
    name: 'Authentication',
    component: AuthPage,
  },
];

export default routes;
