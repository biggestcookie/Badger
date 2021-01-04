<template>
  <div id="app">
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
import "chrome-extension-async";

export default class Popup extends Vue {
  mounted() {
    chrome.tabs.create({
      url: `chrome-extension://${chrome.runtime.id}/options.html`
    });
  }
}
</script>
