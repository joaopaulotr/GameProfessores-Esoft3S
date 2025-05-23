<script setup>
const props = defineProps({
    map: Array,         // Matriz 2D
    tileSize: Number,   // Tamanho do tile
})

</script>

<template>
    <div class="tile-map" :style="{
        width: props.map[0].length * props.tileSize + 'px',
        height: props.map.length * props.tileSize + 'px',
    }">
        <div v-for="(row, rowIndex) in props.map" :key="rowIndex" class="tile-row">
            <div v-for="(tile, colIndex) in row" :key="colIndex" class="tile"
                :class="{ wall: tile === 1, floor: tile === 0 }" :style="{
                    width: props.tileSize + 'px',
                    height: props.tileSize + 'px'
                }" />
        </div>
    </div>
</template>

<style scoped>
.tile-map {
    display: flex;
    flex-direction: column;
    position: absolute;
    z-index: 0;
}

.tile-row {
    display: flex;
}

.tile {
    box-sizing: border-box;
    border: 1px solid rgba(255, 255, 255, 0.1);
}

.tile.wall {
    background-color: rgba(255, 0, 0, 0.2);
    border: 1px solid rgba(255, 0, 0, 0.3);
}

.tile.floor {
    /* Tiles livres são transparentes */
    background: none;
    border: none;
}
</style>
