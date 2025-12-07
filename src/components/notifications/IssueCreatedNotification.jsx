import React from 'react'
import { useNavigate } from 'react-router-dom'

const IssueCreatedNotification = ({notification}) => {
    const navigate = useNavigate()

    const handleNotificationClick = () => {
        window.history.pushState({}, "", `/projectDetails/${notification.metadata.projectId}`);
        navigate(`/issueDetails/${notification.metadata.issueId}`);
    }

    return (
        <div onClick={handleNotificationClick} className="p-3 rounded-md bg-neutral-800 border border-neutral-700 space-y-2">
            {/* Main message */}
            <p className="text-sm font-semibold">
                {notification.message}
            </p>
        </div>
    )
}

export default IssueCreatedNotification
