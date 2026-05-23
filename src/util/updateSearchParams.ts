export function updateSearchParams(
  searchParams: URLSearchParams,

  updates: Record<string, string>
): URLSearchParams {
  const params = new URLSearchParams(searchParams);

  Object.entries(updates).forEach(([key, value]) => {
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
  });

  return params;
}
