<template>
  <div class='image-tile'>
    <img :src='props.image.thumbnailUrl'>
    <div class='overlay' v-if='user'>
      <div class='content'>
        <img :src='user.photoURL' alt='user photo'>
        <div class='info'>
          <h1 class='text is-sm'>{{ user.displayName }}</h1>
          <p class='text is-sm'>{{ props.image.title }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { doc, getDoc } from "firebase/firestore";
import { db } from '@/firebase/config'

const props = defineProps({
  image: {
    type: Object,
    required: true
  }
})

const user = ref(null)

const getUser = async () => {
  const docRef = doc(db, "users", props.image.authorUid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    user.value = docSnap.data()
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
}

getUser()
</script>

<style scoped lang='scss'>
img {
  width: 100%;
  border-radius: 12px;
  height: 100%;
}

.image-tile {
  height: min-content;
  margin-bottom: 10px;
}
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 12px;
  display: flex;
  align-items: end;
  justify-content: start;
  opacity: 0;
  transition: opacity 0.3s ease;
  padding: 20px;
  cursor: pointer;
}

.content {
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 40px;
    height: 40px;
    border-radius: 100px;
    margin-right: 12px;
  }
  h1 {
    color: white;
    font-weight: 600;
  }
  p {
    color: var(--gray-300)
  }
}

.image-tile:hover .overlay {
  opacity: 1;
}
</style>