'use client';

import { ReactNode } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from '../i18n/navigation';

type Props = {
  children: ReactNode;
};

export function DetailsOverlay({ children }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const close = () => {
    const params = new URLSearchParams(searchParams?.toString() ?? '');
    params.delete('detailsId');

    router.push(`/?${params.toString()}`);
  };

  return (
    <>
      <div className="details-overlay" onClick={close} />
      {children}
    </>
  );
}
