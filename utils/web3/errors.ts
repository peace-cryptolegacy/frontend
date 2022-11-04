import get from 'lodash/get';

export function handleError(error: Error): string | undefined {
  const code: number | undefined = get(error, 'code');
  const message: string | undefined = get(error, 'error.data.message');

  if (code !== 4001) {
    return message
      ? message.replace('execution reverted:', '').trim()
      : 'An unexpected error happened.';
  }
}
