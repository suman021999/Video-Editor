<template>
  <div class="w-full bg-gray-100 p-4 rounded-xl">
    <!-- Header -->
    <div class="flex items-center justify-between mb-4 px-2">
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
        <div class="flex justify-end items-center mb-2 px-2">
          <button
            @click="uploadAudio('audio1')"
            class="flex items-center cursor-pointer gap-1 text-xs bg-blue-100 px-3 py-1 rounded-full"
          >
            <Upload class="w-4 h-4" />
            Upload Audio
          </button>
        </div>

        <!-- AUDIO ROW -->
        <div class="flex items-center">
          <div class="w-16 text-xs text-gray-500 pl-2">Audio 1</div>

          <div class="flex-1 h-10 bg-gray-100 rounded-md mx-4">
            <div
              class="h-8 rounded-md px-2 flex items-center text-xs bg-yellow-200"
              :style="getStyle(0, 60)"
            >
              Camera_Mic_Original
            </div>
          </div>
        </div>

        <!-- AUDIO 2 HEADER -->
        <div class="flex justify-end items-center mb-2 px-2">
          <button
            @click="uploadAudio('soundtrack')"
            class="flex items-center gap-1 text-xs cursor-pointer bg-blue-100 px-3 py-1 rounded-full"
          >
            <Upload class="w-4 h-4" />
            Upload Audio
          </button>
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
        class="absolute top-0 bottom-0 w-0.5 bg-red-500 cursor-grab"
        :style="{ left: playhead + 'px' }"
        @mousedown="startDrag"
      >
        <div class="w-3 h-3 bg-red-500 rounded-full -ml-1.25 -mt-1"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Search, Upload, ZoomIn } from "lucide-vue-next";

const timelineRef = ref(null);
const playhead = ref(120);

const times = ["00:00", "00:15", "00:30", "00:45", "01:00"];
const totalDuration = 60;

// ======================
// ✅ AUDIO STORAGE
// ======================
const audioTracks = ref([]);

// ======================
// ✅ AUDIO UPLOAD FUNCTION
// ======================
const uploadAudio = (type) => {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "audio/*";

  input.onchange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const audio = {
      name: file.name,
      url: URL.createObjectURL(file),
      start: 0,
      duration: 20,
      type,
    };

    audioTracks.value.push(audio);

    console.log("Uploaded:", audio);
  };

  input.click();
};

// ======================
// ✅ TEXT CLIPS
// ======================
const textClips = [
  { start: 5, duration: 15, text: "Hello World 🎬" },
  { start: 25, duration: 20, text: "This is subtitle text" },
  { start: 48, duration: 10, text: "End Scene ✨" },
];

const LABEL_WIDTH = 80;

// ======================
// PLAYHEAD CLICK
// ======================
const movePlayhead = (e) => {
  const rect = timelineRef.value.getBoundingClientRect();

  const rawX = e.clientX - rect.left;

  const minX = LABEL_WIDTH;
  const maxX = rect.width;

  playhead.value = Math.min(Math.max(rawX, minX), maxX);
};

// ======================
// DRAG LOGIC
// ======================
let isDragging = false;

const startDrag = () => {
  isDragging = true;
  window.addEventListener("mousemove", onDrag);
  window.addEventListener("mouseup", stopDrag);
};

const onDrag = (e) => {
  if (!isDragging) return;

  const rect = timelineRef.value.getBoundingClientRect();

  const rawX = e.clientX - rect.left;

  const minX = LABEL_WIDTH;
  const maxX = rect.width;

  playhead.value = Math.min(Math.max(rawX, minX), maxX);
};

const stopDrag = () => {
  isDragging = false;
  window.removeEventListener("mousemove", onDrag);
  window.removeEventListener("mouseup", stopDrag);
};

// ======================
// CLIP POSITION
// ======================
const getStyle = (start, duration) => {
  return {
    left: (start / totalDuration) * 100 + "%",
    width: (duration / totalDuration) * 100 + "%",
  };
};
</script>