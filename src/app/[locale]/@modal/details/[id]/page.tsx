'use client';

import { use } from 'react';
import { useRouter } from 'next/navigation';
import { Suspense } from 'react';
import { CharacterDetails } from '../../../../../pages/character-details/CharacterDetails';

function ModalContent({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();

  return <CharacterDetails id={id} onClose={() => router.back()} />;
}

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense fallback={null}>
      <ModalContent params={params} />
    </Suspense>
  );
}
