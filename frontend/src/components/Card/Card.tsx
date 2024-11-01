import React, { useState } from "react";
import { OptionsList } from "../../Api/Poll";

interface ICardProps {
  title: string;
  options: OptionsList;
  onDelete: () => Promise<void>;
  onVote: (optionId: number) => Promise<void>;
}

const Card: React.FC<ICardProps> = ({ title, options, onDelete, onVote }) => {
  const [isVoting, setIsVoting] = useState(false);

  const handleVoteClick = async (optionId: number) => {
    setIsVoting(true);
    try {
      await onVote(optionId);
    } finally {
      setIsVoting(false);
    }
  };

  return (
    <div className="bg-white p-4 shadow-md rounded-md">
      <h3 className="text-lg font-bold mb-2 break-words">{title}</h3>

      {options ? (
        options.map((option) => (
          <div
            key={option.id}
            className="grid grid-cols-2 gap-4 mb-4 items-center"
          >
            <button
              disabled={isVoting}
              onClick={() => handleVoteClick(option.id)}
              className={
                "px-4 py-2 rounded bg-blue-500 hover:bg-blue-700 text-white "
              }
            >
              {option.optionText}
            </button>
            <span className="text-right">Голосов за: {option.votes}</span>
          </div>
        ))
      ) : (
        <h2>Loading...</h2>
      )}
      <button
        onClick={onDelete}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
      >
        Удалить
      </button>
    </div>
  );
};

export default Card;
