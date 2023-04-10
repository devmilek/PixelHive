<template>
  <main class='auth-page'>
    <section class='wrapper'>
      <div class='container'>
        <header>
          <img src='@/assets/pixelhive.svg' class='logo' />
          <h1 class='heading is-sm'>Sign up</h1>
          <p class='text is-md'>Welcome back! Please enter your details.</p>
        </header>
        <form>
          <InputField label='Full name' type='email' placeholder='Enter your name' v-model='name' :hint='nameMsg' :destructive='nameError' />
          <InputField label='Email' type='email' placeholder='Enter your email' v-model='email' :hint='emailMsg' :destructive='nameError' />
          <InputField label='Password' type='password' placeholder='Create a password' :hint='passwordMsg' :destructive='nameError' v-model='password' />
          <HButton size='is-lg' @click.prevent='validate' :loading='isLoading'>Create account</HButton>
        </form>
        <p class='text is-sm no-account'>Already have an account? <RouterLink to='/login'>Sign in</RouterLink> </p>
      </div>
    </section>
    <section class='image-wrapper'></section>
  </main>
</template>

<script setup>
import InputField from '@/components/InputField.vue'
import { ref } from 'vue'
import HButton from '@/components/HButton.vue'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from '@/firebase/config'
import router from '@/router'

const name = ref('')
const nameError = ref(false)
const nameMsg = ref('')
const email = ref('')
const emailError = ref(false)
const emailMsg = ref('')
const password = ref('')
const passwordError = ref(false)
const passwordMsg = ref('Must include at least 8 characters')
const errorMsg = ref('')
const isLoading = ref(false)
import { doc, setDoc } from "firebase/firestore";

const validate = () => {
  if (name.value === "") {
    nameError.value = true
  }
  if (email.value === "") {
    emailError.value = true
  }
  if (password.value === "") {
    passwordError.value = true
  }
  if (name.value !== "" && email.value !== "" && password.value !== "") {
    signUp()
  }
}

const signUp = async () => {
  isLoading.value = true
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value)
    const user = userCredential.user;
    await updateProfile(auth.currentUser, {
      displayName: name.value,
      photoURL: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541'
    })
    await setDoc(doc(db, "users", userCredential.user.uid), {
      displayName: name.value,
      photoURL: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541',
      email: email.value
    });
    isLoading.value = false
    console.log(user)
    await router.push('/')
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage)
    alert(errorMessage)
    isLoading.value = false
  }
}


</script>

<style scoped lang='scss'>
</style>