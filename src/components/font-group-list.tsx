import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "./ui/button";

export function FontGroupList({ fontGroups, setFontGroups }) {
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
              <TableCell>
                <Button
                  variant="ghost"
                  className="text-red-600 hover:cursor-pointer"
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
    </section>
  );
}
