import { BsList } from "react-icons/bs";

const FavoritesToggleButton = ({
  toggleDropdown,
}: {
  toggleDropdown: () => void;
}) => {
  return (
    <BsList
      onClick={toggleDropdown}
      className="absolute left-4  top-4 h-6 w-6 focus:outline-none md:left-6 md:top-6"
    />
  );
};

export default FavoritesToggleButton;
