export function getApiErrorKey(error: Error) {
  switch (error.message) {
    case '404':
      return '404';

    case '500':
      return '500';

    default:
      return 'default';
  }
}
