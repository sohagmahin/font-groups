import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";

export function CreateFontGroup({ fonts, setFontGroups }) {
  const [row, setRow] = useState(1);
  const [group, setGroup] = useState({
    name: "",
    fontName: [],
    fontGroup: [],
  });

  const handleOnAddName = (e, index) => {
    e.preventDefault();
    const fontNames = group.fontName;
    fontNames[index] = e.target.value;
    setGroup({ ...group, fontName: fontNames });
  };

  const hanleOnSelect = (value) => {
    const fontGroup = group.fontGroup;
    // if already exist
    if (group.fontGroup.includes(value)) return;
    fontGroup.push(value);
    setGroup({ ...group, fontGroup: fontGroup });
  };

  const createGroup = () => {
    // 2 field are required to create groups
    if (group.fontGroup.length <= 1) {
      alert("You must have to select two fonts.");
      return;
    }
    setFontGroups((prev) => [...prev, group]);
    // Reset state
    setGroup({
      name: "",
      fontName: [],
      fontGroup: [],
    });

    setRow(0);
  };

  const handleOnDelete = (index) => {
    const fontName = group.fontName;
    const fontGroup = group.fontGroup;
    fontName.splice(1, index);
    fontGroup.splice(1, index);

    setGroup({
      ...group,
      fontName: fontName,
      fontGroup: fontGroup,
    });
    setRow((prev) => prev - 1);
  };

  return (
    <section className="flex flex-col justify-start items-start w-1/2 p-7 border-gray-300 border-1 shadow">
      <h1 className="text-xl font-medium">Create font group</h1>
      <span className="text-sm opacity-75">
        You have to select atleast two fonts
      </span>
      <div className="w-full pt-2">
        <Input
          placeholder="Group title"
          value={group.name}
          onChange={(e) => {
            e.preventDefault();
            setGroup({ ...group, name: e.target.value });
          }}
        />
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Font Name</TableHead>
              <TableHead>Preview</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: row }).map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <input
                    className="p-2 rounded-sm border"
                    placeholder="Font name"
                    value={group.fontName[index]}
                    onChange={(e) => handleOnAddName(e, index)}
                  />
                </TableCell>
                <TableCell>
                  <Select onValueChange={hanleOnSelect}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select a font" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Fonts</SelectLabel>
                        {fonts.map((font) => (
                          <SelectItem value={`${font?.fontFamily}`}>
                            {font?.fontFamily}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </TableCell>

                <TableCell>
                  <Button
                    variant="ghost"
                    className="text-red-600 hover:cursor-pointer"
                    onClick={() => handleOnDelete(index)}
                  >
                    X
                  </Button>
                </TableCell>
              </TableRow>
            ))}

            {fonts.length <= 0 && (
              <p className="self-center opacity-70 p-6">No available fonts </p>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>
                <Button
                  variant="outline"
                  className="border-green-600 border"
                  onClick={() => {
                    setRow((prev) => prev + 1);
                  }}
                >
                  + Add new row
                </Button>
              </TableCell>
              <TableCell className="text-right">
                <Button
                  variant="default"
                  className="bg-green-600"
                  onClick={createGroup}
                >
                  Create
                </Button>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </section>
  );
}
