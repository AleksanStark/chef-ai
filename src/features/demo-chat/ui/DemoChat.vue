<script setup lang="ts">
import { ref, nextTick, reactive } from 'vue'
import { imageToBase64 } from '@/features/ai'
import { marked } from 'marked'
import OpenAI from 'openai'

// ── Интерфейс сообщения ──────────────────────────────────────────────────────
// Раньше был один html: string — это мешало отображать картинку и текст отдельно.
// Теперь два независимых поля:
//   text  — текстовое содержимое (у AI — markdown, у user — plain text)
//   image — data URL для превью картинки (только у user-сообщений)
interface Message {
  role: 'user' | 'ai'
  text: string
  image?: string // data URL, только для user-сообщений с картинкой
}

// ── OpenAI client ────────────────────────────────────────────────────────────
const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: import.meta.env.VITE_OPEN_ROUTER_API_KEY,
  dangerouslyAllowBrowser: true,
})

const SYSTEM_PROMPT = `You are ChefAI: a professional dietitian, nutritionist, and chef with expert knowledge in nutrition, health, and cooking.

Your task:
Create personalized meal plans, recipes, and recommendations based on:
- User goals (weight loss, muscle gain, maintenance)
- Available ingredients
- Preferences and restrictions (allergies, diets)
- Image analysis (if provided)

CORE CAPABILITIES:
1. Build complete meal plans (daily / weekly)
2. Calculate macros: calories, protein, fat, carbs, fiber
3. Generate recipes with step-by-step instructions
4. Analyze ingredients and dishes from photos
5. Create minimal shopping lists (no unnecessary items)
6. Adapt to user taste (avoid repetition)
7. Work even with incomplete data (make logical assumptions)

BEHAVIOR:
- Respond concisely, clearly, and to the point
- No unnecessary preambles or lengthy explanations
- Structure responses (lists, blocks)
- Do not repeat yourself
- Offer practical, actionable solutions

LANGUAGE RULE:
- Detect the language the user writes in and respond in that same language
- Do not switch languages mid-response
- If the user writes in Russian — respond in Russian; English — in English; etc.

STRICT RULES:
1. Always provide macros: calories, protein, fat, carbs
2. Always include fiber when possible
3. For meal plans — structure by days
4. If a photo is provided — analyze it first
5. If data is limited — make reasonable assumptions
6. If the request is unrelated to food — politely decline

RESPONSE FORMAT (STANDARD):

📅 Plan (if needed):
Day 1:
- Breakfast:
- Lunch:
- Dinner:

📊 Macros (per dish or per day):
Calories: XXX kcal
Protein: XX g
Fat: XX g
Carbs: XX g
Fiber: XX g

🍽 Recipe (if needed):
1. ...
2. ...

🛒 Shopping List:
- item 1
- item 2

IMPORTANT:
- Avoid identical meals unless requested
- Keep meal plans realistic
- Balance macronutrients
- Act as a smart chef, not just a text generator

YOU ARE A UNIVERSAL AI CHEF:
You can:
- Build a diet for any person or persona
- Analyze food or ingredient photos
- Help at every stage of cooking
- Suggest ingredient substitutions
- Provide real-time cooking advice

GOAL:
Deliver the most useful, practical, and actionable result for the user.`

// ── State ────────────────────────────────────────────────────────────────────
const visibleMessages = ref<Message[]>([])
const typing = ref(false)
const isStreaming = ref(false)
const inputVal = ref('')
const fileInput = ref<HTMLInputElement | null>(null)
const selectedImages = reactive<{ image: string }[]>([]) // data URL для превью в инпуте
const messagesRef = ref<HTMLElement | null>(null)

// ── Helpers ──────────────────────────────────────────────────────────────────
function renderMarkdown(text: string): string {
  return marked.parse(text) as string
}

async function scrollToBottom() {
  await nextTick()
  messagesRef.value?.scrollTo({
    top: messagesRef.value.scrollHeight,
    behavior: 'smooth',
  })
}

// ── File handling ─────────────────────────────────────────────────────────────
function triggerFileInput() {
  fileInput.value?.click()
}

function handleFileChange(event: Event) {
  const files = (event.target as HTMLInputElement).files
  if (!files) return
  // Создаём blob URL только для превью в инпуте.
  // Для отправки в API позже вызовем imageToBase64(file) отдельно.
  for (const file of files) {
    const img = URL.createObjectURL(file)
    selectedImages.push({ image: img })
  }
}

function clearImage() {
  // Освобождаем blob URL чтобы избежать утечки памяти
  if (selectedImages.length) selectedImages.length = 0
  if (fileInput.value) fileInput.value.value = ''
}

function removeImage(index: number) {
  selectedImages.splice(index, 1)
}

