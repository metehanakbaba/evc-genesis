import React,  { use } from 'react';
import { UserDetailsPage } from '@/features/users';

export default function Page({
  params: paramsPromise,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(paramsPromise)
  return <UserDetailsPage userId={id} />
}