'use client';

import { Suspense } from 'react';
import { CharacterDetails } from '../../../../../features/character-details/CharacterDetails';
import { router } from 'next/client';

export default function Page({ params }: { params: { id: string } }) {
  return (
    <Suspense fallback={null}>
      <CharacterDetails id={params.id} onClose={() => router.back()} />
    </Suspense>
  );
}
