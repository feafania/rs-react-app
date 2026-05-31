export function getErrorMessage(status: number): string {
  switch (status) {
    case 404:
      return 'Requested data was not found.';

    case 500:
      return 'Please try again later.';

    default:
      return 'Something went wrong. Please try again later.';
  }
}
