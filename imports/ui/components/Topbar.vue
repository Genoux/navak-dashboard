<template>
	<div>
		<div class="w-full flex bg-dark border-b border-white border-opacity-20 h-14">
			<h1 class="text-white ml-5 align-middle self-center content-center font-weight-regular">
				{{ $route.name }}
			</h1>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		title: {
			type: String,
			default: 'Title'
		}
	}
};
</script>
