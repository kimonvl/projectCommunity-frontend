import SockJS from "sockjs-client";
import {
  connectWebsocketStart,
  connectWebsocketSuccess,
  connectWebsocketFailure,
  subscribeToTopicStart,
  subscribeToTopicSuccess,
  subscribeToTopicFailure,
  unSubscribeFromTopicStart,
  unSubscribeFromTopicSuccess,
  unSubscribeFromTopicFailure,
} from "./websocketSlice";
import { Client, StompSubscription } from "@stomp/stompjs";
import { receiveNotificationSuccess } from "../notification/notificationSlice";
import { receiveMessage } from "../chat/chatSlice";
import { selectSelectedProject } from "../project/project.selector";
import { getNewCreatedIssueStart } from "../issue/issueSlice";
import { Middleware } from "@reduxjs/toolkit";

let client: Client | null = null;
let isConnecting = false;
let activeSubscription: Record<string, StompSubscription> = {}; // { chatId: subscriptionObj }

const websocketMiddleware: Middleware =
  (store) => (next) => (action) => {

    // 🔒 action is unknown → we must narrow
    if (typeof action !== "object" || action === null || !("type" in action)) {
      return next(action);
    }
    switch (action.type) {
      case connectWebsocketStart.type: {
        console.log("[WS] connectWebsocketStart");

        // already connected or connecting → ignore extra calls
        if (client && (client.connected || isConnecting)) {
          console.log("[WS] already connected/connecting, skipping");
          store.dispatch(connectWebsocketSuccess());
          break;
        }

        isConnecting = true;

        const socket = new SockJS("http://localhost:8080/ws");

        client = new Client({
          webSocketFactory: () => socket,
          reconnectDelay: 5000,
          debug: (str) => console.log("[STOMP]", str),
        });

        client.onConnect = (frame) => {
          console.log("[WS] connected:", frame);
          isConnecting = false;

          // notifications
          client!.subscribe("/user/queue/notifications", (msg) => {
            const notification = JSON.parse(msg.body);
            store.dispatch(receiveNotificationSuccess(notification));

            if (notification.type == "ISSUE_CREATED") {
              const selectedProjectId = selectSelectedProject(store.getState())?.id;
              if (notification.metadata.projectId == selectedProjectId)
                store.dispatch(getNewCreatedIssueStart(notification.metadata.issueId));
            }
          });

          store.dispatch(connectWebsocketSuccess());
        };

        client.onWebSocketError = (error) => {
          console.error("[WS] WebSocket error:", error);
          isConnecting = false;
          store.dispatch(connectWebsocketFailure());
        };

        client.onStompError = (frame) => {
          console.error("[WS] STOMP error:", frame);
          isConnecting = false;
          store.dispatch(connectWebsocketFailure());
        };

        client.onDisconnect = () => {
          console.log("[WS] disconnected");
          isConnecting = false;
          activeSubscription = {};
          store.dispatch(connectWebsocketFailure());
        };

        client.activate();
        break;
      }

      case subscribeToTopicStart.type: {
        if (!isActionWithPayload<string>(action)) {
          return next(action);
        }
        const chatId = action.payload;
        console.log("[WS] subscribeToTopicStart", chatId);

        if (!client || !client.connected) {
          console.warn("[WS] subscribe before connected");
          store.dispatch(subscribeToTopicFailure());
          break;
        }

        if (activeSubscription[chatId]) {
          console.log("[WS] already subscribed to", chatId);
          break;
        }

        const sub = client.subscribe(`/topic/chat/${chatId}`, (msg) => {
          console.log("[WS] chat message", msg);
          const message = JSON.parse(msg.body);
          store.dispatch(receiveMessage(message));
        });

        activeSubscription[chatId] = sub;
        store.dispatch(subscribeToTopicSuccess(chatId));
        break;
      }

      case unSubscribeFromTopicStart.type: {
        if (!isActionWithPayload<string>(action)) {
          return next(action);
        }
        const chatId = action.payload;
        console.log("[WS] unSubscribeFromTopicStart", chatId);

        const sub = activeSubscription[chatId];
        if (!sub) {
          console.warn("[WS] no active subscription for", chatId);
          store.dispatch(unSubscribeFromTopicFailure());
          break;
        }

        sub.unsubscribe();
        delete activeSubscription[chatId];
        store.dispatch(unSubscribeFromTopicSuccess(chatId));
        break;
      }

      default:
        break;
    }

    return next(action);
  };

function isActionWithPayload<T>(action: unknown):
  action is { type: string; payload: T } {
  return (
    typeof action === "object" &&
    action !== null &&
    "type" in action &&
    "payload" in action
  );
}


export default websocketMiddleware;
