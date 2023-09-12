import api from "../axios";

export type Item = {
  id: string;
  name: string;
  value: string;
  description?: string;
  categoryId: string;
  groupId: string;
};

export const getItem = () =>
  api.get<Item[]>("/items", {
    headers: { Authorization: localStorage.getItem("token") },
  });

export const postItem = (item: Omit<Item, "id">) =>
  api.post<Item>("/items", item, {
    headers: { Authorization: localStorage.getItem("token") },
  });

export const getOneItem = (id: string) =>
  api.get<Item>("/items/" + id, {
    headers: { Authorization: localStorage.getItem("token") },
  });

export const putItem = (item: Item) => {
  const id = item.id;
  return api.patch<Item>("/items/" + id, item, {
    headers: { Authorization: localStorage.getItem("token") },
  });
};

export const deleteItem = (id: string) =>
  api.delete("/items/" + id, {
    headers: { Authorization: localStorage.getItem("token") },
  });
