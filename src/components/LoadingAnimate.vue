<template>
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-slate-800/30"
  >
    <div
      class="flex flex-col items-center justify-center rounded-xl bg-white p-3 text-emerald-500"
    >
      <img class="w-10 pb-1" src="/vite.svg" alt="LetsVite" />
      <div>
        <span class="loading-point-one">L</span>
        <span class="loading-point-two">o</span>
        <span class="loading-point-three">a</span>
        <span class="loading-point-four">d</span>
        <span class="loading-point-five">i</span>
        <span class="loading-point-six">n</span>
        <span class="loading-point-seven">g</span>
        <span class="loading-point-eight">.</span>
        <span class="loading-point-nine">.</span>
        <span class="loading-point-ten">.</span>
      </div>
    </div>
  </div>
</template>
<script setup></script>
<style scoped>
span[class^="loading-point"] {
  display: inline-block;
  animation-duration: 0.7s;
  animation-iteration-count: infinite;
  animation-fill-mode: forwards;
  animation-timing-function: ease-in;
}

.loading-point-one {
  animation-name: one-point;
}
.loading-point-two {
  animation-name: two-point;
}
.loading-point-three {
  animation-name: three-point;
}
.loading-point-four {
  animation-name: four-point;
}
.loading-point-five {
  animation-name: five-point;
}
.loading-point-six {
  animation-name: six-point;
}
.loading-point-seven {
  animation-name: seven-point;
}
.loading-point-eight {
  animation-name: eight-point;
}
.loading-point-nine {
  animation-name: nine-point;
}
.loading-point-ten {
  animation-name: ten-point;
}
@keyframes one-point {
  0% {
    transform: translateY(-15%);
  }
  10% {
    transform: translateY(0%);
  }
  100% {
    transform: translateY(0%);
  }
}
@keyframes two-point {
  0% {
    transform: translateY(0%);
  }
  10% {
    transform: translateY(-15%);
  }
  20% {
    transform: translateY(0%);
  }
  100% {
    transform: translateY(0%);
  }
}
@keyframes three-point {
  0% {
    transform: translateY(0%);
  }
  10% {
    transform: translateY(0%);
  }
  20% {
    transform: translateY(-15%);
  }
  30% {
    transform: translateY(0%);
  }
  100% {
    transform: translateY(0%);
  }
}
@keyframes four-point {
  0% {
    transform: translateY(0%);
  }
  20% {
    transform: translateY(0%);
  }
  30% {
    transform: translateY(-15%);
  }
  40% {
    transform: translateY(0%);
  }
  100% {
    transform: translateY(0%);
  }
}
@keyframes five-point {
  0% {
    transform: translateY(0%);
  }
  30% {
    transform: translateY(0%);
  }
  40% {
    transform: translateY(-15%);
  }
  50% {
    transform: translateY(0%);
  }
  100% {
    transform: translateY(0%);
  }
}
@keyframes six-point {
  0% {
    transform: translateY(0%);
  }
  40% {
    transform: translateY(0%);
  }
  50% {
    transform: translateY(-15%);
  }
  60% {
    transform: translateY(0%);
  }
  100% {
    transform: translateY(0%);
  }
}
@keyframes seven-point {
  0% {
    transform: translateY(0%);
  }
  50% {
    transform: translateY(0%);
  }
  60% {
    transform: translateY(-15%);
  }
  70% {
    transform: translateY(0%);
  }
  100% {
    transform: translateY(0%);
  }
}
@keyframes eight-point {
  0% {
    transform: translateY(0%);
  }
  60% {
    transform: translateY(0%);
  }
  70% {
    transform: translateY(-15%);
  }
  80% {
    transform: translateY(0%);
  }
  100% {
    transform: translateY(0%);
  }
}
@keyframes nine-point {
  0% {
    transform: translateY(0%);
  }
  70% {
    transform: translateY(0%);
  }
  80% {
    transform: translateY(-15%);
  }
  90% {
    transform: translateY(0%);
  }
  100% {
    transform: translateY(0%);
  }
}
@keyframes ten-point {
  0% {
    transform: translateY(0%);
  }
  80% {
    transform: translateY(0%);
  }
  90% {
    transform: translateY(-15%);
  }
  100% {
    transform: translateY(0%);
  }
}
</style>
