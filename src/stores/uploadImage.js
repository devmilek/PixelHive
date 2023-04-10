import { ref } from 'vue'
import { defineStore } from 'pinia'
import { ref as fbRef, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { auth, db, storage } from '@/firebase/config'
import imageCompression from 'browser-image-compression';
import { collection, addDoc } from "firebase/firestore";
import { useAlertsStore } from '@/stores/alerts'

export const useUploadImageStore = defineStore('uploadImage', () => {
  const name = ref('')
  const tag = ref('')
  const file = ref(null)
  const tags = ref([])
  const totalBytes = ref(0)
  const bytesTransferred = ref(0)
  const isImageUploading = ref(false)
  const isImageUploaded = ref(false)
  const downloadLink = ref(null)
  const thumbnailLink = ref(null)
  const isUploading = ref(false)
  const isModalOpen = ref(false)
  const alertsStore = useAlertsStore()

  // Upload image to firebase storage
  async function uploadFile() {
    const compressionOptions = {
      maxSizeMB: 0.6,
      maxWidthOrHeight: 520,
      useWebWorker: true,
    }
    const compressedFile = await imageCompression(this.file, compressionOptions);

    const storageImageRef = fbRef(storage, 'images/' + this.file.name);
    const storageThumbnailRef = fbRef(storage, 'images/' + 'thumbnail_' + this.file.name);

    const thumbnailUploadTask = uploadBytesResumable(storageThumbnailRef, compressedFile);
    const imageUploadTask = uploadBytesResumable(storageImageRef, this.file);

    // Upload image to firebase storage
    imageUploadTask.on('state_changed',
      (snapshot) => {
        // const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        isImageUploaded.value = false
        bytesTransferred.value = snapshot.bytesTransferred
        totalBytes.value = snapshot.totalBytes
        isImageUploading.value = true
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        console.error(error)
      },
      () => {
        isImageUploaded.value = true
        console.log('Upload complete')
        getDownloadURL(imageUploadTask.snapshot.ref).then((downloadURL) => {
          downloadLink.value = downloadURL
          console.log(downloadLink.value)
        });
      }
    );

    // Upload thumbnail to firebase storage
    thumbnailUploadTask.on('state_changed',
      (thumbnailSnapshot) => {
        switch (thumbnailSnapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        console.error(error)
      },
      () => {
        getDownloadURL(thumbnailUploadTask.snapshot.ref).then((downloadURL) => {
          thumbnailLink.value = downloadURL
          // console.log('thumbnail ' + downloadLink.value)
        });
      }
    );
  }

  // Add tag to tags array
  function addTag() {
    tags.value.push(tag.value)
    tag.value = ''
  }

  // Remove tag from tags array
  function removeTag(index) {
    tags.value.splice(index, 1)
  }

  // add image to firebase db
  async function addToDb() {
    if (!name.value) {
      alertsStore.setAlert('Please enter a name', 'error', 'Set a name for your image, so your fans can find it.')
    } else if (!tags.value.length) {
      alertsStore.setAlert('Please enter a tag', 'error', 'Set a minimum one tag for your image, so your fans can find it.')
    } else if (!downloadLink.value) {
      alertsStore.setAlert('Upload an image', 'error', "You can't upload an empty image. Please upload an image first.")
    } else {
      isUploading.value = true
      try {
        const docRef = await addDoc(collection(db, "images"), {
          imageUrl: downloadLink.value,
          thumbnailUrl: thumbnailLink.value,
          authorUid: auth.currentUser.uid,
          title: name.value,
          tags: tags.value,
        });
        console.log("Document written with ID: ", docRef.id);
        isUploading.value = false
        reset()
      } catch (e) {
        isUploading.value = false
      }
    }
  }

  // Reset all values
  function reset() {
    name.value = ''
    tag.value = ''
    file.value = null
    tags.value = []
    totalBytes.value = 0
    bytesTransferred.value = 0
    isImageUploading.value = false
    isImageUploaded.value = false
    downloadLink.value = null
    isUploading.value = false
    isModalOpen.value = false
  }

  return { name, isModalOpen, reset, tag, file, tags, uploadFile, isImageUploading, totalBytes, bytesTransferred, downloadLink, isImageUploaded, addTag, removeTag, addToDb, isUploading }
})
