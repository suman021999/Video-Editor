<template>
  <section class="flex flex-col md:flex-row gap-6 px-4 md:p-6 bg-gray-100 min-h-96">

    <!-- LEFT PANEL: switches based on activeTool -->
    <div class="w-full md:w-1/2">

      <!-- UPLOAD panel (default or when activeTool === 'upload') -->
      <div
        v-if="!activeTool || activeTool === 'upload'"
        class="h-full border-2 border-dashed border-blue-300 rounded-xl flex flex-col items-center justify-center text-center p-6 md:p-8 bg-white hover:border-blue-400 transition cursor-pointer"
        @dragover.prevent
        @drop.prevent="handleDrop"
        @click="triggerFile"
      >
        <Upload class="w-8 h-8 md:w-10 md:h-10 text-gray-500 mb-3 md:mb-4" />
        <p class="text-gray-600 text-sm md:text-base">
          Drag & drop video here or
          <span class="text-blue-500 font-medium">browse files</span>
        </p>
        <p class="text-xs md:text-sm text-gray-400 mt-2">
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

      <!-- TEXT panel -->
      

      <!-- EFFECTS panel -->
     
    </div>

    <!-- RIGHT PANEL: Video Preview (always visible) -->
    <div class="w-full md:w-1/2 bg-white rounded-xl border border-gray-200 flex flex-col justify-between">

      <!-- Preview Area -->
      <div class="flex-1 flex items-center justify-center min-h-50 md:min-h-75">
        <div v-if="!videoUrl" class="text-center text-gray-400">
          <PlayCircle class="w-10 h-10 md:w-12 md:h-12 mx-auto mb-2" />
          <p class="text-sm md:text-base">Video Preview</p>
        </div>

        <video
          v-else
          ref="videoRef"
          :src="videoUrl"
          class="w-full h-full object-contain rounded-t-xl"
          @timeupdate="updateTime"
          @loadedmetadata="setDuration"
        />
      </div>

      <!-- Controls -->
      <div class="flex flex-wrap items-center justify-between gap-3 px-3 md:px-4 py-3 border-t">

        <div class="flex items-center gap-3 flex-wrap">
          <Volume2 class="w-5 h-5 cursor-pointer" @click="toggleMute" />
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

        <div class="text-xs md:text-sm text-gray-500">
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

const props = defineProps({
  activeTool: {
    type: String,
    default: null
  }
});

// ── File / Video ──────────────────────────────────────
const fileInput = ref(null);
const videoRef  = ref(null);
const videoUrl  = ref(null);
const isPlaying = ref(false);
const currentTime = ref("00:00");
const duration    = ref("00:00");

const formatTime = (time) => {
  const m = Math.floor(time / 60);
  const s = Math.floor(time % 60);
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
};

const triggerFile = () => fileInput.value.click();

const handleFile = (e) => {
  const file = e.target.files[0];
  if (file) videoUrl.value = URL.createObjectURL(file);
};

const handleDrop = (e) => {
  const file = e.dataTransfer.files[0];
  if (file) videoUrl.value = URL.createObjectURL(file);
};

const togglePlay = () => {
  const v = videoRef.value;
  if (!v) return;
  if (v.paused) { v.play(); isPlaying.value = true; }
  else          { v.pause(); isPlaying.value = false; }
};

const toggleMute  = () => { if (videoRef.value) videoRef.value.muted = !videoRef.value.muted; };
const skipForward = () => { if (videoRef.value) videoRef.value.currentTime += 5; };
const skipback    = () => { if (videoRef.value) videoRef.value.currentTime = Math.max(0, videoRef.value.currentTime - 5); };
const fullscreen  = () => { if (videoRef.value) videoRef.value.requestFullscreen(); };
const updateTime  = () => { if (videoRef.value) currentTime.value = formatTime(videoRef.value.currentTime); };
const setDuration = () => { if (videoRef.value) duration.value = formatTime(videoRef.value.duration); };


</script>