import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Badge } from '../ui/badge'
import { MoreVertical, Users } from 'lucide-react'

const ProjectCard = ({ project, onClick }) => {
    return (
        <Card key={project.id} onClick={onClick} className="bg-neutral-900 border-neutral-800 hover:border-neutral-600 transition-colors">
            <CardHeader className="flex flex-row justify-between items-start pb-2">
                <div className="space-y-1">
                    <CardTitle className="text-lg font-semibold">{project.title}</CardTitle>
                    <p className="text-sm text-neutral-400">{project.category}</p>

                    {/* Owner Email */}
                    <p className="text-xs text-neutral-500">
                        Owner: <span className="text-neutral-300">{project.owner.email}</span>
                    </p>

                    {/* Participants Count */}
                    <div className="flex items-center gap-1 text-xs text-neutral-400">
                        <Users size={14} />
                        {project.participants?.length || 1} participants
                    </div>
                </div>

                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <MoreVertical className="cursor-pointer text-neutral-400 hover:text-neutral-200" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-neutral-800 border-neutral-700 text-white">
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-400">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </CardHeader>

            <CardContent>
                <p className="text-neutral-300 text-sm mb-3 line-clamp-3">{project.description}</p>

                {/* Tags */}
                <div className="flex gap-2 flex-wrap">
                    {project.tags.map((tag, index) => (
                        <Badge
                            key={index}
                            className="bg-neutral-800 border border-neutral-600 text-neutral-200 px-2 py-0.5"
                        >
                            {tag}
                        </Badge>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

export default ProjectCard
