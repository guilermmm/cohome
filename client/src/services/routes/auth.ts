import api from '../axios';

export type Login = {
  email: string;
  password: string;
};

export type JWT = {
  access_token: string;
  userId: string;
};

export const postLogin = async (login: Login) =>
  api.post<JWT>('/auth/login', login);
