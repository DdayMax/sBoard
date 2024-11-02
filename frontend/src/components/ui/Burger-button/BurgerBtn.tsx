import { FC } from "react";

interface IBurgerProps {
  isSidebarVisible: boolean;
  toggleSidebar: () => void;
}

const BurgerBtn: FC<IBurgerProps> = ({ isSidebarVisible, toggleSidebar }) => {
  return (
    <button
      onClick={toggleSidebar}
      className="sm:hidden p-2 focus:outline-none"
      aria-label="Toggle sidebar"
    >
      <div className="space-y-1">
        <span
          className={`block w-6 h-0.5 bg-white transform transition ${
            isSidebarVisible ? "rotate-45 translate-y-2" : ""
          }`}
        />
        <span
          className={`block w-6 h-0.5 bg-white transition ${
            isSidebarVisible ? "opacity-0" : ""
          }`}
        />
        <span
          className={`block w-6 h-0.5 bg-white transform transition ${
            isSidebarVisible ? "-rotate-45 -translate-y-2" : ""
          }`}
        />
      </div>
    </button>
  );
};

export default BurgerBtn;
