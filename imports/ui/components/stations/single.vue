<template>
	<div>
		<div
			class="hover:border-current rounded-sm duration-75 ease-in bg-black text-white border border-white border-opacity-20"
			v-bind:class="{
				'opacity-20': station.state === 8,
				'pointer-events-none': station.state === 8
			}"
		>
			<div class="flex w-full px-4 py-4 items-center gap-2 border-b border-white border-opacity-20">
				<div class="flex w-full">
					<div
						class="w-2 h-2 flex self-center mr-2 animate-pulse"
						v-bind:class="{
							'bg-gray-light': station.status == false,
							'bg-white': station.state == 7,
							'bg-status-green': station.state == 0 && station.status == true,
							'bg-orange': station.state == 6,
							'bg-indigo-50': station.state == 2,
							'bg-indigo-600': station.state == 1,
							'bg-status-red': station.state == 4 || station.state == 3
						}"
					></div>
					<h4 class="font-medium">{{ station.id }}</h4>
					<div class="flex"><mdicon class="self-center pl-1" name="Lightbulb" size="18"></mdicon></div>
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
			</div>
			<div
				class="grid grid-cols-2 p-5 gap-5 self-end"
				v-bind:class="{
					'visually-hidden': station.state === 8
				}"
			>
				<div>
					<h5 class="text-xs text-white text-opacity-50 font-light">Message</h5>
					<h4 readonly class="text-sm">{{ station.message }}</h4>
				</div>
				<div>
					<h5 class="text-xs text-white text-opacity-50 font-light">Lantern ID</h5>
					<h4 readonly class="text-sm">{{ station.lantern }}</h4>
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
					'visually-hidden': station.state === 8
				}"
			>
				<div class="bg-input-dark w-full"><div id="progress-bar" :style="{width: w + '%'}" class="h-0.5 bg-white w-0"></div></div>
			</div>
		</div>
	</div>
</template>

<script>
import anime from 'animejs/lib/anime.es.js';
import Vue from 'vue';

export default {
	watch: {
		'station.state': function (newVal) {
			if (newVal === 1) {
				this.progress(this.$props.station, 'forward');
			}
			if (newVal === 9 || newVal === 4) {
				this.progress(this.$props.station, 'reverse');
			}
		}
	},
	data() {
		return {
			api: '192.168.1.209:8081',
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
				targets: '#progress-bar',
				duration: 15000,
				easing: 'linear',
				autoplay: false,
				update: function (anim) {
					_self.w = anim.progress;
				}
			})
			.add({targets: '#progress-bar', background: `rgb(${this.$props.station.rgb}, 255)`}, 0);
	},
	methods: {
		progress(elm, direction) {
			if (direction === 'forward') {
				Vue.prototype.$actionButton.restart();
			}
			if (direction === 'reverse') {
				Vue.prototype.$actionButton.pause();
				this.w = 0;
			}
		},
		reboot(elm) {
			this.loading = true;
			this.rebooting = true;
			try {
				this.$http.post(`http://${this.api}/api/stations/reboot/${this.station.id}`).then((response) => {
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
			this.noti = this.$vs.notification({
				color,
				position,
				square: true,
				title: title,
				text: text
			});
		}
	},
	props: {
		station: Object
	}
};
</script>
