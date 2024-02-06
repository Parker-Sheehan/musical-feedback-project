import React, {FC} from "react";

interface GenreCardProps {
    genreName: string; 
  }
  
  const GenreCard: FC<GenreCardProps> = ({ genreName }) => {
  return (
    <div className="size-full p-2">
      <button className="size-full rounded-md flex flex-col justify-center items-center bg-sec2">
        <h3 className="text-text font-heading text-m text-4xl max-w-full text-break">{genreName}</h3>
      </button>
    </div>
  );
};

export default GenreCard;
