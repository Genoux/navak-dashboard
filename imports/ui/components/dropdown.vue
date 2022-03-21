<template>
  <div>
    <select class="bg-black text-white border" v-model="selected">
      <option
        class="text-white"
        :key="select[0].group"
        v-for="select in  group()"
        :value="select[0].group"
      >{{ select[0].group }}</option>
    </select>
    <p class="text-white">{{ selected }}</p>
  </div>
</template>

<script>
export default({
  state: {
    user: {
      username: 'matt',
      fullName: 'Matt Maribojoc'
    }
  },
  getters: {},
  mutations: {},
  actions: {},
  props: {
    selection: Array
  },
  watch: {
   selected: function (newVal) {
   console.log("🚀 ~ file: dropdown.vue ~ line 22 ~ newVal", newVal);
    this.$emit('filterSelection', newVal)
   }
  },
  methods: {
    group() {
      const obj = this.$props.selection
      function groupArrayOfObjects(list, key) {
        return list.reduce(function (rv, x) {
          (rv[x[key]] = rv[x[key]] || []).push(x);
          return rv;
        }, {});
      };
     // Vue.prototype.$group = groupArrayOfObjects(obj, 'group')
     // Vue.prototype.$selectedID = this.selected
      console.log("🚀 ~ file: dropdown.vue ~ line 30 ~ group ~ groupArrayOfObjects(obj, 'group')", groupArrayOfObjects(obj, 'group'));
      console.log(this.selected)
      return groupArrayOfObjects(obj, "group");
    }
  },
  data() {
    return {
      selected: '0'
    };
  }
});
</script>
