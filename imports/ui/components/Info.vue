<template>
  <div>
   <div class="bg-black text-red-500">
     <p>Meteor tailwindcss Example</p>
   </div>
  <vs-button
    :active="active == 1"
    @click="submit($event)"
  >
    Default
  </vs-button>
  
    <ul>
      <li>
        <form class="info-link-add">
          <input type="text" v-model="title" name="title" placeholder="Title" required>
          <input type="url" v-model="url" name="url" placeholder="Url" required>
          <input type="submit" name="submit" @click="submit($event)" value="Add new link">
        </form>
      </li>
      <li :key="index" v-for="(link, index) in links"><a :href="link.url" target="_blank">{{link.title}}</a></li>
    </ul>
  </div>
</template>

<script>
import Links from '../../api/collections/Links'

export default {
  data() {
    return {
      active: 0,
      title: "",
      url: "",
    }
  },
  meteor: {
    $subscribe: {
      'links': [],
    },
    links () {
      return Links.find({})
    },
  },
  methods: {
    submit(event) {
      event.preventDefault()
      Meteor.call('createLink', this.title, this.url, (error) => {
        if (error) {
          alert(error.error)
        } else {
          this.title = ''
          this.url = ''
        }
      })
    }
  },
}
</script>