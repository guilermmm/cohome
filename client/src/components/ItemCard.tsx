import { getCategory } from "@/services/routes/category";
import { useQuery } from "react-query";

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
  return (
    <div className="bg-white rounded p-4 flex flex-col">
      <div className="flex flex-row">
        <h2 className="text-gray-600 text-md mr-4 truncate">Nome: </h2>
        <h1 className="text-gray-600 font-bold text-md mr-4 truncate">
          {name}
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
      <div className="flex flex-row">
        <h2 className="text-gray-600 text-md mr-4 truncate">Categoria:</h2>
        <h1 className="text-gray-600 font-bold text-md mr-4 truncate">
          {categoryId}
        </h1>
      </div>

      {children}
    </div>
  );
};

export default ItemCard;
