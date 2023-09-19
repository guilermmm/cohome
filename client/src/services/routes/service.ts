import api from '../axios';

export type Service = {
  id: string;
  name: string;
  description?: string;
  groupId: string;
};

export const getService = () =>
  api.get<Service[]>('/services', {
    headers: { Authorization: localStorage.getItem('token') },
  });

export const postService = (service: Omit<Service, 'id'>) =>
  api.post<Service>('/services', service, {
    headers: { Authorization: localStorage.getItem('token') },
  });

export const getOneService = (id: string) =>
  api.get<Service>('/services/' + id, {
    headers: { Authorization: localStorage.getItem('token') },
  });

export const putService = (service: Service) => {
  const id = service.id;
  return api.patch<Service>('/services/' + id, service, {
    headers: { Authorization: localStorage.getItem('token') },
  });
};

export const deleteService = (id: string) =>
  api.delete('/services/' + id, {
    headers: { Authorization: localStorage.getItem('token') },
  });
