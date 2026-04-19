<template>
  <Navbar @toggleSidebar="isSidebarOpen = true" />

  <Sidebar
    :isOpen="isSidebarOpen"
    :activeTool="activeTool"
    @close="isSidebarOpen = false"
    @selectTool="activeTool = $event"
  />

  <Display :activeTool="activeTool" />

  <Editor_panel />
</template>

<script setup>
import { ref } from "vue";

import Display from "../components/Display/Display.vue";
import Editor_panel from "../components/Editor_panel/Editor_panel.vue";
import Navbar from "../components/Navbar/Navbar.vue";
import Sidebar from "../Sidebar/Sidebar.vue";

const isSidebarOpen = ref(false);
const activeTool    = ref(null);
</script>