<template>
  <div class="w-full bg-gray-100 p-4 rounded-xl">
    <!-- Header -->
    <div class="flex items-center justify-between mb-2">
      <h2 class="text-sm font-semibold text-gray-700">Timeline</h2>

      <div class="flex gap-2">
        <Search class="w-4 h-4 text-gray-500 cursor-pointer" />
        <ZoomIn class="w-4 h-4 text-gray-500 cursor-pointer" />
      </div>
    </div>

    <!-- Timeline -->
    <div
      ref="timelineRef"
      class="relative bg-gray-50 border rounded-lg overflow-hidden"
      @click="movePlayhead"
    >
      <!-- Time markers -->
      <div class="flex text-[10px] text-gray-400 px-16 py-1">
        <div v-for="t in times" :key="t" class="flex-1 text-center">
          {{ t }}
        </div>
      </div>

      <div class="space-y-2 pb-4">
        <!-- VIDEO -->
        <div class="flex items-center">
          <div class="w-16 text-xs text-gray-500 pl-2">Video</div>
          <div class="flex-1 relative h-10 bg-gray-100 rounded-md mx-4">
            <div
              class="absolute h-8 top-1 rounded-md px-4 flex items-center text-xs bg-indigo-200"
              :style="getStyle(0, 60)"
            >
              Main_Sequence_V1.mp4
            </div>
          </div>
        </div>

        <!-- AUDIO 1 -->
        <div class="flex items-center">
          <div class="w-16 text-xs text-gray-500 pl-2">Audio 1</div>
          <div class="flex-1 relative h-10 bg-gray-100 rounded-md mx-4">
            <div
              class="absolute h-8 top-1 rounded-md px-2 flex items-center text-xs bg-yellow-200"
              :style="getStyle(0, 60)"
            >
              Camera_Mic_Original
            </div>
          </div>
        </div>

        <!-- AUDIO 2 -->
        <div class="flex items-center">
          <div class="w-16 text-xs text-gray-500 pl-2">Soundtrack</div>
          <div class="flex-1 relative h-10 bg-gray-100 rounded-md mx-4">
            <div
              class="absolute h-8 top-1 rounded-md px-2 flex items-center text-xs bg-green-200"
              :style="getStyle(15, 45)"
            >
              Upbeat_Lofi_Background.mp3
            </div>
          </div>
        </div>

        <!-- TEXT TRACK -->
        <div class="flex items-center">
          <div class="w-16 text-xs text-gray-500 pl-2">Text</div>
          <div class="flex-1 relative h-10 bg-gray-100 rounded-md mx-4">
            
            <div
              v-for="(clip, i) in textClips"
              :key="i"
              class="absolute h-8 top-1 rounded-md px-2 flex items-center text-xs bg-pink-200"
              :style="getStyle(clip.start, clip.duration)"
            >
              {{ clip.text }}
            </div>

          </div>
        </div>
      </div>

      <!-- Playhead -->
      <div
        class="absolute top-0 bottom-0 w-0.5 bg-red-500"
        :style="{ left: playhead + 'px' }"
      >
        <div class="w-3 h-3 bg-red-500 rounded-full -ml-1.25 -mt-1"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Search, ZoomIn } from "lucide-vue-next";

const timelineRef = ref(null);
const playhead = ref(120);

const times = ["00:00", "00:15", "00:30", "00:45", "01:00"];
const totalDuration = 60;

// ✅ Text clips data
const textClips = [
  { start: 5, duration: 15, text: "Hello World 🎬" },
  { start: 25, duration: 20, text: "This is subtitle text" },
  { start: 48, duration: 10, text: "End Scene ✨" },
];

// Move playhead on click
const movePlayhead = (e) => {
  const rect = timelineRef.value.getBoundingClientRect();
  playhead.value = e.clientX - rect.left;
};

// Position clips
const getStyle = (start, duration) => {
  return {
    left: (start / totalDuration) * 100 + "%",
    width: (duration / totalDuration) * 100 + "%",
  };
};
</script>