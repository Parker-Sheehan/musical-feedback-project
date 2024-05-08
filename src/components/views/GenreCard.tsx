import React, {FC} from "react";

interface GenreCardProps {
    genreName: string; 
  }
  
  const GenreCard: FC<GenreCardProps> = ({ genreName }) => {
  return (
    <div className="lg:size-1/2 lg:max-size-1/4 p-2">
      <button className="rounded-md size-full max-size-full flex flex-col justify-center items-center bg-sec2">
        <h3 className="text-text text-m text-1xl max-w-full text-break">{genreName}</h3>
      </button>
    </div>
  );
};

export default GenreCard;
