export async function fetcher(
  method: 'GET' | 'DELETE' | 'POST' | 'PATCH',
  url = '',
  data = {}
) {
  const body = method !== 'GET' ? JSON.stringify(data) : undefined;
  const response = await fetch(url, {
    method,
    body,
  });
  return response.json();
}
