'use client';

import { useRouter } from 'next/navigation';
import Button from './Button';

export default function Logout() {
  const router = useRouter();
  return <Button label="تسجيل الخروج" redirectTo="/login" />;
}
