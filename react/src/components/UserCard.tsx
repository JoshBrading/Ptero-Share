import {Card, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";
import * as supabase from "@/lib/supabase.ts";
import {useEffect, useState} from "react";

import {userCard} from "../config.json"

export function UserCard() {
const [username, setUsername] = useState<string>("");
    useEffect(() => {
        supabase.getSupabaseClient().auth.getUser().then(({ data: { user } }) => {
            setUsername(user?.identities?.at(0)?.identity_data?.custom_claims?.global_name)
        });
    }, [])

    async function logout(){
        await supabase.getSupabaseClient().auth.signOut();
    }

    return (
        <Card className={"border-0"}>
            <CardHeader className={"flow-root"}>
                <CardTitle className={"float-left mt-4"}>{userCard.welcomeMessage.replaceAll("{name}", username)}</CardTitle>
                <Button onClick={() => {
                    logout();
                }} variant="destructive" className={"float-right max-w-32"}>
                    Logout
                </Button>
            </CardHeader>
        </Card>
    );
}
