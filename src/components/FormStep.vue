<template>
  <v-form ref="form">
    <!-- Personal Information Form -->
    <template v-if="section === 'personalInfo'">
      <v-text-field v-model="form.name" label="Name"></v-text-field>
      <v-text-field v-model="form.email" label="Email"></v-text-field>
      <v-text-field v-model="form.phone" label="Phone"></v-text-field>
      <v-text-field v-model="form.address" label="Address"></v-text-field>
    </template>

    <!-- Job Details Form -->
    <template v-else-if="section === 'jobDetails'">
      <v-text-field v-model="form.company" label="Company"></v-text-field>
      <v-text-field v-model="form.position" label="Position"></v-text-field>
      <v-text-field
        v-model="form.experience"
        type="number"
        label="Years of Experience"
      ></v-text-field>
      <v-text-field v-model="form.skills" label="Skills"></v-text-field>
    </template>

    <!-- Preferences Form -->
    <template v-else-if="section === 'preferences'">
      <v-checkbox v-model="form.newsletter" label="Subscribe to Newsletter"></v-checkbox>
      <v-checkbox v-model="form.notifications" label="Enable Notifications"></v-checkbox>
      <v-select
        v-model="form.theme"
        :items="['light', 'dark']"
        label="Theme"
      ></v-select>
    </template>

    <!-- Security Form -->
    <template v-else-if="section === 'security'">
      <v-text-field
        v-model="form.password"
        label="Password"
        type="password"
      ></v-text-field>
      <v-text-field
        v-model="form.confirmPassword"
        label="Confirm Password"
        type="password"
      ></v-text-field>
      <v-checkbox
        v-model="form.twoFactorAuth"
        label="Enable Two-Factor Authentication"
      ></v-checkbox>
    </template>
  </v-form>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  props: {
    section: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();

    // Computed binding with Vuex store
    const form = computed({
      get() {
        return store.state.data[props.section];
      },
      set(updatedValues) {
        store.dispatch('updateSection', {
          section: props.section,
          values: updatedValues,
        });
      },
    });

    return { form };
  },
};
</script>
