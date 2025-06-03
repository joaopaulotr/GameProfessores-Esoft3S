<template>
    <div class="map">
      <div v-for="(row, y) in map" :key="y" class="row">
        <img
          v-for="(gid, x) in row"
          :key="x"
          :src="getTileSrc(gid)"
          class="tile"
        />
      </div>
    </div>
  </template>
  
  <script>
  import mapData from '@/assets/maps/classroom.json';
  
  export default {
    data() {
      return {
        map: [],  // será um array 2D
        raw: mapData,
      };
    },
    created() {
      // converter o array plano em matriz [width][height]
      const { width, layers } = this.raw;
      const flat = layers[0].data;
      for (let y = 0; y < this.raw.height; y++) {
        this.map.push(flat.slice(y * width, y * width + width));
      }
    },
    methods: {
      getTileSrc(gid) {
        if (gid === 0) return ''; // sem tile
        return require(`@/assets/tiles/classroomTiles.png`)
          + `#tile-${gid}`; 
        // *Para um uso real com sprite-sheet você precisará usar CSS background-position
        // ou uma lib de renderização (PIXI.js). Este exemplo é só demonstrativo.*
      },
    },
  };
  </script>
  
  <style>
  .map { display: inline-block; }
  .row { display: flex; }
  .tile {
    width: 32px;
    height: 32px;
    /* em caso de spritesheet puro, use background-position */
  }
  </style>
  