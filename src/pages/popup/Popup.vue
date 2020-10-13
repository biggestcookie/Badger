<template>
  <div id="app">
    <div class="container">
      <div class="columns">
        <div class="column">
          <div class="block">
            <h1 class="title">
              hello
            </h1>
            <a class="button" @click="testNotif">Click for notif</a>
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
import { Component, Vue } from "vue-property-decorator";
import { browser, Notifications } from "webextension-polyfill-ts";

@Component
export default class Popup extends Vue {
  mounted() {
    browser.notifications.onButtonClicked.addListener((notif, button) =>
      console.log(`Notif: ${notif} button: ${button}`)
    );
  }
  testNotif() {
    const c = {
      iconUrl: "icons/16.png",
      type: "basic",
      title: "Notif title",
      message: "message",
      contextMessage: "context",
      priority: 2,
      eventTime: Date.now(),
      isClickable: false,
      buttons: [
        {
          title: "button1"
        },
        {
          title: "button2"
        }
      ]
    };
    browser.notifications
      .create("test", c as Notifications.CreateNotificationOptions)
      .then(() => console.log("notif made"));
  }
}
</script>
