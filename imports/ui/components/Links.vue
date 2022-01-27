<template>
  <div>
   <div class="bg-black text-red-500">
     <p>Meteor tailwindcss Example</p>
   </div>
    <ul>
      <li>
        <p class="text-red-500">{{errorMessage}}</p>
        <form class="flex flex-nowrap">
          <vs-input class="mx-2" type="text" v-model="title" name="title" placeholder="Title" required> </vs-input>
          <vs-input class="mx-2" type="url" v-model="url" name="url" placeholder="Url" required> </vs-input>
          <vs-button class="py-0"
            flat
            :active="active == 1"
            @click="submit($event)"
          >
            Submit
          </vs-button>
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
      errorMessage: "",
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
      if(this.title == '' || this.url == '') {
        this.errorMessage ='Please fill in the form';
        return
      }
      Meteor.call('createLink', this.title, this.url, (error) => {
        if (error) {
          alert(error.error)
        } else {
          this.title = ''
          this.url = ''
          this.errorMessage = ''
        }
      })
    }
  },
}
</script>