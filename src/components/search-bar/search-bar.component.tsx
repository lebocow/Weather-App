import React, { ChangeEvent, FormEvent } from "react";
import { BsSearch } from "react-icons/bs";
import { GrLocation } from "react-icons/gr";

type SearchBarProps = {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  formHandler: (e: FormEvent<HTMLFormElement>) => void;
  iconHandler: () => void;
};

const SearchBar: React.FC<SearchBarProps> = ({
  search,
  setSearch,
  formHandler,
  iconHandler,
}) => {
  const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <form
      onSubmit={formHandler}
      className="mb-6 flex items-center rounded-lg bg-slate-100 px-4 py-2"
    >
      <BsSearch
        className="h-8 w-8 fill-black duration-150 active:scale-105"
        onClick={iconHandler}
      />
      <input
        onChange={searchHandler}
        className="w-full bg-slate-100 px-4 py-2 text-black focus:outline-none"
        type="text"
        value={search}
        placeholder="Search city..."
        required
      />
      <GrLocation className="h-8 w-8" />
    </form>
  );
};

export default SearchBar;
