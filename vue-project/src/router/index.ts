import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NotFoundView from '../views/NotFoundView.vue'
import EditNoteView from '../views/EditNoteView.vue'
import NewNoteView from '@/views/NewNoteView.vue'
import NoteView from '../views/NoteView.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/new-note',
    name: 'new-note',
    component: NewNoteView
  },
  {
    path: '/note/:id',
    name: 'note',
    component: NoteView
  },
  {
    path: '/note/:id/edit',
    name: 'edit-note',
    component: EditNoteView
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFoundView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router