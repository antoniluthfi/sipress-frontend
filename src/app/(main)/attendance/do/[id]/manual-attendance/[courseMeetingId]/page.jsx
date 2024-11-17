"use client";

import { useAuthenticateUser } from '@/lib/api/useAuthenticateUser';
import { usePathname } from 'next/navigation';
import React from 'react'

const ManualAttendance = () => {
  const pathname = usePathname();
  useAuthenticateUser({ authenticatedRedirectRoute: pathname });

  return (
    <div>ManualAttendance</div>
  )
}

export default ManualAttendance