import { onMounted, Ref, ref } from "vue";
import { NotificationService } from "../../background/services/notification.service";
import { Badger, Weekday } from "/@/models/badger.model";
import * as Messaging from "/@/utils/messaging";
import { fetchBadgers } from "/@/utils/messaging";

export function useBadger() {
  const badgers: Ref<Badger[]> = ref([]);
  const notificationService = new NotificationService();

  onMounted(async () => {
    badgers.value = await fetchBadgers();
  });

  async function create() {
    const mockBadger: Badger = {
      id: new Date().getTime(),
      name: "mock badger",
      enabled: true,
      days: new Set([Weekday.MONDAY]),
      interval: 5,
      timeRanges: [
        [
          { hour: 0, minute: 1 },
          { hour: 11, minute: 59 },
        ],
      ],
    };
    await Messaging.saveBadger(mockBadger);
    badgers.value.push(mockBadger);
  }

  function testNotif() {
    notificationService.fireTestNotif();
  }

  return {
    badgers,
    create,
    testNotif,
  };
}
