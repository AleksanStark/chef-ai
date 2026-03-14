<template>
  <div class="demo-chat">
    <!-- Header -->
    <div class="chat-header">
      <div class="chat-avatar">🤖</div>
      <div class="chat-info">
        <span class="chat-name">FridgeAI Assistant</span>
        <span class="chat-status">
          <span class="status-dot" />
          Online · Qwen AI
        </span>
      </div>
      <span class="chat-badge">AI</span>
    </div>

    <!-- Messages -->
    <div class="chat-messages">
      <div v-for="(msg, i) in visibleMessages" :key="i" class="msg-row" :class="msg.role">
        <div class="msg-bubble" v-html="msg.html" />
      </div>

      <div v-if="typing" class="msg-row ai">
        <div class="msg-bubble typing">
          <span class="dot" /><span class="dot" /><span class="dot" />
        </div>
      </div>
    </div>

    <!-- Recipe result card -->
    <Transition name="slide-up">
      <div v-if="showCard" class="result-card">
        <div class="result-header">
          <span class="result-emoji">{{ currentRecipe.emoji }}</span>
          <div>
            <div class="result-title">{{ currentRecipe.title }}</div>
            <div class="result-meta">
              <span>⏱ {{ currentRecipe.cookTime }} min</span>
              <span>🔥 {{ currentRecipe.calories }} kcal</span>
              <span>💪 {{ currentRecipe.protein }}g protein</span>
            </div>
          </div>
          <span v-if="currentRecipe.tag" class="result-tag">{{ currentRecipe.tag }}</span>
        </div>
        <div class="result-pills">
          <span v-for="ing in currentRecipe.ingredients" :key="ing" class="rpill">{{ ing }}</span>
        </div>
      </div>
    </Transition>

    <!-- Input -->
    <div class="chat-input-area">
      <input
        v-model="inputVal"
        placeholder="What's in your fridge today?"
        @keydown.enter="sendMessage"
      />
      <button class="send-btn" @click="sendMessage" aria-label="Send">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M2 9l14-7-5 7 5 7-14-7z" fill="currentColor" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Recipe } from '@/entities/recipe/model'

interface Message {
  role: 'user' | 'ai'
  html: string
}

const defaultRecipe: Recipe = {
  id: 'default',
  title: 'Broccoli Egg Fried Rice',
  emoji: '🥦',
  calories: 340,
  protein: 24,
  cookTime: 15,
  ingredients: ['🥚 Eggs', '🥦 Broccoli', '🧀 Cheddar', '🧄 Garlic', '🍚 Rice'],
  tag: 'High protein',
}

const DEMO_MESSAGES: Message[] = [
  {
    role: 'user',
    html: 'I have: eggs, cheddar, broccoli, garlic, and leftover rice. I want to lose weight 🥗',
  },
  {
    role: 'ai',
    html: "<strong>Great combo!</strong> Based on your ingredients and goal, here's a high-protein, low-carb option:",
  },
]

const visibleMessages = ref<Message[]>([])
const typing = ref(false)
const showCard = ref(false)
const inputVal = ref('')
const currentRecipe = ref<Recipe>(defaultRecipe)

function delay(ms: number) {
  return new Promise<void>((r) => setTimeout(r, ms))
}

async function playDemo() {
  await delay(800)
  visibleMessages.value.push(DEMO_MESSAGES[0]!)
  await delay(900)
  typing.value = true
  await delay(1400)
  typing.value = false
  visibleMessages.value.push(DEMO_MESSAGES[1]!)
  await delay(600)
  showCard.value = true
}

async function sendMessage() {
  const text = inputVal.value.trim()
  if (!text) return
  inputVal.value = ''
  visibleMessages.value = []
  showCard.value = false

  visibleMessages.value.push({ role: 'user', html: text })
  typing.value = true
  await delay(1200)
  typing.value = false
  visibleMessages.value.push({
    role: 'ai',
    html: '✨ <strong>Interesting!</strong> Let me analyze what you can make with those ingredients...',
  })
  await delay(500)
  showCard.value = true
}

onMounted(playDemo)
</script>

<style scoped>
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
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-height: 150px;
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
