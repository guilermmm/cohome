import Button from "@/components/Button";
import Input from "@/components/Input";
import NavBar from "@/components/NavBar";
import {
  deleteGroup,
  deleteGroupMember,
  getOneGroup,
  postGroup,
} from "@/services/routes/group";
import axios from "axios";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { Trash2 } from "lucide-react";

export default function Groups() {
  const router = useRouter();
  if (typeof window !== "undefined" && !localStorage.getItem("token")) {
    router.push("/login");
  }

  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    setUserId((localStorage?.getItem("userId") as string) ?? "");

    if (!localStorage.getItem("token")) router.push("/");
  }, [router]);

  const group = useQuery({
    queryKey: ["group", userId],
    queryFn: () => getOneGroup(userId as string),
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name.length > 0) {
      createGroup.mutate({
        name,
        userId,
      });
    } else {
      if (name === "") {
        alert("Falha na criação: Nome não pode ficar em branco");
      }
    }
  };

  const createGroup = useMutation({
    mutationFn: postGroup,
    onSuccess: () => {
      group.refetch();
    },
    onError: (e) => {
      if (axios.isAxiosError(e)) {
        alert("Falha no cadastro: " + e.response?.data);
      }
    },
  });

  const removeGroup = useMutation({
    mutationFn: deleteGroup,
    onSuccess: () => {
      setName("");
      group.remove();
      group.refetch();
    },
    onError: (e) => {
      if (axios.isAxiosError(e)) {
        alert("Falha na remoção: " + e.message);
      }
    },
  });

  const removeGroupMember = useMutation({
    mutationFn: deleteGroupMember,
    onSuccess: () => {
      group.refetch();
    },
    onError: (e) => {
      if (axios.isAxiosError(e)) {
        alert("Falha na remoção: " + e.message);
      }
    },
  });

  return (
    <div className="h-screen w-screen bg-gray-300">
      <NavBar />
      <div className="w-screen flex justify-center">
        {group.data?.data.usersInGroup ? (
          <div className=" m-10 rounded-md min-w-fit bg-white flex flex-col gap-3 p-4">
            <div className="flex justify-between gap-10">
              {" "}
              <h1 className="text-cyan-800 font-bold text-xl">
                Membros do grupo {group.data.data.name}
              </h1>
              <Button
                color="red"
                text="Excluir grupo"
                onClick={() =>
                  removeGroup.mutate(group.data?.data.id as string)
                }
              />
            </div>

            <div className="bg-white w-9/10 rounded p-2 flex flex-col gap-2">
              {group.data.data.usersInGroup.map((userInGroup) => (
                <div
                  key={userInGroup.user.id}
                  className="text-gray-600 font-bold text-md mr-4 truncate justify-between flex w-full items-center font-i bg-gray-300 rounded p-2"
                >
                  <div>{userInGroup.user.name}</div>
                  <div className="text-xs text-cyan-700 italic font-medium">
                    {userInGroup.isAdmin && " Administrador"}
                    <div className="text-xs text-red-700 italic font-medium">
                      {" "}
                      {!userInGroup.isAdmin && (
                        <button
                          className="text-sm h-3"
                          color="none"
                          onClick={() => {
                            removeGroupMember.mutate({
                              userId: userInGroup.user.id,
                              id: group.data.data.id,
                            });
                          }}
                        >
                          <Trash2 className="h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center">
              <Button
                color="cyan"
                text="Adicionar Membro"
                onClick={() => router.push("/groups/newmember")}
              />
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center mt-10">
            <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
              <h1 className="text-cyan-800 font-bold text-xl">
                Você não está em nenhum grupo
              </h1>
              <Input
                label="Nome do grupo*"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <div className="flex justify-center">
                <Button color="cyan" text="Criar novo grupo" type="submit" />
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
