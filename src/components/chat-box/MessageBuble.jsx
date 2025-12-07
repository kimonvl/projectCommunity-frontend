import React from "react";
import { cn } from "@/lib/utils";

function MessageBubble({ message, isOwn }) {
    const firstLetter = message.sender?.email?.charAt(0)?.toUpperCase();    

    return (
        <div
            className={cn(
                "flex items-start gap-3 w-full mb-3",
                isOwn ? "justify-end" : "justify-start"
            )}
        >
            {/* Avatar (left side for other users, right side for self) */}
            {!isOwn && (
                <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center border border-neutral-600 text-sm">
                    {firstLetter}
                </div>
            )}

            {/* Bubble */}
            <div
                className={cn(
                    "max-w-[70%] px-3 py-2 rounded-lg text-sm",
                    isOwn
                        ? "bg-blue-600 text-white self-end"
                        : "bg-neutral-800 text-neutral-200"
                )}
            >
                {message.content}
            </div>

            {/* Avatar on right side for own messages */}
            {isOwn && (
                <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center border border-neutral-600 text-sm">
                    {firstLetter}
                </div>
            )}
        </div>
    );
}

// Prevent re-renders if props don't change
export default React.memo(MessageBubble);
