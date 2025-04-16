import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
    Loader2,
    Server,
    Palette,
    Gamepad2 as Gamepad,
    Wrench,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BotCommands } from "@/types";
import { c } from "node_modules/vite/dist/node/types.d-aGj9QkWt";

const CommandPage = () => {
    const [activeCategory, setActiveCategory] = useState("all");

    const {
        data: commands,
        isLoading,
        error,
    } = useQuery<BotCommands[]>({
        queryKey: ["/api/commands"],
    });

    // Get unique categories from commands
    const categories = commands
        ? // @ts-ignore
          [...new Set(commands.map((command) => command.category))]
        : [];

    // Filter commands by active category
    const filteredCommands = commands
        ? activeCategory === "all"
            ? commands
            : commands.filter((command) => command.category === activeCategory)
        : [];
    
    // Get the appropriate icon for each category
    const getCategory = (category: string) => {
        
    }
};
