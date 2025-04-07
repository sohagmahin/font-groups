import { useState } from "react";
import FontInput from "./components/font-input";
import { FontList } from "./components/font-list";
import { CreateFontGroup } from "./components/create-font-group";
import { FontGroupList } from "./components/font-group-list";

function App() {
  const [fonts, setFonts] = useState([]);
  const [fontGroups, setFontGroups] = useState([]);

  return (
    <div className="text-black p-10 flex flex-col gap-10 justify-center items-center">
      <FontInput setFonts={setFonts} />
      <FontList fonts={fonts} setFonts={setFonts} />
      <CreateFontGroup fonts={fonts} setFontGroups={setFontGroups} />
      <FontGroupList
        fontGroups={fontGroups}
        setFontGroups={setFontGroups}
        fonts={fonts}
      />
    </div>
  );
}

export default App;
