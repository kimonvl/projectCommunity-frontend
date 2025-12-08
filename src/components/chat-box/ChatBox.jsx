import React, { useMemo, useState, useRef, useEffect } from "react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { selectActiveChat } from "@/store/chat/chat.selector";
import MessageBubble from "./MessageBuble";
import { selectCurrentUserId } from "@/store/auth/auth.selector";
import { sendMessageStart } from "@/store/chat/chatSlice";

const ChatBox = () => {
    const dispatch = useDispatch();
    const activeChat = useSelector(selectActiveChat);
    const currentUserId = useSelector(selectCurrentUserId);

    const [content, setContent] = useState("");

    const scrollRef = useRef(null);

    const safeMessages = activeChat?.messages || [];

    const handleSend = () => {
        if (!content.trim()) return;
        if (!activeChat?.id) return; // chat not loaded yet

        dispatch(
            sendMessageStart({
                chatId: activeChat.id,
                content: content,
            })
        );

        setContent("");
    };

    // Auto-scroll when the chat loads or messages update
    useEffect(() => {
        if (!scrollRef.current) return;
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }, [safeMessages.length]);

    // Memoized list (safe, never breaks)
    const messagesList = useMemo(() => {
        if (safeMessages.length === 0) {
            return (
                <p className="text-neutral-500 text-sm">
                    No messages yet. Start the conversation!
                </p>
            );
        }

        return safeMessages.map((message) => (
            <MessageBubble
                key={message.id}
                message={message}
                isOwn={message.sender?.id === currentUserId}
            />
        ));
    }, [safeMessages, currentUserId]);

    return (
        <div className="flex-[2] border border-neutral-700 rounded-lg flex flex-col h-full">
            <div className="p-4 border-b border-neutral-700 font-semibold">
                Chat Box
            </div>

            {/* Messages */}
            <div
                ref={scrollRef}
                className="flex-1 overflow-auto p-4 text-neutral-300"
            >
                {messagesList}
            </div>

            {/* Input */}
            <div className="p-3 border-t border-neutral-700 flex items-center">
                <input
                    className="flex-1 bg-transparent outline-none"
                    placeholder="type message..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                />
                <Button onClick={handleSend} size="sm" className="ml-2">
                    Send
                </Button>
            </div>
        </div>
    );
};

export default ChatBox;
