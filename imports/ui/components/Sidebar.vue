<template>
	<div>
		<div class="relative bg-dark z-10">
			<nav ref="navigationlg" class="flex flex-col bg-gray-800 fixed bg-dark justify-between  p-2 pl-4 pr-6 border-r border-white border-opacity-20">
        <div class=" flex-1 mt-10 mb-6">
          <svg width="151" height="127" viewBox="0 0 151 127" fill="none" xmlns="http://www.w3.org/2000/svg" class="logo">
          <path d="M86.1101 14.1044L76.4237 0.895555L66.73 14.1044L76.4237 37.5061L86.1101 14.1044Z" fill="white"/>
          <path d="M52.0657 75.8183C44.2539 88.6611 49.9831 105.47 60.994 114.668C61.1678 112.166 61.1992 109.659 61.0991 107.154C60.6776 96.1216 57.5758 85.3618 52.0657 75.8183Z" fill="white"/>
          <path d="M36.4006 67.9275C37.663 66.2278 39.0511 64.6267 40.5529 63.1379L41.4443 62.2847C30.8443 50.1984 11.375 46.726 2.07495 62.2024C9.71112 52.2415 24.9315 52.8103 32.6939 62.3221C26.2091 63.542 20.534 68.9752 20.7345 76.2494C22.1904 69.4018 29.9009 64.6496 36.4006 67.9275Z" fill="white"/>
          <path d="M106.694 47.0481C104.528 50.0967 101.97 52.8422 99.0872 55.2129C105.995 51.3737 114.129 51.0145 121.372 47.9611C133.814 43.6131 147.497 31.3996 141.658 16.926C146.984 37.1696 122.508 45.8058 106.694 47.0481Z" fill="white"/>
          <path d="M84.7437 46.3291C103.923 39.3393 103.173 16.9554 96.7401 0.835363H93.3306C97.3493 16.5587 92.1124 32.3943 84.7437 46.3291Z" fill="white"/>
          <path d="M59.613 0.568089H56.125C51.3652 11.7031 52.9911 33.0404 52.9911 33.0404C47.3554 27.5321 40.9999 22.8038 34.0959 18.983C28.7132 14.1167 29.6311 5.10821 35.3613 0.796403C29.9458 3.56875 26.7857 10.0528 28.2674 15.9823C19.5099 11.8754 10.2129 9.02044 0.652344 7.50221C13.8157 11.3612 25.9863 18.0032 36.3316 26.9738C29.8278 28.1937 24.9499 34.3059 25.0155 40.8682C26.6218 32.9295 36.4759 28.5198 43.0452 33.5753C44.1992 34.8473 45.3334 36.1454 46.4086 37.4892C49.9028 41.8408 52.9163 46.5537 55.3973 51.5466C48.0018 48.559 39.7474 48.8851 32.1815 46.5172C19.7246 43.4709 5.66135 32.8969 10.1852 18.5851C2.31764 41.814 31.5062 51.4031 49.0442 55.2452C51.1867 54.06 53.4181 53.0415 55.7185 52.1989C60.216 50.5643 64.9042 49.5056 69.6703 49.0482C61.5602 34.1819 55.253 17.4566 59.613 0.568089Z" fill="white"/>
          <path d="M24.5166 126.742H41.5123C37.993 122.732 35.0637 118.233 32.8139 113.384C31.3647 118.541 28.4865 123.174 24.5166 126.742V126.742Z" fill="white"/>
          <path d="M122.648 92.662C118.461 97.2233 115.246 102.601 113.202 108.462C111.158 114.324 110.328 120.546 110.763 126.743H128.88C119.439 118.488 116.743 103.768 122.648 92.662Z" fill="white"/>
          <path d="M124.461 40.8214C124.462 37.5641 123.338 34.4081 121.282 31.8943C119.226 29.3805 116.366 27.6657 113.193 27.0438C123.198 18.0184 135.381 11.6647 148.165 7.66835C138.851 9.16807 129.793 11.9743 121.252 16.0052C122.738 10.1155 119.677 3.64209 114.359 0.880585C120.049 5.21368 120.933 14.4112 115.273 19.1334C114.292 19.7022 113.311 20.271 112.353 20.8772C112.387 23.3544 112.216 25.8301 111.841 28.2786L111.135 31.6987C117.256 30.2768 123.102 34.8942 124.461 40.8214Z" fill="white"/>
          <path d="M145.594 54.5841C141.677 51.7962 137.018 50.2579 132.223 50.1686C127.724 50.2462 123.324 51.5189 119.469 53.8581C115.181 56.449 111.369 59.7655 108.2 63.6618C104.667 67.9107 101.672 72.5867 99.2866 77.5816C96.8051 82.688 94.9206 88.0675 93.6709 93.6118C92.4393 98.9027 91.9542 104.342 92.2298 109.769C92.4258 113.53 93.1769 117.24 94.4582 120.778C91.1469 113.105 89.1381 104.926 88.5157 96.5829C87.878 88.3112 88.4511 79.9901 90.2168 71.8865C90.707 69.6414 91.279 67.3962 91.9476 65.1511C92.2818 64.0435 92.6384 62.9434 93.0098 61.8583L93.5892 60.2268C93.7006 59.92 93.9383 58.7675 94.2057 58.6103C89.5798 61.288 84.4899 63.0532 79.2082 63.8115C78.2203 66.1614 76.5118 70.966 76.5118 70.966C75.769 68.8331 75.0262 66.7152 74.1422 64.6347C69.9453 65.3158 65.7558 66.1315 61.9377 68.0473C65.9786 83.2693 66.1272 99.6886 60.9795 114.656C67.1063 119.598 74.1908 123.195 81.7784 125.216C84.7549 126.005 87.7994 126.506 90.8705 126.712C92.0367 126.787 105.251 126.503 105.274 126.668C103.699 109.896 103.662 92.0253 110.139 76.1672C111.533 72.8634 113.205 69.6861 115.138 66.6703C115.154 66.6354 115.174 66.6026 115.198 66.573C121.705 62.9808 129.802 67.4037 131.361 74.6555C131.357 71.3104 130.171 68.0761 128.015 65.5323C125.859 62.9885 122.874 61.3013 119.595 60.7731C120.781 59.5298 122.088 58.4092 123.495 57.4279C132.268 51.1266 143.752 51.5457 150.652 60.4214C149.347 58.1716 147.63 56.191 145.594 54.5841V54.5841Z" fill="white"/>
          <path d="M57.4591 65.2632C68.3934 59.1265 82.143 58.9843 93.0327 52.204C110.957 41.7268 111.15 17.3373 103.61 0.236883C109.256 16.8209 108.335 39.6912 90.8637 48.335C79.2906 54.0825 65.8678 52.9524 54.0348 58.6176C28.467 71.0781 28.0361 109.283 48.6345 126.72H69.9682C65.6524 123.524 61.4852 120.583 57.7786 117.425C40.6418 105.675 38.7475 76.4439 57.4591 65.2632Z" fill="white"/>
          </svg>
        </div>
        <div class="h-screen flex flex-col">
					<ul>
						<li>
							<router-link class="relative hover:translate-x-2 hover:bg-gray-dark-light cursor-pointer text-white flex align-middle text-left my-3 p-2 pr-32 rounded-sm" :to="{name: 'lanterns'}">
								<mdicon size="18" class="mr-2" name="Lightbulb" /> 
                <div class="m-auto w-full"><p class="text-sm text-left ">Lanterns</p></div>
							</router-link>
						</li>
            <li>
              <router-link class="relative hover:translate-x-2 hover:bg-gray-dark-light cursor-pointer text-white flex align-middle text-center my-3 p-2 pr-32 rounded-sm" :to="{name: 'servers'}">
                <mdicon size="18" class="mr-2" name="ServerSecurity" />
                <div class="m-auto w-full"><p class="text-sm text-left ">Servers</p></div>
                <div v-if="servers.length > 0" class="h-3 w-3 bg-status-red absolute right-0 top-0 rounded-xl animate-pulse"></div>
                 </router-link>
             	</li>
             <li>
               <router-link class="relative hover:translate-x-2 hover:bg-gray-dark-light cursor-pointer text-white flex align-middle text-center my-3 p-2 pr-32 rounded-sm" :to="{name: 'areas'}">
                 <mdicon size="18" class="mr-2" name="GoogleMaps" />
                 <div class="m-auto w-full"><p class="text-sm text-left">Areas</p></div>
               </router-link>
             </li>
             <li>
               <router-link class="relative hover:translate-x-2 hover:bg-gray-dark-light cursor-pointer text-white flex align-middle text-center my-3 p-2 pr-32 rounded-sm" :to="{name: 'stations'}">
                 <mdicon size="18" class="mr-2" name="HandBackRight" />
                  <div class="m-auto w-full"><p class="text-sm text-left ">Stations</p></div>
               </router-link>
             </li>
					</ul>
          
        <div class="mt-auto mb-36 pt-4 pb-4  bg-gray-dark-light  rounded-lg">
          <p class="text-white text-xs text-center">
            🔥 Navak Dashboard {{version}}
          </p></div>
				</div>
      <div @click='toggleNavigation()' class="absolute bottom-14 right-6 flex mb-40 mt-auto text-white hover:bg-gray-dark-light rounded-md"><mdicon name="ChevronRight" size=32 class=""></mdicon></div>

			</nav>
      <nav ref="navigationsm" class="flex flex-col bg-gray-800 fixed bg-dark justify-between  p-2  border-r border-white border-opacity-20">
        <!--------->
        <div class="h-screen flex flex-col">
          <ul>
            <li>
              <router-link class="relative hover:translate-x-2 hover:bg-gray-dark-light cursor-pointer text-white flex align-middle text-left my-3 p-2  rounded-sm" :to="{name: 'lanterns'}">
                <mdicon size="18" class="m-auto" name="Lightbulb" /> 
              </router-link>
            </li>
            <li>
              <router-link class="relative hover:translate-x-2 hover:bg-gray-dark-light cursor-pointer text-white flex align-middle text-center my-3 p-2 rounded-sm" :to="{name: 'servers'}">
                <mdicon size="18" class="m-auto" name="ServerSecurity" />
                <div v-if="servers.length > 0" class="h-3 w-3 bg-status-red absolute right-0 top-0 rounded-xl animate-pulse"></div>
                 </router-link>
               </li>
             <li>
               <router-link class="relative hover:translate-x-2 hover:bg-gray-dark-light cursor-pointer text-white flex align-middle text-center my-3 p-2  rounded-sm" :to="{name: 'areas'}">
                 <mdicon size="18" class="m-auto" name="GoogleMaps" />
               </router-link>
             </li>
             <li>
               <router-link class="relative hover:translate-x-2 hover:bg-gray-dark-light cursor-pointer text-white flex align-middle text-center my-3 p-2  rounded-sm" :to="{name: 'stations'}">
                 <mdicon size="18" class="m-auto" name="HandBackRight" />
               </router-link>
             </li>
          </ul>
            <div @click='toggleNavigation()' class="flex mb-6 mt-auto text-white hover:bg-gray-dark-light rounded-md"><mdicon name="ChevronRight" size=32 class=""></mdicon></div>
        </div>

      </nav>
		</div>
 
	</div>
  
</template>

<script>
import Servers from '../../../imports/api/collections/Servers.js';
import { version } from '../../../package.json'
export default {
  data() {
    return {
      version: version,
    };
  },
  components: {
  },
  mounted() {
    this.$refs.navigationsm.classList.add('hidden');
  },
  methods: {
    toggleNavigation() {
      this.$refs.navigationsm.classList.toggle('hidden');
      this.$refs.navigationlg.classList.toggle('hidden');
      this.$sideNavigationToggle = !this.$sideNavigationToggle;
      console.log("🚀 ~ file: Sidebar.vue ~ line 113 ~ toggleNavigation ~ this.$sideNavigationToggle", this.$sideNavigationToggle);
    },
  },
  meteor: {
    $subscribe: {
      servers: []
    },
    servers() {
      return Servers.find({status: false});
    }
  }
};
</script>

<style scoped>
.logo {
   max-width: 50px;
   height: 50px;
}
</style>