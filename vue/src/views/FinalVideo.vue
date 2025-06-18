<template>
  <div class="video-container" @click="skipVideo">
    <video
      ref="videoPlayer"
      @ended="onVideoEnd"
      class="full-screen-video"
      src="/src/assets/videos/videoFinal.mp4"
      autoplay
    ></video>
    <div class="skip-hint">Clique em qualquer lugar para pular</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();
const videoPlayer = ref(null);

const onVideoEnd = () => {
  router.push({
    path: '/victory',
    query: route.query
  });
};

const skipVideo = () => {
  router.push({
    path: '/victory',
    query: route.query
  });
};

onMounted(() => {
  if (videoPlayer.value) {
    videoPlayer.value.play().catch(error => {
      router.push({
        path: '/victory',
        query: route.query
      });
    });
  }
});
</script>

<style scoped>
.video-container {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  background: black;
}

.full-screen-video {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.skip-hint {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  color: #ffce1c;
  font-family: 'Press Start 2P', cursive;
  font-size: 1rem;
  padding: 15px 25px;
  background-color: rgba(0, 0, 0, 0.8);
  border: 4px solid #931e30;
  box-shadow: 0 0 0 4px #ffce1c, inset 0 0 0 1px #931e30;
  border-radius: 8px;
  opacity: 0;
  transition: all 0.3s ease;
  text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.5);
  image-rendering: pixelated;
  animation: glow 1.5s ease-in-out infinite alternate;
}

.skip-hint::before {
  content: '';
  position: absolute;
  top: 4px;
  left: 4px;
  right: 4px;
  bottom: 4px;
  border: 2px solid #ffce1c;
  pointer-events: none;
  border-radius: 4px;
}

.video-container:hover .skip-hint {
  opacity: 1;
  transform: translateX(-50%) scale(1.05);
  background-color: rgba(0, 0, 0, 0.9);
}

@keyframes glow {
  from {
    box-shadow: 0 0 0 4px #ffce1c,
                inset 0 0 0 1px #931e30,
                0 0 20px rgba(255, 206, 28, 0.5);
  }
  to {
    box-shadow: 0 0 0 4px #ffce1c,
                inset 0 0 0 1px #931e30,
                0 0 40px rgba(255, 206, 28, 0.8);
  }
}
</style>
