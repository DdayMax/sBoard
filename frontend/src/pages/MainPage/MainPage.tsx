import { useQuery } from "@tanstack/react-query";
import Card from "../../components/Card/Card";
import Sidebar from "../../components/Sidebar/Sidebar";
import {
  deletePoll,
  getPolls,
  IPollVote,
  votePollOption,
} from "../../Api/Poll";
import { queryClient } from "../../queryClient";
import useSidebar from "../../hooks/useSidebar";
import Header from "../../components/ui/Header/Header";
import Footer from "../../components/ui/Footer/Footer";
import BurgerBtn from "../../components/ui/Burger-button/BurgerBtn";
// import { useRef } from "react";

const MainPage = () => {
  const { isSidebarVisible, closeSidebar, toggleSidebar } = useSidebar();
  // const observerRef = useRef<HTMLDivElement | null>(null);

  const pollListQuery = useQuery(
    {
      queryFn: getPolls,
      queryKey: ["polls"],
      refetchInterval: 10000,
      refetchIntervalInBackground: true,
    },
    queryClient
  );

  const handleVote = async ({ pollId, optionId }: IPollVote) => {
    await votePollOption({ pollId, optionId });
    queryClient.invalidateQueries({ queryKey: ["polls"] });
  };

  const handleDelete = async (pollId: number) => {
    await deletePoll(pollId);
    queryClient.invalidateQueries({ queryKey: ["polls"] });
  };

  switch (pollListQuery.status) {
    case "pending":
      return (
        <>
          <Header />
          <div className="flex flex-grow">
            <Sidebar isVisible={isSidebarVisible} onClose={closeSidebar} />
            <main className="w-full sm:w-3/4 bg-gray-100 p-4">
              <h2 className="text-xl mb-4">Загрузка...</h2>
            </main>
          </div>
          <Footer />
        </>
      );

    case "error":
      return (
        <>
          <Header />
          <div className="flex flex-grow">
            <Sidebar isVisible={isSidebarVisible} onClose={closeSidebar} />
            <main className="w-full sm:w-3/4 bg-gray-100 p-4">
              <h2 className="text-xl mb-4">Что-то пошло не так</h2>
              <button onClick={() => pollListQuery.refetch()}>
                Повторить запрос
              </button>
            </main>
          </div>
          <Footer />
        </>
      );

    case "success":
      return (
        <>
          <Header
            children={
              <BurgerBtn
                isSidebarVisible={isSidebarVisible}
                toggleSidebar={toggleSidebar}
              />
            }
          />
          <div className="flex flex-grow">
            <Sidebar isVisible={isSidebarVisible} onClose={closeSidebar} />
            <main className="w-full sm:w-3/4 bg-gray-100 p-4">
              <h2 className="text-xl mb-4">Опросы</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {pollListQuery.data.map((card) => (
                  <Card
                    key={card.id}
                    title={card.question}
                    options={card.options}
                    onVote={(optionId) =>
                      handleVote({ pollId: card.id, optionId })
                    }
                    onDelete={() => handleDelete(card.id)}
                  />
                ))}
              </div>
            </main>
          </div>
          <Footer />
        </>
      );
  }
};

export default MainPage;
