<template>
  <div class="absolute inset-0">
    <MapboxMap
      map-id="map-rd"
      class="h-full w-full"
      :options="{
        style: 'mapbox://styles/mapbox/dark-v11',
        center: [-70.692, 19.442],
        zoom: 4,
        projection: 'equalEarth',
        scrollZoom: false,
        maxBounds: [
          [-118, -56],
          [-34, 33],
        ],
      }"
    >
      <MapboxDefaultMarker
        marker-id="marker-rd"
        :lnglat="[-70.692, 19.442]"
        color="#27bcfd"
      />
    </MapboxMap>
  </div>
</template>
