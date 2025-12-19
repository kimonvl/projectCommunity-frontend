import { useState, useMemo, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectSearchUsers, selectUserLoading } from "@/store/user/user.selector";
import { clearSearchUsers, getSearchUsersStart } from "@/store/user/userSlice";
import { Loader2 } from "lucide-react";

// debounce utility
function debounce(fn, delay) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
}

export default function ProjectInvite({ projectId, open, setOpen, onInvite }) {
  const dispatch = useAppDispatch();
  const searchUsers = useAppSelector(selectSearchUsers);
  const loading = useAppSelector(selectUserLoading);
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selected, setSelected] = useState([]);

  // debounced search handler
  const debouncedSearch = useMemo(
    () =>
      debounce((value) => {
        if (!value.trim()) {
          dispatch(clearSearchUsers());
          setSuggestions([]);
          return;
        }
        dispatch(getSearchUsersStart({
          emailQuery: value,
          projectId
        }));
      }, 400),
    [dispatch] // re-create debounce when dispatch updates
  );

  useEffect(() => {
    const filtered = searchUsers?.filter((u) => !selected.some((s) => s.id === u.id)); // exclude selected ones
    setSuggestions(filtered);
  }, [searchUsers]);

  const handleChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    debouncedSearch(value);
  };

  const addUser = (user) => {
    setSelected((prev) => [...prev, user]);
    setSuggestions([]);
    setSearch("");
  };

  const removeUser = (id) => {
    setSelected(selected.filter((s) => s.id !== id));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-neutral-900 border border-neutral-700 text-white w-[550px] h-[420px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Invite members</DialogTitle>
        </DialogHeader>

        {/* Input */}
        <div className="relative">
          <input
            value={search}
            onChange={handleChange}
            placeholder="Search by email..."
            className="w-full bg-neutral-800 border border-neutral-600 p-3 rounded-md text-sm"
          />

          {/* Suggestions dropdown */}
          {search.length > 0 && (
            <div className="
      absolute left-0 right-0 mt-1 bg-neutral-800 border border-neutral-700 
      rounded-md shadow-lg z-10
      max-h-48 overflow-y-auto 
      h-48   /* FIXED HEIGHT ALWAYS */
      flex flex-col
    ">
              {/* Loading */}
              {loading && (
                <div className="flex items-center justify-center flex-1">
                  <Loader2 className="w-6 h-6 animate-spin text-neutral-300" />
                </div>
              )}

              {/* No results */}
              {!loading && suggestions.length === 0 && (
                <div className="flex items-center justify-center flex-1 text-neutral-400 text-sm">
                  No users found
                </div>
              )}

              {/* Suggestions list */}
              {!loading &&
                suggestions.length > 0 &&
                suggestions.map((u) => (
                  <div
                    key={u.id}
                    className="p-3 hover:bg-neutral-700 cursor-pointer text-sm border-b border-neutral-700 last:border-b-0"
                    onClick={() => addUser(u)}
                  >
                    {u.email}
                  </div>
                ))}
            </div>
          )}
        </div>


        {/* Selected Chips */}
        <div className="flex flex-wrap gap-2 mt-4">
          {selected.map((u) => (
            <div
              key={u.id}
              className="px-3 py-1 bg-neutral-700 rounded-full flex items-center gap-2 text-sm"
            >
              {u.email}
              <button
                className="text-red-400 hover:text-red-600"
                onClick={() => removeUser(u.id)}
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <Button
          className="mt-auto w-full py-2 text-md"
          disabled={selected.length === 0}
          onClick={() => onInvite(selected)}
        >
          Send Invites
        </Button>
      </DialogContent>

    </Dialog>
  );
}
