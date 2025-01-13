'use client'
import { useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';

interface Embedding {
  id: string;
  content: string;
}

interface UserInputProps {
  onNewEmbedding: (embedding: {
    id: string;
    embeddingVector: number[];
    content: string;
  }) => void;
}

const UserInput = ({ onNewEmbedding }: UserInputProps) => {
  const [input, setInput] = useState<string>('');

  const handleSubmit = async () => {
    if (!input.trim()) return;

    const embeddingsData: Embedding[] = [
      {
        id: uuidv4(),
        content: input,
      },
    ];

    try {
      const response = await axios.post(
        'http://embedding-service-production.up.railway.app/api/get_embeddings',
        embeddingsData
      );

      const { id, embedding } = response.data[0];
      onNewEmbedding({ id, embeddingVector: embedding, content: input });
      setInput('');
      toast.success('Embedding fetched successfully');
    } catch (error) {
      console.error('Error fetching embeddings:', error);
      toast.error('Error fetching embeddings');
    }
  };

  return (
    <div className="mb-6  mt-10 flex flex-col items-center justify-center gap-4 py-2">
      <ToastContainer/>
      <Label className='text-white text-lg font-semibold' htmlFor="input">Enter content for embedding:</Label>
      <Input
        id="input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type here..."
        className="bg-purple-300 text-gray-400 font-semibold text-md outline-none"
      />
      <Button className='bg-purple-500 p-4 text-white text-md hover:bg-purple-700' onClick={handleSubmit}>
        Submit
      </Button>
    </div>
  );
};

export default UserInput;
