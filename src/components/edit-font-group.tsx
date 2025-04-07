import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "./ui/button";

const EditFontGroup = ({ group, fonts, onSave, onCancel }) => {
  const [editedGroup, setEditedGroup] = useState(group);

  const handleOnAddName = (e, index) => {
    e.preventDefault();
    const fontNames = [...editedGroup.fontName];
    fontNames[index] = e.target.value;
    setEditedGroup({ ...editedGroup, fontName: fontNames });
  };

  const handleOnSelect = (value, index) => {
    const fontGroup = [...editedGroup.fontGroup];
    if (fontGroup.includes(value)) return;
    fontGroup[index] = value;
    setEditedGroup({ ...editedGroup, fontGroup });
  };

  const handleSave = () => {
    onSave(editedGroup);
  };

  return (
    <div className="w-full">
      <div className="mb-4">
        <input
          className="w-full p-2 rounded-sm border"
          value={editedGroup.name}
          onChange={(e) =>
            setEditedGroup({ ...editedGroup, name: e.target.value })
          }
        />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Font Name</TableHead>
            <TableHead>Preview</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {editedGroup.fontGroup.map((font, index) => (
            <TableRow key={index}>
              <TableCell>
                <input
                  className="p-2 rounded-sm border"
                  placeholder="Font name"
                  value={editedGroup.fontName[index] || ""}
                  onChange={(e) => handleOnAddName(e, index)}
                />
              </TableCell>
              <TableCell>
                <select
                  className="w-[180px] p-2 rounded-sm border"
                  value={font}
                  onChange={(e) => handleOnSelect(e.target.value, index)}
                >
                  <option value="">Select a font</option>
                  {fonts.map((f) => (
                    <option key={f.fontFamily} value={f.fontFamily}>
                      {f.fontFamily}
                    </option>
                  ))}
                </select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-end gap-2 mt-4">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button className="bg-green-600" onClick={handleSave}>
          Save
        </Button>
      </div>
    </div>
  );
};

export default EditFontGroup;
