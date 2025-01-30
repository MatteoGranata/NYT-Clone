/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import Navbar from "../components/navBar/NavBar";
import FooterPage from "../components/FooterPage";
import { Link } from "react-router-dom";

function ErrorPage({ apiError }) {
  const [error, setError] = useState(null);

  useEffect(() => {
    if (apiError) {
      setError(apiError);
    }
  }, [apiError]);

  return (
    <div className="justify-center flex">
      <div className="items-center flex flex-col m-0 max-w-[1200px] w-full">
        {location.pathname !== "/" && <Navbar />}
        <div className="p-2 flex flex-col items-center justify-center h-80 my-10">
          <div className="flex flex-col items-center justify-evenly h-full text-center">
            <h1 className="font-[franklin-700] text-4xl uppercase flex-wrap flex">
              Something went wrong
            </h1>
            <p className="font-[imperial] text-md">Error: {error}</p>
            {location.pathname === "/" ? (
              <button
                className="font-[franklin-700] text-[1.2rem] border-2 border-black rounded-md pt-1 pb-1.5 px-3 align-middle text-center hover:opacity-65"
                onClick={() => window.location.reload(true)}
              >
                Wait a few seconds and try again
              </button>
            ) : (
              <Link
                className="font-[franklin-700] text-[1.2rem] uppercase  border-2 border-black rounded-md pt-1 pb-1.5 px-3 align-middle text-center hover:opacity-65"
                to={"/"}
              >
                Go to Home Page
              </Link>
            )}
          </div>
        </div>
        {location.pathname !== "/" && <FooterPage />}
      </div>
    </div>
  );
}

export default ErrorPage;
