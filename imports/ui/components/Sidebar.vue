<template>
 <div>
   <div class="flex flex-row h-full">
     <nav class="bg-white dark:bg-gray-800 w-20 h-screen justify-between flex flex-col">
         <div class="mt-10 mb-10">
             <div class="mt-10">
                 <ul>
                   <li v-for="item in items"
                   :key="item.title"
                   link
                   class="flex"> <mdicon v-bind:name=item.icon  /></li>
                 </ul>
             </div>
         </div>
         <div class="mb-4">
             <a href="#">
                 <span>
                  
                 </span>
             </a>
         </div>
     </nav>
   </div>
 </div>
</template>

<script>
  export default {
    data () {
      return {
        drawer: true,
        items: [
          { title: 'Home', icon: 'Lightbulb' },
          { title: 'My Account', icon: 'HandHeart' },
          { title: 'Users', icon: 'GoogleMaps' },
        ],
        mini: true,
      }
    },
  }
</script>