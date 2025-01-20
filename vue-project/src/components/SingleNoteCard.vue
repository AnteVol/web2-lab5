<template>
  <div class="note-card" @click="$emit('click', note.object_id)">
    <h2>{{ getTruncatedTitle() }}</h2>
    <p>{{ getTruncatedContent() }}</p>
    <div class="footer">
      <span class="date">{{ getFormattedDate() }}</span>
      <span class="note-count">Note {{ getNoteNumber() }} out of {{ getTotalNotes() }}</span>
    </div>
  </div>
 </template>
 
 <script lang="ts">
 import { defineComponent } from 'vue'
 import type { Note } from '@/interfaces/Note'
 import { useNotesStore } from '@/stores/NotesStore'
 
 export default defineComponent({
  name: 'NoteCard',
  props: {
    note: {
      type: Object as () => Note,
      required: true
    }
  },
  emits: ['click'],
  methods: {
    getTruncatedTitle(): string {
      return this.note.title.length > 100
        ? this.note.title.slice(0, 20) + '...'
        : this.note.title
    },
    getTruncatedContent(): string {
      return this.note.content.length > 80
        ? this.note.content.slice(0, 80) + '...'
        : this.note.content
    },
    getFormattedDate(): string {
      return new Date(this.note.createdAt).toLocaleDateString('hr')
    },
    getTotalNotes(): number {
      const store = useNotesStore()
      return store.notes.length
    },
    getNoteNumber(): number {
      const store = useNotesStore()
      return store.notes.findIndex(n => n.object_id === this.note.object_id) + 1
    }
  }
 })
 </script>
 
 <style scoped>
 .note-card {
  border: 1px solid #ddd;
  padding: 15px;
  margin: 10px 0;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s;
 }
 
 .note-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
 }
 
 .footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
 }
 
 .date, .note-count {
  color: #666;
  font-size: 0.8em;
 }
 </style>