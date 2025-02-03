/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setInputSearch } from "../../redux/inputSlice";
import { setOptionSearch } from "../../redux/inputSlice";
import { fetchSearch } from "../../redux/searchSlice";

function SearchForm({ value }) {
  const [inputValue, setInputValue] = useState(value || "");
  const selectedOption = useSelector((state) => state.input.selectedOption);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setInputValue(value || "");
  }, [value]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.length < 3) {
      alert("Please enter at least 3 characters.");
      return;
    }
    dispatch(setInputSearch(inputValue));
    navigate(`/search/${inputValue}`);
  };

  const handleOptionChange = (e) => {
    const selectedOptionValue = e.target.value;

    dispatch(setOptionSearch(selectedOptionValue));
    dispatch(fetchSearch({ isSearchPage: true }));
  };

  return (
    <div
      className={`inline-block ${
        (location.pathname === `/search/${value}` &&
          "bg-[#f7f7f7] mb-4 flex flex-row w-full") ||
        (window.innerWidth < 1023 && "w-full")
      }`}
    >
      <form
        method="get"
        onSubmit={handleSubmit}
        className={`rounded-sm ml-2 ${
          (location.pathname === `/search/${value}` &&
            "bg-[#f7f7f7] w-full pt-2") ||
          (window.innerWidth < 1023 && "flex flex-row px-5")
        }`}
      >
        <div
          className={`bg-white rounded-sm inline-block mr-3 py-0 relative w-auto ${
            (location.pathname === `/search/${value}` &&
              "bg-[#f7f7f7] relative w-full") ||
            (window.innerWidth < 1023 && "block w-full")
          }`}
        >
          {/* Search input field */}
          <input
            value={inputValue}
            onChange={handleInputChange}
            type="text"
            placeholder="SEARCH"
            className={`border border-neutral-500 box-border text-black text-[1rem] tracking-[0.05rem] m-0 h-8 w-full align-middle rounded-[3px] pt-[1px] px-3 pb-0 ${
              (location.pathname === `/search/${value}` &&
                "rounded-none border-0 text-[#121212] pb-1 pl-0 pr-[30px] w-full h-fit bg-[#f7f7f7] font-[franklin-700] text-[2.125rem] leading-10 focus:outline-none focus:border-b hover:border-b focus:ring-0") ||
              (window.innerWidth < 1023 && "h-full")
            }`}
          />
        </div>
        {/* Submit button */}
        <button
          type="submit"
          className={`rounded-[3px] font-[franklin-700] transition-colors whitespace-nowrap bg-[rgb(68,104,130)] border border-[rgb(50,104,145)] text-white text-[10px] uppercase h-8 m-0 pt-2 px-[9px] pb-[6px] align-middle ${
            (location.pathname === `/search/${value}` &&
              "bg-transparent bg-[#f7f7f7] border-none inline-block h-6 w-0 relative -top-2 -ml-[50px] hover:bg-[#f7f7f7] align-middle") ||
            (window.innerWidth < 1023 &&
              "opacity-50 whitespace-nowrap leading-3 h-[35px] w-9 pt-2 pb-[6px] px-[9px] align-middle m-0 uppercase text-[11px] hover:opacity-60")
          }`}
        >
          {location.pathname === `/search/${value}` ? (
            <svg viewBox="0 0 16 16" className="w-6 h-6 bg-[#f7f7f7]">
              <path
                fill="#b3b3b3"
                d="M11.3,9.2C11.7,8.4,12,7.5,12,6.5C12,3.5,9.5,1,6.5,1S1,3.5,1,6.5S3.5,12,6.5,12c1,0,1.9-0.3,2.7-0.7l3.3,3.3c0.3,0.3,0.7,0.4,1.1,0.4s0.8-0.1,1.1-0.4c0.6-0.6,0.6-1.5,0-2.1L11.3,9.2zM6.5,10.3c-2.1,0-3.8-1.7-3.8-3.8c0-2.1,1.7-3.8,3.8-3.8c2.1,0,3.8,1.7,3.8,3.8C10.3,8.6,8.6,10.3,6.5,10.3z"
              ></path>
            </svg>
          ) : (
            <>Go</>
          )}
        </button>
      </form>
      {/* Sorting option dropdown */}
      {location.pathname === `/search/${value}` && (
        <div className="border-transparent rounded inline-block mb-1 mr-3 p-[6px]">
          <select
            className=" appearance-none bg-transparent bg-none shadow-none text-[#666] font-[franklin-500] py-1 pr-8 pl-2 rounded hover:ring-1 hover:ring-offset-4 hover:ring-gray-300"
            onChange={handleOptionChange}
            value={selectedOption}
          >
            <option value="relevance">Sort by Relevance</option>
            <option value="newest">Sort by Newest</option>
            <option value="oldest">Sort by Oldest</option>
          </select>
          <div className="border-b-transparent border-8 border-l-transparent border-r-transparent border-t-[#666] inline-block h-0 -ml-5  mt-3 pointer-events-none absolute w-0">
            <div className="border-b-transparent border-8 border-l-transparent border-r-transparent border-t-[#f7f7f7] inline-block -left-2 h-0 absolute -top-2 w-0"></div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchForm;
