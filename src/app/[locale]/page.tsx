import { Suspense } from 'react';
import MainPage from '../../pages/main-page/MainPage';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MainPage />
    </Suspense>
  );
}
