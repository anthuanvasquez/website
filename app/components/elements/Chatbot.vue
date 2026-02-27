<script setup lang="ts">
import { Dialog, DialogPanel } from '@headlessui/vue';
import {
  ChatBubbleLeftRightIcon,
  XMarkIcon,
  PaperAirplaneIcon,
  UserIcon,
  ComputerDesktopIcon,
} from '@heroicons/vue/24/outline';
import { generateSessionToken } from '~/utils/chatSession';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const { $i18n } = useNuxtApp();
const { t } = useI18n();
const isOpen = ref(false);
const showNotification = ref(false);
const isLoading = ref(false);
const messages = ref<Message[]>([]);
const currentMessage = ref('');
const welcomeMessage = computed(() => t('chatbot.welcome'));
const placeholderText = computed(() => t('chatbot.placeholder'));
const chatbotTitle = computed(() => t('chatbot.title'));
const errorMessage = computed(() => t('chatbot.error'));

// Initialize with welcome message
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
      content: t('chat-description'),
      isUser: false,
      timestamp: new Date(),
    },
  ];

  // Show the welcome bubble after 2 seconds
  setTimeout(() => {
    // Only show if the user hasn't opened the chat yet
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
    locale: string;
  }

  try {
    const sessionToken = await generateSessionToken();
    const response = await $fetch<ChatResponse>('/api/chatbot/chat', {
      method: 'POST',
      body: {
        message: messageToSend,
        locale: $i18n.locale.value,
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

// Auto-scroll to bottom when new message is added
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

// Typewriter Effect Logic for Notification Bubble
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

// Start typewriter effect when notification is shown
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
  <!-- Floating Chat Button & Notification -->
  <div
    class="fixed right-6 bottom-6 z-50 flex items-end gap-3 transition-all duration-300"
    :class="{ 'pointer-events-none translate-y-4 opacity-0': isOpen }"
  >
    <!-- Notification Bubble -->
    <button
      v-if="showNotification"
      class="group relative mb-2 flex h-12 items-center gap-2 rounded-2xl bg-white px-4 shadow-xl ring-1 ring-black/5 transition-transform hover:scale-105"
      @click="
        isOpen = true;
        showNotification = false;
      "
    >
      <p
        class="text-sm font-medium whitespace-nowrap text-[var(--color-tertiary)] transition-colors group-hover:text-[var(--color-primary)]"
      >
        {{ currentNotificationText }}<span class="animate-pulse">|</span>
      </p>
      <!-- Tail pointing right -->
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
        class="rounded-full bg-blue-600 p-4 text-white shadow-lg transition-all duration-300 hover:scale-110 hover:bg-blue-700"
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
        class="flex h-96 w-full max-w-md flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
      >
        <!-- Header -->
        <div
          class="flex items-center justify-between bg-gradient-to-r from-blue-600 to-blue-700 p-4 text-white"
        >
          <div class="flex items-center space-x-2">
            <UIcon name="i-lucide-bot" class="h-6 w-6" />
            <h3 class="font-semibold">
              {{ chatbotTitle }}
            </h3>
          </div>
          <button
            class="text-white transition-colors hover:text-gray-200"
            @click="isOpen = false"
          >
            <XMarkIcon class="h-5 w-5" />
          </button>
        </div>

        <!-- Messages -->
        <div
          ref="messagesContainer"
          class="flex-1 space-y-4 overflow-y-auto bg-gray-50 p-4"
        >
          <div
            v-for="message in messages"
            :key="message.id"
            class="flex"
            :class="message.isUser ? 'justify-end' : 'justify-start'"
          >
            <div class="flex max-w-xs items-start space-x-2">
              <div
                v-if="!message.isUser"
                class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-600"
              >
                <UIcon name="i-lucide-bot" class="h-4 w-4 text-white" />
              </div>

              <div
                class="rounded-2xl px-4 py-2 text-sm"
                :class="
                  message.isUser
                    ? 'rounded-br-md bg-blue-600 text-white'
                    : 'rounded-bl-md bg-white text-gray-800 shadow-sm'
                "
              >
                {{ message.content }}
              </div>

              <div
                v-if="message.isUser"
                class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gray-400"
              >
                <UserIcon class="h-4 w-4 text-white" />
              </div>
            </div>
          </div>

          <!-- Loading indicator -->
          <div v-if="isLoading" class="flex justify-start">
            <div class="flex items-start space-x-2">
              <div
                class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-600"
              >
                <ComputerDesktopIcon class="h-4 w-4 text-white" />
              </div>
              <div
                class="rounded-2xl rounded-bl-md bg-white px-4 py-2 text-gray-800 shadow-sm"
              >
                <div class="flex space-x-1">
                  <div
                    class="h-2 w-2 animate-bounce rounded-full bg-gray-400"
                  ></div>
                  <div
                    class="h-2 w-2 animate-bounce rounded-full bg-gray-400"
                    style="animation-delay: 0.1s"
                  ></div>
                  <div
                    class="h-2 w-2 animate-bounce rounded-full bg-gray-400"
                    style="animation-delay: 0.2s"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Input -->
        <div class="border-t bg-white p-4 text-gray-800">
          <div class="flex space-x-2">
            <textarea
              v-model="currentMessage"
              :placeholder="placeholderText"
              class="flex-1 resize-none rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
              rows="2"
              :disabled="isLoading"
              @keypress="handleKeyPress"
            ></textarea>
            <button
              :disabled="!currentMessage.trim() || isLoading"
              class="flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
              @click="sendMessage"
            >
              <PaperAirplaneIcon class="h-4 w-4" />
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
