'use client';

import { useTranslations } from 'next-intl';

type Props = {
  selectedItems: string[];
};

export function DownloadButton({ selectedItems }: Props) {
  const t = useTranslations('Download');

  const handleDownload = async () => {
    const ids = selectedItems.map((id) => id.toString());

    const res = await fetch('/api/export-csv', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ids,
        t: {
          name: t('name'),
          gender: t('gender'),
          height: t('height'),
          birthYear: t('birthYear'),
          mass: t('mass'),
          hair: t('hair'),
          skin: t('skin'),
          eyes: t('eyes'),
          url: t('url'),
          unknown: t('unknown'),
          na: t('na'),
        },
      }),
    });

    const csvText = await res.text();
    const blob = new Blob(['\uFEFF' + csvText], {
      type: 'text/csv;charset=utf-8;',
    });

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');

    a.href = url;
    a.download = `${ids.length}_items.csv`;

    a.click();

    URL.revokeObjectURL(url);
  };

  return (
    <button className="download-button" onClick={handleDownload}>
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <path d="M7 10l5 5 5-5" />
        <path d="M12 15V3" />
      </svg>

      <span>{t('download')}</span>
    </button>
  );
}
