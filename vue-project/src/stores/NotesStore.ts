import { defineStore } from 'pinia';
import Parse from 'parse';
import type { Note, NewNote } from '@/interfaces/Note';

interface NotesState {
  notes: Note[];
  loading: boolean;
}

export const useNotesStore = defineStore('notes', {
  state: (): NotesState => ({
    notes: [],
    loading: false
  }),

  actions: {
    async fetchNotes() {
      this.loading = true;
      try {
        const query = new Parse.Query('Note');
        const results = await query.findAll();
        this.notes = results
        .map(note => ({
          object_id: note.id,
          title: note.get('title'),
          content: note.get('content'),
          createdAt: note.get('createdAt').toISOString()
        } as Note))
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      
      } catch (error) {
        console.error('Error fetching notes:', error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async addNote(noteData: NewNote): Promise<Note> {
      const Note = Parse.Object.extend('Note');
      const note = new Note();
      note.set('title', noteData.title);
      note.set('content', noteData.content);
      
      try {
        const savedNote = await note.save();
        const newNote: Note = {
          object_id: savedNote.id,
          title: savedNote.get('title'),
          content: savedNote.get('content'),
          createdAt: savedNote.get('createdAt').toISOString()
        };
        this.notes.push(newNote);
        return newNote;
      } catch (error) {
        console.error('Error adding note:', error);
        throw error;
      }
    },

    async updateNote(id: string, updates: NewNote): Promise<Note | undefined> {
      const query = new Parse.Query('Note');
      try {
        const parseNote = await query.get(id);
        if (!parseNote) throw new Error('Note not found');
        
        parseNote.set('title', updates.title);
        parseNote.set('content', updates.content);
        
        const savedNote = await parseNote.save();
        const updatedNote: Note = {
          object_id: savedNote.id,
          title: savedNote.get('title'),
          content: savedNote.get('content'),
          createdAt: savedNote.get('createdAt').toISOString()
        };
        
        const index = this.notes.findIndex(note => note.object_id === id);
        if (index !== -1) {
          this.notes[index] = updatedNote;
        }
        return updatedNote;
      } catch (error) {
        console.error('Error updating note:', error);
        throw error;
      }
    },

    async deleteNote(id: string): Promise<void> {
      const query = new Parse.Query('Note');
      try {
        const parseNote = await query.get(id);
        if (!parseNote) throw new Error('Note not found');
        
        await parseNote.destroy();
        this.notes = this.notes.filter(note => note.object_id !== id);
      } catch (error) {
        console.error('Error deleting note:', error);
        throw error;
      }
    },

    async getNoteById(id: string): Promise<Note | undefined> {
      try {
        const existingNote = this.notes.find(note => note.object_id === id);
        if (existingNote) return existingNote;

        const query = new Parse.Query('Note');
        const parseNote = await query.get(id);
        
        if (!parseNote) throw new Error('Note not found');

        const fetchedNote: Note = {
          object_id: parseNote.id,
          title: parseNote.get('title'),
          content: parseNote.get('content'),
          createdAt: parseNote.get('createdAt').toISOString()
        };
        console.log(fetchedNote)
        this.notes.push(fetchedNote);
        return fetchedNote;
      } catch (error) {
        console.error('Error fetching note by ID:', error);
        throw error;
      }
    }
  }
});