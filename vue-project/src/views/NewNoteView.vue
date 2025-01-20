<template>
    <div class="new-note">
      <h2>New note</h2>
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
        <button type="submit" :disabled="saving">
          {{ saving ? 'Saving...' : 'Save' }}
        </button>
      </form>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useNotesStore } from '@/stores/NotesStore'
  
  export default defineComponent({
    setup() {
      const router = useRouter()
      const store = useNotesStore()
      
      const title = ref('')
      const content = ref('')
      const saving = ref(false)
  
      const saveNote = async () => {
        saving.value = true
        try {
          const newNote = await store.addNote({
            title: title.value,
            content: content.value
          })
          router.push(`/note/${newNote.object_id}`)
        } finally {
          saving.value = false
        }
      }
  
      return {
        title,
        content,
        saving,
        saveNote
      }
    }
  })
  </script>
  
  <style scoped>
  .form-group {
    margin-bottom: 20px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
  }
  
  input, textarea {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  button {
    background-color: #42b983;
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