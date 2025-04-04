import { useRef } from "react";

function FontInput({ setFonts }) {
  const fileInputRef = useRef(null);

  const handleFontUpload = (e) => {
    const file = e.target.files[0];
    const fontName = file.name.replace(".ttf", "").replace(/\s/g, "");

    const blobUrl = URL.createObjectURL(file);
    const style = document.createElement("style");
    style.innerHTML = `
      @font-face {
        font-family: '${fontName}';
        src: url('${blobUrl}');
      }
    `;
    document.head.appendChild(style);

    const newFont = {
      fontFamily: fontName,
    };

    setFonts((prev) => [...prev, newFont]);
  };
  return (
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
        onChange={handleFontUpload}
        placeholder="Click to upload font"
      />

      <span>Click to upload or drag and drop</span>
      <span className="font-thin opacity-75 text-sm">
        Only TTF File Allowed
      </span>
    </section>
  );
}

export default FontInput;
