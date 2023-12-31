import api from '../axios';

export type Service = {
  id: string;
  name: string;
  serviceData: {
    description?: string;
    userId?: string;
  }[];
  groupId: string;
};

export const getService = () =>
  api.get<Service[]>('/services', {
    headers: { Authorization: localStorage.getItem('token') },
  });

export const postService = (
  service: Omit<Service, 'id' | 'serviceData'> & {
    serviceData: { description?: string };
  },
) =>
  api.post<Service>('/services', service, {
    headers: { Authorization: localStorage.getItem('token') },
  });

export const getOneService = (id: string) =>
  api.get<Service>('/services/' + id, {
    headers: { Authorization: localStorage.getItem('token') },
  });

export const putService = (
  service: Omit<Service, 'serviceData'> & {
    serviceData: { description?: string };
  },
) => {
  const id = service.id;
  return api.patch<Service>('/services/' + id, service, {
    headers: { Authorization: localStorage.getItem('token') },
  });
};

export const deleteService = (id: string) =>
  api.delete('/services/' + id, {
    headers: { Authorization: localStorage.getItem('token') },
  });

export const postUserOnService = (service: { id: string; userId: string }) =>
  api.post<Service>(
    '/services/' + service.id + '/user/' + service.userId,
    service,
    {
      headers: { Authorization: localStorage.getItem('token') },
    },
  );

export const deleteUserOnService = (id: string) =>
  api.delete('/services/' + id + '/user', {
    headers: { Authorization: localStorage.getItem('token') },
  });
