import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "./ui/button";

export function FontList({ fonts, setFonts }) {
  return (
    <section className="flex flex-col justify-start items-start w-full sm:w-1/2 p-7 border-gray-300 border-1 shadow">
      <h1 className="text-xl font-medium">Our Fonts</h1>
      <span className="text-sm opacity-75">
        Browse a list of Zepto fonts to build your font group
      </span>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Font Name</TableHead>
            <TableHead>Preview</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {fonts.map((font, index) => (
            <TableRow key={index}>
              <TableCell>{font.fontFamily}</TableCell>
              <TableCell
                style={{ fontFamily: font.fontFamily }}
              >{`Example ${font.fontFamily}`}</TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  className="text-red-600 hover:cursor-pointer"
                  onClick={() => {
                    setFonts((prev) =>
                      prev.filter((f) => f?.fontFamily != font.fontFamily)
                    );
                  }}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}

          {fonts.length <= 0 && (
            <p className="self-center opacity-70 p-6">No available fonts </p>
          )}
        </TableBody>
      </Table>
    </section>
  );
}
