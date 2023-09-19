import api from '../axios';

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export const getUser = () =>
  api.get<User[]>('/users', {
    headers: { Authorization: localStorage.getItem('token') },
  });

export const postUser = (user: Omit<User, 'id'>) =>
  api.post<User>('/users', user);

export const getOneUser = (id: string) =>
  api.get<User>('/users/' + id, {
    headers: { Authorization: localStorage.getItem('token') },
  });

export const putUser = (user: User) => {
  const id = user.id;
  return api.patch<User>('/users/' + id, user, {
    headers: { Authorization: localStorage.getItem('token') },
  });
};

export const deleteUser = (id: string) =>
  api.delete('/users/' + id, {
    headers: { Authorization: localStorage.getItem('token') },
  });
