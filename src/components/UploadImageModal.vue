<template>
  <div class='overlay'>
    <div class='modal'>
      <header>
        <h3 class='text is-lg'>Add a new photo</h3>
        <p class='text is-sm'>Upload and attach files to this project.</p>
      </header>
      <div class='body'>
        
        <!-- Image title -->
        <InputField placeholder='Woman dancing in rain' type='text' label='Photo name' v-model='uploadImageStore.name' />
        
        <!-- Dropzone -->
        <label for='file-input' class='dropzone' @drop.prevent='onDrop'>
          <input type='file' id='file-input' hidden ref='fileInput' @change='onInputChange'>
          <div class='icon'>
            <img src='@/assets/icons/upload-cloud.svg' alt='upload' />
          </div>
          <h5 class='text is-sm'><span>Click to upload</span> or drag and drop</h5>
          <p class='text is-xs'>SVG, PNG, JPG or GIF (max. 800x400px)</p>
        </label>
        
        <!-- File queue -->
        <div class='file-queue'>
          <FileUploadItem v-if='uploadImageStore.isImageUploading' :name='uploadImageStore.file.name' :size='uploadImageStore.totalBytes' :uploaded='uploadImageStore.bytesTransferred' :completed='uploadImageStore.isImageUploaded' />
        </div>

        <!-- Tags -->
        <InputField placeholder='Enter tag...' type='text' label='Tags' hint='Press enter to add' v-model='uploadImageStore.tag' @keydown.enter='uploadImageStore.addTag' />
        <div class='tags-container'>
          <HBadge v-for='(tag, index) in uploadImageStore.tags' @click='uploadImageStore.removeTag(index)'>{{tag}}</HBadge>
        </div>
      </div>
      <div class='actions'>
        <HButton hierarchy='is-secondary-gray' size='is-lg' @click='uploadImageStore.reset()'>Cancel</HButton>
        <HButton size='is-lg' @click='uploadImageStore.addToDb()' :loading='uploadImageStore.isUploading'>Attach files</HButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import InputField from '@/components/InputField.vue'
import HButton from '@/components/HButton.vue'
import FileUploadItem from '@/components/FileUploadItem.vue'
import { ref } from 'vue'
import { useUploadImageStore } from '@/stores/uploadImage'
import HBadge from '@/components/HBadge.vue'

const uploadImageStore = useUploadImageStore()
const fileInput = ref(null)

// When file is dropped on dropzone
const onDrop = (e) => {
  e.preventDefault()
  e.stopPropagation()
  uploadImageStore.file = e.dataTransfer.files[0]
  // console.log(file.value)
}

// When file is selected from file input
const onInputChange = () => {
  uploadImageStore.file = fileInput.value.files[0]
  uploadImageStore.uploadFile()
}

</script>

<style scoped lang='scss'>
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  backdrop-filter: blur(8px);
  background: rgba(52, 64, 84, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal {
  max-width: 480px;
  width: 100%;
  background: white;
  box-shadow: 0px 20px 24px -4px rgba(16, 24, 40, 0.08), 0px 8px 8px -4px rgba(16, 24, 40, 0.03);
  padding: 24px;
  border-radius: 12px;
  header {
    margin-bottom: 20px;
    h3 {
      font-weight: 600;
    }
    p {
      color: var(--gray-500);
    }
  }
  .actions {
    display: flex;
    gap: 12px;
    button {
      width: 100%;
    }
  }
  .item {
    margin-bottom: 16px;
  }
  .tags-container {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 6px;
    margin-bottom: 24px;
  }
}

.dropzone {
  border: 1px dashed var(--gray-200);
  border-radius: 8px;
  padding: 16px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 16px 0;
  cursor: pointer;
  .icon {
    width: 46px;
    height: 46px;
    background: var(--gray-100);
    border: 6px solid var(--gray-50);
    border-radius: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 12px;
  }
  h5 {
    color: var(--gray-500);
    margin-bottom: 4px;
    span {
      font-weight: 600;
      color: var(--primary-700);
    }
  }
  p {
    color: var(--gray-500);
  }
}
</style>