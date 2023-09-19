import Button from '@/components/Button';
import Input from '@/components/Input';
import NavBar from '@/components/NavBar';
import {
  deleteGroup,
  getOneGroup,
  postGroup,
  postGroupMember,
} from '@/services/routes/group';
import axios from 'axios';
import { useRouter } from 'next/router';
import { FormEvent, useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';

export default function Groups() {
  const router = useRouter();
  if (typeof window !== 'undefined' && !localStorage.getItem('token')) {
    router.push('/login');
  }

  const [email, setEmail] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    setUserId((localStorage?.getItem('userId') as string) ?? '');

    if (!localStorage.getItem('token')) router.push('/');
  }, [router]);

  const group = useQuery({
    queryKey: ['group', userId],
    queryFn: () => getOneGroup(userId as string),
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email.length > 0) {
      createGroupMember.mutate({
        email,
        id: group.data?.data.id as string,
      });
    } else {
      if (email === '') {
        alert('Falha na edição: Email não pode ficar em branco');
      }
    }
  };

  const createGroupMember = useMutation({
    mutationFn: postGroupMember,
    onSuccess: (e) => {
      router.push('/groups');
    },
    onError: (e) => {
      if (axios.isAxiosError(e)) {
        alert('Falha no cadastro: ' + e.response?.data.message);
      }
    },
  });

  return (
    <div className="h-screen w-screen bg-gray-300">
      <NavBar />
      <div className="flex items-center justify-center mt-32">
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
          <h1 className="text-cyan-800 font-bold text-xl">
            Digite o Email do usuário:
          </h1>
          <Input
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="flex justify-center">
            <Button color="cyan" text="Adicionar usuário" type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
}
