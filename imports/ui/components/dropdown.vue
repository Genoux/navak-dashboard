<template>
  <div>
    <select class="bg-black text-white p-1 border pr-20 after:p-20 select rounded-sm" :class="this.$props.CustomClass" v-model="selected">
      <option v-if="setAll" value="All">All</option>
      <option
        class="text-white "
        :key="select[0][filterBy]"
        v-for="select in group(filterBy)"
        :value="select[0][filterBy]"
      >{{ select[0][filterBy] }}</option>
    </select>
  </div>
</template>

<script>
export default({
  props: {
    selection: Array,
    setAll: Boolean,
    default: String,
    CustomClass: String,
    filterBy: String
  },
  methods: {
    group(filterBy) {
      const obj = this.$props.selection
      function groupArrayOfObjects(list, key) {
        return list.reduce(function (rv, x) {
          (rv[x[key]] = rv[x[key]] || []).push(x);
          return rv;
        }, {});
      };
      this.$emit('filterSelection', this.selected);
      this.$emit('snapSelection', this.selected);
      return groupArrayOfObjects(obj, filterBy);
    }
  },
  data() {
    return {
      selected: this.$props.default
    };
  }
});
</script>