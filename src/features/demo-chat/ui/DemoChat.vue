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
        <span class="block font-display font-bold text-[14px] text-dark"
          >FridgeAI Assistant</span
        >
        <span class="flex items-center gap-1.5 text-[11px] text-primary">
          <span
            class="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse-brand"
          />
          Online · Qwen AI
        </span>
      </div>
      <span
        class="bg-primary-soft text-primary text-[10px] font-bold tracking-[0.1em] px-2 py-0.5 rounded-md border border-[rgba(255,122,0,0.2)]"
      >
        AI
      </span>
    </div>

    <!-- Messages container — ref для автоскролла -->
    <div
      ref="messagesRef"
      class="px-5 py-5 flex flex-col gap-3 overflow-y-auto"
      style="height: 173px; scroll-behavior: smooth"
    >
      <div
        v-for="(msg, i) in visibleMessages"
        :key="i"
        class="flex"
        :class="msg.role === 'user' ? 'justify-end' : 'justify-start'"
      >
        <!--
          Явный закрывающий тег </div> обязателен при использовании v-html.
          Self-closing <div /> с v-html поглощает следующие узлы как дочерние.
        -->
        <div
          v-if="msg.role === 'user'"
          class="max-w-[78%] px-4 py-[11px] rounded-[14px] text-[13.5px] leading-[1.55] bg-primary text-white rounded-br-[4px]"
          :class="msg.role === 'user' ? '' : ''"
        >
          {{ msg.html }}
        </div>
        <div
          v-else
          class="max-w-[78%] px-4 py-[11px] rounded-[14px] text-[13.5px] leading-[1.55] rounded-br-[4px] bg-light-bg text-dark border border-[rgba(255,122,0,0.08)] rounded-bl-[4px]"
          v-html="renderMarkdown(msg.html)"
        ></div>
      </div>

      <!-- Typing indicator — показывается пока AI думает -->
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
      <div class="flex items-center gap-4">
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
          class="flex items-center justify-center w-12 h-12 rounded-xl border-2 border-dashed border-gray-300 hover:border-[#FF9A2F] hover:bg-[#FFE8D1] transition-all cursor-pointer group"
          title="Загрузить фото продуктов"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6 text-gray-400 group-hover:text-[#E96F00]"
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
          <img
            :src="selectedImage"
            class="w-full h-full object-cover rounded-lg border"
          />
          <button
            @click="selectedImage = null"
            class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-4 h-4 text-[10px] flex items-center justify-center"
          >
            ✕
          </button>
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
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M2 9l14-7-5 7 5 7-14-7z" fill="currentColor" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from "vue";
import { fetchCompletion, imageToBase64 } from "@/features/ai";
import { marked } from "marked";

interface Message {
  role: "user" | "ai";
  html: string;
}

const visibleMessages = ref<Message[]>([]);
const typing = ref(false);
const inputVal = ref("");

const fileInput = ref<HTMLInputElement | null>(null);
const selectedImage = ref<string | null>(null);

const triggerFileInput = () => {
  fileInput.value?.click();
};

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];

  if (file) {
    // Создаем превью для проверки (опционально)
    selectedImage.value = URL.createObjectURL(file);
    console.log("Выбран файл:", file.name);
  }
};

// ref на DOM-контейнер сообщений — нужен для программного скролла
const messagesRef = ref<HTMLElement | null>(null);
const renderMarkdown = (text: string) => {
  return marked.parse(text);
};

/**
 * Плавно прокручивает список сообщений до самого низа.
 * Вызывается через nextTick — чтобы DOM уже успел обновиться
 * и scrollHeight отражал высоту с новым сообщением.
 */
async function scrollToBottom() {
  await nextTick();
  if (messagesRef.value) {
    messagesRef.value.scrollTo({
      top: messagesRef.value.scrollHeight,
      behavior: "smooth",
    });
  }
}

async function sendMessage() {
  const text = inputVal.value.trim();
  const file = fileInput.value?.files?.[0];
  // Блокируем повторную отправку пока AI отвечает
  if ((!text && !file) || typing.value) return;

  // ── Шаг 1: очищаем поле немедленно ──────────────────────────
  inputVal.value = "";

  // ── Шаг 2: показываем сообщение пользователя СРАЗУ ──────────
  // Раньше оно добавлялось после ответа AI — поэтому "исчезало".
  // Теперь push происходит ДО вызова fetchCompletion.
  visibleMessages.value.push({ role: "user", html: text || "Анализ картинки" });

  // ── Шаг 3: скроллим к сообщению пользователя ────────────────
  await scrollToBottom();

  // ── Шаг 4: включаем typing-индикатор ────────────────────────
  typing.value = true;

  // ── Шаг 5: скроллим к typing-индикатору ─────────────────────
  await scrollToBottom();

  try {
    let base64Data: string | undefined = undefined;
    if (file) {
      base64Data = await imageToBase64(file);
    }
    const completion = await fetchCompletion(text, base64Data);

    // ── Шаг 6: убираем typing, добавляем ответ AI ───────────────
    typing.value = false;
    visibleMessages.value.push({
      role: "ai",
      html: completion ?? "⚠️ No response from AI.",
    });

    // ── Шаг 7: скроллим к ответу AI ─────────────────────────────
    await scrollToBottom();
  } catch (e) {
    console.error(e);
    typing.value = false;
    visibleMessages.value.push({
      role: "ai",
      html: "⚠️ <strong>Something went wrong.</strong> Please try again.",
    });
    await scrollToBottom();
  }
}
</script>

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
  font-family: "Fraunces", serif;
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
  font-family: "Fraunces", serif;
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
  font-family: "DM Sans", sans-serif;
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
