import api from "../axios";
import { User } from "./user";

export type Group = {
  id: string;
  usersInGroup: {
    user: User;
    isAdmin: boolean;
  }[];
  name: string;
  createdAt: string;
  updatedAt: string;
};

export const getGroup = () =>
  api.get<Group[]>("/groups", {
    headers: { Authorization: localStorage.getItem("token") },
  });

export const postGroup = (group: { name: string; userId: string }) =>
  api.post<Group>("/groups", group, {
    headers: { Authorization: localStorage.getItem("token") },
  });

export const postGroupMember = (group: { email: string; id: string }) =>
  api.post<Group>(
    "/groups/" + group.id + "/user",
    { email: group.email },
    {
      headers: { Authorization: localStorage.getItem("token") },
    }
  );

export const deleteGroupMember = (group: { userId: string; id: string }) =>
  api.delete<Group>("/groups/" + group.id + "/user/" + group.userId, {
    headers: { Authorization: localStorage.getItem("token") },
  });

export const getOneGroup = (id: string) =>
  api.get<Group>("/groups/" + id, {
    headers: { Authorization: localStorage.getItem("token") },
  });

export const putGroup = (group: Group) => {
  const id = group.id;
  return api.patch<Group>("/groups/" + id, group, {
    headers: { Authorization: localStorage.getItem("token") },
  });
};

export const deleteGroup = (id: string) =>
  api.delete("/groups/" + id, {
    headers: { Authorization: localStorage.getItem("token") },
  });
