<script setup lang="ts">
import { Dialog, DialogPanel } from '@headlessui/vue';
import {
  ChatBubbleLeftRightIcon,
  XMarkIcon,
  PaperAirplaneIcon,
} from '@heroicons/vue/24/outline';
import { generateSessionToken } from '~/utils/chatSession';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

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

  interface ChatResponse {
    success: boolean;
    response: string;
  }

  try {
    const sessionToken = await generateSessionToken();
    const response = await $fetch<ChatResponse>('/api/chatbot/chat', {
      method: 'POST',
      body: {
        message: messageToSend,
        sessionToken,
      },
    });

    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      content: response.response,
      isUser: false,
      timestamp: new Date(),
    };

    messages.value.push(botMessage);
  } catch (error) {
    // eslint-disable-next-line no-console
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

const handleKeyPress = (event: KeyboardEvent) => {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    sendMessage();
  }
};

const messagesContainer = ref<HTMLElement>();

watch(
  messages,
  () => {
    nextTick(() => {
      if (messagesContainer.value) {
        messagesContainer.value.scrollTop =
          messagesContainer.value.scrollHeight;
      }
    });
  },
  { deep: true }
);

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

let typewriterTimeout: NodeJS.Timeout;

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
      class="group relative mb-2 flex h-12 items-center gap-2 rounded-2xl bg-white px-4 shadow-xl ring-1 ring-black/5 transition-transform hover:scale-105"
      @click="
        isOpen = true;
        showNotification = false;
      "
    >
      <p
        class="text-tertiary group-hover:text-primary text-sm font-medium whitespace-nowrap transition-colors"
      >
        {{ currentNotificationText }}<span class="animate-pulse">|</span>
      </p>

      <div
        class="absolute -right-1.5 bottom-4 h-3 w-3 rotate-45 rounded-sm bg-white ring-1 ring-black/5"
      ></div>
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
        class="rounded-full bg-(--color-primary) p-4 text-white shadow-lg transition-all duration-300 hover:scale-110 hover:bg-(--color-secondary)"
        @click="
          isOpen = true;
          showNotification = false;
        "
      >
        <ChatBubbleLeftRightIcon class="h-6 w-6" />
      </button>
    </div>
  </div>

  <!-- Chat Dialog -->
  <Dialog :open="isOpen" class="relative z-50" @close="isOpen = false">
    <div class="fixed inset-0 flex items-end justify-end p-4 sm:p-6">
      <DialogPanel
        class="flex h-[32rem] w-full max-w-md flex-col overflow-hidden rounded-2xl border border-white/10 bg-(--surface-base) shadow-2xl ring-1 ring-white/5"
      >
        <!-- Header -->
        <div
          class="flex items-center justify-between border-b border-white/5 bg-linear-to-r from-(--surface-elevated) to-(--surface-float) p-4 text-(--text-primary)"
        >
          <div class="flex items-center space-x-3">
            <div
              class="rounded-lg bg-(--color-primary)/10 p-2 ring-1 ring-(--color-primary)/20"
            >
              <UIcon name="i-lucide-bot" class="h-5 w-5 text-(--color-primary)" />
            </div>
            <div>
              <h3 class="font-firacode text-sm font-bold tracking-tight">
                {{ chatbotTitle }}
              </h3>
              <p
                class="text-[10px] tracking-widest dark:text-(--color-tertiary) uppercase"
              >
                AI Assistant • Online
              </p>
            </div>
          </div>
          <button
            class="rounded-lg p-1 text-slate-400 transition-colors hover:bg-white/5 hover:text-(--text-primary)"
            @click="isOpen = false"
          >
            <XMarkIcon class="h-5 w-5" />
          </button>
        </div>

        <!-- Messages -->
        <div
          ref="messagesContainer"
          class="flex-1 space-y-4 overflow-y-auto bg-(--surface-base) p-4"
        >
          <div
            v-for="message in messages"
            :key="message.id"
            class="flex"
            :class="message.isUser ? 'justify-end' : 'justify-start'"
          >
            <div class="flex max-w-[85%] items-end space-x-2">
              <div
                v-if="!message.isUser"
                class="mb-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border border-(--color-primary)/20 bg-(--color-primary)/10 shadow-sm"
              >
                <UIcon
                  name="i-lucide-bot"
                  class="h-3.5 w-3.5 text-(--color-primary)"
                />
              </div>

              <div
                class="px-4 py-2.5 text-sm leading-relaxed"
                :class="
                  message.isUser
                    ? 'rounded-2xl rounded-br-sm bg-(--color-primary) font-semibold text-(--surface-base)'
                    : 'rounded-2xl rounded-bl-sm border border-white/5 bg-(--surface-elevated) text-(--text-primary)'
                "
              >
                {{ message.content }}
              </div>
            </div>
          </div>

          <!-- Loading indicator -->
          <div v-if="isLoading" class="flex justify-start">
            <div class="flex items-end space-x-2">
              <div
                class="mb-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border border-(--color-primary)/20 bg-(--color-primary)/10"
              >
                <UIcon
                  name="i-lucide-bot"
                  class="h-3.5 w-3.5 text-(--color-primary)"
                />
              </div>
              <div
                class="rounded-2xl rounded-bl-sm border border-white/5 bg-(--surface-elevated) px-4 py-3"
              >
                <div class="flex space-x-1.5">
                  <div
                    class="h-1.5 w-1.5 animate-bounce rounded-full bg-(--color-primary)/40"
                  ></div>
                  <div
                    class="h-1.5 w-1.5 animate-bounce rounded-full bg-(--color-primary)/40"
                    style="animation-delay: 0.2s"
                  ></div>
                  <div
                    class="h-1.5 w-1.5 animate-bounce rounded-full bg-(--color-primary)/40"
                    style="animation-delay: 0.4s"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Input -->
        <div class="border-t border-white/5 bg-(--surface-elevated) p-4">
          <div class="relative flex items-center gap-2">
            <textarea
              v-model="currentMessage"
              :placeholder="placeholderText"
              class="focus:border-(--color-primary)/50 focus:ring-(--color-primary)/20 max-h-32 min-h-[44px] w-full flex-1 resize-none rounded-xl border border-white/10 bg-(--surface-base) px-4 py-2.5 text-sm text-(--text-primary) placeholder-slate-500 transition-all focus:ring-1 focus:outline-none disabled:opacity-50"
              rows="1"
              :disabled="isLoading"
              @keypress="handleKeyPress"
            ></textarea>
            <button
              :disabled="!currentMessage.trim() || isLoading"
              class="hover:bg-(--color-secondary) flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-(--color-primary) text-(--surface-base) transition-all hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:bg-(--surface-float) disabled:text-(--text-tertiary) disabled:opacity-50"
              @click="sendMessage"
            >
              <PaperAirplaneIcon class="h-5 w-5" />
            </button>
          </div>
        </div>
      </DialogPanel>
    </div>
  </Dialog>
</template>

<style scoped>
.animate-bounce {
  animation: bounce 1.4s infinite;
}

@keyframes bounce {
  0%,
  80%,
  100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-6px);
  }
}
</style>
