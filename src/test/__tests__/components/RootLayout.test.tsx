import { screen } from '@testing-library/react';
import { Routes, Route } from 'react-router';
import { RootLayout } from '../../../routes/root-layout/RootLayout.tsx';
import { renderWithProviders } from '../test-utils/renderWithProviders.tsx';
import userEvent from '@testing-library/user-event';

describe('RootLayout', () => {
  beforeAll(() => {
    HTMLDialogElement.prototype.showModal = vi.fn(function (
      this: HTMLDialogElement
    ) {
      this.setAttribute('open', '');
    });
    HTMLDialogElement.prototype.close = vi.fn(function (
      this: HTMLDialogElement
    ) {
      this.removeAttribute('open');
    });
  });

  function setup(path = '/') {
    return {
      user: userEvent.setup(),
      ...renderWithProviders(
        <Routes>
          <Route element={<RootLayout />}>
            <Route path="/" element={<div>Home Page</div>} />
            <Route path="/about" element={<div>About Page</div>} />
          </Route>
        </Routes>,
        { initialPath: path }
      ),
    };
  }

  it('renders logo', () => {
    setup();
    expect(
      screen.getByText('Star Wars Character Explorer')
    ).toBeInTheDocument();
  });

  it('renders Home and About nav links', () => {
    setup();
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument();
  });

  it('Home link has active class on root path', () => {
    setup('/');
    const homeLink = screen.getByRole('link', { name: /home/i });
    expect(homeLink).toHaveClass('active');
  });

  it('About link has active class on /about path', () => {
    setup('/about');
    const aboutLink = screen.getByRole('link', { name: /about/i });
    expect(aboutLink).toHaveClass('active');
  });

  it('renders outlet content', () => {
    setup('/');
    expect(screen.getByText('Home Page')).toBeInTheDocument();
  });

  it('renders error boundary wrapping content', () => {
    setup('/');
    expect(
      screen.getByText('Star Wars Character Explorer')
    ).toBeInTheDocument();
  });

  it('opens and closes profile menu on Add Profile button click', async () => {
    const { user } = setup();
    const menuButton = screen.getByRole('button', { name: /add profile/i });

    await user.click(menuButton);
    expect(
      screen.getByRole('button', { name: /uncontrolled form/i })
    ).toBeInTheDocument();

    await user.click(menuButton);
    expect(
      screen.queryByRole('button', { name: /uncontrolled form/i })
    ).not.toBeInTheDocument();
  });

  it('toggles theme when theme button is clicked', async () => {
    const { user } = setup();
    const themeButton = screen.getByRole('button', { name: /dark|light/i });

    const initialText = themeButton.textContent;
    await user.click(themeButton);

    expect(themeButton.textContent).not.toBe(initialText);
  });

  it('opens Uncontrolled Form modal when Uncontrolled Form is clicked', async () => {
    const { user } = setup();
    const menuButton = screen.getByRole('button', { name: /add profile/i });

    await user.click(menuButton);
    await user.click(
      screen.getByRole('button', { name: /uncontrolled form/i })
    );

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Uncontrolled Form')).toBeInTheDocument();
  });

  it('opens React Hook Form modal when React Hook Form is clicked', async () => {
    const { user } = setup();

    await user.click(screen.getByRole('button', { name: /add profile/i }));
    await user.click(screen.getByRole('button', { name: /react hook form/i }));

    expect(document.querySelector('dialog')).toBeInTheDocument();
    expect(screen.getByText('React Hook Form')).toBeInTheDocument();
  });

  it('closes modal when close button is clicked', async () => {
    const { user } = setup();

    await user.click(screen.getByRole('button', { name: /add profile/i }));
    await user.click(
      screen.getByRole('button', { name: /uncontrolled form/i })
    );

    expect(document.querySelector('dialog')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /close modal/i }));

    expect(document.querySelector('dialog')).not.toBeInTheDocument();
  });

  it('closes modal when clicking on dialog backdrop', async () => {
    const { user } = setup();

    await user.click(screen.getByRole('button', { name: /add profile/i }));
    await user.click(
      screen.getByRole('button', { name: /uncontrolled form/i })
    );

    const dialog = document.querySelector('dialog') as HTMLElement;
    expect(dialog).toBeInTheDocument();

    await user.click(dialog);

    expect(document.querySelector('dialog')).not.toBeInTheDocument();
  });
});
