<template>
  <section
    class="min-h-screen w-full overflow-x-hidden flex items-center justify-center bg-cover bg-center py-8 px-4"
    :style="{ backgroundImage: `url(${bg})` }"
  >
    <!-- MAIN CARD -->
    <div
      class="flex flex-col md:flex-row w-full max-w-5xl md:h-150 rounded-3xl"
    >
      <!-- LEFT PANEL -->
      <div class="w-full md:w-1/2 relative h-48 md:h-auto z-999">
        <div
          class="h-full w-full rounded-2xl border-4 md:border-10 border-black overflow-hidden"
        >
          <!-- VIDEO -->
          <video
            class="w-full h-full object-cover"
            :src="video"
            autoplay
            loop
            muted
            playsinline
          ></video>
        </div>
      </div>

      <!-- RIGHT PANEL -->
      <div
        class="w-full md:w-1/2 bg-white rounded-[40px] p-6 md:p-10 flex flex-col justify-center relative overflow-hidden -mt-6 md:mt-0"
      >
        <!-- LOGO -->
        <div class="text-center mb-6">
          <h1 class="text-2xl font-semibold tracking-wide">V</h1>
        </div>

        <!-- HEADING -->
        <div class="text-center mb-6">
          <h2 class="text-2xl md:text-3xl font-semibold">
            {{ isLogin ? `Welcome back, ${name}` : "Create an account" }}
          </h2>
          <p class="text-gray-500 text-sm mt-2">
            {{
              isLogin
                ? "Welcome back!, Please enter your details"
                : "Please enter your details to register"
            }}
          </p>
        </div>

        <!-- FORM -->
        <div class="space-y-5">
          <!-- NAME (ONLY REGISTER) -->
          <input
            v-if="!isLogin"
            type="text"
            placeholder="Full Name"
            class="w-full border-b border-gray-300 focus:outline-none py-2"
          />

          <!-- EMAIL -->
          <input
            type="email"
            placeholder="Email"
            class="w-full border-b border-gray-300 focus:outline-none py-2"
          />

          <!-- PASSWORD -->
          <input
            type="password"
            placeholder="Password"
            class="w-full border-b border-gray-300 focus:outline-none py-2"
          />

          <!-- BUTTON -->
          <button
            class="w-full mt-4 bg-cover bg-center py-3 rounded-full flex items-center justify-between px-5"
            :style="{ backgroundImage: `url(${bg})` }"
          >
            <span class="text-white text-xl md:text-2xl">{{
              isLogin ? "Sign In" : "Sign Up"
            }}</span>
            <span
              class="bg-yellow-400 text-black rounded-full w-8 h-8 flex items-center justify-center"
            >
              ↗
            </span>
          </button>

          <!-- TOGGLE -->
          <p class="text-sm text-center mt-4">
            <span v-if="isLogin">
              Don't have an account?
              <span
                class="text-green-700 font-semibold cursor-pointer"
                @click="isLogin = false"
              >
                Register
              </span>
            </span>

            <span v-else>
              Already have an account?
              <span
                class="text-green-700 font-semibold cursor-pointer"
                @click="isLogin = true"
              >
                Login
              </span>
            </span>
          </p>

          <!-- DIVIDER -->
          <div class="flex items-center gap-3 my-4">
            <span class="text-gray-400 text-sm">or</span>
            <div class="flex-1 h-px bg-gray-300"></div>

            <!-- GOOGLE BUTTON -->
            <button
              class="w-52 border-4 border-gray-300 rounded-xl pl-2 flex items-center gap-3 hover:bg-gray-50 transition"
            >
              <span>Login with Google</span>

              <div
                class="ml-auto border-2 border-gray-300 rounded-full h-10 w-10 flex items-center justify-center"
              >
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  class="w-5 h-5"
                />
              </div>
            </button>
          </div>
        </div>
      </div>
      
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import bg from "../assets/nature.jpg";
import video from "../assets/video.mp4";

const isLogin = ref(true);
const name = ref("User");
</script>
