<template>
  <div>
    <div class=" relative bg-dark">
      <nav class="bg-gray-800 h-screen justify-between flex flex-col p-2 border-r border-white border-opacity-20" v-model="active">
        <div>
          <ul>
            <li v-for="item in items" :key="item.title" link class="text-white flex align-middle text-center my-2 p-2 rounded-lg" color="red">
              <mdicon size=28 class="m-auto " v-bind:name=item.icon />
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        active: 'home',
        items: [{
            title: 'Home',
            icon: 'Lightbulb'
          },
          {
            title: 'My Account',
            icon: 'HandHeart'
          },
          {
            title: 'Users',
            icon: 'GoogleMaps'
          },
        ],
      }
    },
  }
</script>