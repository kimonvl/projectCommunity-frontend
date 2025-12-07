import SockJS from "sockjs-client";
import { connectWebsocketStart, connectWebsocketSuccess, subscribeToTopicFailure, subscribeToTopicStart, subscribeToTopicSuccess } from "./websocketSlice";
import { Client } from "@stomp/stompjs";
import { receiveNotificationStart, receiveNotificationSuccess } from "../notification/notificationSlice";

let client = null;

const websocketMiddleware = store => next => action => {
    switch (action.type) {
        case connectWebsocketStart.type:
            console.log("connect ws acction");

            const socket = new SockJS("http://localhost:8080/ws");
            client = new Client({
                webSocketFactory: () => socket,
                reconnectDelay: 5000,
            });

            client.onConnect = () => {
                console.log("connected to ws");
                client.subscribe("/user/queue/notifications", msg => {
                    const notification = JSON.parse(msg.body);
                    notification.metadata = JSON.parse(notification.metadata);
                    store.dispatch(receiveNotificationSuccess(notification));
                });
                store.dispatch(connectWebsocketSuccess());
            };

            client.onWebSocketError = (error) => {
                console.error("❌ WebSocket error:", error);
                store.dispatch(connectWebsocketFailure());
            };

            client.onStompError = (frame) => {
                console.error("❌ STOMP error:", frame);
                store.dispatch(connectWebsocketFailure());
            };

            client.onDisconnect = () => {
                console.log("WebSocket disconnected");
            };
            client.activate();
            break;
        case subscribeToTopicStart.type:
            if (client?.connected) {
                client.subscribe(`/topic/chat/${action.payload}`, (msg) => {
                    console.log("Message recieved", msg);
                });
                store.dispatch(subscribeToTopicSuccess());
            }
            store.dispatch(subscribeToTopicFailure());

        default:
            break;
    }

    return next(action);
};

export default websocketMiddleware;