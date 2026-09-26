<script setup lang="ts">
import { generateSessionToken } from '~/utils/chatSession';
import type { ChatMessage as Message, ChatResponse } from '~/types';

const isOpen = ref(false);
const showNotification = ref(false);
const isLoading = ref(false);
const messages = ref<Message[]>([]);
const currentMessage = ref('');
const welcomeMessage = computed(
  () => 'Hi! I am the Anthuan AI assistant. How can I help you today?'
);
const placeholderText = computed(() => 'Type your message...');
const chatbotTitle = computed(() => 'Anthuan Assistant');
const errorMessage = computed(
  () => 'Oops! Something went wrong. Please try again later.'
);

onMounted(() => {
  messages.value = [
    {
      id: '1',
      content: welcomeMessage.value,
      isUser: false,
      timestamp: new Date(),
    },
    {
      id: '2',
      content:
        "I am trained on Anthuan's resume, blog, and projects. Ask me anything!",
      isUser: false,
      timestamp: new Date(),
    },
  ];

  setTimeout(() => {
    if (!isOpen.value) {
      showNotification.value = true;
    }
  }, 2000);
});

const activeSessionToken = ref('');

const getSessionToken = async (): Promise<string> => {
  if (!activeSessionToken.value) {
    activeSessionToken.value = await generateSessionToken();
  }
  return activeSessionToken.value;
};

const sendMessage = async () => {
  if (!currentMessage.value.trim() || isLoading.value) return;

  const userMessage: Message = {
    id: Date.now().toString(),
    content: currentMessage.value,
    isUser: true,
    timestamp: new Date(),
  };

  messages.value.push(userMessage);
  const messageToSend = currentMessage.value;
  currentMessage.value = '';
  isLoading.value = true;

  try {
    let sessionToken = await getSessionToken();
    let response: ChatResponse;

    try {
      response = await $fetch<ChatResponse>('/api/chatbot/chat', {
        method: 'POST',
        body: {
          message: messageToSend,
          sessionToken,
        },
      });
    } catch (err: unknown) {
      // If token expired (401), refresh once and retry
      const statusCode = (err as { statusCode?: number })?.statusCode;
      if (statusCode === 401) {
        sessionToken = await generateSessionToken();
        activeSessionToken.value = sessionToken;
        response = await $fetch<ChatResponse>('/api/chatbot/chat', {
          method: 'POST',
          body: {
            message: messageToSend,
            sessionToken,
          },
        });
      } else {
        throw err;
      }
    }

    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      content: response.response,
      isUser: false,
      timestamp: new Date(),
    };

    messages.value.push(botMessage);
  } catch (error) {
    console.error('Chat error:', error);

    const errorResponse: Message = {
      id: (Date.now() + 1).toString(),
      content: errorMessage.value,
      isUser: false,
      timestamp: new Date(),
    };

    messages.value.push(errorResponse);
  } finally {
    isLoading.value = false;
  }
};

const uiMessages = computed(() =>
  messages.value.map((msg) => ({
    id: msg.id,
    role: (msg.isUser ? 'user' : 'assistant') as 'user' | 'assistant',
    parts: [{ type: 'text' as const, text: msg.content }],
    content: msg.content,
  }))
);

const chatStatus = computed(() => (isLoading.value ? 'submitted' : 'ready'));

const notificationMessages = [
  '👋 Psst... what does my AI know about me?',
  '🤖 Ask my AI about my tech stack...',
  '✨ Get instant answers about my work!',
];
const currentNotificationText = ref('');
const notificationIndex = ref(0);
const textIndex = ref(0);
const isDeleting = ref(false);
const typewriterSpeed = computed(() => (isDeleting.value ? 50 : 100));
const pauseDelay = 2000;

let typewriterTimeout: ReturnType<typeof setTimeout> | undefined;

const typeText = () => {
  const currentFullText = notificationMessages[notificationIndex.value];

  if (!currentFullText) return;

  if (isDeleting.value) {
    currentNotificationText.value = currentFullText.substring(
      0,
      textIndex.value - 1
    );
    textIndex.value--;
  } else {
    currentNotificationText.value = currentFullText.substring(
      0,
      textIndex.value + 1
    );
    textIndex.value++;
  }

  let nextSpeed = typewriterSpeed.value;

  if (!isDeleting.value && currentNotificationText.value === currentFullText) {
    nextSpeed = pauseDelay;
    isDeleting.value = true;
  } else if (isDeleting.value && currentNotificationText.value === '') {
    isDeleting.value = false;
    notificationIndex.value =
      (notificationIndex.value + 1) % notificationMessages.length;
    nextSpeed = 500;
  }

  typewriterTimeout = setTimeout(typeText, nextSpeed);
};

watch(showNotification, (newVal) => {
  if (newVal) {
    typeText();
  } else {
    clearTimeout(typewriterTimeout);
  }
});

onUnmounted(() => {
  clearTimeout(typewriterTimeout);
});
</script>

