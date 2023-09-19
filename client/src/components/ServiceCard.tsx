import { getCategory } from '@/services/routes/category';
import { useMutation, useQuery } from 'react-query';
import Button from './Button';
import { deleteService } from '@/services/routes/service';
import axios from 'axios';
import { useRouter } from 'next/router';
import { PenSquare } from 'lucide-react';

type ServiceCardProps = {
  id: string;
  name: string;
  description?: string;
  children?: React.ReactNode;
  enabled?: boolean;
};

const ServiceCard = ({
  name,
  id,
  description,
  children,
  enabled = true,
}: ServiceCardProps) => {
  const router = useRouter();

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
      <Button
        text={'Concluído'}
        color={'cyan'}
        onClick={() => removeService.mutate(id)}
      />
    </div>
  );
};

export default ServiceCard;
