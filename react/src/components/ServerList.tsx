import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {DiscIcon, LayersIcon, MarginIcon, OpenInNewWindowIcon} from "@radix-ui/react-icons";
import {ManageServerDialog} from "@/components/ManageServerDialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useEffect, useState} from "react";
import {getUserServers} from "@/lib/ptero.ts";
import {CreateServerDialog} from "@/components/CreateServerDialog.tsx";

const panelURL = import.meta.env.VITE_PANEL_URL + '/server/';

interface Server{
    name: string,
    description: string,
    uuid: string,
    specs: {
        ram: number,
        cpu: number,
        storage: number
    }
}

export function ServerList() {
    const [servers, setServers] = useState<Array<Server> | null>(null);

    useEffect(() => {
        getUserServers().then((data)=>
        {
            setServers(data.servers);
            console.log(servers)
            console.log(data)
        })
        
    }, []);
    return (
        <>

            <div className={"grid gap-4 grid-cols-1 sm:2 md:grid-cols-3 2xl:grid-cols-4"}>
                {servers?.map((server: Server) => {
                    return (
                        <Card key={server.uuid} className={"border-0 col-span-1 w-full"}>
                            <CardHeader>
                                <CardTitle>{server.name}</CardTitle>
                                <CardDescription>{server.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className={"flex"}><LayersIcon className={"mr-2 mt-1.5"}/> {Math.round((server.specs.ram / 1024) * 100) / 100} GB RAM</p>
                                <p className={"flex"}><MarginIcon className={"mr-2 mt-1.5"}/> {server.specs.cpu / 50} Thread/s</p>
                                <p className={"flex"}><DiscIcon className={"mr-2 mt-1.5"}/> {Math.round((server.specs.storage / 1024) * 100) / 100} GB Storage</p>
                            </CardContent>
                            <CardFooter className={"flow-root space-x-4"}>
                                <ManageServerDialog/>
                                <Button asChild variant={"secondary"} className={"float-right"}>
                                    <a href={panelURL + server.uuid.slice(0, 8)} target={'_blank'}>
                                        Panel<OpenInNewWindowIcon className={"ml-2"}/>
                                    </a>
                                </Button>
                            </CardFooter>
                        </Card>
                    );
                })}
                <CreateServerDialog/>
            </div>
        </>
    );
}
