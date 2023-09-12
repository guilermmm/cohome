import Button from "@/components/Button";
import Input from "@/components/Input";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { FormEvent, useState } from "react";
import { postUser } from "@/services/routes/user";
import { useMutation } from "react-query";
import Logo from "@/assets/images/logo.png";

const CreateUser = () => {
  const router = useRouter();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createUser.mutate({
      name,
      password,
      email,
    });
  };

  const createUser = useMutation({
    mutationFn: postUser,
    onSuccess: () => {
      alert("Conta cadastrada com sucesso!");
      router.push("/login");
    },
    onError: (e) => {
      if (axios.isAxiosError(e)) {
        alert("Falha no cadastro: " + e.message);
      }
    },
  });
  return (
    <div className="h-screen w-screen bg-gray-300 flex items-center justify-center">
      <div className="flex flex-col gap-2 bg-gray-100 p-14 rounded-md">
        <div className="flex justify-center">
          <Image src={Logo} alt="mapsi-logo" width={100} />
        </div>
        <div className="flex justify-center">
          <h1 className="text-cyan-800 font-bold text-2xl">Criar conta</h1>
        </div>
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
          <Input
            label="Nome Completo*"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            label="Email*"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label="Senha*"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex justify-between">
            <Link href="/login">
              <Button color="gray" text="Cancelar" />
            </Link>
            <Button color="cyan" text="Finalizar Cadastro" type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
