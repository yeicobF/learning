<script setup>
import { useAuth } from "@/composables/useAuth";
import { Form, Field, ErrorMessage } from "vee-validate";
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import { object, string } from "yup";

const { login, isLoading } = useAuth();
const loginError = ref(null);
const router = useRouter();

const schema = object({
  email: string().required().email(),
  password: string().required(),
});

const onSubmit = (values) => {
  console.log(values);
  login(values)
    .then(() => router.push("/profile"))
    .catch((error) => {
      loginError.value = error.message;
    });
};

watch(loginError, () => {
  const timeoutId = setTimeout(() => {
    loginError.value = null;
  }, 3000);

  return () => clearTimeout(timeoutId);
});
</script>

<template>
  <Form
    class="grid"
    :validationSchema="schema"
    v-slot="{ meta: formMeta }"
    @submit="onSubmit"
  >
    <!-- Markup example 1: input is inside label -->
    <label for="email">
      Correo
      <Field
        type="text"
        id="email"
        name="email"
        placeholder="ej. nuevo@correo.com"
        required
        autocomplete="email"
      />
      <ErrorMessage name="email" as="small" />
    </label>

    <label for="password">
      Contraseña
      <Field
        type="password"
        id="password"
        name="password"
        placeholder="Contraseña"
        autocomplete="current-password"
        required
      />
      <ErrorMessage name="password" as="small" />
    </label>

    <button type="submit" :disabled="!formMeta.valid" :aria-busy="isLoading">
      Iniciar sesión
    </button>
    <span v-if="loginError">{{ loginError }}</span>
  </Form>
</template>
