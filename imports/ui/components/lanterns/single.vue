<template>
	<div>
		<div
			class="border-white rounded-sm hover:border-current duration-75 ease-in bg-black text-white border border-opacity-20"
			v-bind:class="{
				'opacity-30': !lantern.status,
				'pointer-events-none': !lantern.status
			}"
		>
			<div v-bind:style="'border-color: rgba(' + lantern.rgb + ')'" style="border-width:2px" class="rounded-t-sm "></div>
			<div class="flex flex-grow px-4 py-4 items-center gap-1 border-b border-white border-opacity-10">
				<div
					v-bind:class="{
						'text-status-green': lantern.status,
						'text-gray': !lantern.status
					}"
				>
					<mdicon size="21" class="m-auto" name="Power" />
				</div>
				<div class="flex-1">
					<h4 class="font-medium">
						{{ lantern.id }}
						<span class="font-light opacity-50 pl-1">#{{ lantern.group }}</span>
					</h4>
				</div>
				<div class="flex mr-1">
					<div class="border grid grid-flow-col gap-0 divide-x">
						<span class="self-center px-2 animate-pulse text-red-500">
							<mdicon size="12" name="Heart" />
						</span>
						<span class="px-2 p-0.5 font-bold text-xs">
							{{ lantern.pulse }}
						</span>
					</div>
				</div>
				<div class="flex mr-1">
					<!-- <div class="border grid grid-flow-col gap-0 divide-x">
						<span class="self-center px-2">
							<mdicon size="12" name="wifi" />
						</span>
						<span class="px-2 p-0.5 text-xs">{{ lantern.wifiSignal }}%</span>
					</div> -->
				</div>
				<div class="border-l border-white border-opacity-25 flex">
					<div @click="flash(lantern)" class="border ml-4 p-1 hover:opacity-60 cursor-pointer">
						<svg v-if="apiCalling" fill="white" class="animate-spin h-3 w-3" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="24" height="24" viewBox="0 0 24 24">
							<path d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z" />
						</svg>
						<mdicon v-else size="12" name="Flash" />
					</div>
					<div @click="openDialog(lantern)" class="bg-black border ml-2 p-1 hover:opacity-60 cursor-pointer focus:bg-white focus:text-blue focus:outline-none">
						<mdicon name="Wrench" size="12"></mdicon>
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
		<div v-if="activeDialog" class="fixed w-full h-full top-0 left-0 flex z-50 items-center justify-center overflow-y-scroll">
			<div @click="closeDialog" class="absolute w-full h-screen bg-dark opacity-75"></div>
			<div class="bg-black border border-white border-opacity-25  md:w-4/5 lg:w-2/4  pt-5 pb-8 px-10 w-full shadow-lg z-50">
				<div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" v-if="loading">
					<svg fill="white" class="animate-spin h-8 w-8" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="24" height="24" viewBox="0 0 24 24">
						<path d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z" />
					</svg>
				</div>
				<div
					@click="closeDialog"
					class="float-right text-white hover:opacity-80 cursor-pointer relative bottom-1 left-6"
					v-bind:class="{
						'opacity-10': loading,
						'pointer-events-none': loading
					}"
				>
					<mdicon name="Close"></mdicon>
				</div>
				<form
					class="pt-0 pb-0 grid md:grid-cols-2 gap-6  grid-cols-2 "
					v-bind:class="{
						'opacity-10': loading,
						'pointer-events-none': loading
					}"
				>
					<div>
						<p class="text-sm text-white pb-2">ID</p>
						<input
							v-model="defaultValue.id"
							:placeholder="toString(selectedLantern.id)"
							class="w-full px-4 py-2 text-white bg-dark border border-white border-opacity-25 focus:outline-none focus:border-opacity-60"
						/>
					</div>
					<div>
						<p class="text-sm text-white pb-2">StartUnivers</p>
						<input
							v-model="defaultValue.startUniverse"
							:placeholder="toString(selectedLantern.startUniverse)"
							class="w-full px-4 py-2 text-white bg-dark border border-white border-opacity-25 focus:outline-none focus:border-opacity-60"
						/>
					</div>
					<div>
						<p class="text-sm text-white pb-2">Pulse</p>
						<input
							v-model="defaultValue.pulse"
							:placeholder="toString(selectedLantern.pulse)"
							class="w-full px-4 py-2 text-white bg-dark border border-white border-opacity-25 focus:outline-none focus:border-opacity-60"
						/>
					</div>
					<div>
						<p class="text-sm text-white pb-2">Group</p>
						<input
							v-model="defaultValue.group"
							:placeholder="toString(selectedLantern.group)"
							class="w-full px-4 py-2 text-white bg-dark border border-white border-opacity-25 focus:outline-none focus:border-opacity-60"
						/>
					</div>
					<div class="relative z-50 overflow-visible">
						<p class="text-sm text-white">Color</p>
						<p class="text-white text-xs p-0 m-0 opacity-75">{{ formatColor() }}</p>
						<div :class="{'hover:opacity-90' : !showColorPicker, 'cursor-pointer ' : !showColorPicker}" class="transition-all border text-xs pt-1 pb-1 text-white border-opacity-20 w-full  flex border-white mt-3 mb-3 h-8" @click="showColorPicker = true" v-bind:style="'background-color: rgba(' + formatColor() + ')'">
              <mdicon class="self-center text-center m-auto" v-if="!showColorPicker" name="Pencil" size="16" />
              </div>
                <div class="text-black absolute left-full ml-6 top-0">
                  <span class="absolute z-50 m-2 cursor-pointer hover:opacity-90 focus:ring"  @click="showColorPicker = false"><mdicon class=""  name="Close" size="18" /></span>
                    <color-picker class=" z-30" v-if="showColorPicker" v-model="colors" />
                </div>
					</div>
      
				</form>
        <hr class="mt-6 border-1 opacity-20 border-gray-light">
				<div
					class="grid-flow-row md:grid-flow-row lg:grid-flow-col flex gap-2 pt-2 mt-6"
					v-bind:class="{
						'opacity-10': loading,
						'pointer-events-none': loading
					}"
				>
					<button @click="updateLantern(selectedLantern, $event)" class="py-2 px-6 flex-1 rounded-sm grid-cols-1 text-center drop-shadow-lg bg-green text-white hover:opacity-90">
            <div class="m-auto  align-middle content-center">
              <span class="mr-1">Done</span>
            </div>
					</button>
					<button @click="restart(lantern)" class="py-2 px-6  text-center rounded-sm drop-shadow-lg bg-indigo-500 text-white hover:opacity-90">
            <div class="m-auto  align-middle content-center">
              <span class="mr-1">Reboot</span>
            </div>
					</button>
          <button @click="reset(lantern)" class="py-2 px-6  rounded-sm text-center drop-shadow-lg bg-orange text-white hover:opacity-90">
              <div class="m-auto  align-middle content-center">
                <span class="mr-1">Reset</span>
              </div>
          </button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import {Chrome} from 'vue-color';
