<template>
	<div>
    <sidebar />
    <lanterns />
	</div>
</template>

<script>
import Lanterns from './components/Lanterns.vue';
import Sidebar from './components/Sidebar.vue';


export default {
	components: {
		Lanterns,
		Sidebar
	},
	 mounted() {
      }
};
</script>
