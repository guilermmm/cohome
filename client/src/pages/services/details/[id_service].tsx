import Button from '@/components/Button';
import Input from '@/components/Input';
import axios from 'axios';
import {
  deleteService,
  getOneService,
  postService,
  putService,
} from '@/services/routes/service';
import { useMutation, useQuery } from 'react-query';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FormEvent, useEffect, useState } from 'react';
import NavBar from '@/components/NavBar';
import TextArea from '@/components/TextArea';
import { getOneGroup } from '@/services/routes/group';
import { getCategory } from '@/services/routes/category';

const Create = () => {
  const router = useRouter();
  if (typeof window !== 'undefined' && !localStorage.getItem('token')) {
    router.push('/login');
  }
  const { id_service } = router.query;
  const [userId, setUserId] = useState('');

  useEffect(() => {
    setUserId((localStorage?.getItem('userId') as string) ?? '');

    if (!localStorage.getItem('token')) router.push('/');
  }, [router]);

  const group = useQuery({
    queryKey: ['group', userId],
    queryFn: () => getOneGroup(userId as string),
  });

  const categories = useQuery({
    queryKey: ['categories'],
    queryFn: () => getCategory(),
  }).data?.data;

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const serviceData = useQuery({
    queryKey: ['service', id_service],
    queryFn: () => getOneService(id_service as string),
    enabled: id_service !== undefined,
    onSuccess: (data) => {
      setDescription(data.data.serviceData[0].description ?? '');
      setName(data.data.name);
    },
  });

  const editService = useMutation({
    mutationFn: putService,
    onSuccess: () => {
      serviceData.refetch();
    },
    onError: (e) => {
      if (axios.isAxiosError(e)) {
        alert('Falha na edição: ' + e.response?.data);
      }
    },
  });

  const removeService = useMutation({
    mutationFn: deleteService,
    onSuccess: () => {
      router.push('/services');
    },
    onError: (e) => {
      if (axios.isAxiosError(e)) {
        alert('Falha na remoção: ' + e.response?.data);
      }
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name.length > 0) {
      editService.mutate({
        name,
        groupId: group.data?.data.id as string,
        serviceData: {
          description,
        },
        id: id_service as string,
      });
      router.push('/services');
    } else {
      if (name === '') {
        alert('Falha na edição: Nome não pode ficar em branco');
      }
    }
  };

  console.log(categories);
  return (
    <>
      <div className="h-screen w-screen bg-gray-300">
        <NavBar />
        <div className="flex flex-col items-center mt-10">
          <div className=" flex flex-col items-center gap-4 p-4 rounded-md max-w-fit bg-white">
            <h1 className="text-cyan-800 font-bold text-xl">Novo Serviço</h1>
            <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
              <Input
                label="Nome*"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={true}
              />

              <TextArea
                label="Descrição"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <div className="flex justify-between gap-2">
                <Link href="/services">
                  <Button color="gray" text="Cancelar" />
                </Link>
                <Button color="cyan" text="Finalizar Edição" type="submit" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Create;
