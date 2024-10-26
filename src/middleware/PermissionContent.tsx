import { Routes, Route, Navigate } from 'react-router-dom';
import routes from '@/routes/routes';

const PermissionContent = () => {
  const access = true;
  return access ? (
    <Routes>
      {routes.map(
        (route: RouteProps, idx: number) =>
          route.component && <Route key={idx} path={route.path} element={<route.component />} />,
      )}
    </Routes>
  ) : (
    <Navigate to="/" />
  );
};

export default PermissionContent;
