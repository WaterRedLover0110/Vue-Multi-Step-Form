<template>
	<v-container>
		<v-row>
			<v-col cols="3">
				<v-list>
					<v-list-item v-for="(label, index) in sections" :key="index" :class="{ active: index === step }">
						<v-list-item-title>{{ label }}</v-list-item-title>
					</v-list-item>
				</v-list>
			</v-col>
			<v-col cols="9">
				<FormStep :section="currentSection" />
				<v-row justify="space-between" class="mt-4">
					<v-btn @click="prevStep" :disabled="step === 0">Back</v-btn>
					<v-btn v-if="step < sections.length - 1" color="primary" @click="nextStep">
						Next
					</v-btn>
					<v-btn v-else color="success" @click="submitForm">
						Submit
					</v-btn>
				</v-row>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import FormStep from './FormStep.vue';

export default {
	components: { FormStep },
	computed: {
		...mapState(['step']),
		...mapGetters(['currentSection', 'currentFields']),
		sections() {
			return ['Personal Information', 'Job Details', 'Preferences', 'Security'];
		},
	},
	methods: {
		...mapActions(['setStep']),
		nextStep() {
			this.setStep(this.step + 1);
		},
		prevStep() {
			this.setStep(this.step - 1);
		},
		submitForm() {
			// Function to remove circular references and filter unnecessary data
			const cleanData = (obj, template, seen = new WeakSet()) => {
				if (obj && typeof obj === 'object') {
					if (seen.has(obj)) {
						return; // Avoid circular references
					}
					seen.add(obj);
					if (Array.isArray(obj)) {
						return obj.map((item) => cleanData(item, template, seen));
					}
					const cleanedObj = {};
					for (const key in template) {
						if (Object.prototype.hasOwnProperty.call(template, key)) {
							cleanedObj[key] =
								key in obj && obj[key] !== undefined
									? cleanData(obj[key], template[key], seen)
									: template[key]; // Use default value if not defined
						}
					}
					return cleanedObj;
				}
				return obj; // Return value directly if not an object
			};

			// Template for default values
			const defaultData = {
				personalInfo: {
					name: '',
					email: '',
					phone: '',
					address: '',
				},
				jobDetails: {
					company: '',
					position: '',
					experience: 0,
					skills: '',
				},
				preferences: {
					newsletter: false,
					notifications: false,
					theme: 'light',
				},
				security: {
					password: '',
					confirmPassword: '',
					twoFactorAuth: false,
				},
			};

			// Clean the Vuex state data using the template
			const finalData = cleanData(this.$store.state.data, defaultData);

			// Log the sanitized data
			console.log('Final Profile Data:', finalData);
			alert('Form submitted! Check the console for data.');
		},
	},
};
</script>

<style scoped>
.active {
	font-weight: bold;
	color: #1976d2;
}
</style>
