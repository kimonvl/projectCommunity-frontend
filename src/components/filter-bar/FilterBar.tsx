import { Filter } from 'lucide-react'
import { Separator } from '../ui/separator'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Label } from '../ui/label'
import { Dispatch, SetStateAction } from 'react';

interface FilterBarProps {
  selectedCategory: string;
  setSelectedCategory: Dispatch<SetStateAction<string>>;
  categories: string[];
  tags: string[];
}

const FilterBar = ({selectedCategory, setSelectedCategory, categories, tags}: FilterBarProps) => {
  return (
    <aside className="w-full h-full bg-neutral-900 border border-neutral-800 rounded-lg p-4 overflow-y-auto max-h-[calc(100vh-100px)]">
          <div className="flex justify-between items-center">
            <h3 className="text-sm uppercase tracking-wide">Filters</h3>
            <Filter size={18} />
          </div>

          <Separator className="my-3" />

          <p className="text-xs uppercase mb-2">Category</p>
          <RadioGroup value={selectedCategory} onValueChange={setSelectedCategory} className="gap-3">
            {categories.map(cat => (
              <div key={cat} className="flex items-center space-x-2">
                <RadioGroupItem value={cat} id={cat} />
                <Label htmlFor={cat} className="capitalize text-sm">{cat}</Label>
              </div>
            ))}
          </RadioGroup>

          <Separator className="my-3" />

          
        </aside>
  )
}

export default FilterBar
