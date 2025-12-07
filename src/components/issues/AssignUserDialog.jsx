import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function AssignUserDialog({ open, setOpen, assignedUsers = [], participants = [], onAssign }) {
    // Users currently assigned to the issue
    const assigned = assignedUsers;

    // Participants available to assign (exclude already assigned)
    const unassigned = participants.filter(
        (p) => !assigned.some((a) => a.id === p.id)
    );

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="bg-neutral-900 border border-neutral-700 text-white w-[350px]">
                <DialogHeader>
                    <DialogTitle>Assign Users</DialogTitle>
                </DialogHeader>

                {/* --- Assigned Users Section --- */}
                {assigned.length > 0 && (
                    <div className="mt-4">
                        <p className="text-xs text-neutral-400 mb-1">Assigned</p>
                        <div className="space-y-2">
                            {assigned.map((user) => (
                                <div
                                    key={user.id}
                                    
                                    className="p-2 bg-neutral-800 border border-neutral-700 rounded-md cursor-pointer hover:bg-neutral-700 flex items-center justify-between"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-neutral-700 flex items-center justify-center">
                                            {user.email.charAt(0).toUpperCase()}
                                        </div>
                                        <span className="text-sm">{user.email}</span>
                                    </div>
                                    <span className="text-red-400 text-xs">Remove</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* --- Unassigned Users Section --- */}
                <div className="mt-6">
                    <p className="text-xs text-neutral-400 mb-1">Available</p>
                    <div className="space-y-2">
                        {unassigned.length > 0 ? (
                            unassigned.map((user) => (
                                <div
                                    key={user.id}
                                    onClick={() => {
                                        onAssign(user);
                                        setOpen(false);
                                    }}
                                    className="p-2 bg-neutral-800 border border-neutral-700 rounded-md cursor-pointer hover:bg-neutral-700 flex items-center gap-3"
                                >
                                    <div className="w-8 h-8 rounded-full bg-neutral-700 flex items-center justify-center">
                                        {user.email.charAt(0).toUpperCase()}
                                    </div>
                                    <span className="text-sm">{user.email}</span>
                                </div>
                            ))
                        ) : (
                            <p className="text-neutral-500 text-sm">No more members to assign.</p>
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
