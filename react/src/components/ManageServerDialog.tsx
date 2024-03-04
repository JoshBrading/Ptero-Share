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
import {TrashIcon} from "@radix-ui/react-icons";

export function ManageServerDialog() {
    const [ram, setRam] = useState(6);
    const [cpu, setCPU] = useState(2);
    const [storage, setStorage] = useState(32);
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
                <Button variant="secondary">Manage</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Manage Server</DialogTitle>
                    <DialogDescription>
                        Make changes to your server configuration here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            {ram} GB RAM
                        </Label>
                        <Slider className={"w-64"} onValueChange={handleRAMChange} defaultValue={[6]} min={2} max={32}
                                step={1}/>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            {cpu} Threads
                        </Label>
                        <Slider className={"w-64"} onValueChange={handleCPUChange} defaultValue={[2]} min={1} max={12}
                                step={1}/>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            {storage} GB Disk
                        </Label>
                        <Slider className={"w-64"} onValueChange={handleStorageChange} defaultValue={[32]} min={16} max={128}
                                step={4}/>
                    </div>
                </div>
                <DialogFooter className={"flow-root"}>
                    <Button className={"float-right"} type="submit">Save changes</Button>
                    <Button className={"float-left"} variant={"destructive"}><TrashIcon className={"mr-2"}/>Delete</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
