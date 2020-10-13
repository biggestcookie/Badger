<template>
  <div id="app">
    <section class="section">
      <div class="container">
        <div class="columns">
          <div class="column">
            <div class="block">
              <h1 class="title is-family-secondary">
                Hello
              </h1>
              <p>Subtitle</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss">
.title {
  color: $primary;
}
</style>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Options extends Vue {}
</script>