import 'dotenv/config'
export default {
	components: {
		'color-picker': Chrome
	},
	data() {
		return {
			api: '192.168.1.209:8081' || process.env.API,
			showColorPicker: false,
			colors: {
				rgba: {
					r: 171,
					g: 167,
					b: 167,
					a: 255
				}
			},
			apiCalling: false,
			clicked: false,
			selectedLantern: '',
			activeDialog: false,
			loading: false,
			defaultValue: {
				id: '',
				hostName: '',
				macAddress: '',
				ipAddress: '',
				startUniverse: '',
				status: false,
				pulse: '',
				group: '',
				rgb: ''
			}
		};
	},
	props: {
		lantern: Object
	},
	methods: {
		colorPicker() {
			let rgb = this.selectedLantern.rgb.split(',');
			let r = rgb[0];
			let g = rgb[1];
			let b = rgb[2];
			let a = rgb[3];
			this.colors = {
				rgba: {
					r: r,
					g: g,
					b: b,
					a: '255'
				}
			};
		},
		formatColor() {
			this.defaultValue.rgb = `${this.colors.rgba.r}, ${this.colors.rgba.g}, ${this.colors.rgba.b}, ${this.colors.rgba.a}`;
			return `${this.colors.rgba.r}, ${this.colors.rgba.g}, ${this.colors.rgba.b}, ${this.colors.rgba.a}`;
		},
    reset(elm) {
      this.loading = true;
      try {
        this.$http
          .put(`http://${this.$param.api}/api/lanterns/reset/${elm.id}`, {
            id: elm.id
          })
          .then((response) => {
            console.log('response', response);
            this.loading = false;
            this.closeDialog();
            this.openNotification('top-center', 'success', '🔥 Rebooted! ', `Lantern ${elm.id} reset successfully!`);
          });
      } catch (error) {
        console.log(error);
        this.openNotification('top-center', 'danger', '❌ Oups! ', `${error}`);
        this.loading = false;
      }
    },
		restart(elm) {
			this.loading = true;
			try {
				this.$http
					.post(`http://${this.$param.api}/api/lanterns/reboot`, {
						id: elm.id
					})
					.then((response) => {
						console.log('response', response);
						this.loading = false;
						this.closeDialog();
						this.openNotification('top-center', 'success', '🔥 Rebooted! ', `Lantern ${elm.id} restarted successfully!`);
					});
			} catch (error) {
				console.log(error);
				this.openNotification('top-center', 'danger', '❌ Oups! ', `${error}`);
				this.loading = false;
			}
		},
		flash(elm) {
			this.apiCalling = true;
			try {
				this.$http
					.post(`http://${this.$param.api}/api/lanterns/flash`, {
						id: elm.id
					})
					.then((response) => {
						this.openNotification('top-center', 'success', '⚡ FLASH! ', `Lantern ${elm.id} flashed⚡⚡ !`);
						this.apiCalling = false;
					});
			} catch (error) {
				console.log(error);
				this.openNotification('top-center', 'danger', '❌ Oups! ', `${error}`);
				this.apiCalling = false;
			}
		},
		openNotification(position = null, color, title, text) {
			this.noti = this.$vs.notification({
				color,
				position,
				square: true,
				title: title,
				text: text
			});
		},
		updateLantern(obj, event) {
			event.preventDefault();
			this.dialogError = false;
			this.showColorPicker = false;
			const objJson = {
				id: obj.id,
				hostName: obj.hostName,
				macAddress: obj.macAddress,
				ipAddress: obj.ipAddress,
				startUniverse: obj.startUniverse,
				status: obj.status,
				pulse: obj.pulse,
				group: obj.group,
				rgb: obj.rgb.replace(/\s/g, '')
			};
			// check if obj is same as data
			if (JSON.stringify(objJson) === JSON.stringify(this.defaultValue)) {
				this.openNotification('top-center', '#7d33ff', '😲 Hey!', 'No changes made');
				this.loading = false;
				this.activeDialog = false;
				return;
			}
			this.loading = true;
			this.dialogClose = true;
      console.log("🚀 ~ file: single.vue ~ line 379 ~ setTimeout ~ obj.id", `http://${this.$param.api}/api/lanterns/${obj.id}`);

			setTimeout(() => {
				// update lantern to the API??
				this.$http
					.put(`http://${this.$param.api}/api/lanterns/${obj.id}`, this.defaultValue)
					.then((response) => {
						console.log('response', response);
						this.openNotification('top-center', 'success', '👍 Succelfully updated lantern!', 'You can check the changes in the list');
						this.loading = false;
						this.dialogClose = false;
						this.activeDialog = false;
						this.showColorPicker = false;
					})
					.catch((error) => {
						console.log(error);
						this.openNotification('top-center', 'danger', '💀 Something want wrong, please try again', `${error}`);
						this.loading = false;
						this.dialogClose = false;
						this.activeDialog = false;
						this.showColorPicker = false;
					});
			}, 1000);
		},
		closeDialog() {
			if (this.loading == true) {
				return;
			}
			this.dialogError = false;
			this.activeDialog = false;
			this.showColorPicker = false;
		},
		openDialog(e) {
			this.defaultValue.id = e.id;
			this.defaultValue.hostName = e.hostName;
			this.defaultValue.macAddress = e.macAddress;
			this.defaultValue.ipAddress = e.ipAddress;
			this.defaultValue.startUniverse = e.startUniverse;
			this.defaultValue.status = e.status;
			this.defaultValue.pulse = e.pulse;
			this.defaultValue.group = e.group;
			this.defaultValue.rgb = e.rgb;
			this.selectedLantern = e;
			this.dialogClose = false;
			this.activeDialog = true;
			this.colorPicker();
		}
	}
};
</script>