// ── Send message ──────────────────────────────────────────────────────────────
async function sendMessage() {
  const text = inputVal.value.trim()
  const files = fileInput.value?.files

  if ((!text && !files) || typing.value) return

  inputVal.value = ''

  // ── Шаг 1: формируем сообщение пользователя ─────────────────────────────
  // image: selectedImage.value — это blob URL только для отображения в чате.
  // Для API нужен base64, конвертируем его отдельно ниже.
  for (const img of selectedImages) {
    visibleMessages.value.push({
      role: 'user',
      text,
      // Сохраняем текущий blob URL в сообщение ДО вызова clearImage()
      image: img.image ?? undefined,
    })
  }
  await scrollToBottom()

  // ── Шаг 2: typing + резервный пузырь AI ──────────────────────────────────
  typing.value = true
  isStreaming.value = false
  await scrollToBottom()

  const aiIndex = visibleMessages.value.length
  visibleMessages.value.push({ role: 'ai', text: '' })

  try {
    // ── Шаг 3: строим messages для API ───────────────────────────────────────
    const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
      { role: 'system', content: SYSTEM_PROMPT },
    ]

    if (files) {
      // imageToBase64 возвращает data URL (data:image/...;base64,...)
      // OpenRouter принимает его напрямую в image_url
      for (const file of files) {
        const base64 = await imageToBase64(file)
        messages.push({
          role: 'user',
          content: [{ type: 'image_url', image_url: { url: base64 } }],
        })
      }
    }

    if (text) {
      messages.push({ role: 'user', content: text })
    }

    const model = 'openai/gpt-5.4-nano' // текст + фото

    // ── Шаг 4: стриминг ──────────────────────────────────────────────────────
    const stream = await openai.chat.completions.create({
      model,
      messages,
      stream: true,
      // ...(selectedImages.value ? {} : { extra_body: { thinking: false } }),
    })

    let accumulated = ''

    for await (const chunk of stream) {
      const delta = chunk.choices[0]?.delta?.content ?? ''
      if (!delta) continue

      if (!isStreaming.value) isStreaming.value = true

      accumulated += delta
      visibleMessages.value[aiIndex]!.text = accumulated
      await scrollToBottom()
    }

    // Очищаем картинку только после успешной отправки
    clearImage()
  } catch (e) {
    console.error(e)
    visibleMessages.value[aiIndex]!.text = '⚠️ **Что-то пошло не так.** Попробуй ещё раз.'
    await scrollToBottom()
  } finally {
    typing.value = false
    isStreaming.value = false
  }
}
</script>

