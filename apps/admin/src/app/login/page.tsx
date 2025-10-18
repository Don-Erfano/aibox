'use client';

import dynamic from 'next/dynamic';

const LoginPage = dynamic(
  () => import('@/components/pages/login').then((mod) => mod.LoginPage),
  { ssr: false }
);

export default function Login() {
  return <LoginPage />;
}
