<template>
<div class="p-4 grid gap-4" v-if="servers.length > 0">
  <vs-alert color="danger" >
    <template #title>
      Server Error
    </template>
    {{servers.length}} servers <span v-if="servers.length >= 2">are</span><span  v-if="servers.length <= 1" >is</span>  down.
  </vs-alert>
  </div>
</template>

<script>
import Servers from '../../../imports/api/collections/Servers.js';
export default {
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