<template>
  <div
    class="bg-white border border-[rgba(255,122,0,0.15)] rounded-[22px] overflow-hidden shadow-brand-lg"
  >
    <!-- Header -->
    <div
      class="px-5 py-4 border-b border-[rgba(255,122,0,0.08)] flex items-center gap-2.5 bg-light-bg"
    >
      <div
        class="w-[38px] h-[38px] rounded-[10px] flex items-center justify-center text-xl border border-[rgba(255,122,0,0.2)]"
        style="background: linear-gradient(135deg, #ffe8d1, #ffc078)"
      >
        🤖
      </div>
      <div class="flex-1">
        <span class="block font-display font-bold text-[14px] text-dark">ChefAI Assistant</span>
        <span class="flex items-center gap-1.5 text-[11px] text-primary">
          <span class="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse-brand" />
          Online · Qwen AI
        </span>
      </div>
      <span
        class="bg-primary-soft text-primary text-[10px] font-bold tracking-[0.1em] px-2 py-0.5 rounded-md border border-[rgba(255,122,0,0.2)]"
      >
        AI
      </span>
    </div>

    <!-- Messages -->
    <div ref="messagesRef" class="p-5 flex flex-col gap-3 overflow-y-auto scroll-smooth h-80">
      <div
        v-for="(msg, i) in visibleMessages"
        :key="i"
        class="flex"
        :class="msg.role === 'user' ? 'justify-end' : 'justify-start'"
      >
        <!-- ── Сообщение пользователя ── -->
        <div v-if="msg.role === 'user'" class="max-w-[78%] flex flex-col gap-1.5 items-end">
          <!-- Картинка — показывается если есть image -->
          <img
            v-if="msg.image"
            :src="msg.image"
            class="rounded-[10px] max-w-[180px] max-h-[140px] object-cover border border-[rgba(255,122,0,0.2)]"
            alt="uploaded"
          />
          <!-- Текст — показывается если есть text -->
          <div
            v-if="msg.text"
            class="px-4 py-[11px] rounded-[14px] rounded-br-[4px] text-[13.5px] leading-[1.55] bg-primary text-white"
          >
            {{ msg.text }}
          </div>
        </div>

        <!-- ── Ответ AI — markdown через v-html ── -->
        <!--
          Явный закрывающий тег </div> обязателен с v-html:
          self-closing <div /> поглощает следующие узлы как дочерние.
        -->
        <div
          v-else
          class="max-w-[78%] px-4 py-[11px] rounded-[14px] rounded-bl-[4px] text-[13.5px] leading-[1.55] bg-light-bg text-dark border border-[rgba(255,122,0,0.08)] prose prose-sm"
          :class="{ 'opacity-0': msg.text === '' }"
          v-html="renderMarkdown(msg.text)"
        ></div>
      </div>

      <!-- Typing dots — только пока первый токен не пришёл -->
      <div v-if="typing" class="msg-row ai">
        <div class="msg-bubble typing">
          <span class="dot" /><span class="dot" /><span class="dot" />
        </div>
      </div>
    </div>

    <!-- Input area -->
    <div
      class="px-4 py-3 border-t border-[rgba(255,122,0,0.08)] flex items-center gap-2 bg-light-bg"
    >
      <div class="flex items-center gap-2 shrink-0">
        <input
          ref="fileInput"
          type="file"
          multiple
          accept="image/*"
          class="hidden"
          @change="handleFileChange"
        />

        <button
          type="button"
          class="flex items-center justify-center w-10 h-10 rounded-xl border-2 border-dashed border-gray-300 hover:border-[#FF9A2F] hover:bg-[#FFE8D1] transition-all cursor-pointer group"
          title="Загрузить фото продуктов"
          @click="triggerFileInput"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5 text-gray-400 group-hover:text-[#E96F00]"
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

        <!-- Превью выбранной картинки над инпутом -->
        <div v-if="selectedImages.length">
          <div
            v-for="(img, index) in selectedImages"
            :key="index"
            class="relative w-10 h-10 shrink-0"
          >
            <img
              :src="img.image"
              class="w-full h-full object-cover rounded-lg border border-[rgba(255,122,0,0.2)]"
            />
            <button
              class="absolute -top-1.5 -right-1.5 bg-red-500 text-white rounded-full w-4 h-4 text-[10px] flex items-center justify-center leading-none"
              @click="removeImage(index)"
            >
              ✕
            </button>
          </div>
        </div>
      </div>

      <input
        v-model="inputVal"
        type="text"
        placeholder="What's in your fridge today?"
        class="flex-1 bg-white border border-[rgba(255,122,0,0.15)] rounded-[10px] px-3.5 py-2.5 text-[13px] text-dark font-body outline-none transition-colors duration-200 focus:border-primary placeholder:text-dark-muted placeholder:opacity-60"
        @keydown.enter="sendMessage"
      />

      <button
        class="w-10 h-10 shrink-0 bg-primary rounded-[10px] text-white flex items-center justify-center transition-all duration-200 hover:bg-primary-hover hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        :disabled="typing"
        aria-label="Send"
        @click="sendMessage"
      >
        <svg v-if="!typing" width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M2 9l14-7-5 7 5 7-14-7z" fill="currentColor" />
        </svg>
        <svg v-else class="animate-spin" width="16" height="16" viewBox="0 0 16 16" fill="none">
          <circle
            cx="8"
            cy="8"
            r="6"
            stroke="currentColor"
            stroke-width="2"
            stroke-dasharray="28"
            stroke-dashoffset="10"
            stroke-linecap="round"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped>
/* Кастомный тонкий скроллбар — Tailwind не умеет это из коробки */
div::-webkit-scrollbar {
  width: 4px;
}
div::-webkit-scrollbar-track {
  background: transparent;
}
div::-webkit-scrollbar-thumb {
  background: rgba(255, 122, 0, 0.2);
  border-radius: 2px;
}
div::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 122, 0, 0.4);
}

.demo-chat {
  background: var(--white);
  border: 1.5px solid var(--border);
  border-radius: 22px;
  overflow: hidden;
  box-shadow: var(--shadow-lg);
}

/* Header */
.chat-header {
  padding: 16px 20px;
  border-bottom: 1px solid var(--border-soft);
  display: flex;
  align-items: center;
  gap: 10px;
  background: var(--light-bg);
}
.chat-avatar {
  width: 38px;
  height: 38px;
  background: linear-gradient(135deg, var(--primary-soft), var(--accent-light));
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  border: 1.5px solid rgba(255, 122, 0, 0.2);
}
.chat-info {
  flex: 1;
}
.chat-name {
  display: block;
  font-family: 'Fraunces', serif;
  font-weight: 700;
  font-size: 14px;
  color: var(--dark);
}
.chat-status {
  font-size: 11px;
  color: var(--primary);
  display: flex;
  align-items: center;
  gap: 5px;
}
.status-dot {
  width: 6px;
  height: 6px;
  background: #22c55e;
  border-radius: 50%;
  animation: pulse 2s infinite;
}
.chat-badge {
  background: var(--primary-soft);
  color: var(--primary);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.1em;
  padding: 3px 8px;
  border-radius: 6px;
  border: 1px solid rgba(255, 122, 0, 0.2);
}

