<template>
  <div class="auth-page">
    <div class="auth-page__card">

      <!-- Brand panel (mobile: stacked hero | desktop: left panel) -->
      <div class="auth-page__brand">
        <BrandHero
          primary-color="#1A3B8A"
          :logo-size="80"
          :height="340"
        />
      </div>

      <!-- Form area -->
      <div class="auth-page__body">
        <!-- Tab switcher -->
        <AppTabs
          :tabs="[{ label: 'Sign In', value: 'signin' }, { label: 'Sign Up', value: 'signup' }]"
          v-model:active="activeTab"
          variant="pill"
        />

        <!-- Sign In -->
        <div v-if="activeTab === 'signin'" class="auth-page__form">
          <h2 class="auth-page__heading">Sign In</h2>
          <AppInput placeholder="Email Address..." type="email" />
          <AppInput placeholder="Enter password..." type="password" />
          <AppButton @click="$emit('signIn')">Sign in</AppButton>
          <div class="auth-page__center">
            <a class="auth-page__link" href="#" @click.prevent="$emit('forgotPassword')">
              Forgot password?
            </a>
          </div>
          <div class="auth-page__or">
            <span class="auth-page__or-line" />
            <span class="auth-page__or-text">OR</span>
            <span class="auth-page__or-line" />
          </div>
          <AppButton variant="social" @click="$emit('continueWithApple')">
            <svg aria-hidden="true" width="18" height="20" viewBox="0 0 18 22" fill="currentColor">
              <path d="M17.05 15.23c-.4.92-.59 1.33-1.1 2.15-.72 1.14-1.73 2.56-2.98 2.57-1.12.01-1.4-.73-2.92-.72-1.52.01-1.83.74-2.95.73-1.26-.01-2.22-1.29-2.94-2.43C2.1 14.36 1.93 10.87 3.34 9.04c1-1.3 2.58-2.06 4.01-2.06 1.49 0 2.43.74 3.66.74 1.2 0 1.93-.74 3.66-.74 1.27 0 2.68.69 3.68 1.88-3.23 1.77-2.7 6.38.7 7.37ZM12.14 4.9c.56-.72.99-1.74.83-2.78-.92.06-2 .65-2.63 1.41-.57.69-1.04 1.72-.86 2.72 1 .03 2.04-.57 2.66-1.35Z" />
            </svg>
            Continue with Apple
          </AppButton>
          <AppButton variant="social" @click="$emit('continueWithGoogle')">
            <svg aria-hidden="true" width="18" height="18" viewBox="0 0 18 18">
              <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615Z" fill="#4285F4"/>
              <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z" fill="#34A853"/>
              <path d="M3.964 10.706A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.706V4.962H.957A8.997 8.997 0 0 0 0 9c0 1.452.348 2.827.957 4.038l3.007-2.332Z" fill="#FBBC05"/>
              <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.962L3.964 7.294C4.672 5.167 6.656 3.58 9 3.58Z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </AppButton>
        </div>

        <!-- Sign Up -->
        <div v-else class="auth-page__form">
          <h2 class="auth-page__heading">Create Account</h2>
          <AppInput placeholder="Full Name..." />
          <AppSelect
            placeholder="Age..."
            :options="ageOptions"
          />
          <AppInput placeholder="Phone Number..." type="tel" />
          <AppInput placeholder="Email Address..." type="email" />
          <AppInput placeholder="Create password..." type="password" />
          <AppButton @click="$emit('createAccount')">Create Account</AppButton>
          <div class="auth-page__or">
            <span class="auth-page__or-line" />
            <span class="auth-page__or-text">OR</span>
            <span class="auth-page__or-line" />
          </div>
          <AppButton variant="social" @click="$emit('continueWithApple')">
            <svg aria-hidden="true" width="18" height="20" viewBox="0 0 18 22" fill="currentColor">
              <path d="M17.05 15.23c-.4.92-.59 1.33-1.1 2.15-.72 1.14-1.73 2.56-2.98 2.57-1.12.01-1.4-.73-2.92-.72-1.52.01-1.83.74-2.95.73-1.26-.01-2.22-1.29-2.94-2.43C2.1 14.36 1.93 10.87 3.34 9.04c1-1.3 2.58-2.06 4.01-2.06 1.49 0 2.43.74 3.66.74 1.2 0 1.93-.74 3.66-.74 1.27 0 2.68.69 3.68 1.88-3.23 1.77-2.7 6.38.7 7.37ZM12.14 4.9c.56-.72.99-1.74.83-2.78-.92.06-2 .65-2.63 1.41-.57.69-1.04 1.72-.86 2.72 1 .03 2.04-.57 2.66-1.35Z" />
            </svg>
            Continue with Apple
          </AppButton>
          <AppButton variant="social" @click="$emit('continueWithGoogle')">
            <svg aria-hidden="true" width="18" height="18" viewBox="0 0 18 18">
              <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615Z" fill="#4285F4"/>
              <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z" fill="#34A853"/>
              <path d="M3.964 10.706A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.706V4.962H.957A8.997 8.997 0 0 0 0 9c0 1.452.348 2.827.957 4.038l3.007-2.332Z" fill="#FBBC05"/>
              <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.962L3.964 7.294C4.672 5.167 6.656 3.58 9 3.58Z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </AppButton>
          <p class="auth-page__signin-hint">
            Already have an account?
            <a class="auth-page__link auth-page__link--accent" href="#" @click.prevent="activeTab = 'signin'">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BrandHero from '../BrandHero/BrandHero.vue'
