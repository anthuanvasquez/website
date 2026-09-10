<script setup lang="ts">
import type { Map } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const { mapboxAccessToken: accessToken } = useEnv();

const mapContainer = ref<HTMLDivElement | null>(null);
let map: Map | null = null;

onMounted(async () => {
  if (!accessToken || !mapContainer.value) return;

  const { default: mapboxgl } = await import('mapbox-gl');
  if (!mapContainer.value) return;

  mapboxgl.accessToken = accessToken;
  map = new mapboxgl.Map({
    container: mapContainer.value,
    style: 'mapbox://styles/mapbox/dark-v11',
    center: [-70.692, 19.442],
    zoom: 4,
    projection: 'equalEarth',
    scrollZoom: false,
    maxBounds: [
      [-118, -56],
      [-34, 33],
    ],
  });

  new mapboxgl.Marker({ color: '#27bcfd' })
    .setLngLat([-70.692, 19.442])
    .addTo(map);
});

onUnmounted(() => {
  map?.remove();
});
</script>

<template>
  <div class="absolute inset-0">
    <div v-if="accessToken" ref="mapContainer" class="h-full w-full" />
    <div
      v-else
      class="bg-surface-base text-text-primary flex h-full w-full items-center justify-center"
    >
      Configuring Map...
    </div>
  </div>
</template>
