import React from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Filter } from 'lucide-react'

const SearchBar = ({search, setSearch}) => {
    return (
        <div className="flex justify-between items-center mb-3">
            <Input
                placeholder="Search project..."
                className="w-full max-w-lg bg-neutral-900 border-neutral-700"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <Button variant="ghost">
                <Filter size={18} />
            </Button>
        </div>
    )
}

export default SearchBar
