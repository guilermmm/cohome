import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  if (typeof window !== "undefined" && !localStorage.getItem("token")) {
    router.push("/login");
  }
  return <div>Main page</div>;
}
