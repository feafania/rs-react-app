'use client';

import { Suspense, use } from 'react';
import { useRouter } from 'next/navigation';
import { CharacterDetails } from '../../../../../features/character-details/CharacterDetails';

type PageProps = {
  params: Promise<{ id: string }>;
};

export default function Page({ params }: PageProps) {
  const router = useRouter();
  const { id } = use(params);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CharacterDetails id={id} onCloseAction={() => router.back()} />
    </Suspense>
  );
}
