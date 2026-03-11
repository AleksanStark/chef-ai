<script setup lang="ts">
import { fetchCompletion, imageToBase64 } from '@/features/ai'
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

const fileInput = ref<HTMLInputElement | null>(null)
const selectedImage = ref<string | null>(null)

// Метод для вызова окна выбора файла
const triggerFileInput = () => {
  fileInput.value?.click()
}

// Обработка выбранного файла
const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]

  if (file) {
    // Создаем превью для проверки (опционально)
    selectedImage.value = URL.createObjectURL(file)
    console.log('Выбран файл:', file.name)
  }
}

const removeImage = () => {
  selectedImage.value = null
  if (fileInput.value) {
    fileInput.value.value = '' // Обязательно сбрасываем сам файл
  }
}

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
  const file = fileInput.value?.files?.[0]
  if ((!text && !file) || isLoading.value) return
  // 1. Добавляем сообщение пользователя
  messages.value.push({
    id: Date.now(),
    role: 'user',
    content: text || 'Анализ картинки',
  })

  newMessage.value = '' // Теперь можно очистить поле
  await scrollToBottom()

  // 2. Вызываем Альфреда
  isLoading.value = true
  try {
    let base64Data: string | undefined = undefined
    if (file) {
      base64Data = await imageToBase64(file) // Конвертируем
    }

    const response = await fetchCompletion(text, base64Data)

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
    removeImage()
    await scrollToBottom()
  }
}
</script>

<template>
  <div class="flex flex-col h-[400px] w-full max-w-2xl mx-auto bg-white border-t shadow-2xl">
    <div ref="scrollTarget" class="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
      <div
        v-for="msg in messages"
        :key="msg.id"
        :class="['flex w-full', msg.role === 'user' ? 'justify-end' : 'justify-start']"
      >
        <div
          v-if="msg.role === 'user'"
          class="max-w-[80%] p-3 rounded-2xl text-sm bg-[#FF9A2F] text-white rounded-tr-none"
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
    </div>

    <div class="p-4 bg-white border-t border-gray-200">
      <form @submit.prevent="sendMessage" class="flex gap-2">
        <input
          ref="fileInput"
          type="file"
          accept="image/*"
          class="hidden"
          @change="handleFileChange"
        />

        <button
          type="button"
          @click="triggerFileInput"
          class="flex items-center justify-center w-12 h-12 rounded-xl border-2 border-dashed border-gray-300 hover:border-blue-500 hover:bg-blue-50 transition-all cursor-pointer group"
          title="Загрузить фото продуктов"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6 text-gray-400 group-hover:text-blue-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </button>

        <div v-if="selectedImage" class="relative w-12 h-12">
          <img :src="selectedImage" class="w-full h-full object-cover rounded-lg border" />
          <button
            type="button"
            @click="removeImage"
            class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-4 h-4 text-[10px] flex items-center justify-center"
          >
            ✕
          </button>
        </div>
        <input
          v-model="newMessage"
          :disabled="isLoading"
          type="text"
          placeholder="Введите список продуктов..."
          class="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9A2F] disabled:bg-gray-100"
        />
        <button
          type="submit"
          :disabled="(!newMessage.trim() && !selectedImage) || isLoading"
          class="px-4 py-2 bg-[#FF9A2F] text-white rounded-lg hover:bg-[#E96F00] disabled:bg-[#e5af7a]"
        >
          {{ isLoading ? '...' : 'Отправить' }}
        </button>
      </form>
    </div>
  </div>
</template>
