// import { UserPrefs } from "../models/prefs.model";
// import { AlarmService } from "./services/alarm.service";
// import { StorageService } from "./services/storage.service";
// import { Badger } from "/@/models/badger.model";
// import {
//   DeleteMessage,
//   FetchMessage,
//   FetchType,
//   MessageType,
//   SaveMessage,
// } from "/@/models/message.model";
// import Runtime = chrome.runtime;

// type ResponseFunction = (response: any) => void;

// function init() {

// }

// export class BackgroundApp {
//   private readonly alarmService: AlarmService;
//   private readonly storageService: StorageService;

//   static userPrefs: UserPrefs;
//   static badgers: Record<number, Badger>;

//   constructor() {
//     this.alarmService = new AlarmService();
//     this.storageService = new StorageService();
//     this.init();
//   }

//   async init() {
//     this.registerBackgroundListeners();
//     this.alarmService.registerCurrentAlarms();
//   }

//   registerBackgroundListeners() {
//     Runtime.onMessage.addListener((msg, _, sendResponse) => {
//       switch (msg.type) {
//         case MessageType.FETCH:
//           this.onFetch(msg, sendResponse);
//           break;
//         case MessageType.SAVE:
//           this.onSave(msg, sendResponse);
//           break;
//         case MessageType.DELETE:
//           this.onDelete(msg, sendResponse);
//           break;
//       }
//       return true;
//     });
//   }

//   onFetch(msg: FetchMessage, sendResponse: ResponseFunction) {
//     let response;
//     if (msg.fetchType === FetchType.BADGERS) {
//       response = BackgroundApp.badgers;
//     } else if (msg.fetchType === FetchType.PREFS) {
//       response = BackgroundApp.userPrefs;
//     }
//     sendResponse(response);
//   }

//   async onSave(msg: SaveMessage, sendResponse: ResponseFunction) {
//     await this.storageService.storeBadger(msg.badger);
//     msg.badger.enabled
//       ? this.alarmService.createAlarm(msg.badger)
//       : this.alarmService.removeAlarm(msg.badger.id);
//     sendResponse(true);
//   }

//   async onDelete(msg: DeleteMessage, sendResponse: ResponseFunction) {
//     await this.storageService.removeBadger(msg.badgerId);
//     this.alarmService.removeAlarm(msg.badgerId);
//     sendResponse(true);
//   }
// }

// init();
