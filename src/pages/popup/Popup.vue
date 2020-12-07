<template>
  <div id="app">
    <div class="container">
      <div class="columns">
        <div class="column">
          <div class="block">
            <h1 class="title">
              hello
            </h1>
            <a class="button" @click="create">
              Click for badger
            </a>
            <div v-for="badger in badgers" v-bind:key="badger.id" class="card">
              <div class="card-content">
                {{ badger.name }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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
    const mockBadger = {
      id: new Date().getTime(),
      name: "mock badger",
      days: [Weekday.SUNDAY, Weekday.MONDAY]
    } as Badger;
    await Messaging.setBadger(mockBadger);
    this.badgers.push(mockBadger);
  }
}
</script>
