<template>
	<div>
		<div class="hover:border-current duration-75 ease-in bg-black text-white border rounded-sm border-white border-opacity-20" v-bind:class="{'opacity-20': !lantern.status, 'pointer-events-none' : !lantern.status}">
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
						<span class="self-center px-2"><mdicon size="18" name="Pulse" /></span>
						<span class="px-2 font-bold">{{ lantern.pulse }}</span>
					</div>
				</div>
				<div class="border-l border-white border-opacity-25 flex">
					<div class="bg-black border ml-4 p-1 hover:opacity-60 cursor-pointer active:text-red-400">
						<mdicon name="Flash" size="12"></mdicon>
					</div>
					<div @click="openDialog(lantern)" class="bg-black border ml-2 p-1 hover:opacity-60 cursor-pointer focus:bg-white focus:text-blue focus:outline-none">
						<mdicon name="Wrench" size="12"></mdicon>
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
		<div v-if="activeDialog" class="fixed w-full h-full top-0 left-0 flex z-50 items-center justify-center overflow-y-scroll">
			<div @click="closeDialog" class="absolute w-full h-screen bg-dark opacity-75"></div>
			<div class="bg-black border border-white border-opacity-25 pt-5 pb-8 px-10 rounded-lg shadow-lg z-50 overflow-y-auto">
				<div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" v-if="loading">
          <svg fill='white' class="animate-spin h-8 w-8 " xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="24" height="24" viewBox="0 0 24 24">
            <path d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z" />
          </svg>
        </div>
				<div @click="closeDialog" class="float-right text-white hover:opacity-80 cursor-pointer relative bottom-1 left-6"  v-bind:class="{'opacity-10': loading, 'pointer-events-none': loading }"><mdicon name="Close"></mdicon></div>
        <div v-if="dialogError" class="text-white">{{ dialogErrorMessage }}</div>
        <form class="grid md:grid-cols-2 gap-6 w-full sm:grid-cols-2" v-bind:class="{'opacity-10': loading, 'pointer-events-none': loading }">
         
					<div>
						<p class="text-sm text-white pb-2">ID</p>
						<input
							v-model="defaultValue.id"
							:placeholder="toString(selectedLantern.id)"
							class="w-auto px-4 py-2 text-white bg-dark border border-white border-opacity-25 rounded-md focus:outline-none focus:border-opacity-60"
						/>
					</div>
					<div>
						<p class="text-sm text-white pb-2">StartUnivers</p>
						<input
							v-model="defaultValue.startUniverse"
							:placeholder="toString(selectedLantern.startUniverse)"
							class="w-auto px-4 py-2 text-white bg-dark border border-white border-opacity-25 rounded-md focus:outline-none focus:border-opacity-60"
						/>
					</div>
					<div>
						<p class="text-sm text-white pb-2">Pulse</p>
						<input
							v-model="defaultValue.pulse"
							:placeholder="toString(selectedLantern.pulse)"
							class="w-auto px-4 py-2 text-white bg-dark border border-white border-opacity-25 rounded-md focus:outline-none focus:border-opacity-60"
						/>
					</div>
					<div>
						<p class="text-sm text-white pb-2">Group</p>
						<input
							v-model="defaultValue.group"
							:placeholder="toString(selectedLantern.group)"
							class="w-auto px-4 py-2 text-white bg-dark border border-white border-opacity-25 rounded-md focus:outline-none focus:border-opacity-60"
						/>
					</div>
					<div>
						<p class="text-sm text-white pb-2">Color</p>
						<input
							v-model="defaultValue.rgb"
							:placeholder="selectedLantern.rgb"
							class="w-auto px-4 py-2 text-white bg-dark border border-white border-opacity-25 rounded-md focus:outline-none focus:border-opacity-60"
						/>
					</div>
				</form>
				<div class="grid grid-flow-row grid-cols-12 gap-3 pt-2 mt-6" v-bind:class="{'opacity-10': loading, 'pointer-events-none': loading }">
					<button @click="updateLantern(selectedLantern, $event)" class="py-2 px-3 flex text-center drop-shadow-lg bg-green  rounded-lg text-white hover:opacity-90"><mdicon class="m-auto" name='CheckBold'></mdicon></button>
					<button @click="deleteItem" class="py-2 px-3 flex text-center drop-shadow-lg bg-red-500  rounded-lg text-white hover:opacity-90"><mdicon class="m-auto" name="Delete" /></button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			selectedLantern: '',
			activeDialog: false,
			loading: false,
      dialogErrorMessage: '',
      dialogError: false,
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
		deleteItem() {
			this.loading = true;
			this.dialogClose = false;
			setTimeout(() => {
				Meteor.call(
					'deleteLantern',
					{
						_id: this.selectedLantern._id
					},
					(error) => {
						if (error) {
							this.openNotification('top-center', 'danger', '💀 Something want wrong, please try again', 'It might be the data passing to the server, please check the console');
							this.loading = false;
						} else {
							this.openNotification('top-center', 'success', '💢 Succelfully deleted lantern!', 'You can check the changes in the list');
							this.loading = false;
							this.selectedLantern = '';
							this.noti.close();
						}
					}
				);
			}, 500);
		},
		verification(obj) {
      if (obj.pulse < 0 || obj.startUniverse < 0 || obj.pulse < 0 || obj.group < 0) {
        this.dialogError = true;
        this.dialogErrorMessage = `'Value cannot be negative'`;
        return false;
      }else{
        this.dialogError = false;
        return true;
      }
      if (obj.id.length !== 4) {
        this.dialogError = true;
        this.dialogErrorMessage = 'ID need to be 4 characters long';
        return false;
      }else{
        return true;
      }
		},
		openNotification(position = null, color, title, text) {
			this.noti = this.$vs.notification({
				color,
				position,
				title: title,
				text: text
			});
		},
		updateLantern(obj, event) {
			event.preventDefault();
      this.dialogErrorMessage = '';
      this.dialogError = false;
      console.log('!this.verification(this.defaultValue)', !this.verification(this.defaultValue));
      if(!this.verification(this.defaultValue)) {
        return;
      }
			const objJson = {
				id: obj.id,
				hostName: obj.hostName,
				macAddress: obj.macAddress,
				ipAddress: obj.ipAddress,
				startUniverse: obj.startUniverse,
				status: obj.status,
				pulse: obj.pulse,
				group: obj.group,
				rgb: obj.rgb
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
				Meteor.call(
					'editLantern',
					{
						data: this.defaultValue,
						_id: obj._id
					},
					(error) => {
						if (error) {
							this.openNotification('top-center', 'danger', '💀 Something want wrong, please try again', 'It might be the data passing to the server, please check the console');
							this.loading = false;
						} else {
							this.openNotification('top-center', 'success', '👍 Succelfully updated lantern!', 'You can check the changes in the list');
							this.loading = false;
							this.dialogClose = false;
							this.activeDialog = false;
						}
					}
				);
			}, 1000);

		},
		closeDialog() {
      if(this.loading == true){
        return;
      }
      this.dialogErrorMessage = '';
      this.dialogError = false;
			this.activeDialog = false;
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
		}
	}
};
</script>
