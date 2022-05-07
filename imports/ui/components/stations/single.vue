<template>
	<div>
		<div
			class="hover:border-current rounded-md duration-75 ease-in bg-black text-white border border-white border-opacity-20"
			v-bind:class="{
				'opacity-20': station.status === false,
				'pointer-events-none': station.status === false
			}"
		>
			<div class="flex w-full px-4 py-4 items-center gap-2 border-b border-white border-opacity-20">
				<div class="flex">
					<div
						class="w-2 h-2 flex self-center mr-2 animate-pulse"
						v-bind:class="{
							'bg-gray-light': station.status == false,
							'bg-white': station.state == 7 || station.state == 9,
							'bg-status-green': station.state == 0 && station.status == true,
							'bg-orange': station.state == 6,
							'bg-indigo-50': station.state == 2,
							'bg-indigo-600': station.state == 1,
							'bg-status-red': station.state == 4 || station.state == 3
						}"
					></div>
					<h4 class="font-medium">
						{{ station.id }} /
						<span class="opacity-50 font-light">{{ station.ipAddress }}</span>
					</h4>
				</div>
				<div class="m-auto">
					<h4 class="font-medium">{{ station.ip }}</h4>
				</div>

				<div class="flex">
					<div
						:class="{'opacity-20': rebooting, 'pointer-events-none': rebooting}"
						@click="reboot(station)"
						class="bg-black border ml-2 p-1 hover:opacity-60 cursor-pointer focus:bg-white focus:text-blue focus:outline-none"
					>
						<div
							v-bind:class="{
								'animate-spin': loading
							}"
						>
							<mdicon name="Refresh" size="16"></mdicon>
						</div>
					</div>
				</div>
				<div class="flex">
					<div
						:class="{'bg-red-600': !station.presence, 'bg-green': station.presence}"
						@click="presence(station)"
						class="bg-black border p-1 hover:opacity-60 cursor-pointer focus:bg-white focus:text-blue focus:outline-none bg-opacity-30"
					>
						<mdicon v-if="station.presence" name="Eye" size="16"></mdicon>
						<mdicon v-if="!station.presence" name="EyeOff" size="16"></mdicon>
					</div>
				</div>
			</div>
			<div
				class="grid grid-cols-2 p-5 gap-5 self-end"
				v-bind:class="{
					'visually-hidden': station.status === false
				}"
			>
				<div>
					<h5 class="text-xs text-white text-opacity-50 font-light">Message</h5>
					<h4 readonly class="text-sm pt-1 whitespace-nowrap">{{ station.message }}</h4>
				</div>
				<div>
					<h5 class="text-xs text-white text-opacity-50 font-light">Lantern ID</h5>
					<router-link :to="{name: 'lanterns'}">
						<h4 readonly class="text-sm hover:underline cursor-pointer">{{ station.lantern }}</h4>
					</router-link>
				</div>
				<div>
					<h5 class="text-xs text-white text-opacity-50 font-light">BPM</h5>
					<div class="flex m-auto animate-pulse">
						<mdicon class="self-center pr-1" name="heart" size="12"></mdicon>
						<h4 class="text-sm">
							{{ station.bpm }}
						</h4>
					</div>
				</div>
				<div>
					<h5 class="text-xs text-white text-opacity-50 font-light">State</h5>
					<h4 readonly class="text-sm">{{ station.state }}</h4>
				</div>
				<div>
					<h5 class="text-xs text-white text-opacity-50 font-light">Timer</h5>
					<h4 readonly class="text-sm">{{ station.timer }}</h4>
				</div>
				<div>
					<h5 class="text-xs text-white text-opacity-50 font-light">Presence</h5>
					<h4 readonly class="text-sm">{{ station.presence }}</h4>
				</div>
			</div>
			<div
				class="pl-5 pr-5 pb-5"
				v-bind:class="{
					'visually-hidden': station.status === false
				}"
			>
				<div class="bg-input-dark w-full rounded-md" :style="{background: `rgba(${this.$props.station.rgb})`}">
					<div :id="this.$props.station.id" :style="{width: w + '%'}" class="h-1 bg-white w-0"></div>
				</div>
  <div class=" grid grid-cols-1 gap-0 lg:gap-4 lg:grid-cols-2">
    <div class="bg-gray-dark-light p-3 mt-5 text-left flex rounded-md">
      <div
        class="w-2 h-2 flex self-center mr-2 rounded-full animate-pulse"
        v-bind:class="{
          'bg-yellow': station.polarState == 1 || station.polarState == 2,
          'bg-red-600': station.polarState == 4,
          'bg-status-green': station.polarState == 3
        }"
      ></div>
      <div class="self-center">
        <p class="text-white text-xs">{{ station.polarStatus }}</p>
      </div>
    </div>
      <div class="bg-gray-dark-light p-3 mt-3 sm:mt-5 text-left flex rounded-md">
      <div
        class="w-2 h-2 flex self-center mr-2 rounded-full animate-pulse"
        v-bind:class="{
          'bg-yellow': station.presenceState == 1 || station.presenceState == 2,
          'bg-red-600': station.presenceState == 4,
          'bg-status-green': station.presenceState == 3
        }"
      ></div>
      <div class="self-center">
        <p class="text-white text-xs">{{ station.presenceStatus }}</p>
      </div>
    </div>
  </div>
			</div>
		</div>
	</div>
