<template>
  <div class="container">
    <div class="columns">
      <div class="column">
        <div class="block">
          <h1 class="title">
            hello
          </h1>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
* {
  color: $black;
}
</style>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
// import Navbar from "@/components/Navbar.vue";

// @Component({
//   components: {
//     Navbar,
//     Foot
//   }
// })
@Component
export default class Popup extends Vue {}
</script>
