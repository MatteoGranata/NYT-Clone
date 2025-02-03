import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchArticles } from "../redux/articleSlice";
import { setSelectedSubsection } from "../redux/sectionsSlice";
import Navbar from "../components/navBar/NavBar";
import FooterPage from "../components/FooterPage";
import ErrorPage from "./ErrorPage";

function SectionPage() {
  const dispatch = useDispatch();
  const selectedSubsection = useSelector(
    (state) => state.sections.selectedSubsection
  );
  const { articles, loading, error } = useSelector((state) => state.articles);

  const sectionName = localStorage.getItem("sectionName");
  useEffect(() => {
    if (sectionName) {
      document.title = `${sectionName} - The New York Times Clone`;
    }
    dispatch(fetchArticles({ isSectionPage: true }));
  }, [dispatch, selectedSubsection, sectionName]);

  const handleSubsectionChange = (subsection) => {
    dispatch(setSelectedSubsection(subsection));
    localStorage.setItem("section", subsection);
  };

  if (loading) return;

  if (error) return <ErrorPage apiError={error} />;

  let groupCounter = 0;
  const groupedSection = articles.reduce((acc, item) => {
    let groupKey = `group-${groupCounter}`;

    if (!item || item.section === "admin") {
      return acc;
    }

    if (!acc[groupKey] || acc[groupKey].length >= 4) {
      groupCounter += 1;
      groupKey = `group-${groupCounter}`;
      acc[groupKey] = [];
    }

    acc[groupKey].push(item);
    return acc;
  }, {});

  return (
    <>
      <div className="justify-center flex w-full">
        <div className="items-center flex flex-col m-0 max-w-[1200px] w-full">
          <Navbar onSubsectionChange={handleSubsectionChange} />
          <div className="w-full flex flex-col items-center h-full xl:px-0 md:px-3 px-5">
            <h2 className="text-[var(--color-content-primary,#121212)] flex-3 mt-3 font-[georgia] font-extrabold text-[32px] leading-8 -mb-1">
              {sectionName}
            </h2>
            {Object.entries(groupedSection).map(([group, articles]) => (
              <ul
                key={group}
                className="grid grid-flow-row-dense grid-cols-1 lg:grid-cols-3 grid-rows-3 gap-x-4 container mt-4"
              >
                {articles.map((article, index) => (
                  <li
                    key={article.url}
                    className={
                      index === 0
                        ? "col-span-1 lg:col-span-2 row-span-3 pr-4 lg:border-r border-b lg:border-0 text-center"
                        : "pl-4 last:border-none border-b h-full flex items-center"
                    }
                  >
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block mt-2 hover:underline"
                    >
                      <div>
                        <ul
                          className={
                            index === 0
                              ? "pl-4 col-span-3"
                              : "flex justify-end float-right h-fit"
                          }
                        >
                          {article.multimedia?.length > 0 && (
                            <img
                              src={
                                index === 0
                                  ? article.multimedia[0]?.url
                                  : article.multimedia[2]?.url ||
                                    article.multimedia[1]?.url
                              }
                              className={`object-cover mb-2 w-full ${
                                index !== 0 ? "w-20 h-20 ml-3" : undefined
                              }`}
                            />
                          )}
                        </ul>
                        <div>
                          <h3
                            className={`font-semibold mb-2 leading-none font-[nyt-cheltenham] ${
                              index === 0 ? "text-2xl" : " text-lg"
                            }`}
                          >
                            {article.title}
                          </h3>
                          <p className="text-sm font-[imperial]">
                            {article.abstract}
                          </p>
                        </div>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            ))}
          </div>
          <FooterPage />
        </div>
      </div>
    </>
  );
}
export default SectionPage;
