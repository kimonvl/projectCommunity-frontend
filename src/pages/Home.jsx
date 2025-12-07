import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { MoreVertical, Filter } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import FilterBar from "@/components/filter-bar/FilterBar";
import SearchBar from "@/components/search-bar/SearchBar";
import ProjectCard from "@/components/project-card/ProjectCard";
import { useDispatch, useSelector } from "react-redux";
import { getMyProjectsStart } from "@/store/project/projectSlice";
import { selectMyProjects } from "@/store/project/project.selector";
import { fetchActiveChatStart, sendMessageStart } from "@/store/chat/chatSlice";
import { projectCategories } from "@/config/CreateProjectFormControls";
import { subscribeToTopicStart } from "@/store/websocket/websocketSlice";
import { selectWebsocketIsConnected } from "@/store/websocket/websocket.selector";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const myProjects = useSelector(selectMyProjects);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedTag, setSelectedTag] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(getMyProjectsStart());
  }, []);

  const filteredProjects = myProjects?.filter(project => {
    const matchCategory = selectedCategory === "all" || project.category === selectedCategory;
    const matchTag = selectedTag === "all" || project.tags.includes(selectedTag);
    const matchSearch = project?.title.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchTag && matchSearch;
  });

  const onProjectSelect = (projectId) => {
    navigate(`/projectDetails/${projectId}`);
  } 

  return (
    <div className="w-full flex bg-black text-white h-[calc(100vh-56px)] overflow-hidden">
      <div className="w-[85%] mx-auto flex gap-6 pt-6">

        {/* Sidebar fixed height */}
        <div className="w-[22%] h-full">
          <FilterBar
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            categories={projectCategories}
          />
        </div>

        {/* Right side scrollable content */}
        <main className="w-[78%] flex flex-col h-full overflow-hidden">

          {/* Search bar sticky */}
          <div className="sticky top-0 bg-black z-10 pb-4">
            <SearchBar search={search} setSearch={setSearch} />
          </div>

          {/* Scrollable project cards */}
          <div className="overflow-y-auto h-full pr-1 flex flex-col gap-4">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} onClick={() => onProjectSelect(project.id)} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );

}
export default Home;