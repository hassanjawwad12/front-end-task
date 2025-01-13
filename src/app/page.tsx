'use client'
import { useState } from 'react';
import UserInput from "./UserInput";
import DataTable from "./DataTable";

interface Embedding {
  id: string;
  content: string;
  embeddingVector: number[];
}
export default function Home() {
  const [embeddings, setEmbeddings] = useState<Embedding[]>([
    {
      id: '12345',
      content: 'Sample John Doe',
      embeddingVector: [0.1, 0.2, 0.3],
    },
    {
      id: '67890',
      content: 'Sample Ethan Dixon',
      embeddingVector: [0.6, 0.7, 0.8],
    },
  ]);

  const onNewEmbedding = (embedding: Embedding) => {
    setEmbeddings([...embeddings, embedding]);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full gap-8 bg-gray-900">
      <p className="text-purple-300 text-4xl text-center font-extrabold underline">OraClaim Front end Task</p>
      <UserInput onNewEmbedding={onNewEmbedding} />
      <DataTable embeddings={embeddings} />
    </div>
  );
}
