import Button from "@/components/Button";
import Input from "@/components/Input";
import NavBar from "@/components/NavBar";
import {
  deleteGroup,
  getGroup,
  getOneGroup,
  postGroup,
} from "@/services/routes/group";
import { getOneUser, getUser } from "@/services/routes/user";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { useMutation, useQuery } from "react-query";

export default function Groups() {
  const router = useRouter();
  if (typeof window !== "undefined" && !localStorage.getItem("token")) {
    router.push("/login");
  }

  const [name, setName] = useState("");

  const userId = (localStorage?.getItem("userId") as string) ?? "";

  const group = useQuery({
    queryKey: ["group"],
    queryFn: () => getOneGroup(userId as string),
    enabled: userId !== undefined,
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createGroup.mutate({
      name,
      userId,
    });
  };

  const createGroup = useMutation({
    mutationFn: postGroup,
    onSuccess: () => {
      router.push("/groups");
    },
    onError: (e) => {
      if (axios.isAxiosError(e)) {
        alert("Falha no cadastro: " + e.response?.data.message);
      }
    },
  });

  const removeGroup = useMutation({
    mutationFn: deleteGroup,
    onSuccess: () => {
      group.data?.data.users.pop();
      router.push("/");
    },
    onError: (e) => {
      if (axios.isAxiosError(e)) {
        alert("Falha na remoção: " + e.response?.data.message);
      }
    },
  });

  return (
    <div className="h-screen w-screen bg-gray-300">
      <NavBar />

      {group.data?.data.users[0]?.id == userId ? (
        <div className=" m-10 rounded-md bg-white flex flex-col gap-3 p-4">
          <div className="flex justify-between">
            {" "}
            <h1 className="text-cyan-800 font-bold text-xl">
              Membros do grupo {group.data.data.name}
            </h1>
            <Button
              color="red"
              text="Sair do grupo"
              onClick={() => removeGroup.mutate(group.data?.data.id as string)}
            />
          </div>

          <div className="bg-gray-300 w-9/10 rounded p-2 flex justify-between">
            <h1 className="text-gray-600 font-bold text-md mr-4 truncate">
              {"Administrador:  " + group.data.data.users[0].name}
            </h1>
          </div>

          <div className="flex justify-start gap-4 ">
            <Button color="cyan" text="Adicionar Membro" />
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center mt-32">
          <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
            <h1 className="text-cyan-800 font-bold text-xl">
              Você não está em nenhum grupo
            </h1>
            <Input label="Nome do grupo*" value={name} onChange={setName} />
            <div className="flex justify-center">
              <Button color="cyan" text="Criar novo grupo" type="submit" />
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