/* Messages */
.chat-messages {
  overflow-y: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  height: 173px;
}
.msg-row {
  display: flex;
}
.msg-row.user {
  justify-content: flex-end;
}
.msg-row.ai {
  justify-content: flex-start;
}

.msg-bubble {
  max-width: 78%;
  padding: 11px 16px;
  border-radius: 14px;
  font-size: 13.5px;
  line-height: 1.55;
}
.msg-row.user .msg-bubble {
  background: var(--primary);
  color: white;
  border-bottom-right-radius: 4px;
}
.msg-row.ai .msg-bubble {
  background: var(--light-bg);
  color: var(--dark);
  border: 1px solid var(--border-soft);
  border-bottom-left-radius: 4px;
}

/* Typing dots */
.msg-bubble.typing {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 14px 18px;
}
.dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--accent-light);
  animation: bounce 1.2s infinite;
}
.dot:nth-child(2) {
  animation-delay: 0.18s;
}
.dot:nth-child(3) {
  animation-delay: 0.36s;
}

/* Result card */
.result-card {
  margin: 0 20px 16px;
  background: var(--primary-soft);
  border: 1.5px solid rgba(255, 122, 0, 0.2);
  border-radius: 14px;
  padding: 16px 18px;
}
.result-header {
  display: flex;
  align-items: center;
  gap: 12px;
}
.result-emoji {
  font-size: 28px;
}
.result-title {
  font-family: 'Fraunces', serif;
  font-weight: 700;
  font-size: 15px;
  color: var(--dark);
}
.result-meta {
  display: flex;
  gap: 14px;
  margin-top: 3px;
}
.result-meta span {
  font-size: 12px;
  color: var(--dark-muted);
}
.result-tag {
  margin-left: auto;
  font-size: 11px;
  font-weight: 500;
  background: var(--primary);
  color: white;
  padding: 3px 10px;
  border-radius: 100px;
  white-space: nowrap;
}
.result-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 12px;
}
.rpill {
  background: white;
  border: 1px solid rgba(255, 122, 0, 0.15);
  color: var(--primary);
  font-size: 12px;
  padding: 3px 11px;
  border-radius: 100px;
}

/* Input */
.chat-input-area {
  padding: 12px 16px;
  border-top: 1px solid var(--border-soft);
  display: flex;
  gap: 8px;
  background: var(--light-bg);
}
.chat-input-area input {
  flex: 1;
  background: var(--white);
  border: 1.5px solid var(--border);
  border-radius: 10px;
  padding: 10px 14px;
  font-size: 13px;
  color: var(--dark);
  font-family: 'DM Sans', sans-serif;
  outline: none;
  transition: border-color 0.2s;
}
.chat-input-area input:focus {
  border-color: var(--primary);
}
.chat-input-area input::placeholder {
  color: var(--dark-muted);
  opacity: 0.6;
}
.send-btn {
  width: 40px;
  height: 40px;
  background: var(--primary);
  border: none;
  border-radius: 10px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition:
    background 0.2s,
    transform 0.2s;
  flex-shrink: 0;
}
.send-btn:hover {
  background: var(--primary-hover);
  transform: scale(1.05);
}

/* Transition */
.slide-up-enter-active {
  transition: all 0.35s ease;
}
.slide-up-enter-from {
  opacity: 0;
  transform: translateY(12px);
}

/* Переопределяем стили markdown-контента внутри пузыря AI.
   :deep() нужен потому что v-html создаёт контент вне scoped-области. */
:deep(.prose p) {
  margin: 0 0 6px;
}
:deep(.prose p:last-child) {
  margin-bottom: 0;
}
:deep(.prose ul),
:deep(.prose ol) {
  padding-left: 16px;
  margin: 4px 0;
}
:deep(.prose li) {
  margin: 2px 0;
}
:deep(.prose strong) {
  font-weight: 600;
  color: #2b2b2b;
}
:deep(.prose code) {
  background: rgba(255, 122, 0, 0.08);
  padding: 1px 5px;
  border-radius: 4px;
  font-size: 12px;
}
:deep(.prose pre) {
  background: rgba(255, 122, 0, 0.06);
  padding: 10px;
  border-radius: 8px;
  overflow-x: auto;
}
:deep(.prose h1),
:deep(.prose h2),
:deep(.prose h3) {
  font-family: 'Fraunces', serif;
  font-weight: 700;
  margin: 8px 0 4px;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(0.75);
  }
}
@keyframes bounce {
  0%,
  60%,
  100% {
    transform: translateY(0);
  }
  30% {
    transform: translateY(-6px);
  }
}
</style>
