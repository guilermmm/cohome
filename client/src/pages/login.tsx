import Button from "@/components/Button";
import Input from "@/components/Input";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { FormEvent, useState } from "react";
import Logo from "@/assets/images/logo.png";
import Image from "next/image";
import { postLogin } from "@/services/routes/auth";
import { useMutation } from "react-query";

const Login = () => {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createLogin.mutate({
      password,
      email,
    });
  };

  const createLogin = useMutation({
    mutationFn: postLogin,
    onSuccess: (e) => {
      localStorage.setItem("token", "Bearer " + e.data.access_token);
      localStorage.setItem("userId", e.data.userId);
      router.push("/");
    },
    onError: (e) => {
      if (axios.isAxiosError(e)) {
        alert("Falha na autenticação: " + e.response?.data.message);
      }
    },
  });

  return (
    <div className="h-screen w-screen bg-gray-300 flex items-center justify-center">
      <div className="flex flex-col gap-2 bg-gray-100 p-14 rounded-md ">
        <div className="flex justify-center">
          <Image src={Logo} alt="logo" width={100} />
        </div>
        <div className="flex justify-center">
          <h1 className="text-cyan-800 font-bold text-2xl">CoHome</h1>
        </div>
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
          <Input label="Email" value={email} onChange={setEmail} />
          <Input
            label="Senha"
            type="password"
            value={password}
            onChange={setPassword}
          />
          <div className="flex justify-between">
            <Link href="/cadastro">
              <Button color="gray" text="Criar conta" />
            </Link>
            <Button color="cyan" text="Entrar" type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
