<template>
  <main class='auth-page'>
    <section class='wrapper'>
      <div class='container'>
        <header>
          <img src='@/assets/pixelhive.svg' class='logo' />
          <h1 class='heading is-sm'>Welcome back</h1>
          <p class='text is-md'>Welcome back! Please enter your details.</p>
        </header>
        <form>
          <InputField label='Email' type='email' placeholder='Enter your email' v-model='email' :destructive='emailError' />
          <InputField label='Password' type='password' placeholder='Enter your password' :destructive='passwordError' v-model='password' />
          <div class='row'>
            <RouterLink to=''>Forgot password?</RouterLink>
          </div>
          <HButton size='is-lg' :loading='isLoading' @click.prevent='validate'>Sign in</HButton>
        </form>
        <p class='text is-sm no-account'>Don’t have an account? <RouterLink to='/register'>Sign up</RouterLink> </p>
      </div>
    </section>
    <section class='image-wrapper'></section>
  </main>
</template>

<script setup>
import InputField from '@/components/InputField.vue'
import { ref } from 'vue'
import HButton from '@/components/HButton.vue'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '@/firebase/config'
import { useRouter } from 'vue-router'

const email = ref('')
const emailError = ref(false)
const password = ref('')
const passwordError = ref(false)
const isLoading = ref(false)

const router = useRouter()

const validate = () => {
  if (email.value === "") {
    emailError.value = true
  }
  if (password.value === "") {
    passwordError.value = true
  }
  if (name.value !== "" && email.value !== "" && password.value !== "") {
    signIn()
  }
}

const signIn = async () => {
  isLoading.value = true
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value)
    const user = userCredential.user;
    console.log(user)
    isLoading.value = false
    await router.push('/')
  } catch (error) {
    console.log(error)
    isLoading.value = false
  }
}
</script>

<style lang='scss'>
.auth-page {
    display: flex;
    height: 100vh;
  section {
    width: 50%;
  }
  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .container {
    max-width: 400px;
    width: 100%;
    text-align: center;
  }
  header {
    .logo {
      height: 48px;
      margin-bottom: 24px;
    }
    h1 {
      margin-bottom: 12px;
    }
    p {
      color: var(--gray-500);
    }
  }

  form {
    margin-top: 32px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    .button {
      width: 100%;
      margin-top: 12px;
    }
    .row {
      display: flex;
      justify-content: end;
      align-items: center;
    }
  }

  .image-wrapper {
    background-image: url('https://images.unsplash.com/photo-1678911020402-650375a7776a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80');
    background-size: cover;
    background-position: center;
  }

  .no-account {
    color: var(--gray-600);
    margin-top: 32px;
  }
}
</style>