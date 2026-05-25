import { describe, expect, it } from 'vitest';
import { router } from '../../../router.tsx';
import { BASE_URL } from '../../../constants';

describe('router', () => {
  it('uses correct basename', () => {
    expect(router.basename).toBe(BASE_URL);
  });

  it('contains root route', () => {
    const [rootRoute] = router.routes;

    expect(rootRoute.path).toBe('/');
  });

  it('contains main page route', () => {
    const [rootRoute] = router.routes;

    const mainRoute = rootRoute.children?.find((route) => route.path === '/');

    expect(mainRoute).toBeDefined();
  });

  it('contains character details route', () => {
    const [rootRoute] = router.routes;

    const mainRoute = rootRoute.children?.find((route) => route.path === '/');

    const detailsRoute = mainRoute?.children?.find(
      (route) => route.path === 'details/:id'
    );

    expect(detailsRoute).toBeDefined();
  });

  it('contains about route', () => {
    const [rootRoute] = router.routes;

    const aboutRoute = rootRoute.children?.find(
      (route) => route.path === 'about'
    );

    expect(aboutRoute).toBeDefined();
  });

  it('contains wildcard not found route', () => {
    const [rootRoute] = router.routes;

    const notFoundRoute = rootRoute.children?.find(
      (route) => route.path === '*'
    );

    expect(notFoundRoute).toBeDefined();
  });

  it('has error element on root route', () => {
    const [rootRoute] = router.routes;

    expect(rootRoute.errorElement).toBeDefined();
  });

  it('has children routes', () => {
    const [rootRoute] = router.routes;

    expect(rootRoute.children).toHaveLength(3);
  });
});
