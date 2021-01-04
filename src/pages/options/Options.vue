<template>
  <div id="app">
    <section class="section">
      <div class="container">
        <div class="columns">
          <div class="column">
            <div class="block">
              <h1 class="title is-family-secondary">
                Hello!
              </h1>
              <p>Subtitle</p>
              <a class="button" @click="badger.create">Click to create</a>
              <a class="button" @click="badger.testNotif">Click for notif</a>
            </div>
            <div class="block">
              <div
                v-for="badger in badger.badgers"
                v-bind:key="badger.id"
                class="card"
              >
                <div class="card-content">
                  {{ badger.name }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss">
* {
  color: $black;
}
</style>

<script lang="ts">
import { useBadgers } from "@/use/badgers";
import { setup, Vue } from "vue-class-component";

export default class Popup extends Vue {
  badger = setup(() => useBadgers());
}
</script>
