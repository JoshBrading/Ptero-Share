import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {Slider} from "@/components/ui/slider.tsx";
import {useState} from "react";
import {Input} from "@/components/ui/input.tsx";
import {PlusIcon} from "@radix-ui/react-icons";
import {Card, CardContent, CardDescription} from "./ui/card";
import {Dropdown} from "@/components/Dropdown.tsx";

const games = [
    {
        value: "minecraft",
        label: "Minecraft",
    },
    {
        value: "rust",
        label: "Rust",
    },
    {
        value: "satisfactory",
        label: "Satisfactory",
    },
    {
        value: "palworld",
        label: "Palworld",
    },
];

const eggs = [
    {
        value: "vanilla",
        label: "Vanilla",
    },
    {
        value: "forge",
        label: "Forge",
    },
    {
        value: "fabric",
        label: "Fabric",
    },
    {
        value: "paper",
        label: "Paper",
    },
];

export function CreateServerDialog() {
    const [ram, setRam] = useState(4);
    const [cpu, setCPU] = useState(1);
    const [storage, setStorage] = useState(32);
    const [selectedGame, setSelectedGame] = useState("");
    const [selectedEgg, setSelectedEgg] = useState("");

    const handleGameChange = (value: string) => {
        setSelectedGame(value);
    };
    const handleEggChange = (value: string) => {
        setSelectedEgg(value);
    };
    const handleRAMChange = (value: number[]) => {
        setRam(value[0]);
    };
    const handleCPUChange = (value: number[]) => {
        setCPU(value[0]);
    };
    const handleStorageChange = (value: number[]) => {
        setStorage(value[0]);
    };
    return (
        <Dialog>
            <DialogTrigger asChild>

                <Card className={"border-0 col-span-1 row-span-1 hover:bg-card/60 hover:cursor-pointer"}>
                    <CardContent className={"h-full flex items-center justify-center"}>
                        <CardDescription className={"flex flex-col items-center pt-4"}><PlusIcon width={48} height={48}/>New Server</CardDescription>
                    </CardContent>
                </Card>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create Server</DialogTitle>
                    <DialogDescription>
                        Be mindful of resource usage.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <Input className={"col-span-3"}/>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Description
                        </Label>
                        <Input className={"col-span-3"}/>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            {ram} GB RAM
                        </Label>
                        <Slider className={"col-span-3"} onValueChange={handleRAMChange} defaultValue={[4]} min={2} max={32}
                                step={1}/>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            {cpu} Threads
                        </Label>
                        <Slider className={"col-span-3"} onValueChange={handleCPUChange} defaultValue={[1]} min={1} max={12}
                                step={1}/>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            {storage} GB Disk
                        </Label>
                        <Slider className={"col-span-3"} onValueChange={handleStorageChange} defaultValue={[32]} min={16}
                                max={128}
                                step={4}/>
                    </div>
                    <div className={"flex space-x-4"}>

                        <Dropdown
                            options={games}
                            value={selectedGame}
                            label={"Search games..."}
                            onChange={handleGameChange}
                        />
                        <Dropdown
                            disabled
                            options={eggs}
                            value={selectedEgg}
                            label={"Search version..."}
                            onChange={handleEggChange}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant={"secondary"} type="submit">Create</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
