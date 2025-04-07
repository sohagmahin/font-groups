import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "./ui/button";
import { useState } from "react";
import EditFontGroup from "./edit-font-group";

export function FontGroupList({ fontGroups, setFontGroups, fonts }) {
  const [editingGroup, setEditingGroup] = useState(null);

  const handleEdit = (group) => {
    setEditingGroup(group);
  };

  const handleSaveEdit = (updatedGroup) => {
    setFontGroups((prev) =>
      prev.map((group) =>
        group.name === updatedGroup.name ? updatedGroup : group
      )
    );
    setEditingGroup(null);
  };

  const handleCancelEdit = () => {
    setEditingGroup(null);
  };

  return (
    <section className="flex flex-col justify-start items-start w-full sm:w-1/2 p-7 border-gray-300 border-1 shadow">
      <h1 className="text-xl font-medium">Our Font Groups</h1>
      <span className="text-sm opacity-75">
        List of all available font groups.
      </span>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Name</TableHead>
            <TableHead>Fonts</TableHead>
            <TableHead>Count</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {fontGroups.map((group, index) => (
            <TableRow key={index}>
              <TableCell>{group.name}</TableCell>
              <TableCell>{`${group?.fontGroup}`}</TableCell>
              <TableCell>{`${group?.fontGroup.length}`}</TableCell>
              <TableCell className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-blue-600 hover:text-blue-700"
                  onClick={() => handleEdit(group)}
                >
                  Edit
                </Button>
                <Button
                  variant="ghost"
                  className="text-red-600 hover:text-red-700"
                  onClick={() => {
                    setFontGroups((prev) =>
                      prev.filter((fg) => fg?.name != group.name)
                    );
                  }}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}

          {fontGroups.length <= 0 && (
            <p className="self-center opacity-70 p-6">
              No available font groups{" "}
            </p>
          )}
        </TableBody>
      </Table>

      {editingGroup && (
        <div className="mt-4 w-full">
          <h2 className="text-lg font-medium mb-2">Edit Font Group</h2>
          <EditFontGroup
            group={editingGroup}
            fonts={fonts}
            onSave={handleSaveEdit}
            onCancel={handleCancelEdit}
          />
        </div>
      )}
    </section>
  );
}
