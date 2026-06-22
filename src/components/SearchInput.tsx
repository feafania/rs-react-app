'use client';

import { type ChangeEvent } from 'react';
import { useTranslations } from 'next-intl';

interface SearchInputProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export function SearchInput({ value, onChange }: SearchInputProps) {
  const t = useTranslations('Search');
  return (
    <input
      className="search-input"
      type="text"
      placeholder={t('placeholder')}
      aria-label={t('ariaLabel')}
      value={value}
      onChange={onChange}
    />
  );
}
