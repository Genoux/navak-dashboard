<template>
  <div >
    <vs-sidebar
      square
      v-model="active">
      <template #logo>
        <!-- ...img logo -->
      </template>
      <vs-sidebar-item id="home">
        <template #icon>
          <i class='bx bx-home'></i>
        </template>
        Home
      </vs-sidebar-item>
      <vs-sidebar-item id="market">
        Market Overview
      </vs-sidebar-item>
      <vs-sidebar-item id="Music">
        Music
      </vs-sidebar-item>
      <vs-sidebar-item id="donate">
        Donate
      </vs-sidebar-item>
      <vs-sidebar-item id="drink">
        Drink
      </vs-sidebar-item>
      <vs-sidebar-item id="shopping">
        Shopping
      </vs-sidebar-item>
      <vs-sidebar-item id="chat">
        Chat
      </vs-sidebar-item>
    </vs-sidebar>
  </div>
</template>

<script>
  export default {
    data:() => ({
      active: 'home',
    })
  }
</script>


<style scoped>
.vs-sidebar__item::after{
}
</style>