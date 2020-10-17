<template>
  <div id="app">
    <div class="container">
      <div class="columns">
        <div class="column">
          <div class="block">
            <h1 class="title">
              hello
            </h1>
            <a class="button" @click="testStatic">Click for notif</a>
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
import { NotificationService } from "@/services/notification.service";

@Component
export default class Popup extends Vue {
  private readonly notificationService = new NotificationService();
  testNotif() {
    this.notificationService.testNotif();
  }
}
</script>
