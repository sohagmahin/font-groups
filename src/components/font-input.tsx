import { cn } from "@/lib/utils";
import { CloudUpload } from "lucide-react";
import { useRef, useState } from "react";

function FontInput({ setFonts }) {
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

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

  const handleOnDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && !file.name.endsWith(".ttf")) {
      alert("Only .ttf files are allowed");
      return;
    }

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
      className={cn(
        "flex flex-col justify-center items-center h-60 w-1/2 border-gray-200 border-1 shadow cursor-pointer",
        {
          "border-green-600 border-2": isDragging,
        }
      )}
      onDrop={handleOnDrop}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
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

      <CloudUpload color="#9EA4AF" size={30} />
      <p className="opacity-70">
        <span className="font-semibold">Click to upload</span> or drag and drop
      </p>
      <span className="font-normal opacity-50 text-sm">
        Only TTF File Allowed
      </span>
    </section>
  );
}

export default FontInput;
