import { getCategory } from "@/services/routes/category";
import { useMutation, useQuery } from "react-query";
import Button from "./Button";
import { deleteItem } from "@/services/routes/item";
import axios from "axios";
import { useRouter } from "next/router";
import { PenSquare } from "lucide-react";

type ItemCardProps = {
  id: string;
  name: string;
  value: string;
  description?: string;
  categoryId: string;
  children?: React.ReactNode;
  enabled?: boolean;
};

const ItemCard = ({
  name,
  id,
  value,
  description,
  categoryId,
  children,
  enabled = true,
}: ItemCardProps) => {
  const router = useRouter();

  const removeItem = useMutation({
    mutationFn: deleteItem,
    onSuccess: () => {
      router.reload();
    },
    onError: (e) => {
      if (axios.isAxiosError(e)) {
        alert("Falha na remoção: " + e.message);
      }
    },
  });
  return (
    <div className="bg-white rounded p-4 flex flex-col">
      <div className="flex flex-row justify-between">
        <div className=" flex flex-row">
          {" "}
          <h2 className="text-gray-600 text-md mr-4 truncate">Nome: </h2>
          <h1 className="text-gray-600 font-bold text-md mr-4 truncate">
            {name}
          </h1>
        </div>

        <div className="text-cyan-800 flex">
          <button
            className="text-sm h-3"
            color="none"
            onClick={() => {
              router.push("/items/details/" + id);
            }}
          >
            <PenSquare className="h-4" />
          </button>
        </div>
      </div>
      <div className="flex flex-row">
        <h2 className="text-gray-600 text-md mr-4 truncate">Categoria:</h2>
        <h1 className="text-gray-600 font-bold text-md mr-4 truncate">
          {categoryId}
        </h1>
      </div>
      {value ? (
        <div className="flex flex-row">
          <h2 className="text-gray-600 text-md mr-4 truncate">Valor(R$):</h2>
          <h1 className="text-gray-600 font-bold text-md mr-4 truncate">
            {value}
          </h1>
        </div>
      ) : (
        <></>
      )}

      {description ? (
        <div className="flex flex-row">
          <h2 className="text-gray-600 text-md mr-4">Descrição:</h2>
          <h1 className="text-gray-600 font-bold text-md mr-4 break-all">
            {description}
          </h1>
        </div>
      ) : (
        <></>
      )}
      {}

      {children}
      <Button
        text={"Concluído"}
        color={"cyan"}
        onClick={() => removeItem.mutate(id)}
      />
    </div>
  );
};

export default ItemCard;
