import { getCategory } from '@/services/routes/category';
import { useMutation, useQuery } from 'react-query';
import Button from './Button';
import {
  deleteItem,
  deleteUserOnItem,
  postUserOnItem,
} from '@/services/routes/item';
import axios from 'axios';
import { useRouter } from 'next/router';
import { PenSquare } from 'lucide-react';
import { getOneUser } from '@/services/routes/user';

type ItemCardProps = {
  id: string;
  name: string;
  itemData: {
    value?: string;
    description?: string;
    userId?: string;
  };
  currentUser?: string;
  categoryId: string;
  children?: React.ReactNode;
  enabled?: boolean;
};

const ItemCard = ({
  name,
  id,
  itemData,
  categoryId,
  children,
  currentUser,
  enabled = true,
}: ItemCardProps) => {
  const router = useRouter();

  const { value, description, userId } = itemData;

  const userData = useQuery({
    queryKey: ['itemUser', userId],
    queryFn: () => getOneUser(userId as string),
  }).data?.data;

  const removeItem = useMutation({
    mutationFn: deleteItem,
    onSuccess: () => {
      router.reload();
    },
    onError: (e) => {
      if (axios.isAxiosError(e)) {
        alert('Falha na remoção: ' + e.response?.data.message);
      }
    },
  });

  const createUserOnItem = useMutation({
    mutationFn: postUserOnItem,
    onSuccess: (e) => {
      router.reload();
    },
    onError: (e) => {
      if (axios.isAxiosError(e)) {
        alert('Falha no vínculo: ' + e.response?.data.message);
      }
    },
  });

  const removeUserOnItem = useMutation({
    mutationFn: deleteUserOnItem,
    onSuccess: () => {
      router.reload();
    },
    onError: (e) => {
      if (axios.isAxiosError(e)) {
        alert('Falha na remoção: ' + e.response?.data.message);
      }
    },
  });

  console.log(userData);

  return (
    <div className="bg-white rounded p-4 flex flex-col">
      <div className="flex flex-row justify-between">
        <div className=" flex flex-row">
          {' '}
          <h2 className="text-gray-600 text-md mr-4 truncate">Nome: </h2>
          <h1 className="text-gray-600 font-bold text-md mr-4 truncate">
            {name}
          </h1>
        </div>

        <div className="text-cyan-800 flex">
          <button
            className="text-sm h-3"
            color="none"
            onClick={() => {
              router.push('/items/details/' + id);
            }}
          >
            <PenSquare className="h-4" />
          </button>
        </div>
      </div>
      <div className="flex flex-row">
        <h2 className="text-gray-600 text-md mr-4 truncate">Categoria:</h2>
        <h1 className="text-gray-600 font-bold text-md mr-4 truncate">
          {categoryId}
        </h1>
      </div>
      {value ? (
        <div className="flex flex-row">
          <h2 className="text-gray-600 text-md mr-4 truncate">Valor(R$):</h2>
          <h1 className="text-gray-600 font-bold text-md mr-4 truncate">
            {value}
          </h1>
        </div>
      ) : (
        <></>
      )}

      {description ? (
        <div className="flex flex-row">
          <h2 className="text-gray-600 text-md mr-4">Descrição:</h2>
          <h1 className="text-gray-600 font-bold text-md mr-4 break-all">
            {description}
          </h1>
        </div>
      ) : (
        <></>
      )}
      {}

      {children}
      {currentUser === userId ? (
        <div className="flex justify-between gap-2">
          <Button
            text={'Desvincular-se'}
            color={'gray'}
            onClick={() => removeUserOnItem.mutate(id)}
          />

          <Button
            text={'Concluído'}
            color={'cyan'}
            onClick={() => removeItem.mutate(id)}
          />
        </div>
      ) : !userId ? (
        <Button
          text={'Vincular-se'}
          color={'cyan'}
          onClick={() =>
            createUserOnItem.mutate({
              id: id,
              userId: currentUser as string,
            })
          }
        />
      ) : (
        <div className="flex flex-row bg-slate-300 gap-2 rounded-sm p-1">
          <h2 className="text-gray-600 text-sm mr-4">Vinculado a:</h2>
          <h1 className="text-gray-600 font-bold text-sm mr-4 break-all">
            {userData?.name}
          </h1>
        </div>
      )}
    </div>
  );
};

export default ItemCard;
