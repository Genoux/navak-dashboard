<template>
	<div>
    <sidebar />
    <links />
	</div>
</template>

<script>
import Links from './components/Links.vue';
import Sidebar from './components/Sidebar.vue';

export default {
	components: {
		Links,
		Sidebar
	}
};
</script>
