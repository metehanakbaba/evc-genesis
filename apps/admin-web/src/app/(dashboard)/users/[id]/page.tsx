import React from 'react';
import { UserDetailsPage } from '@/features/users';

export default function Page({
  params: paramsPromise,
}: {
  params: Promise<{ id: string }>
}) {
  // unwrap params promise
  const { id } = React.use(paramsPromise)

  return <UserDetailsPage userId={id} />
}