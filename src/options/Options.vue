<template>
  <section class="section">
    <div class="container">
      <div class="columns">
        <div class="column">
          <div class="block">
            <h1 class="title is-primary">
              Hello
            </h1>
            <p>Subtitle</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.title {
  color: $primary;
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
export default class Options extends Vue {}
</script>
