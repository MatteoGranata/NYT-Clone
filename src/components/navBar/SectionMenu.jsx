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
    setTimeout(() => {
      setOpenSection(openSection === section ? null : section);
    }, 200);
  };
  const handleSubsectionChange = (subsection) => {
    dispatch(setSelectedSubsection(subsection));
  };

  return (
    <>
      <div className="w-full hidden lg:block sticky top-0 z-50 bg-white" onMouseLeave={() => handleSectionClick()}>
        <nav className="flex space-x-4 py-0 px-4 w-full justify-center">
          {sections.map((section) => (
            <div className="flex items-center" key={section.params}>
              <button
                onMouseEnter={() => handleSectionClick(section)}
                className="font-[franklin-500] text-[.87rem] leading-3 px-4 py-3 hover:underline"
              >
                {section.name}
              </button>
              <svg className="w-2" viewBox="0 0 13 8">
                <polygon
                  fill="#979797"
                  points="6.5,8 0,1.4 1.4,0 6.5,5.2 11.6,0 13,1.4"
                ></polygon>
              </svg>
            </div>
          ))}
        </nav>

        {fetchedSubSections.length > 0 && (
          <div className="absolute text-[var(--color-content-primary, #121212)] font-[franklin-500] text-[.8rem] leading-5 shadow-[0_10px_10px_-5px_rgba(0,0,0,0.1)] left-0 w-full z-50 bg-white">
            <ul
              className={`grid grid-flow-col my-0 mx-auto max-w-[1200px] w-11/12 pt-6 px-0 pb-10 border-t ${
                (openSection && openSection.params === "us") ||
                (openSection && openSection.params === "world")
                  ? "grid-rows-8"
                  : "grid-rows-6"
              }  `}
            >
              <h3 className="col-span-2 text-[#5A5A5A] font-[franklin-500] text-[.7rem] leading-5 mb-4 h-7 cursor-default uppercase block">
                Sections
              </h3>
              {fetchedSubSections.map((sub, index) => (
                <Link to={`/section/${sub.params}`} key={index}>
                  <li className="hover:opacity-45 w-fit">
                    <button
                      onClick={() =>
                        handleSubsectionChange(sub.params) ||
                        handleSectionClick()
                      }
                    >
                      {sub.name}
                    </button>
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default SectionMenu;
