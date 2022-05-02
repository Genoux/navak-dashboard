<template>
	<div>
		<div class="border-white rounded-md hover:border-current duration-75 ease-in bg-black text-white border border-opacity-20">
			<div class="flex flex-grow px-4 py-4 items-center gap-1 border-b border-white border-opacity-20">
				<div class="flex-1">
					<h4 class="font-medium">
						{{ fixture.name }}
					</h4>
				</div>
				<div class="border-white border-opacity-25 flex">
					<div @click="openDialog(fixture)" class="bg-black border ml-2 p-1 hover:opacity-60 cursor-pointer focus:bg-white focus:text-blue focus:outline-none">
						<mdicon name="Wrench" size="12"></mdicon>
					</div>
				</div>
			</div>
			<div class="grid grid-cols-2 p-5 gap-5 self-end">
				<div>
					<h5 class="text-xs text-white text-opacity-50 font-light">ID</h5>
					<h4 class="text-sm">{{ fixture.id }}</h4>
				</div>
				<div>
					<h5 class="text-xs text-white text-opacity-50 font-light">Universe</h5>
					<h4 class="text-sm">{{ fixture.universe }}</h4>
				</div>
				<div>
					<h5 class="text-xs text-white text-opacity-50 font-light">Address</h5>
					<h4 class="text-sm">{{ fixture.address }}</h4>
				</div>
				<div>
					<h5 class="text-xs text-white text-opacity-50 font-light">Area</h5>
					<h4 class="text-sm">{{ fixture.area }}</h4>
				</div>
			</div>
		</div>
		<div v-if="activeDialog" class="fixed w-full h-full top-0 left-0 flex z-50 items-center justify-center">
			<div @click="closeDialog" class="absolute w-full h-screen bg-dark opacity-75"></div>
			<div class="bg-black border border-white border-opacity-25 md:w-4/5 lg:w-2/4 pt-5 pb-8 px-10 w-full shadow-lg z-50 rounded-md ml-5 mr-5">
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
					class="pt-0 pb-0 grid md:grid-cols-2 gap-6 grid-cols-2 w-full"
					v-bind:class="{
						'opacity-10': loading,
						'pointer-events-none': loading
					}"
				>
        <div>
          <p class="text-sm text-white pb-2">Name</p>
          <input
            v-model="defaultValue.name"
            :placeholder="toString(selectedFixture.name)"
            class="w-full px-4 py-2 text-white bg-dark border border-white border-opacity-25 focus:outline-none focus:border-opacity-60"
          />
        </div>
					<div>
						<p class="text-sm text-white pb-2">ID</p>
						<input
							v-model="defaultValue.id"
							:placeholder="toString(selectedFixture.id)"
							class="w-full px-4 py-2 text-white bg-dark border border-white border-opacity-25 focus:outline-none focus:border-opacity-60"
						/>
					</div>
					<div>
						<p class="text-sm text-white pb-2">Universe</p>
						<input
							v-model="defaultValue.universe"
							:placeholder="toString(selectedFixture.universe)"
							class="w-full px-4 py-2 text-white bg-dark border border-white border-opacity-25 focus:outline-none focus:border-opacity-60"
						/>
					</div>
					<div>
						<p class="text-sm text-white pb-2">Address</p>
						<input
							v-model="defaultValue.address"
							:placeholder="toString(selectedFixture.address)"
							class="w-full px-4 py-2 text-white bg-dark border border-white border-opacity-25 focus:outline-none focus:border-opacity-60"
						/>
					</div>
					<!-- <div>
						<p class="text-sm text-white pb-2">Area</p>
						<input
							v-model="defaultValue.area"
							:placeholder="toString(selectedFixture.area)"
							class="w-full px-4 py-2 text-white bg-dark border border-white border-opacity-25 focus:outline-none focus:border-opacity-60"
						/>
					</div> -->
          <div class="h-full">
            <p class="text-sm text-white pb-2"> Area </p>
            <v-dropdown style="height: 42px;" @filterSelection="filterSelection($event)" CustomClass="w-full px-4 py-2 h-full rounded-md" :setAll="false" :selection="areas" :default="this.selectedFixture.area" filterBy="name"></v-dropdown>
          </div>
				</form>
				<hr class="mt-6 border-1 opacity-20 border-gray-light" />
				<div
					class="grid-flow-row md:grid-flow-row lg:grid-flow-col gap-3 pt-2 mt-6 flex"
					v-bind:class="{
						'opacity-10': loading,
						'pointer-events-none': loading
					}"
				>
					<button @click="updateFixture(selectedFixture, $event)" class="py-2 px-6 flex-2 rounded-sm text-center drop-shadow-lg bg-green text-white hover:opacity-90">
						<div class="align-middle content-center">
							<span class="mr-1">Done</span>
						</div>
					</button>
					<button @click="deleteFixture($event)" class="py-2 px-6 flex-2 text-center drop-shadow-lg bg-red-500 text-white hover:opacity-90 rounded-sm">
						<div class="content-center align-middle"><mdicon class="m-auto" name="TrashCan"></mdicon></div>
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import 'dotenv/config';
import Areas from "../../../../imports/api/collections/Areas";
export default {
  components: {
    'v-dropdown': () => import('../dropdown.vue')
  },
	data() {
		return {
			api: '192.168.1.209:8081' || process.env.API,
			loading: false,
      selected: '',
			selectedFixture: '',
			activeDialog: false,
			loading: false,
			defaultValue: {
				id: '',
				name: '',
				area: '',
				universe: '',
				address: ''
			}
		};
	},
	props: {
		fixture: Object
	},
  meteor: {
    $subscribe: {
      areas: []
    },
    areas() {
    return Areas.find({});
    }
  },
  computed: {
  },
	methods: {
    filterSelection(e) {
      this.selected = e;
      this.defaultValue.area = e;
    },
    async deleteFixture(event) {
      event.preventDefault();
      this.loading = true;
      try {
        await this.$http.delete(`http://${this.$param.api}/api/fixtures/${this.selectedFixture.id}`);
        this.openNotification('top-center', 'success', '👍 Succelfully updated position!', 'You can check the changes in the list');
        this.loading = false;
        this.activeDialog = false;
      } catch (err) {
        console.log('error', err);
        this.openNotification('top-center', 'danger', '💀 Something want wrong, please try again', `${err}`);
        this.loading = false;
      }
    },
		openNotification(position = null, color, title, text) {
			if (this.noti === undefined) {
				this.noti = this.$vs.notification({
					color,
					position,
					square: true,
					title: title,
					text: text
				});
				return;
			}
			if (this.noti !== null && this.noti !== undefined) {
				this.noti.close();
				this.noti = this.$vs.notification({
					color,
					position,
					square: true,
					title: title,
					text: text
				});
			}
		},
		updateFixture(obj, event) {
			event.preventDefault();
			this.dialogError = false;
			this.showColorPicker = false;
			const objJson = {
				id: obj.id,
				name: obj.name,
				area: obj.area,
				universe: obj.universe,
				address: obj.address
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
			setTimeout(() => {
				this.$http
					.put(`http://${this.$param.api}/api/fixtures/${obj.id}`, this.defaultValue)
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
			this.defaultValue.name = e.name;
			this.defaultValue.area = e.area;
			this.defaultValue.universe = e.universe;
			this.defaultValue.address = e.address;
			this.selectedFixture = e;
			this.dialogClose = false;
			this.activeDialog = true;
		}
	}
};
</script>
