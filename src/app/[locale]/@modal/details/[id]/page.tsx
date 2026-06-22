'use client';

import { Suspense, use } from 'react';
import { useRouter } from 'next/navigation';
import { CharacterDetailsClient } from '../../../../../features/character-details/CharacterDetailsClient';

type PageProps = {
  params: Promise<{ id: string }>;
};

export default function Page({ params }: PageProps) {
  const router = useRouter();
  const { id } = use(params);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CharacterDetailsClient id={id} onCloseAction={() => router.back()} />
    </Suspense>
  );
}
