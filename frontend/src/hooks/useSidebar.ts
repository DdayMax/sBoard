import { useState } from "react";

const useSidebar = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const toggleSidebar = () => setIsSidebarVisible((prev) => !prev);
  const closeSidebar = () => setIsSidebarVisible(false);

  return { isSidebarVisible, toggleSidebar, closeSidebar };
};

export default useSidebar;
