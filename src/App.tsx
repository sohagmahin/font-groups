import { useRef } from "react";
import { FontList } from "./components/font-list";

function App() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  return (
    <div className="max-w-[1400px] text-black p-10 flex flex-col gap-10 justify-center items-center">
      {/* font upload */}
      <section
        className="flex flex-col justify-center items-center h-60 w-1/2 border-gray-300 border-1 shadow"
        onClick={() => {
          fileInputRef.current?.click();
        }}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".ttf"
          className="hidden"
          onChange={(e) => {
            console.log(e.target.files);
          }}
          placeholder="Click to upload font"
        />

        <span>Click to upload or drag and drop</span>
        <span className="font-thin opacity-75 text-sm">
          Only TTF File Allowed
        </span>
      </section>

      {/* Zepto font-list */}
      <section className="flex flex-col justify-start items-start w-1/2 p-7 border-gray-300 border-1 shadow">
        <h1 className="text-2xl font-medium">Our Fonts</h1>
        <span className="text-sm opacity-75">
          Browse a list of Zepto fonts to build your font group
        </span>
        <FontList />
      </section>
    </div>
  );
}

export default App;
