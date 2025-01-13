'use client';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  

interface Embedding {
  id: string;
  content: string;
  embeddingVector: number[];
}

interface DataTableProps {
  embeddings: Embedding[];
}

const DataTable = ({ embeddings }: DataTableProps) => {
  return (
    <div className="w-full max-w-4xl mt-6">
      <Table className="table-auto w-full border-collapse border border-purple-400">
        <TableHeader className="bg-purple-600 ">
          <TableRow>
            <TableHead className="border border-purple-400 px-4 py-2 text-left font-semibold text-white">ID</TableHead>
            <TableHead className="border border-purple-400 px-4 py-2 text-left font-semibold text-white">Content</TableHead>
            <TableHead className="border border-purple-400 px-4 py-2 text-left font-semibold text-white">Embedding Vector</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {embeddings.length > 0 ? (
            embeddings.map(({ id, content, embeddingVector }) => (
              <TableRow key={id} className="hover:bg-purple-100 bg-white text-black">
                <TableCell className="border border-purple-400 px-4 py-2 text-gray-900">{id}</TableCell>
                <TableCell className="border border-purple-400 px-4 py-2 text-gray-900">{content}</TableCell>
                <TableCell className="border border-purple-400 px-4 py-2 text-gray-900">
                  {embeddingVector.slice(0, 5).join(', ')}...
                </TableCell>
              </TableRow>
            ))
          ) : (
            <tr>
              <TableCell colSpan={3} className="border border-purple-400 px-4 py-2 text-center text-gray-600">
                Submit content to populate the table
              </TableCell>
            </tr>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default DataTable;
