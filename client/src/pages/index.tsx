import NavBar from "@/components/NavBar";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  if (typeof window !== "undefined" && !localStorage.getItem("token")) {
    router.push("/login");
  }
  return (
    <div className="h-screen w-screen bg-gray-300">
      <NavBar />
      Main page
    </div>
  );
}
