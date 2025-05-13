'use server';
import { cookies } from 'next/headers';

export async function setCookie(key: string, value: string, maxAge?: number) {
  const cookie = cookies();
  (await cookie).set(key, value, { maxAge });
  return true;
}

export async function removeCookie(key: string) {
  const cookie = cookies();
  (await cookie).delete(key);
  return true;
}

export async function getCookie(key: string): Promise<string | undefined> {
  const cookie = cookies();
  return (await cookie).get(key)?.value;
}
