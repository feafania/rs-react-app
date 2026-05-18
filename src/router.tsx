import { createBrowserRouter } from 'react-router';
import { AboutPage } from './routes/about-page/AboutPage.tsx';
import { NotFoundPage } from './routes/not-found-page/NotFoundPage.tsx';
import { CharacterDetails } from './routes/character-details/CharacterDetails.tsx';
import MainPage from './routes/main-page/MainPage.tsx';
import { RootLayout } from './routes/root-layout/RootLayout.tsx';
import { BASE_URL } from './constants';

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <RootLayout />,
      errorElement: <NotFoundPage />,
      children: [
        {
          index: true,
          element: <MainPage />,
        },
        {
          path: 'details/:id',
          element: <CharacterDetails />,
        },
        {
          path: 'about',
          element: <AboutPage />,
        },
        { path: '*', element: <NotFoundPage /> },
      ],
    },
  ],
  {
    basename: BASE_URL,
  }
);
