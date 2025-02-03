import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTop } from "../redux/topArticleSlice";
import ErrorPage from "./ErrorPage";

function TopArticleList() {
  const dispatch = useDispatch();
  const { top, loading, error } = useSelector((state) => state.top);

  useEffect(() => {
    // Dispatch the action to fetch top articles when the component mounts
    dispatch(fetchTop());
  }, [dispatch]);
  if (loading) return;
  if (error) return <ErrorPage apiError={error} />;

  let groupCounter = 0;
  // Group articles based on certain attributes
  const groupedTopArticles = top.reduce((acc, item) => {
    let groupKey = item.nytdsection
      ? item.subsection
      : item.section || item.item_type;

    let uniqueGroupKey = `${groupKey}-${groupCounter}`;

    if (!acc[uniqueGroupKey] || acc[uniqueGroupKey].length >= 3) {
      groupCounter += 1;
      acc[`${groupKey}-${groupCounter}`] = [];
    }

    acc[`${groupKey}-${groupCounter}`].push(item);

    return acc;
  }, {});

  return (
    <ul className="w-full h-fit">
      {Object.entries(groupedTopArticles).map(([group, articles]) => (
        <li className="pb-[2.5rem] container" key={group}>
          <ul className="pl-4 grid grid-cols-2 gap-4">
            {articles.map((item, index) => (
              <li
                key={item.uri}
                className={`min-w-0 relative mr-4 not-empty-not-first-child:mb-4 ${
                  index === 0
                    ? "col-span-2"
                    : articles.length === 2 &&
                      "items-center col-span-2 grid grid-cols-4 border-t pt-3"
                }`}
              >
                {/* Adding borders between articles after the second one*/}
                {index >= 2 && (
                  <>
                    <span className="border-l mt-2 h-full absolute left-[calc(-1rem-1px)]"></span>
                    <span className="border-l border-t w-80 absolute top-[calc(-.3rem-1px)] left-[calc(-10.5rem-10px)]"></span>
                  </>
                )}
                {item.media?.[0]?.["media-metadata"]?.[2]?.url && (
                  <div className="mt-2">
                    <img
                      src={
                        item.media[0]["media-metadata"][2].url ||
                        item.media[0]["media-metadata"][1].url
                      }
                      loading="lazy"
                      alt={item.media[0].caption}
                      className={`object-cover ${
                        index === 0
                          ? "w-full"
                          : articles.length === 2 && "w-[90.3px] h-[90.3px]"
                      }`}
                    />
                    {index === 0 && (
                      <figcaption className="text-[0.6875rem] leading-6 mt-[0.25rem] text-right">
                        <span className="font-[franklin-500] text-[.62rem] m-0 text-[#727272] inline-block leading-5">
                          {item.media[0].copyright}
                        </span>
                      </figcaption>
                    )}
                  </div>
                )}

                <div
                  className={`h-max w-full ${
                    index === 0
                      ? "col-span-2"
                      : articles.length === 2 && "col-span-3 ml-3"
                  }`}
                >
                  <a href={item.url} target="_blank" rel="noopener noreferrer">
                    {index === 0
                      ? null
                      : articles.length === 2 && (
                          <p className="text-[#5a5a5a] font-[imperial] text-[0.87rem] leading-5 m-0 p-0 relative mt-2 order-4">
                            {item.nytdsection}
                          </p>
                        )}

                    <h1 className="font-[nyt-cheltenham] text-[1rem] leading-5 m-0 text-[#121212]">
                      {item.title}
                    </h1>
                    {index === 0 && (
                      <p className="text-[#5a5a5a] font-[imperial] text-[0.87rem] leading-5 m-0 p-0 relative mt-2">
                        {item.abstract}
                      </p>
                    )}
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}

export default TopArticleList;
