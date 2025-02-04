import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchArticles } from "../redux/articleSlice";
import ErrorPage from "./ErrorPage";

function ArticleList() {
  const dispatch = useDispatch();
  const { articles, loading, error } = useSelector((state) => state.articles);

  useEffect(() => {
    document.title = "The New York Times Clone";
    dispatch(fetchArticles());
  }, [dispatch]);

  let groupCounter = 0;
  // Group articles based on groupKey
  const groupeArticles = articles.reduce((acc, item) => {
    if (item.section === "podcasts") {
      const podcastGroupKey = `podcasts-${groupCounter}`;
      groupCounter += 1;
      acc[podcastGroupKey] = [item];
      return acc;
    }

    const groupKey =
      item.section ||
      item.subsection ||
      (Array.isArray(item.des_facet) && item.des_facet.length
        ? item.des_facet.join(", ")
        : "") ||
      (Array.isArray(item.geo_facet) && item.geo_facet.length
        ? item.geo_facet.join(", ")
        : "") ||
      (Array.isArray(item.org_facet) && item.org_facet.length
        ? item.org_facet.join(", ")
        : "") ||
      (Array.isArray(item.per_facet) && item.per_facet.length
        ? item.per_facet.join(", ")
        : "") ||
      item.item_type ||
      "unknown";

    let uniqueGroupKey = `${groupKey}-${groupCounter}`;

    if (!acc[uniqueGroupKey] || acc[uniqueGroupKey].length >= 3) {
      groupCounter += 1;
      acc[`${groupKey}-${groupCounter}`] = [];
    }

    acc[`${groupKey}-${groupCounter}`].push(item);

    return acc;
  }, {});

  if (loading) return;
  if (error) return <ErrorPage apiError={error} />;

  return (
    <ul className="w-full h-full">
      {Object.entries(groupeArticles).map(([group, articles]) => (
        <li
          key={group}
          className={
            articles[0].section === "podcasts"
              ? "flex container xl:mb-6 md:mb-3 mb-0"
              : "xl:pb-9 md:pb-5 pb-2 grid 2md:grid-cols-3 grid-cols-1 gap-4 container"
          }
        >
          <ul className="pl-4 order-1">
            {articles.map((item, index) => (
              <li
                key={item.uri}
                className="min-w-0 relative mr-4  not-empty-not-first-child:before:content-[''] not-empty-not-first-child:before:block not-empty-not-first-child:before:border-b not-empty-not-first-child:before:border-gray-300 not-empty-not-first-child:before:mt-4 not-empty-not-first-child:before:mb-4 not-empty-not-first-child:before:clear-both not-empty-not-first-child:before:col-span-full"
              >
                <div className="h-max">
                  <a href={item.url} target="_blank" rel="noopener noreferrer">
                    {item.section === "podcasts" && (
                      <p className="font-[franklin-500] text-[.6rem] leading-5 uppercase m-0 text-[#727272]">
                        {item.section}
                      </p>
                    )}
                    <h1 className="font-[nyt-cheltenham] text-[1rem] leading-5 m-0 text-[#121212] hover:text-[#5A5A5A]">
                      {item.title}
                    </h1>
                    {index === 0 && item.section !== "podcasts" && (
                      <p className="text-[#5a5a5a] font-[imperial] text-[.87rem] leading-5 m-0 p-0 mt-2">
                        {item.abstract}
                      </p>
                    )}
                    {item.section === "podcasts" && (
                      <p className="w-fit h-fit p-1.5 rounded-full border relative -top-3 hover:bg-[rgb(229,229,229)]">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="13"
                          height="13"
                          viewBox="0 0 24 24"
                        >
                          <path d="M5.536 21.886a1.004 1.004 0 0 0 1.033-.064l13-9a1 1 0 0 0 0-1.644l-13-9A1 1 0 0 0 5 3v18a1 1 0 0 0 .536.886z"></path>
                        </svg>
                      </p>
                    )}
                  </a>
                </div>
              </li>
            ))}
          </ul>
          {articles[0]?.multimedia && articles[0].multimedia.length > 0 && (
            <div
              className={
                articles[0].section === "podcasts"
                  ? "flex-2 max-w-[91px] max-h-[91px]"
                  : "mb-4 order-1 col-span-2"
              }
            >
              <img
                src={articles[0].multimedia[0].url}
                loading="lazy"
                alt={articles[0].multimedia[0].caption}
                className={
                  articles[0].section === "podcasts"
                    ? "w-full h-full object-cover"
                    : "object-cover w-full object-top"
                }
              />

              <figcaption>
                <span
                  className={
                    articles[0].section === "podcasts"
                      ? " hidden"
                      : "font-[franklin-500] text-[.62rem] m-0 text-[#727272] inline-block align-top leading-5 w-full text-end"
                  }
                >
                  {articles[0].multimedia[0].copyright}
                </span>
              </figcaption>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}

export default ArticleList;
