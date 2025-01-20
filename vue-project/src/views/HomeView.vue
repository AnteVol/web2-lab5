<template>
  <div class="home">
    <h1>My notes</h1>
    <div v-if="error" class="error">
      {{ error }}
    </div>
    <div v-else-if="loading">
      Loading...
    </div>
    <div v-else-if="sortedNotes.length === 0">
      You have no notes at the moment. 
      <router-link to="/new-note">Create new note!</router-link>
    </div>
    <SingleNoteCard
      v-else
      v-for="note in sortedNotes"
      :key="note.object_id"
      :note="note"
      @click="goToNote(note.object_id)"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, computed } from "vue";
import { useNotesStore } from "@/stores/NotesStore";
import { useRouter } from "vue-router";
import SingleNoteCard from "@/components/SingleNoteCard.vue";

export default defineComponent({
  components: { SingleNoteCard },
  setup() {
    const store = useNotesStore();
    const router = useRouter();
    const error = ref<string | null>(null);

    onMounted(async () => {
      try {
        await store.fetchNotes();
      } catch (err) {
        error.value = "Error fething notes.";
        console.error(err);
      }
    });

    const loading = computed(() => store.loading);
    const sortedNotes = computed(() =>
      store.notes.slice().sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    );

    const goToNote = (id: string) => {
      router.push(`/note/${id}`);
    };

    return {
      error,
      loading,
      sortedNotes,
      goToNote,
    };
  },
});
</script>

<style scoped>
.error {
  color: #ff4444;
  padding: 1rem;
  border: 1px solid #ff4444;
  border-radius: 4px;
  margin: 1rem 0;
}
</style>
