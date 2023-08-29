import api from "../axios";
import { User } from "./user";

export type Group = {
  id: string;
  users: User[];
  name: string;
};

export const getGroup = () =>
  api.get<Group[]>("/groups", {
    headers: { Authorization: localStorage.getItem("token") },
  });

export const postGroup = (group: { name: string; userId: string }) =>
  api.post<Group>("/groups", group, {
    headers: { Authorization: localStorage.getItem("token") },
  });

export const getOneGroup = (id: string) =>
  api.get<Group>("/groups/" + id, {
    headers: { Authorization: localStorage.getItem("token") },
  });

export const putGroup = (group: Group) => {
  const id = group.id;
  return api.put<Group>("/groups/" + id, group, {
    headers: { Authorization: localStorage.getItem("token") },
  });
};

export const deleteGroup = (id: string) =>
  api.delete("/groups/" + id, {
    headers: { Authorization: localStorage.getItem("token") },
  });
