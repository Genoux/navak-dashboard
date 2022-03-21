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
export default {
  props: {
    selection: Array
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
      //Vue.prototype.$test = groupArrayOfObjects(obj, 'group')
      return groupArrayOfObjects(obj, "group");
    }
  },
  data() {
    return {
      selected: '0'
    };
  }
};
</script>
