import api from "../axios";

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  birthdate: string;
}

export const getUser = () => api.get<User[]>("/users");

export const postUser = (user: Omit<User, "id">) =>
  api.post<User>("/users", user);

export const getOneUser = (id: string) => api.get<User>("/users/" + id);

export const putUser = (user: User) => {
  const id = user.id;
  return api.put<User>("/users/" + id, user);
};

export const deleteUser = (id: string) => api.delete("/users/" + id);
