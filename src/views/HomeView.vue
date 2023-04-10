<template>
  <main class='container'>
    <ImageTile v-for='image in images' :key='image.name' :image='image' class='masonry-item' />
  </main>
</template>

<script setup>
import { collection, getDocs } from "firebase/firestore";
import { db } from '@/firebase/config'
import { ref } from 'vue'
import ImageTile from '@/components/ImageTile.vue'

const images = ref([])

const loadImages = async () => {
  const querySnapshot = await getDocs(collection(db, "images"));
  querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
    images.value.push(doc.data())
  });
}

loadImages()
</script>

<style scoped>
.container {
  columns: 4 200px;
  column-gap: 1rem;
  gap: 1rem;
  padding-top: 20px;
}
/*.masonry-item {*/
/*  width: calc(25% - 10px);*/
/*  margin: 5px;*/
/*}*/
</style>