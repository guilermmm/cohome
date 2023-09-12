import Button from "@/components/Button";
import ServiceCard from "@/components/ServiceCard";
import NavBar from "@/components/NavBar";
import { getCategory } from "@/services/routes/category";
import { getOneGroup } from "@/services/routes/group";
import { getService } from "@/services/routes/service";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

export default function Itens() {
  const router = useRouter();

  if (typeof window !== "undefined" && !localStorage.getItem("token")) {
    router.push("/login");
  }

  const [userId, setUserId] = useState("");

  useEffect(() => {
    setUserId((localStorage?.getItem("userId") as string) ?? "");

    if (!localStorage.getItem("token")) router.push("/");
  }, [router]);

  const services = useQuery({
    queryKey: ["services"],
    queryFn: () => getService(),
  });

  const categories = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategory(),
  });

  const group = useQuery({
    queryKey: ["group", userId],
    queryFn: () => getOneGroup(userId as string),
  });

  return (
    <div className="h-fit min-h-screen w-screen bg-gray-300">
      <NavBar />
      {group.data?.data.id ? (
        <div className="w-screen flex justify-center">
          <div className="flex flex-col gap-4 p-4 max-w-sm ">
            <Button
              text={"Novo Serviço"}
              color={"cyan"}
              onClick={() => router.push("/services/create")}
            />
            {services.data?.data.map((n) =>
              n.groupId == group.data?.data.id ? (
                <ServiceCard
                  id={n.id}
                  name={n.name}
                  description={n.description}
                  key={n.id}
                />
              ) : (
                <></>
              )
            )}
          </div>
        </div>
      ) : (
        <div className="flex justify-center mt-10">
          {" "}
          <h1 className="text-cyan-800 font-bold text-xl">
            Você não está em nenhum grupo
          </h1>
        </div>
      )}
    </div>
  );
}
