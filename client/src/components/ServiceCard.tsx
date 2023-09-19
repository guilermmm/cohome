import { getCategory } from '@/services/routes/category';
import { useMutation, useQuery } from 'react-query';
import Button from './Button';
import {
  deleteService,
  deleteUserOnService,
  postUserOnService,
} from '@/services/routes/service';
import axios from 'axios';
import { useRouter } from 'next/router';
import { PenSquare } from 'lucide-react';
import { getOneUser } from '@/services/routes/user';

type ServiceCardProps = {
  id: string;
  name: string;
  serviceData: {
    description?: string;
    userId?: string;
  };
  currentUser?: string;
  children?: React.ReactNode;
  enabled?: boolean;
};

const ServiceCard = ({
  name,
  id,
  serviceData,
  children,
  currentUser,
  enabled = true,
}: ServiceCardProps) => {
  const router = useRouter();

  const { description, userId } = serviceData;

  const userData = useQuery({
    queryKey: ['serviceUser', userId],
    queryFn: () => getOneUser(userId as string),
  }).data?.data;

  const removeService = useMutation({
    mutationFn: deleteService,
    onSuccess: () => {
      router.reload();
    },
    onError: (e) => {
      if (axios.isAxiosError(e)) {
        alert('Falha na remoção: ' + e.response?.data.message);
      }
    },
  });

  const createUserOnService = useMutation({
    mutationFn: postUserOnService,
    onSuccess: (e) => {
      router.reload();
    },
    onError: (e) => {
      if (axios.isAxiosError(e)) {
        alert('Falha no vínculo: ' + e.response?.data.message);
      }
    },
  });

  const removeUserOnService = useMutation({
    mutationFn: deleteUserOnService,
    onSuccess: () => {
      router.reload();
    },
    onError: (e) => {
      if (axios.isAxiosError(e)) {
        alert('Falha na remoção: ' + e.response?.data.message);
      }
    },
  });
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
              router.push('/services/details/' + id);
            }}
          >
            <PenSquare className="h-4" />
          </button>
        </div>
      </div>

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
            onClick={() => removeUserOnService.mutate(id)}
          />

          <Button
            text={'Concluído'}
            color={'cyan'}
            onClick={() => removeService.mutate(id)}
          />
        </div>
      ) : !userId ? (
        <Button
          text={'Vincular-se'}
          color={'cyan'}
          onClick={() =>
            createUserOnService.mutate({
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

export default ServiceCard;