</template>

<script>
import anime from 'animejs/lib/anime.es.js';
import Vue from 'vue';
import 'dotenv/config';
export default {
	watch: {
		'station.state': function (newVal) {
			if (newVal === 1) {
				//this.progress(this.$props.station, 'forward');
			}
			if (newVal === 9 || newVal === 4) {
				//this.progress(this.$props.station, 'reverse');
			}
		}
	},
	data() {
		return {
			loading: false,
			rebooting: false,
			w: 0,
			duration: 15000
		};
	},
	mounted() {
		const _self = this;
		Vue.prototype.$actionButton = anime
			.timeline({
				targets: '#s001',
				duration: 15000,
				easing: 'linear',
				autoplay: false,
				complete: function (anim) {
					_self.w = 0;
				},
				update: function (anim) {
					_self.w = anim.progress;
				}
			})
			.add({targets: '#s002', background: `rgb(${this.$props.station.rgb}, 255)`}, 0);
	},
	methods: {
		presence(station) {
			station.presence = !station.presence;
			try {
				this.$http.put(`http://${this.$param.api}/api/stations/presence/${this.station.id}`, {presence: station.presence}).then((response) => {
					console.log('response', response);
					this.loading = false;
					if (station.presence) {
						this.openNotification('top-center', 'success', '🍏 presence true! ', `Lantern ${this.station.id} true successfully!`);
					} else {
						this.openNotification('top-center', 'success', '🍎 presence false! ', `Lantern ${this.station.id} false successfully!`);
					}
					this.rebooting = false;
				});
			} catch (error) {
				console.log(error);
				this.openNotification('top-center', 'danger', '❌ Oups! ', `${error}`);
				this.loading = false;
			}
		},
		progress(elm, direction) {
			console.log('🚀 ~ file: single.vue ~ line 165 ~ progress ~ direction', direction);
			if (direction === 'forward') {
				Vue.prototype.$actionButton.restart();
			}
			if (direction === 'reverse') {
				Vue.prototype.$actionButton.pause();
				this.w = 0;
				console.log('🚀 ~ file: single.vue ~ line 172 ~ progress ~ this.w', this.w);
			}
		},
		reboot(elm) {
			this.loading = true;
			this.rebooting = true;
			try {
				this.$http.post(`http://${this.$param.api}/api/stations/reboot/${this.station.id}`).then((response) => {
					console.log('response', response);
					this.loading = false;
					this.openNotification('top-center', 'success', '🔥 Rebooted! ', `Lantern ${this.station.id} restarted successfully!`);
					this.rebooting = false;
				});
			} catch (error) {
				console.log(error);
				this.openNotification('top-center', 'danger', '❌ Oups! ', `${error}`);
				this.loading = false;
			}
		},
		openNotification(position = null, color, title, text) {
      if(this.noti === undefined){ 
        this.noti = this.$vs.notification({
          color,
          position,
          square: true,
          title: title,
          text: text
        });
        return
      }
     if(this.noti !== null && this.noti !== undefined) {
       this.noti.close();
       this.noti = this.$vs.notification({
         color,
         position,
         square: true,
         title: title,
         text: text
       });
     }
		}
	},
	props: {
		station: Object
	}
};
</script>
