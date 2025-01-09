import { config } from '@/app/config';

const userAgent = 'mobile/horoscope';

export const fetchPublic = ({
  url,
  method = 'GET',
  body,
}: {
  url: string;
  method?: string;
  body?: Record<string, string>;
}) =>
  fetch(`${config.baseApiUrl}/${url}`, {
    method,
    headers: {
      'user-agent': userAgent,
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: body ? JSON.stringify(body) : null,
  });

export const fetchWithKey = ({ url }: { url: string }) =>
  fetch(`${config.baseApiUrl}/${url}`, {
    method: 'GET',
    headers: {
      'user-agent': userAgent,
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: config.apiKey as string,
    },
  });

export const fetchSigned = async ({
  url,
  method = 'GET',
  body,
  headers = {},
}: {
  method?: string;
  url: string;
  body?: Record<string, string>;
  headers?: Record<string, string>;
}) => {
  const defaultHeader = {
    'user-agent': userAgent,
    'Content-Type': 'application/json; charset=utf-8',
  };

  return fetch(url, {
    credentials: 'include',
    method,
    headers: { ...defaultHeader, ...headers },
    body: body ? JSON.stringify(body) : null,
  });
};
