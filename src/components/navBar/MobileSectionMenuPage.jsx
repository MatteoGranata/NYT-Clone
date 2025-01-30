import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setSelectedSubsection } from "../../redux/sectionsSlice";
import sections from "../../data/section.json";
import subsection from "../../data/subsection.json";

const SectionMenu = () => {
  const dispatch = useDispatch();
  const [fetchedSubSections, setFetchedSubSections] = useState([]);
  const [openSection, setOpenSection] = useState(null);

  useEffect(() => {
    if (openSection) {
      const selectedSubSections = subsection[openSection.params] || [];
      setFetchedSubSections(selectedSubSections);
    } else {
      setFetchedSubSections([]);
    }
  }, [openSection]);
  const handleSectionClick = (section) => {
    setOpenSection(openSection === section ? null : section);
  };
  const handleSubsectionChange = (subsection) => {
    dispatch(setSelectedSubsection(subsection));
  };

  return (
    <div className="w-full mt-5">
      <nav className="h-full block">
        <div className="border-b border-[#DFDFDF] my-0 mx-6">
          <li className=" cursor-pointer font-[franklin-700] text-[1.1rem] leading-6 list-none">
            <Link
              to={"/"}
              className="bg-white inline-block text-left w-full py-6 pr-3 pl-0"
            >
              Home
              <svg
                className="w-[14px] align-middle float-right mr-3"
                viewBox="0 0 16 22"
              >
                <path
                  d="M15.863 13.08c-.687 1.818-1.923 3.147-3.64 3.916v-3.917l2.129-1.958-2.129-1.889V6.505c1.923-.14 3.228-1.609 3.228-3.358C15.45.84 13.32 0 12.086 0c-.275 0-.55 0-.962.14v.14h.481c.824 0 1.51.42 1.51 1.189 0 .63-.48 1.189-1.304 1.189-2.129 0-4.6-1.749-7.279-1.749C2.13.91.481 2.728.481 4.546c0 1.819 1.03 2.448 2.128 2.798v-.14c-.343-.21-.618-.63-.618-1.189 0-.84.756-1.469 1.648-1.469 2.267 0 5.906 1.959 8.172 1.959h.206v2.727l-2.129 1.889 2.13 1.958v3.987c-.894.35-1.786.49-2.748.49-3.502 0-5.768-2.169-5.768-5.806 0-.839.137-1.678.344-2.518l1.785-.769v7.973l3.57-1.608V6.575L3.984 8.953c.55-1.61 1.648-2.728 2.953-3.358v-.07C3.433 6.295 0 9.023 0 13.08c0 4.686 3.914 7.974 8.446 7.974 4.807 0 7.485-3.288 7.554-7.974h-.137z"
                  fill="#000000"
                ></path>
              </svg>
            </Link>
          </li>
        </div>
        {sections.map((section) => (
          <div
            key={section.params}
            className="border-b border-[#DFDFDF] my-0 mx-6"
          >
            <li className="cursor-pointer font-[franklin-700] text-[1.1rem] leading-6 list-none">
              <button
                onClick={() => handleSectionClick(section)}
                className="bg-white inline-block text-left w-full pt-6 pr-3 pl-0"
              >
                <span>{section.name}</span>
                <svg
                  className={`text-[#121212] w-3 inline-block float-right py-2 px-0 ${
                    openSection === section && "rotate-180"
                  }`}
                  viewBox="0 0 13 8"
                >
                  <polygon
                    fill="#979797"
                    points="6.5,8 0,1.4 1.4,0 6.5,5.2 11.6,0 13,1.4"
                  ></polygon>
                </svg>
              </button>

              <div className="bg-white cursor-default pb-1 mt-5 block">
                {openSection === section && (
                  <>
                    <h3 className="mb-4 text-[#727272] tracking-[1px] text-[.9rem] font-[franklin-500] uppercase leading-5 h-7 cursor-default block">
                      Sections
                    </h3>
                    <div className="grid grid-cols-2 font-[franklin-500] text-[1rem] gap-3 leading-6 mb-8">
                      {fetchedSubSections.map((sub, index) => (
                        <div key={index} className="mt-0 flex flex-col">
                          <Link to={`/section/${sub.params}`}>
                            <ul className="hover:opacity-45 w-fit">
                              <li>
                                <button
                                  onClick={() =>
                                    handleSubsectionChange(sub.params) ||
                                    handleSectionClick()
                                  }
                                >
                                  {sub.name}
                                </button>
                              </li>
                            </ul>
                          </Link>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </li>
          </div>
        ))}
      </nav>
    </div>
  );
};

export default SectionMenu;
