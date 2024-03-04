import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Progress} from "@/components/ui/progress.tsx";
import {useEffect, useState} from "react";
import {getSystemAllocation} from "@/lib/ptero.ts";

interface allocation{
    cpu: number;
    ram: number;
    disk: number;
}
export function ServerAllocation () {
    const [nodeAllocation, setNodeAllocation] = useState<allocation>({cpu: 0, ram: 0, disk: 0});
    const [serverAllocation, setServerAllocation] = useState<allocation>({cpu: 0, ram: 0, disk: 0});

    useEffect(() => {
        getSystemAllocation().then((data) =>{
            setNodeAllocation(data.nodeAllocation);
            setServerAllocation(data.serverAllocation);
        })
    }, []);
    

    return (
        <Card className={"max-w-full lg:max-w-72 border-0"}>
            <CardHeader>
                <CardTitle>System Allocation</CardTitle>
                <CardDescription>Please do not abuse the available allocation space, thank you
                    :)</CardDescription>
            </CardHeader>
            <CardContent className={"grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1"}>
                <Card className={"w-48 md:w-56 border-0"}>
                    <CardHeader>
                        <CardTitle>Memory</CardTitle>
                        <CardDescription>DDR4 3200</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Progress color={((serverAllocation.ram / nodeAllocation.ram) * 100) > 80? "bg-red-500" : ""} value={(serverAllocation.ram / nodeAllocation.ram) * 100}/>
                        <p className={"pt-2"}>{Math.round((serverAllocation.ram / 1024) * 100) / 100} / {Math.round((nodeAllocation.ram / 1024) * 100) / 100} GB</p>
                        <CardDescription>{Math.round(((nodeAllocation.ram / 1024) - (serverAllocation.ram / 1024)) * 100) / 100} GB Free</CardDescription>
                    </CardContent>
                </Card>
                <Card className={"w-48 md:w-56 border-0"}>
                    <CardHeader>
                        <CardTitle>CPU</CardTitle>
                        <CardDescription>AMD Ryzen 5 3600</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Progress color={((serverAllocation.cpu / nodeAllocation.cpu) * 100) > 80? "bg-red-500" : ""} value={(serverAllocation.cpu / nodeAllocation.cpu) * 100} className={''}/>
                        <p className={"pt-2"}>{serverAllocation.cpu / 50} / {nodeAllocation.cpu / 50} Thread/s</p>
                        <CardDescription>{(nodeAllocation.cpu / 50) - (serverAllocation.cpu / 50)} Thread/s
                            Free</CardDescription>
                    </CardContent>
                </Card>
                <Card className={"w-48 md:w-56 border-0"}>
                    <CardHeader>
                        <CardTitle>Storage</CardTitle>
                        <CardDescription>Samsung 870 SSD</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Progress color={((serverAllocation.disk / nodeAllocation.disk) * 100) > 80? "bg-red-500" : ""} value={(serverAllocation.disk / nodeAllocation.disk) * 100}/>
                        <p className={"pt-2"}>{Math.round((serverAllocation.disk / 1024) * 100) / 100} GB / {Math.round((nodeAllocation.disk / 1024) * 100) / 100} GB</p>
                        <CardDescription>{Math.round(((nodeAllocation.disk / 1024) - (serverAllocation.disk / 1024)) * 100) / 100} GB
                            Free</CardDescription>
                    </CardContent>
                </Card>
                
            </CardContent>
        </Card>
    );
}
