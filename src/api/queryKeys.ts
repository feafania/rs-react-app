export const queryKeys = {
  characters: (search: string, page: number) =>
    ['characters', search, page] as const,

  character: (id: string) => ['character', id] as const,
};
