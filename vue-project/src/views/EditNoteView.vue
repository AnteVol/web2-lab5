<template>
    <div class="edit-note">
        <div v-if="loading">
      Loading...
    </div>
    <div v-else-if="!note">
      Note not found.
    </div>
      <template v-else>
        <h2>Edit note</h2>
        <form @submit.prevent="saveNote">
          <div class="form-group">
            <label for="title">Title</label>
            <input 
              id="title"
              v-model="title"
              type="text"
              required
            >
          </div>
          <div class="form-group">
            <label for="content">Content</label>
            <textarea
              id="content"
              v-model="content"
              required
              rows="5"
            ></textarea>
          </div>
          <div class="button-group">
            <button type="submit" :disabled="saving" class="save-btn">
              {{ saving ? 'Saving...' : 'Save changes' }}
            </button>
            <button type="button" @click="cancel" class="cancel-btn">
              Cancel
            </button>
          </div>
        </form>
      </template>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { useNotesStore } from '@/stores/NotesStore'
  import type { Note } from '@/interfaces/Note';
  
  export default defineComponent({
    setup() {
      const route = useRoute()
      const router = useRouter()
      const store = useNotesStore()
      
      const title = ref('')
      const content = ref('')
      const saving = ref(false)
      const note = ref<Note | undefined>(undefined)
        const loading = ref(true) 

onMounted(async () => { 
  try {
    const object_id = route.params.id as string
    note.value = await store.getNoteById(object_id) 
    if (note.value) {
      title.value = note.value.title
      content.value = note.value.content
    }
  } catch (error) {
    console.error('Error fetching note:', error)
  } finally {
    loading.value = false
  }
})
  
      const saveNote = async () => {
        if (!note.value) return
  
        saving.value = true
        try {
          await store.updateNote(note.value.object_id, {
            title: title.value,
            content: content.value
          })
          router.push(`/note/${note.value.object_id}`)
        } finally {
          saving.value = false
        }
      }
  
      const cancel = () => {
        router.back()
      }
  
      return {
        note,
        title,
        content,
        saving,
        loading,
        saveNote,
        cancel
      }
    }
  })
  </script>
  
  <style scoped>
  .edit-note {
    max-width: 800px;
    margin: 0 auto;
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
    font-weight: 500;
  }
  
  input, textarea {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  .button-group {
    display: flex;
    gap: 10px;
    margin-top: 20px;
  }
  
  .save-btn {
    background-color: #42b983;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
    flex: 1;
  }
  
  .cancel-btn {
    background-color: #666;
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