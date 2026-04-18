<template>
  <section class="flex gap-6 p-6 bg-gray-100 min-h-96">
    
    <!-- Upload Box -->
    <div
      class="w-1/2 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center text-center p-8 bg-white hover:border-blue-400 transition cursor-pointer"
      @dragover.prevent
      @drop.prevent="handleDrop"
      @click="triggerFile"
    >
      <Upload class="w-10 h-10 text-gray-500 mb-4" />

      <p class="text-gray-600">
        Drag & drop video here or
        <span class="text-blue-500 font-medium">browse files</span>
      </p>

      <p class="text-sm text-gray-400 mt-2">
        Supported formats: MP4, MOV, AVI
      </p>

      <input
        type="file"
        ref="fileInput"
        class="hidden"
        accept="video/*"
        @change="handleFile"
      />
    </div>

    <!-- Video Preview -->
    <div class="w-1/2 bg-white rounded-xl border border-gray-200 flex flex-col justify-between">
      
      <!-- Preview Area -->
      <div class="flex-1 flex items-center justify-center">
        <div v-if="!videoUrl" class="text-center text-gray-400">
          <PlayCircle class="w-12 h-12 mx-auto mb-2" />
          <p>Video Preview</p>
        </div>

        <video
          v-else
          ref="videoRef"
          :src="videoUrl"
          class="w-full h-full rounded-t-xl"
          @timeupdate="updateTime"
          @loadedmetadata="setDuration"
        />
      </div>

      <!-- Controls -->
      <div class="flex items-center justify-between px-4 py-3 border-t">
        
        <div class="flex items-center gap-3">
          <Volume2 class="w-5 h-5 cursor-pointer" @click="toggleMute" />

          <!-- ✅ Skip Back -->
          <SkipBack class="w-5 h-5 cursor-pointer" @click="skipback" />

          <button
            class="bg-blue-500 text-white p-2 rounded-full"
            @click="togglePlay"
          >
            <Play v-if="!isPlaying" class="w-5 h-5" />
            <Pause v-else class="w-5 h-5" />
          </button>

          <SkipForward class="w-5 h-5 cursor-pointer" @click="skipForward" />
        </div>

        <div class="text-sm text-gray-500">
          {{ currentTime }} / {{ duration }}
        </div>

        <Maximize class="w-5 h-5 cursor-pointer" @click="fullscreen" />
      </div>

    </div>

  </section>
</template>

<script setup>
import { ref } from "vue";
import {
  Upload,
  Play,
  Pause,
  PlayCircle,
  Volume2,
  SkipForward,
  SkipBack,
  Maximize
} from "lucide-vue-next";

const fileInput = ref(null);
const videoRef = ref(null);

const videoUrl = ref(null);
const isPlaying = ref(false);

const currentTime = ref("00:00");
const duration = ref("00:00");

// Format time helper
const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
};

// Trigger file input
const triggerFile = () => {
  fileInput.value.click();
};

// Handle file select
const handleFile = (e) => {
  const file = e.target.files[0];
  if (file) {
    videoUrl.value = URL.createObjectURL(file);
  }
};

// Handle drag drop
const handleDrop = (e) => {
  const file = e.dataTransfer.files[0];
  if (file) {
    videoUrl.value = URL.createObjectURL(file);
  }
};

// Play / Pause
const togglePlay = () => {
  const video = videoRef.value;
  if (!video) return;

  if (video.paused) {
    video.play();
    isPlaying.value = true;
  } else {
    video.pause();
    isPlaying.value = false;
  }
};

// Mute toggle
const toggleMute = () => {
  const video = videoRef.value;
  if (video) video.muted = !video.muted;
};

// Skip forward
const skipForward = () => {
  const video = videoRef.value;
  if (video) video.currentTime += 5;
};

// ✅ Skip back
const skipback = () => {
  const video = videoRef.value;
  if (video) {
    video.currentTime = Math.max(0, video.currentTime - 5);
  }
};

// Fullscreen
const fullscreen = () => {
  const video = videoRef.value;
  if (video) video.requestFullscreen();
};

// Update current time
const updateTime = () => {
  const video = videoRef.value;
  if (video) {
    currentTime.value = formatTime(video.currentTime);
  }
};

// Set duration
const setDuration = () => {
  const video = videoRef.value;
  if (video) {
    duration.value = formatTime(video.duration);
  }
};
</script>