<template>
	<div>
		<div class="hover:border-current cursor-pointer bg-black text-white border rounded-md border-white border-opacity-20" v-bind:class="{'opacity-50': !lantern.status}">
			<div class="flex flex-grow px-4 py-4 items-center gap-2 border-b border-white border-opacity-20">
				<div v-bind:class="{'text-status-green': lantern.status, 'text-gray': !lantern.status}">
					<mdicon size="21" class="m-auto" name="Power" />
				</div>
				<div class="flex-1">
					<h4 class="font-medium">
						{{ lantern.id }}
						<span class="font-light opacity-50 pl-1">#{{ lantern.group }}</span>
					</h4>
				</div>

        <div class="flex mr-2">
          <div class="w-8 rounded-sm border border-white border-opacity-20 mr-2" v-bind:style="'background-color: rgba(' + lantern.rgb + ')'"></div>
          <div class="border grid grid-flow-col gap-0 divide-x rounded-sm">
            <span class="self-center px-2"><mdicon size="16" name="Pulse" /></span>
            <span class="px-2 font-bold">{{ lantern.pulse }}</span>
          </div>
        </div>
  
        <div class="border-l border-white border-opacity-25 flex">
          <div class="bg-black border ml-4 p-1 hover:opacity-60 cursor-pointer focus:bg-white focus:text-blue focus:outline-none">
            <mdicon name="Flash" size="12"></mdicon>
          </div>
          <div class="bg-black border ml-2 p-1 hover:opacity-60 cursor-pointer focus:bg-white focus:text-blue focus:outline-none">
            <mdicon name="Eye" size="12"></mdicon>
          </div>
          <div class="bg-black border ml-2 p-1 hover:opacity-60 cursor-pointer focus:bg-white focus:text-blue focus:outline-none">
            <mdicon name="Flash" size="12"></mdicon>
          </div>
        </div>
			</div>
     
			<div class="grid grid-cols-2 p-5 gap-5 self-end">
				<div>
					<h5 class="text-xs text-white text-opacity-50 font-light">hostName</h5>
					<h4 class="text-sm">{{ lantern.hostName }}</h4>
				</div>
				<div>
					<h5 class="text-xs text-white text-opacity-50 font-light">macAddress</h5>
					<h4 class="text-sm">{{ lantern.macAddress }}</h4>
				</div>
				<div>
					<h5 class="text-xs text-white text-opacity-50 font-light">ipAddress</h5>
					<h4 class="text-sm">{{ lantern.ipAddress }}</h4>
				</div>
				<div>
					<h5 class="text-xs text-white text-opacity-50 font-light">startUniverse</h5>
					<h4 class="text-sm">{{ lantern.startUniverse }}</h4>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	clicked() {
		this.$emit('clicked');
	},
	props: {
		lantern: Object
	}
};
</script>
