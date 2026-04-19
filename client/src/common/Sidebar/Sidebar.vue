<template>
  <!-- Overlay -->
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-black/30 z-40"
    @click="$emit('close')"
  ></div>

  <!-- Sidebar -->
  <aside
    :class="[
      'fixed top-0 left-0 h-full w-20 bg-[#e8ecff] shadow-xl z-50 transform transition-transform duration-300',
      isOpen ? 'translate-x-0' : '-translate-x-full'
    ]"
  >
    <!-- Close button -->
    <div class="flex items-center justify-end px-4 py-3">
      <button @click="$emit('close')" class="text-gray-500 hover:text-black">
        ✕
      </button>
    </div>

    <!-- Tool Buttons -->
    <nav class="flex flex-col items-center gap-4 mt-2">
      <!-- Upload -->
      <button
        @click="selectTool('upload')"
        :class="[
          'flex flex-col items-center gap-1 w-14 py-3 rounded-xl text-xs font-medium transition',
          activeTool === 'upload'
            ? 'bg-blue-500 text-white shadow'
            : 'text-gray-600 hover:bg-white hover:shadow'
        ]"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 12V4m0 0L8 8m4-4l4 4" />
        </svg>
        Upload
      </button>

      <!-- Text -->
      <!-- <button
        @click="selectTool('text')"
        :class="[
          'flex flex-col items-center gap-1 w-14 py-3 rounded-xl text-xs font-medium transition',
          activeTool === 'text'
            ? 'bg-blue-500 text-white shadow'
            : 'text-gray-600 hover:bg-white hover:shadow'
        ]"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h10M4 18h16" />
        </svg>
        Text
      </button> -->

      <!-- Effects -->
      <!-- <button
        @click="selectTool('effects')"
        :class="[
          'flex flex-col items-center gap-1 w-14 py-3 rounded-xl text-xs font-medium transition',
          activeTool === 'effects'
            ? 'bg-blue-500 text-white shadow'
            : 'text-gray-600 hover:bg-white hover:shadow'
        ]"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 3l14 9-14 9V3z" />
        </svg>
        Effects
      </button> -->

    </nav>
  </aside>
</template>

<script setup>
defineProps({
  isOpen: Boolean,
  activeTool: String
})

const emit = defineEmits(['close', 'selectTool'])

const selectTool = (tool) => {
  emit('selectTool', tool)
  emit('close')
}
</script>