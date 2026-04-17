<script setup>
import {
  Scissors,
  SplitSquareHorizontal,
  Music,
  Eye,
  Download,
  Undo2 ,
    Redo2,
    RotateCcw
} from "lucide-vue-next";
</script>

<template>
  <nav class="w-full bg-[#e8ecff] flex flex-col shadow-sm">

    <!-- Row 1: Brand (left) + Avatar (right) -->
    <div class="flex items-center justify-between px-6 py-2.5 border-b border-[#d0d5f5]">
      <span class="text-[#1a1a2e] font-semibold text-base tracking-tight select-none">
        Video Editor
      </span>
      <div class="w-8 h-8 rounded-full bg-[#b0b8f0] overflow-hidden ring-2 ring-white shadow">
        <img
          src="https://i.pravatar.cc/32"
          alt="User avatar"
          class="w-full h-full object-cover"
        />
      </div>
    </div>

    <!-- Row 2: Toolbar Actions -->
<div class="flex items-center justify-between px-24 py-2">

  <!-- Left-aligned actions -->
  <div class="flex items-center gap-1">

      <!-- Undo -->
    <button
      class="flex items-center gap-1 px-2 py-1.5 rounded-lg text-sm font-medium text-[#6b6f8a] hover:bg-white/60 hover:text-[#1a1a2e] transition-all"
    >
      <Undo2 class="w-4 h-4" />
      Undo
    </button>

    <!-- Redo -->
    <button
      class="flex items-center gap-1 px-2 py-1.5 rounded-lg text-sm font-medium text-[#6b6f8a] hover:bg-white/60 hover:text-[#1a1a2e] transition-all"
    >
      <Redo2 class="w-4 h-4" />
      Redo
    </button>

    <!-- Reset -->
    <button
      class="flex items-center gap-1 px-2 py-1.5 rounded-lg text-sm font-medium text-[#6b6f8a] hover:bg-white/60 hover:text-[#1a1a2e] transition-all"
    >
      <RotateCcw class="w-4 h-4" />
      Reset
    </button>
    <!-- Trim -->
    <button
      class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-[#3d3d5c] hover:bg-white/60 hover:text-[#1a1a2e] transition-all duration-150"
    >
      <Scissors class="w-4 h-4" />
      Trim
    </button>

    <!-- Cut -->
    <button
      class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-[#3d3d5c] hover:bg-white/60 hover:text-[#1a1a2e] transition-all duration-150"
    >
      <SplitSquareHorizontal class="w-4 h-4" />
      Cut
    </button>
  </div>

  <!-- Right-aligned actions -->
  <div class="flex items-center gap-2">
    <!-- Preview -->
    <button
      class="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm font-semibold bg-[#4f6ef7] text-white hover:bg-[#3d5ce5] active:scale-95 transition-all duration-150 shadow-sm"
    >
      <Eye class="w-4 h-4" />
      Preview
    </button>

    <!-- Export Video -->
    <button
      class="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm font-semibold bg-[#4f6ef7] text-white hover:bg-[#3d5ce5] active:scale-95 transition-all duration-150 shadow-sm"
    >
      <Download class="w-4 h-4" />
      Export Video
    </button>
  </div>

</div>

  </nav>
</template>