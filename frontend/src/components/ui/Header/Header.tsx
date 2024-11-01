import { FC, ReactNode } from "react";

interface IHeaderProps {
  children?: ReactNode;
}

const Header: FC<IHeaderProps> = ({ children }) => (
  <header className="bg-blue-500 text-white p-4 flex items-center justify-between">
    <h1 className="text-2xl">
      <a href="#">Poll App</a>
    </h1>
    {children}
  </header>
);

export default Header;
