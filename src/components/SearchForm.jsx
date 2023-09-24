import { memo, useEffect, useRef } from "react";
import { toast } from "react-toastify";

import { useGlobalContext } from "../Context";

const SearchForm = () => {
  const { searchTerm, setSearchTerm } = useGlobalContext();
  const searchInputRef = useRef(null);

  useEffect(() => {
    const handleOnSearch = (event) => {
      const value = searchInputRef.current.value;

      // when clearing the input, the searchTerm should default to "cat"
      if (value === "") return setSearchTerm("cat");

      setSearchTerm(value);
    };

    searchInputRef.current.addEventListener("search", handleOnSearch);

    return () =>
      searchInputRef.current.removeEventListener("search", handleOnSearch);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!searchTerm) return toast.error("Search must not be empty");

    setSearchTerm(event.target.elements.search.value);
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        type="search"
        name="search"
        id="search"
        placeholder="cat"
        className="form-input search-input"
        ref={searchInputRef}
      />

      <button type="submit" className="btn">
        search
      </button>
    </form>
  );
};

export default memo(SearchForm);
