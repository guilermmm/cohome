import Button from '@/components/Button';
import Input from '@/components/Input';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FormEvent, useState } from 'react';
import Logo from '@/assets/images/logo.png';
import Image from 'next/image';
import { postLogin } from '@/services/routes/auth';
import { useMutation } from 'react-query';

const Main = () => {
  const router = useRouter();
  if (typeof window !== 'undefined' && !localStorage.getItem('token')) {
    router.push('/login');
  }

  return <></>;
};

export default Main;
