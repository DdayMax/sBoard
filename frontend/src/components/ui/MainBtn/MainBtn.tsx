import { FC } from "react";

interface Iprops {
  type: "submit";
  title: string;
}

export const MainBtn: FC<Iprops> = ({ type, title }) => {
  return (
    <button type={type} className="bg-blue-500 text-white p-2">
      {title}
    </button>
  );
};
