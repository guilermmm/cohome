import Button from "@/components/Button";
import NavBar from "@/components/NavBar";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Itens() {
  const router = useRouter();

  if (typeof window !== "undefined" && !localStorage.getItem("token")) {
    router.push("/login");
  }
  return (
    <div className="h-screen w-screen bg-gray-300">
      <NavBar />
    </div>
  );
}
