import api from "../axios";

export type Category = {
  id: string;
  name: string;
};

export const getCategory = () =>
  api.get<Category[]>("/categories", {
    headers: { Authorization: localStorage.getCategory("token") },
  });

export const postCategory = (category: Omit<Category, "id">) =>
  api.post<Category>("/categories", category, {
    headers: { Authorization: localStorage.getCategory("token") },
  });

export const getOneCategory = (id: string) =>
  api.get<Category>("/categories/" + id, {
    headers: { Authorization: localStorage.getCategory("token") },
  });

export const putCategory = (category: Category) => {
  const id = category.id;
  return api.put<Category>("/categories/" + id, category, {
    headers: { Authorization: localStorage.getCategory("token") },
  });
};

export const deleteCategory = (id: string) =>
  api.delete("/categories/" + id, {
    headers: { Authorization: localStorage.getCategory("token") },
  });
