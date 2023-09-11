import Button from "@/components/Button";
import Input from "@/components/Input";
import axios from "axios";
import { postItem } from "@/services/routes/item";
import { useMutation, useQuery } from "react-query";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { FormEvent, useEffect, useState } from "react";
import NavBar from "@/components/NavBar";
import TextArea from "@/components/TextArea";
import { getOneGroup } from "@/services/routes/group";
import { Category, getCategory } from "@/services/routes/category";
import Select from "@/components/Select";

const Create = () => {
  const router = useRouter();
  if (
    typeof window !== "undefined" &&
    localStorage.getItem("role") === "collaborator"
  ) {
    router.push("/patients");
  }

  const [userId, setUserId] = useState("");

  useEffect(() => {
    setUserId((localStorage?.getItem("userId") as string) ?? "");

    if (!localStorage.getItem("token")) router.push("/");
  }, [router]);

  const group = useQuery({
    queryKey: ["group", userId],
    queryFn: () => getOneGroup(userId as string),
  });

  const categories = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategory(),
  }).data?.data;

  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [category, setCategory] = useState<Category | null>(null);
  const [description, setDescription] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name.length > 0) {
      createItem.mutate({
        name,
        value,
        categoryId,
        groupId: group.data?.data.id as string,
        description,
      });
    } else {
      if (name === "") {
        alert("Falha na criação: Nome não pode ficar em branco");
      }
    }
  };

  const createItem = useMutation({
    mutationFn: postItem,
    onSuccess: (e) => {
      router.push("/itens");
    },
    onError: (e) => {
      if (axios.isAxiosError(e)) {
        alert("Falha no cadastro: " + e.response?.data);
      }
    },
  });

  return (
    <>
      <div className="h-screen w-screen bg-gray-300">
        <NavBar />
        <div className="flex flex-col items-center mt-10">
          <div className=" flex flex-col items-center gap-4 p-4 rounded-md max-w-fit bg-white">
            <h1 className="text-cyan-800 font-bold text-xl">Novo Item</h1>
            <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
              <Input
                label="Nome*"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <h1 className="text-gray-600 font-bold text-l text-sm">
                Categoria
              </h1>
              <Select
                elements={categories ? categories : null}
                value={category as Category}
                onChange={(e) => {
                  setCategoryId(category?.id as string);
                }}
              />
              <Input
                label="Valor(R$)"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />

              <TextArea
                label="Descrição"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <div className="flex justify-between gap-2">
                <Link href="/itens">
                  <Button color="gray" text="Cancelar" />
                </Link>
                <Button color="cyan" text="Finalizar Cadastro" type="submit" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Create;
