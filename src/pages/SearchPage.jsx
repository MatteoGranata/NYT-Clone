import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NYTNavBar from "../components/navBar/NavBar";
import { setInputSearch } from "../redux/inputSlice";
import { fetchSearch } from "../redux/searchSlice";
import SearchForm from "../components/navBar/SearchForm";
import numeral from "numeral"; 
import FooterPage from "../components/FooterPage";
import ErrorPage from "./ErrorPage";

function SearchPage() {
  const dispatch = useDispatch();
  const selectedValue = useSelector((state) => state.input.selectedValue);
  const { search, loading, error } = useSelector((state) => state.search);

  useEffect(() => {
    document.title = "Search - The New York Times Clone";
    dispatch(fetchSearch({ isSearchPage: true }));
  }, [dispatch, selectedValue]);

  const handleSearchChange = (inputValue) => {
    dispatch(setInputSearch(inputValue));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();

    const isOlderThanYear = date.getFullYear() < now.getFullYear() || false;

    const month = date.toLocaleString("en-US", { month: "short" });
    const day = date.getDate();
    const year = date.getFullYear();

    return isOlderThanYear ? `${month}. ${day}, ${year}` : `${month}. ${day}`;
  };
  const formatDateYear = (dateString) => {
    const date = new Date(dateString);

    const month = date.toLocaleString("en-US", { month: "short" });
    const day = date.getDate();
    const year = date.getFullYear();

    return `${month}. ${day}, ${year}`;
  };

  const value = selectedValue || "";

  const hits = localStorage.getItem("hits");

  const findMultimedia = (multimedia) => {
    const image = multimedia.find((img) => img.subtype === "jumbo");
    return image ? image.url : null;
  };

  if (loading) return;
  if (error) return <ErrorPage apiError={error} />;

  return (
    <>
      <div className="justify-center flex">
        <div className="items-center flex flex-col m-0 max-w-[1200px] w-full">
          <NYTNavBar onSearchChange={handleSearchChange} />
          <div className="bg-[#f7f7f7] w-full 2lg:px-0 px-[3%]">
            <div className=" flex flex-col w-full justify-center">
              <p className="text-gray-500 text-[.69rem] ml-2 mb-0">
                Showing {numeral(hits).format("0,0")} results for:
              </p>
              <div className="flex flex-row w-full ">
                <SearchForm value={value} />
              </div>
            </div>
          </div>
          <ul className="w-full h-fit 2lg:px-0 px-[3%]">
            {search.map((article) => {
              const image = findMultimedia(article.multimedia);
              return (
                <li
                  key={article._id}
                  className="flex flex-col items-center pb-6 w-full border-t pt-6"
                >
                  <div className="flex flex-row w-full max-w-[840px]">
                    <span className="min-w-32 text-[#999] font-[franklin-500] text-[.7rem] tracking-[0] leading-3 mb-[.7em]">
                      {formatDate(article.pub_date)}
                    </span>
                    <div className="flex justify-between w-full m-0">
                      <div className="m-0 max-w-[470px] p-0 border-none align-baseline">
                        <p className="font-[franklin-500] text-[.7rem] tracking-[.5px] leading-3 uppercase mb-1">
                          {article.section_name}
                        </p>
                        <a
                          href={article.web_url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <h4 className="font-[cheltenham] text-lg tracking-[.2px] mb-1">
                            {article.headline.main}
                          </h4>
                          <p className="text-[#333] font-[imperial] text-[.9rem] leading-5 overflow-hidden tracking-[.2px]">
                            {article.snippet}
                          </p>
                          <p className="text-[#121212] font-[cheltenham] text-[.75rem] tracking-[.2px] leading-3">
                            {article.byline.original}
                          </p>

                          {article.headline.print_headline && (
                            <span className="min-w-fit font-[cheltenham] leading-4 text-[1rem] mr-1 block w-[150%] max-w-[360px]">
                              <div className="border w-20 my-4 h-0"></div>
                              <span className="font-[franklin-500] leading-4 text-[0.6875rem] uppercase mr-2">
                                PRINT EDITION{" "}
                              </span>
                              {article.headline.print_headline}
                              <span className="text-[#b3b3b3] mx-1 my-0 relative -top-[1px]">
                                |
                              </span>
                              <span>{formatDateYear(article.pub_date)} </span>
                              <span>
                                Page {article.print_section}
                                {article.print_page}
                              </span>
                            </span>
                          )}
                        </a>
                      </div>
                      <div className="min-w-[120px] ml-10 block w-52 h-[134px] overflow-hidden relative">
                        <img
                          className="h-auto w-full align-top object-fill object-center"
                          src={`https://static01.nyt.com/${image}`}
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
          <FooterPage />
        </div>
      </div>
    </>
  );
}

export default SearchPage;
