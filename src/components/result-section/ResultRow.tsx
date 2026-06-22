'use client';

import { useRouter } from '../../i18n/navigation';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { useSelectedItemsStore } from '../../store';
import { Character } from '../../types/types';
import { getCharacterDescription } from '../../util/getCharacterDescription';
import './result-row.css';

interface ResultRowProps {
  character: Character;
}

export function ResultRow({ character }: ResultRowProps) {
  const router = useRouter();
  const { name } = character;

  const t = useTranslations('Details');
  const description = getCharacterDescription(character, t);

  const searchParams = useSearchParams();
  const id = character.url.match(/people\/(\d+)\//)?.[1];

  const toggleItem = useSelectedItemsStore((state) => state.toggleItem);
  const isSelected = useSelectedItemsStore((state) =>
    id ? state.isSelected(id) : false
  );

  if (!id) return null;

  const handleRowClick = () => {
    const params = new URLSearchParams(searchParams?.toString() ?? '');
    params.set('detailsId', id);
    router.push(`/?${params.toString()}`);
  };

  return (
    <div className="result-row" onClick={handleRowClick}>
      <label
        className="result-checkbox"
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          toggleItem(id);
        }}
      >
        <input type="checkbox" checked={isSelected} readOnly />
        <span className="checkbox-custom" />
      </label>

      <span className="result-name">{name}</span>
      <span className="result-description">{description}</span>
    </div>
  );
}
