<template>  <div class="video-container" @click="skipVideo">
    <video
      ref="videoPlayer"
      @ended="onVideoEnd"
      class="full-screen-video"
      src="/src/assets/videos/VideoDef.mp4"
      autoplay
    ></video>
    <div class="skip-hint">Clique em qualquer lugar para pular</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const videoPlayer = ref(null);

const onVideoEnd = () => {
  router.push('/menu');
};

const skipVideo = () => {
  router.push('/menu');
};

onMounted(() => {
  if (videoPlayer.value) {
    videoPlayer.value.play().catch(error => {
      console.log("Erro ao reproduzir o vídeo:", error);
      router.push('/menu');
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
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 5px;
  opacity: 0;
  transition: opacity 0.3s;
}

.video-container:hover .skip-hint {
  opacity: 1;
}
</style>
