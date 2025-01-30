import ArticleList from "./pages/ArticlePages";

function App() {
  return (
    <div className="justify-center flex">
      <div className="items-center flex flex-col m-0 max-w-[1200px] w-full">
        <div className="grid 2lg:grid-cols-3 grid-cols-1 gap-8 p-4 2lg:p-0">
          <div className=" 2lg:col-span-2 col-span-1">
            <ArticleList />
          </div>
          <div className="min-w-0 relative before:content=[''] before:h-full before:absolute before:left-[calc(-1rem-1px)] before:bottom-0 before:border-l before:border-l-[#C7C7C7]">
            <ArticleList />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
