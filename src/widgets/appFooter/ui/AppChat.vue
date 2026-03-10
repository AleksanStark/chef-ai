<script setup lang="ts">
import { fetchCompletion } from '@/features/ai/api'
import { marked } from 'marked'
import { ref, nextTick } from 'vue'

interface Message {
  id: number
  role: 'user' | 'assistant'
  content: string
}

const messages = ref<Message[]>([
  {
    id: 1,
    role: 'assistant',
    content: 'Приветствую, мастер. Какие продукты сегодня в нашем распоряжении?',
  },
])
const newMessage = ref('')
const isLoading = ref(false) // Добавляем статус загрузки
const scrollTarget = ref<HTMLElement | null>(null)

const scrollToBottom = async () => {
  await nextTick()
  if (scrollTarget.value) {
    scrollTarget.value.scrollTo({ top: scrollTarget.value.scrollHeight, behavior: 'smooth' })
  }
}

const renderMarkdown = (text: string) => {
  return marked.parse(text)
}

const sendMessage = async () => {
  const text = newMessage.value.trim()
  if (!text || isLoading.value) return

  // 1. Добавляем сообщение пользователя
  messages.value.push({
    id: Date.now(),
    role: 'user',
    content: text,
  })

  newMessage.value = '' // Теперь можно очистить поле
  await scrollToBottom()

  // 2. Вызываем Альфреда
  isLoading.value = true
  try {
    const response = await fetchCompletion(text)

    // 3. Добавляем ответ в чат
    messages.value.push({
      id: Date.now() + 1,
      role: 'assistant',
      content: response || 'Простите, мастер, связь прервалась.',
    })
  } catch (e) {
    console.error(e)
  } finally {
    isLoading.value = false
    await scrollToBottom()
  }
}
</script>

<template>
  <div class="flex flex-col h-[400px] w-full max-w-2xl mx-auto bg-white border-t shadow-2xl">
    <main ref="scrollTarget" class="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
      <div
        v-for="msg in messages"
        :key="msg.id"
        :class="['flex w-full', msg.role === 'user' ? 'justify-end' : 'justify-start']"
      >
        <div
          v-if="msg.role === 'user'"
          class="max-w-[80%] p-3 rounded-2xl text-sm bg-blue-600 text-white rounded-tr-none"
        >
          {{ msg.content }}
        </div>

        <div
          v-else
          class="max-w-[80%] p-4 rounded-2xl text-sm bg-white text-gray-800 border border-gray-200 rounded-tl-none shadow-sm prose prose-sm prose-blue"
          v-html="renderMarkdown(msg.content)"
        ></div>
      </div>

      <div v-if="isLoading" class="flex justify-start">
        <div
          class="bg-gray-200 text-gray-500 p-3 rounded-2xl rounded-tl-none text-xs animate-pulse"
        >
          ChefAI анализирует запасы...
        </div>
      </div>
    </main>

    <footer class="p-4 bg-white border-t border-gray-200">
      <form @submit.prevent="sendMessage" class="flex gap-2">
        <input
          v-model="newMessage"
          :disabled="isLoading"
          type="text"
          placeholder="Введите список продуктов..."
          class="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
        />
        <button
          type="submit"
          :disabled="!newMessage.trim() || isLoading"
          class="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:opacity-50"
        >
          {{ isLoading ? '...' : 'Отправить' }}
        </button>
      </form>
    </footer>
  </div>
</template>
