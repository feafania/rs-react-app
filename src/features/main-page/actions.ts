'use server';

import { redirect } from 'next/navigation';

export async function handleSearchAction(locale: string, formData: FormData) {
  const search = ((formData.get('search') as string) ?? '').trim();
  const params = new URLSearchParams();

  if (search) {
    params.set('search', search);
  }
  params.set('page', '1');

  redirect(`/${locale}?${params.toString()}`);
}
