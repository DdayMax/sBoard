import React from "react";
import CreatePollForm from "../CreatePollForm/CreatePollForm";

interface SidebarProps {
  isVisible: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isVisible, onClose }) => {
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-20 p-4 bg-gray-200 transform ${
        isVisible ? "translate-x-0" : "-translate-x-full"
      } sm:translate-x-0 sm:relative w-full sm:w-1/4 transition-transform duration-300`}
    >
      <div className="sticky top-4">
        <button
          className="sm:hidden mb-4 p-2 bg-red-500 text-white rounded"
          onClick={onClose}
        >
          Закрыть
        </button>
        <h2 className="text-xl mb-4">Форма создания опроса</h2>
        <CreatePollForm onSuccess={onClose} />{" "}
      </div>
    </aside>
  );
};

export default Sidebar;
