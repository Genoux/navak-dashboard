<template>
	<div>
		<div class="relative bg-dark z-10">
			<nav ref="navigationlg" class="flex flex-col bg-gray-800 fixed bg-dark justify-between  p-2 pl-4 pr-6 border-r border-white border-opacity-20">
        <div class=" flex-1 mt-10 mb-6">
          <svg width="51" height="43" viewBox="0 0 51 43" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M29.1383 4.85938L25.9095 0.45644L22.6782 4.85938L25.9095 12.6599L29.1383 4.85938Z" fill="white"/>
            <path d="M17.79 25.4307C15.186 29.7116 17.0958 35.3145 20.7661 38.3804C20.824 37.5467 20.8345 36.711 20.8011 35.8759C20.6606 32.1984 19.6267 28.6119 17.79 25.4307Z" fill="white"/>
            <path d="M12.5683 22.8004C12.9891 22.2339 13.4518 21.7002 13.9525 21.2039L14.2496 20.9195C10.7162 16.8907 4.22649 15.7332 1.12646 20.8921C3.67185 17.5718 8.74531 17.7613 11.3328 20.932C9.17119 21.3386 7.27947 23.1496 7.34632 25.5744C7.83163 23.2918 10.4018 21.7078 12.5683 22.8004Z" fill="white"/>
            <path d="M35.9993 15.8406C35.2774 16.8568 34.4248 17.772 33.4639 18.5622C35.7666 17.2825 38.4779 17.1628 40.892 16.145C45.0394 14.6956 49.6003 10.6245 47.6542 5.79993C49.4295 12.5478 41.2709 15.4265 35.9993 15.8406Z" fill="white"/>
            <path d="M28.6829 15.601C35.076 13.271 34.826 5.80971 32.6817 0.436377H31.5452C32.8847 5.6775 31.1391 10.956 28.6829 15.601Z" fill="white"/>
            <path d="M20.3059 0.347286H19.1432C17.5566 4.05896 18.0986 11.1714 18.0986 11.1714C16.22 9.33528 14.1015 7.75918 11.8002 6.48558C10.006 4.86348 10.3119 1.86066 12.222 0.423391C10.4168 1.34751 9.36345 3.50885 9.85736 5.48536C6.93818 4.11638 3.8392 3.16474 0.652344 2.65866C5.04014 3.945 9.09698 6.15898 12.5454 9.1492C10.3775 9.55581 8.75154 11.5932 8.77339 13.7806C9.30882 11.1344 12.5935 9.66454 14.7833 11.3497C15.1679 11.7737 15.546 12.2064 15.9044 12.6543C17.0692 14.1048 18.0737 15.6758 18.9007 17.3401C16.4355 16.3442 13.684 16.453 11.1621 15.6637C7.00975 14.6482 2.32201 11.1235 3.82996 6.35294C1.20744 14.0959 10.937 17.2923 16.783 18.573C17.4971 18.1779 18.2409 17.8384 19.0077 17.5576C20.5069 17.0127 22.0696 16.6598 23.6583 16.5073C20.955 11.5519 18.8526 5.97677 20.3059 0.347286Z" fill="white"/>
            <path d="M8.60718 42.4053H14.2724C13.0993 41.0685 12.1229 39.5689 11.3729 37.9525C10.8899 39.6714 9.93049 41.2161 8.60718 42.4053V42.4053Z" fill="white"/>
            <path d="M41.3175 31.0452C39.9219 32.5657 38.8503 34.3582 38.1689 36.3121C37.4875 38.2659 37.2108 40.3398 37.3558 42.4056H43.395C40.2479 39.6541 39.3491 34.7472 41.3175 31.0452Z" fill="white"/>
            <path d="M41.922 13.765C41.9223 12.6793 41.5477 11.6273 40.8623 10.7894C40.177 9.95144 39.2237 9.37982 38.1659 9.17252C41.5011 6.16405 45.5619 4.04615 49.8231 2.71404C46.7188 3.21395 43.6992 4.14935 40.8524 5.493C41.3476 3.52977 40.3275 1.37195 38.5546 0.45145C40.4513 1.89581 40.7459 4.96166 38.8591 6.53574C38.5323 6.72533 38.2055 6.91492 37.8861 7.11698C37.8973 7.94272 37.8402 8.76796 37.7152 9.58412L37.48 10.7241C39.5203 10.2502 41.4689 11.7893 41.922 13.765Z" fill="white"/>
            <path d="M48.9663 18.3526C47.6605 17.4233 46.1078 16.9106 44.5094 16.8808C43.0095 16.9066 41.543 17.3309 40.258 18.1106C38.8287 18.9742 37.558 20.0797 36.5018 21.3785C35.3239 22.7948 34.3258 24.3535 33.5305 26.0185C32.7033 27.7206 32.0752 29.5137 31.6586 31.3619C31.2481 33.1255 31.0864 34.9386 31.1782 36.7477C31.2436 38.0012 31.4939 39.238 31.9211 40.4172C30.8173 37.8596 30.1477 35.1333 29.9402 32.3522C29.7276 29.595 29.9187 26.8213 30.5072 24.1201C30.6707 23.3717 30.8613 22.6233 31.0842 21.875C31.1956 21.5058 31.3144 21.1391 31.4382 20.7773L31.6314 20.2335C31.6685 20.1312 31.7477 19.7471 31.8369 19.6947C30.2949 20.5872 28.5983 21.1757 26.8377 21.4284C26.5084 22.2117 25.9389 23.8133 25.9389 23.8133C25.6913 23.1023 25.4437 22.3963 25.149 21.7028C23.7501 21.9298 22.3536 22.2018 21.0809 22.8404C22.4279 27.9143 22.4774 33.3875 20.7615 38.3766C22.8038 40.0238 25.1652 41.2228 27.6944 41.8965C28.6866 42.1596 29.7014 42.3267 30.7251 42.3954C31.1139 42.4204 35.5188 42.3256 35.5262 42.3804C35.0013 36.7901 34.9889 30.833 37.148 25.547C37.6126 24.4457 38.1701 23.3866 38.8144 22.3814C38.8195 22.3697 38.8262 22.3588 38.8342 22.3489C41.0033 21.1515 43.7022 22.6258 44.2221 25.0431C44.2207 23.928 43.8252 22.85 43.1065 22.002C42.3878 21.1541 41.3929 20.5917 40.3 20.4156C40.6954 20.0012 41.1308 19.6276 41.6 19.3005C44.5242 17.2001 48.3522 17.3398 50.6525 20.2984C50.2172 19.5485 49.6451 18.8883 48.9663 18.3526V18.3526Z" fill="white"/>
            <path d="M19.588 21.9123C23.2328 19.8668 27.816 19.8194 31.4459 17.5593C37.4206 14.0669 37.485 5.93701 34.9718 0.236883C36.8536 5.76488 36.5466 13.3883 30.7229 16.2696C26.8652 18.1854 22.3909 17.8087 18.4466 19.6971C9.92396 23.8506 9.78035 36.5855 16.6465 42.3978H23.7577C22.3191 41.3327 20.9301 40.3523 19.6945 39.2996C13.9822 35.3831 13.3508 25.6392 19.588 21.9123Z" fill="white"/>
          </svg>
        </div>
        <div class="h-screen flex flex-col">
					<ul>
						<li>
							<router-link class="relative hover:translate-x-2 hover:bg-gray-dark-light cursor-pointer text-white flex align-middle text-left my-3 p-2 pr-32 rounded-md" :to="{name: 'lanterns'}">
								<mdicon size="18" class="mr-2" name="Lightbulb" /> 
                <div class="m-auto w-full"><p class="text-sm text-left ">Lanterns</p></div>
							</router-link>
						</li>
            <li>
              <router-link class="w-full relative hover:translate-x-2 hover:bg-gray-dark-light cursor-pointer text-white flex align-middle text-center my-3 p-2  rounded-md" :to="{name: 'servers'}">
                <mdicon size="18" class="mr-2 self-center" name="ServerSecurity" />
                <div class="m-auto w-full"><p class="text-sm text-left ">Servers</p></div>
                <div v-if="servers.length > 0" class="h-4 w-2 self-center bg-status-red rounded-full animate-pulse"></div>
                 </router-link>
             	</li>
             <li>
               <router-link class="relative hover:translate-x-2 hover:bg-gray-dark-light cursor-pointer text-white flex align-middle text-center my-3 p-2 pr-32 rounded-md" :to="{name: 'areas'}">
                 <mdicon size="18" class="mr-2" name="GoogleMaps" />
                 <div class="m-auto w-full"><p class="text-sm text-left">Areas</p></div>
               </router-link>
             </li>
             <li>
               <router-link class="relative hover:translate-x-2 hover:bg-gray-dark-light cursor-pointer text-white flex align-middle text-center my-3 p-2 pr-32 rounded-md" :to="{name: 'stations'}">
                 <mdicon size="18" class="mr-2" name="HandBackRight" />
                  <div class="m-auto w-full"><p class="text-sm text-left ">Stations</p></div>
               </router-link>
             </li>
             <li>
              <router-link class="relative hover:translate-x-2 hover:bg-gray-dark-light cursor-pointer text-white flex align-middle text-center my-3 p-2 pr-32 rounded-md" :to="{name: 'fixtures'}">
                <mdicon size="18" class="mr-2" name="Panda" />
                 <div class="m-auto w-full"><p class="text-sm text-left ">Fixtures</p></div>
              </router-link>
             </li>
					</ul>
          
        <div class="mt-auto mb-36 pt-4 pb-4  bg-gray-dark-light  rounded-lg">
          <p class="text-white text-xs text-center">
            🔥 Navak Dashboard {{version}}
          </p></div>
				</div>
      <!-- <div @click='toggleNavigation()' class="absolute bottom-14 right-6 flex mb-40 mt-auto text-white hover:bg-gray-dark-light rounded-md"><mdicon name="ChevronRight" size=32 class=""></mdicon></div> -->

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
            <!-- <div @click='toggleNavigation()' class="flex mb-6 mt-auto text-white hover:bg-gray-dark-light rounded-md"><mdicon name="ChevronRight" size=32 class=""></mdicon></div> -->
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