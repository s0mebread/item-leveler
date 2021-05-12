<template>
  <div class="home">
    <ItemLeveler />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ItemLeveler from '@/components/ItemLeveler.vue'

@Component({
  components: {
    ItemLeveler,
  },
})
export default class Home extends Vue {}
</script>

<style lang="scss">
.home {
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
  max-width: 960px;
}
</style>