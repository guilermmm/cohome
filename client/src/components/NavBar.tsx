import { useRouter } from 'next/router';
import React from 'react';
import Logo from '@/assets/images/logo.png';
import Image from 'next/image';
import Button from './Button';
import { LogOut } from 'lucide-react';

const NavBar = () => {
  const router = useRouter();

  return (
    <div className="h-14 w-full bg-white flex justify-between border-b-2 border-cyan-800">
      <div className="flex items-center ml-4">
        <Image src={Logo} alt="logo" width={50} />
        <h1 className="text-cyan-800 font-bold text-xl pl-2">CoHome</h1>
      </div>
      <div className="flex items-center mx-4 gap-4">
        <div className="flex items-center mx-4 gap-2">
          <Button
            color="cyan"
            text="Itens"
            onClick={() => {
              router.push('/items');
            }}
          />
          <Button
            color="cyan"
            text="Serviços"
            onClick={() => {
              router.push('/services');
            }}
          />
          <Button
            color="cyan"
            text="Grupo"
            onClick={() => {
              router.push('/groups');
            }}
          />
        </div>
        <div className="px-2">
          <Button
            color="none"
            text={<LogOut />}
            onClick={() => {
              localStorage.removeItem('token');
              router.push('/login');
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
