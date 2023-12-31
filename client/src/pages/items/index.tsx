import Button from '@/components/Button';
import ItemCard from '@/components/ItemCard';
import NavBar from '@/components/NavBar';
import { getCategory } from '@/services/routes/category';
import { getOneGroup } from '@/services/routes/group';
import { getItem } from '@/services/routes/item';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

export default function Itens() {
  const router = useRouter();

  if (typeof window !== 'undefined' && !localStorage.getItem('token')) {
    router.push('/login');
  }

  const [userId, setUserId] = useState('');

  useEffect(() => {
    setUserId((localStorage?.getItem('userId') as string) ?? '');

    if (!localStorage.getItem('token')) router.push('/');
  }, [router]);

  const items = useQuery({
    queryKey: ['items'],
    queryFn: () => getItem(),
  });

  const categories = useQuery({
    queryKey: ['categories'],
    queryFn: () => getCategory(),
  });

  const group = useQuery({
    queryKey: ['group', userId],
    queryFn: () => getOneGroup(userId as string),
  });

  return (
    <div className="h-fit min-h-screen w-screen bg-gray-300">
      <NavBar />
      {group.data?.data.id ? (
        <div className="w-screen flex justify-center">
          <div className="flex flex-col gap-4 p-4 max-w-sm ">
            <Button
              text={'Novo Item'}
              color={'cyan'}
              onClick={() => router.push('/items/create')}
            />
            {items.data?.data.map((n) =>
              n.groupId == group.data?.data.id ? (
                <ItemCard
                  id={n.id}
                  name={n.name}
                  itemData={n.itemData[0]}
                  currentUser={userId}
                  categoryId={
                    categories.data?.data.find((c) => c.id === n.categoryId)
                      ?.name as string
                  }
                  key={n.id}
                />
              ) : (
                <></>
              ),
            )}
          </div>
        </div>
      ) : (
        <div className="flex justify-center mt-10">
          {' '}
          <h1 className="text-cyan-800 font-bold text-xl">
            Você não está em nenhum grupo
          </h1>
        </div>
      )}
    </div>
  );
}
