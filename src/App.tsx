import loadable from '@loadable/component';
import React, { useLayoutEffect, useState } from 'react';
import { Route, Router, Routes } from 'react-router-dom';
import '@/assets/scss/_style.scss';
import { history } from '@/routes/history';

const DefaultLayout = loadable(() => import('@/layouts/DefaultLayout'));

const CustomRouter = ({ history, ...props }: any) => {
  const [state, setState] = useState({
    action: history.action,
    location: history.location,
  });
  useLayoutEffect(() => history.listen(setState), [history]);
  return <Router {...props} location={state.location} navigationType={state.action} navigator={history} />;
};

export const App: React.FC = () => {
  return (
    <CustomRouter history={history}>
      <Routes>
        <Route path="/*" element={<DefaultLayout />} />
      </Routes>
    </CustomRouter>
  );
};