<template>
  <div
    class="fixed right-6 bottom-6 z-50 flex items-end gap-3 transition-all duration-300"
    :class="{ 'pointer-events-none translate-y-4 opacity-0': isOpen }"
  >
    <button
      v-if="showNotification"
      data-testid="chatbot-notification"
      class="group relative mb-2 flex h-12 items-center gap-2 rounded-2xl bg-white px-4 shadow-xl ring-1 ring-black/5 transition-transform hover:scale-105"
      @click="
        isOpen = true;
        showNotification = false;
      "
    >
      <span
        class="text-tertiary group-hover:text-primary text-sm font-medium whitespace-nowrap transition-colors"
      >
        {{ currentNotificationText }}<span class="animate-pulse">|</span>
      </span>

      <span
        class="absolute -right-1.5 bottom-4 block h-3 w-3 rotate-45 rounded-sm bg-white ring-1 ring-black/5"
      ></span>
    </button>

    <!-- Chat Trigger -->
    <div class="relative">
      <!-- Active Green Dot Indicator -->
      <span class="absolute top-0 right-0 z-10 flex h-3.5 w-3.5">
        <span
          class="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"
        ></span>
        <span
          class="relative inline-flex h-3.5 w-3.5 rounded-full border-2 border-white bg-green-500"
        ></span>
      </span>
      <button
        data-testid="chatbot-trigger"
        class="bg-primary hover:bg-secondary focus-visible:ring-primary inline-flex rounded-full p-4 text-white shadow-lg transition-all duration-300 hover:scale-110 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
        aria-label="Open AI assistant"
        :aria-expanded="isOpen"
        aria-haspopup="dialog"
        @click="
          isOpen = true;
          showNotification = false;
        "
      >
        <UIcon
          name="i-lucide-messages-square"
          class="size-6"
          aria-hidden="true"
        />
      </button>
    </div>
  </div>

  <!-- Chat Dialog using Nuxt UI Modal -->
  <UModal
    v-model:open="isOpen"
    :overlay="false"
    :close="false"
    :ui="{
      content:
        'fixed bottom-4 right-4 sm:bottom-6 sm:right-6 !top-auto !left-auto !translate-x-0 !translate-y-0 h-[32rem] w-[calc(100vw-2rem)] sm:w-full max-w-md flex flex-col overflow-hidden rounded-2xl border border-white/10 shadow-2xl ring-1 ring-white/5 bg-surface-base p-0',
    }"
  >
    <template #content>
      <div class="flex h-full w-full flex-col overflow-hidden">
        <!-- Header -->
        <div
          class="from-surface-elevated to-surface-float text-text-primary flex items-center justify-between border-b border-white/5 bg-linear-to-r p-4"
        >
          <div class="flex items-center space-x-3">
            <div
              class="bg-primary/10 ring-primary/20 inline-flex rounded-lg p-2 ring-1"
            >
              <UIcon
                name="i-lucide-bot"
                class="text-primary h-5 w-5"
                aria-hidden="true"
              />
            </div>
            <div>
              <h3 class="font-firacode text-sm font-bold tracking-tight">
                {{ chatbotTitle }}
              </h3>
              <p
                class="dark:text-tertiary text-[10px] tracking-widest uppercase"
              >
                AI Assistant • Online
              </p>
            </div>
          </div>
          <button
            class="hover:text-text-primary focus-visible:ring-primary rounded-lg p-1 text-slate-400 transition-colors hover:bg-white/5 focus-visible:ring-2 focus-visible:outline-none"
            aria-label="Close chat"
            @click="isOpen = false"
          >
            <UIcon name="i-lucide-x" class="size-5" aria-hidden="true" />
          </button>
        </div>

        <!-- Messages using Nuxt UI ChatMessages -->
        <UChatMessages
          :messages="uiMessages"
          :status="chatStatus"
          class="bg-surface-base flex-1 overflow-y-auto p-4"
          :user="{ side: 'right', variant: 'soft', color: 'primary' }"
          :assistant="{ side: 'left', variant: 'subtle', icon: 'i-lucide-bot' }"
        />

        <!-- Input using Nuxt UI ChatPrompt -->
        <div class="bg-surface-elevated border-t border-white/5 p-4">
          <UChatPrompt
            v-model="currentMessage"
            data-testid="chatbot-input"
            aria-label="Chat message"
            :placeholder="placeholderText"
            :disabled="isLoading"
            :rows="1"
            :autoresize="true"
            variant="naked"
            class="bg-surface-base rounded-xl border border-white/10"
            @submit="sendMessage"
          >
            <template #footer>
              <div class="flex w-full justify-end">
                <UChatPromptSubmit
                  data-testid="chatbot-send"
                  aria-label="Send message"
                  :status="chatStatus"
                  :disabled="!currentMessage.trim() || isLoading"
                  color="primary"
                  variant="solid"
                  class="rounded-xl"
                  @click="sendMessage"
                />
              </div>
            </template>
          </UChatPrompt>
        </div>
      </div>
    </template>
  </UModal>
</template>
