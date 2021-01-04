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
              <a class="button" @click="create">Click to create</a>
              <a class="button" @click="fetchAll">Click for notif</a>
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
import { Vue } from "vue-class-component";
import * as Messaging from "@/utils/messaging";
import { Badger, Weekday } from "@/models/badger.model";

export default class Popup extends Vue {
  badgers: Badger[] = [];

  async mounted() {
    this.badgers = await Messaging.fetchBadgers();
  }

  async create() {
    const mockBadger: Badger = {
      id: new Date().getTime(),
      name: "mock badger",
      days: new Set([Weekday.SUNDAY, Weekday.MONDAY]),
      interval: 5
    };
    await Messaging.saveBadger(mockBadger);
    this.badgers.push(mockBadger);
  }
}
</script>
