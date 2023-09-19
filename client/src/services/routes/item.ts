import api from '../axios';

export type Item = {
  id: string;
  name: string;
  categoryId: string;
  groupId: string;
  itemData: {
    description?: string;
    value: string;
  }[];
};

export const getItem = () =>
  api.get<Item[]>('/items', {
    headers: { Authorization: localStorage.getItem('token') },
  });

export const postItem = (
  item: Omit<Item, 'id' | 'itemData'> & {
    itemData: { value?: string; description?: string };
  },
) =>
  api.post<Item>('/items', item, {
    headers: { Authorization: localStorage.getItem('token') },
  });

export const getOneItem = (id: string) =>
  api.get<Item>('/items/' + id, {
    headers: { Authorization: localStorage.getItem('token') },
  });

export const putItem = (
  item: Omit<Item, 'itemData'> & {
    itemData: { value?: string; description?: string };
  },
) => {
  const id = item.id;
  return api.patch<Item>('/items/' + id, item, {
    headers: { Authorization: localStorage.getItem('token') },
  });
};

export const deleteItem = (id: string) =>
  api.delete('/items/' + id, {
    headers: { Authorization: localStorage.getItem('token') },
  });
