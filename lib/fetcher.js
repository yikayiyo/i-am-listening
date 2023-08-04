export default async function fetcher(url) {
  const r = await fetch(url);
  const data = await r.json();
  return data;
} 