<script setup>
import {
  Scissors,
  SplitSquareHorizontal,
  Music,
  Eye,
  Download,
  Undo2,
  Redo2,
  RotateCcw,
  Menu
} from "lucide-vue-next";

const emit = defineEmits(["toggleSidebar"]);
</script>

<template>
  <nav class="w-full bg-[#e8ecff] flex flex-col shadow-sm ">

    <!-- Row 1: Brand (left) + Avatar (right) -->
    <div class="flex items-center justify-between px-4 sm:px-6 py-2.5 border-b border-[#d0d5f5]">
      
      <!-- LEFT: Hamburger + Brand -->
      <div class="flex items-center gap-3">
        <!-- Hamburger -->
        <button
          @click="emit('toggleSidebar')"
          class="p-1.5 rounded-md hover:bg-white/60 transition whitespace-nowrap"
        >
          <Menu class="w-5 h-5 text-[#1a1a2e]" />
        </button>

        <span class="text-[#1a1a2e] font-semibold text-base tracking-tight select-none whitespace-nowrap">
          Video Editor
        </span>
      </div>

      <!-- RIGHT: Avatar -->
      <div class="w-8 h-8 rounded-full bg-[#b0b8f0] overflow-hidden ring-2 ring-white shadow">
        <img
          src="https://i.pravatar.cc/32"
          alt="User avatar"
          class="w-full h-full object-cover"
        />
      </div>
    </div>

    <!-- Row 2: Toolbar Actions -->
    <div class="flex flex-col md:flex-row items-start md:items-center justify-between px-4 sm:px-6 md:px-24 py-2 gap-2 md:gap-0">

      <!-- Left-aligned actions -->
      <div class="flex flex-wrap items-center gap-1">

        <!-- Undo -->
        <button class="flex items-center gap-1 px-2 py-1.5 rounded-lg text-sm font-medium text-[#6b6f8a] hover:bg-white/60 hover:text-[#1a1a2e] transition-all whitespace-nowrap">
          <Undo2 class="w-4 h-4" />
          Undo
        </button>

        <!-- Redo -->
        <button class="flex items-center gap-1 px-2 py-1.5 rounded-lg text-sm font-medium text-[#6b6f8a] hover:bg-white/60 hover:text-[#1a1a2e] transition-all whitespace-nowrap">
          <Redo2 class="w-4 h-4" />
          Redo
        </button>

        <!-- Reset -->
        <button class="flex items-center gap-1 px-2 py-1.5 rounded-lg text-sm font-medium text-[#6b6f8a] hover:bg-white/60 hover:text-[#1a1a2e] transition-all whitespace-nowrap">
          <RotateCcw class="w-4 h-4" />
          Reset
        </button>

        <!-- Trim -->
        <button class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-[#3d3d5c] hover:bg-white/60 hover:text-[#1a1a2e] transition-all duration-150 whitespace-nowrap">
          <Scissors class="w-4 h-4" />
          Trim
        </button>

        <!-- Cut -->
        <button class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-[#3d3d5c] hover:bg-white/60 hover:text-[#1a1a2e] transition-all duration-150 whitespace-nowrap">
          <SplitSquareHorizontal class="w-4 h-4" />
          Cut
        </button>
      </div>

      <!-- Right-aligned actions -->
      <div class="flex flex-wrap items-center gap-2 w-full md:w-auto justify-start md:justify-end">

        <!-- Preview -->
        <button class="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm font-semibold bg-[#4f6ef7] text-white hover:bg-[#3d5ce5] active:scale-95 transition-all duration-150 shadow-sm whitespace-nowrap">
          <Eye class="w-4 h-4" />
          Preview
        </button>

        <!-- Export Video -->
        <button class="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm font-semibold bg-[#4f6ef7] text-white hover:bg-[#3d5ce5] active:scale-95 transition-all duration-150 shadow-sm whitespace-nowrap">
          <Download class="w-4 h-4" />
          Export Video
        </button>
      </div>

    </div>

  </nav>
</template>