import AppTabs from '../AppTabs/AppTabs.vue'
import AppInput from '../AppInput/AppInput.vue'
import AppSelect from '../AppSelect/AppSelect.vue'
import AppButton from '../AppButton/AppButton.vue'

const props = withDefaults(defineProps<{
  /** Initial active tab */
  initialTab?: 'signin' | 'signup'
}>(), {
  initialTab: 'signin',
})

defineEmits<{
  signIn: []
  createAccount: []
  forgotPassword: []
  continueWithApple: []
  continueWithGoogle: []
}>()

const activeTab = ref<'signin' | 'signup'>(props.initialTab)

const ageOptions = Array.from({ length: 83 }, (_, i) => ({
  label: String(i + 13),
  value: String(i + 13),
}))
</script>

<style scoped>
.auth-page {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 100vh;
  background: var(--color-gray-50);
  padding: var(--space-xl) var(--space-sm);
  font-family: var(--font-family-base);
  box-sizing: border-box;
}

.auth-page__card {
  width: 390px;
  background: var(--color-white);
  border-radius: var(--radius-lg);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.12);
  overflow: hidden;
}

.auth-page__body {
  display: flex;
  flex-direction: column;
  gap: var(--space-md2);
  padding: var(--space-md2) var(--space-md2) 28px;
}

.auth-page__form {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm2);
}

.auth-page__heading {
  font-family: var(--font-family-base);
  font-size: var(--text-xl);
  font-weight: var(--font-bold);
  color: var(--color-dark-text);
  margin: 0;
}

.auth-page__center {
  text-align: center;
}

.auth-page__link {
  font-family: var(--font-family-base);
  font-size: var(--text-body2);
  font-weight: var(--font-medium);
  color: var(--color-gray-400);
  text-decoration: none;
}

.auth-page__link:hover {
  text-decoration: underline;
}

.auth-page__link--accent {
  color: var(--color-accent);
  text-decoration: underline;
}

.auth-page__or {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  width: 100%;
}

.auth-page__or-line {
  flex: 1;
  height: var(--stroke-thin);
  background: var(--color-gray-200);
}

.auth-page__or-text {
  font-family: var(--font-family-base);
  font-size: var(--text-base);
  font-weight: var(--font-medium);
  color: var(--color-gray-400);
}

.auth-page__signin-hint {
  text-align: center;
  font-size: var(--text-xs);
  font-weight: var(--font-medium);
  color: var(--color-gray-400);
  margin: 0;
}

/* ── Desktop: split-screen layout ── */
@media (min-width: 1024px) {
  .auth-page {
    padding: 0;
    align-items: stretch;
    background: var(--color-white);
  }

  .auth-page__card {
    width: 100%;
    max-width: none;
    border-radius: 0;
    box-shadow: none;
    display: flex;
    flex-direction: row;
    min-height: 100vh;
  }

  /* Left panel: brand hero fills ~40% */
  .auth-page__brand {
    flex: 0 0 40%;
    display: flex;
    flex-direction: column;
  }

  .auth-page__brand :deep(.bh) {
    flex: 1;
    height: 100%;
    min-height: 100vh;
    border-radius: 0;
  }

  /* Right panel: centered content with max-width cap */
  .auth-page__body {
    flex: 1;
    align-items: center;
    justify-content: center;
    overflow-y: auto;
    padding: var(--space-xl) 60px;
  }

  /* Cap the inner form width so it doesn't stretch at 1440px */
  .auth-page__body > * {
    width: 100%;
    max-width: 440px;
  }
}
</style>
