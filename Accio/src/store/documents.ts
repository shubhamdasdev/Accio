import { create } from 'zustand';
import { documents } from '@/lib/api';

interface Document {
  id: string;
  name: string;
  date: string;
  type: string;
  investmentRisks?: string;
  marketConsiderations?: string;
}

interface DocumentsState {
  documents: Document[];
  loading: boolean;
  fetchDocuments: () => Promise<void>;
  addDocument: (document: Omit<Document, 'id'>) => Promise<void>;
  updateDocument: (id: string, document: Partial<Document>) => Promise<void>;
  deleteDocument: (id: string) => Promise<void>;
}

export const useDocuments = create<DocumentsState>((set, get) => ({
  documents: [],
  loading: false,
  fetchDocuments: async () => {
    set({ loading: true });
    try {
      const data = await documents.getAll();
      set({ documents: data });
    } finally {
      set({ loading: false });
    }
  },
  addDocument: async (document) => {
    const newDocument = await documents.create(document);
    set({ documents: [...get().documents, newDocument] });
  },
  updateDocument: async (id, document) => {
    const updatedDocument = await documents.update(id, document);
    set({
      documents: get().documents.map((doc) =>
        doc.id === id ? updatedDocument : doc
      ),
    });
  },
  deleteDocument: async (id) => {
    await documents.delete(id);
    set({
      documents: get().documents.filter((doc) => doc.id !== id),
    });
  },
}));