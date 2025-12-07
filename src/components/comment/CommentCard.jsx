import { Pencil, Trash2 } from "lucide-react";

export default function CommentCard({ comment, currentUserEmail, onEdit, onDelete }) {
    const isOwn = comment.author.email === currentUserEmail;

    return (
        <div className="flex items-start gap-3 p-3 bg-neutral-900 border border-neutral-800 rounded-md w-1/2">
            
            {/* Avatar */}
            <div className="w-9 h-9 rounded-full bg-neutral-700 flex items-center justify-center text-sm border border-neutral-600">
                {comment.author.email.charAt(0).toUpperCase()}
            </div>

            {/* Email + Content */}
            <div className="flex-1 flex flex-col -mt-2 overflow-hidden">
                <p className="text-xs font-semibold text-neutral-400 leading-none mb-1">
                    {comment.author.email}
                </p>
                <p className="text-neutral-300 text-sm leading-snug break-words whitespace-pre-wrap">
                    {comment.content}
                </p>
            </div>

            {/* Icons */}
            {isOwn && (
                <div className="flex flex-col justify-center gap-2 text-neutral-500">
                    <Pencil
                        className="w-4 h-4 cursor-pointer hover:text-neutral-300"
                        onClick={() => onEdit(comment)}
                    />
                    <Trash2
                        className="w-4 h-4 cursor-pointer hover:text-red-400"
                        onClick={() => onDelete(comment.id)}
                    />
                </div>
            )}
        </div>
    );
}
