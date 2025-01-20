<template>
    <div v-if="note" class="note-detail">
      <h2>{{ note.title }}</h2>
      <p class="content">{{ note.content }}</p>
      <div class="actions">
        <button @click="goToEdit" class="edit-btn">Edit</button>
        <button @click="deleteNote" :disabled="deleting" class="delete-btn">
          {{ deleting ? "Deleting..." : "Delete" }}
        </button>
      </div>
    </div>
    <div v-else>
      Note not found.
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted } from "vue";
  import { useRoute, useRouter } from "vue-router";
  import { useNotesStore } from "@/stores/NotesStore";
  import type { Note } from "@/interfaces/Note";
  
  export default defineComponent({
    name: "NoteDetailView",
    setup() {
      const route = useRoute();
      const router = useRouter();
      const store = useNotesStore();
      const note = ref<Note | null>(null);
      const deleting = ref(false);
  
      onMounted(async () => {
        const object_id = route.params.id as string;
        try {
          const fetchedNote = await store.getNoteById(object_id);
          note.value = fetchedNote || null;
        } catch (error) {
          console.error("Error fetching the note:", error);
        }
      });
  
      const goToEdit = () => {
        if (note.value) {
          router.push(`/note/${note.value.object_id}/edit`);
        }
      };
  
      const deleteNote = async () => {
        if (!note.value) return;
  
        deleting.value = true;
        try {
          await store.deleteNote(note.value.object_id);
          router.push("/");
        } catch (error) {
          console.error("Error deleting the note:", error);
        } finally {
          deleting.value = false;
        }
      };
  
      return {
        note,
        deleting,
        goToEdit,
        deleteNote,
      };
    },
  });
  </script>
  
  <style scoped>
  .note-detail {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }
  
  h2 {
    word-wrap: break-word;
    white-space: normal;
    margin-bottom: 1rem;
    font-size: 1.75rem;
    font-weight: 700;
    padding: 0.5rem;
    border-radius: 4px;
    color: lightgray;
    border-bottom: 4px solid #42b983; 
    border-left: 4px solid #42b983; 
  }
  
  .content {
    word-wrap: break-word;
    white-space: normal;
    margin-bottom: 1.5rem;
  }
  
  .actions {
    display: flex;
    gap: 10px;
    margin-top: 20px;
  }
  
  .edit-btn {
    background-color: #42b983;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .delete-btn {
    background-color: #ff4444;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
  </style>
  