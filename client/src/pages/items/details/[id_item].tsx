import Button from '@/components/Button';
import Input from '@/components/Input';
import axios from 'axios';
import {
  deleteItem,
  getOneItem,
  postItem,
  putItem,
} from '@/services/routes/item';
import { useMutation, useQuery } from 'react-query';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FormEvent, useEffect, useState } from 'react';
import NavBar from '@/components/NavBar';
import TextArea from '@/components/TextArea';
import { getOneGroup } from '@/services/routes/group';
import { getCategory } from '@/services/routes/category';
import Select from '@/components/Select';

const Create = () => {
  const router = useRouter();
  if (typeof window !== 'undefined' && !localStorage.getItem('token')) {
    router.push('/login');
  }
  const { id_item } = router.query;
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
  const [value, setValue] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [description, setDescription] = useState('');

  const itemData = useQuery({
    queryKey: ['item'],
    queryFn: () => getOneItem(id_item as string),
    enabled: id_item !== undefined,
    onSuccess: (data) => {
      setCategoryId(data.data.categoryId);
      setDescription(data.data.itemData[0].description ?? '');
      setName(data.data.name);
      setValue(data.data.itemData[0].value);
    },
  });

  const editItem = useMutation({
    mutationFn: putItem,
    onSuccess: () => {
      itemData.refetch();
    },
    onError: (e) => {
      if (axios.isAxiosError(e)) {
        alert('Falha na edição: ' + e.response?.data);
      }
    },
  });

  const removeItem = useMutation({
    mutationFn: deleteItem,
    onSuccess: () => {
      router.push('/items');
    },
    onError: (e) => {
      if (axios.isAxiosError(e)) {
        alert('Falha na remoção: ' + e.response?.data);
      }
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name.length > 0 && categoryId.length > 0) {
      editItem.mutate({
        name,
        itemData: {
          value,
          description,
        },
        categoryId,
        groupId: group.data?.data.id as string,
        id: id_item as string,
      });
      router.push('/items');
    } else {
      if (name === '') {
        alert('Falha na edição: Nome não pode ficar em branco');
      }
      if (categoryId === '') {
        alert('Falha na edição: Categoria não pode ficar em branco');
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
            <h1 className="text-cyan-800 font-bold text-xl">Novo Item</h1>
            <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
              <Input
                label="Nome*"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <h1 className="text-gray-600 font-bold text-l text-sm">
                Categoria*
              </h1>
              <Select
                elements={categories ?? null}
                value={categoryId}
                onChange={(e) => {
                  setCategoryId(e.target.value);
                }}
              />
              <Input
                label="Valor(R$)"
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />

              <TextArea
                label="Descrição"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <div className="flex justify-between gap-2">
                <Link href="/items">
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
