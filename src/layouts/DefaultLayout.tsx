import PermissionContent from '@/middleware/PermissionContent';
import { Suspense } from 'react';

const DefaultLayout = () => {
  return (
    <Suspense>
      <PermissionContent />
    </Suspense>
  );
};

export default DefaultLayout;
