import {Button} from "@/components/ui/button.tsx";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {DiscordLogoIcon, GitHubLogoIcon} from "@radix-ui/react-icons";
import {Session} from "@supabase/supabase-js";
import {useEffect, useState} from "react";
import {ServerAllocation} from "@/components/ServerAllocation.tsx";
import {ServerList} from "@/components/ServerList.tsx";
import * as supabase from "@/lib/supabase.ts";

//const supabase = getSupabaseClient();

async function signInWithDiscord() {
    await supabase.getSupabaseClient().auth.signInWithOAuth({
        provider: 'discord',
    })
}

async function logout(){
    await supabase.getSupabaseClient().auth.signOut();
}

function App() {
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState<string | null>(null);
    useEffect(() => {
        supabase.getSupabaseClient().auth.getSession().then(({ data: { session } }) => {
            setSession(session)
        });

        supabase.getSupabaseClient().auth.getUser().then(({ data: { user } }) => {
            setUsername(user?.identities?.at(0)?.identity_data?.custom_claims?.global_name)
        });

        const {
            data: { subscription },
        } = supabase.getSupabaseClient().auth.onAuthStateChange((_event, session) => {
            console.log("onAuthStateChange")
            setSession(session)
        });

        return () => subscription.unsubscribe();
    }, [])


    return (
        <div className={"min-h-screen w-screen p-4 flex flex-col items-center"}>
                    {!session ? (
                        <div className={"flex flex-col items-center"}>
                            <Card className={"max-w-xl"}>
                                <CardHeader>
                                    <CardTitle>Ptero Share</CardTitle>
                                    <CardDescription>Free your users to generate servers</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p>With Ptero Share you can generate your own game servers without asking your <span
                                        className={"line-through"}>host</span> <span
                                        className={"italic"}>generous friend</span> to do it for you.</p>
                                </CardContent>
                            </Card>
                            <Card className={"mt-8"}>
                                <CardHeader>
                                    <CardTitle>Login</CardTitle>
                                    <CardDescription>Connect your account to begin managing your
                                        servers</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Button onClick={() => {
                                        setLoading(true);
                                        signInWithDiscord().finally(() => setLoading(false));
                                    }} variant="secondary" disabled={loading}>
                                        {loading ? 'Logging in...' : <><DiscordLogoIcon className={"mr-2"}/> Sign in
                                            with
                                            Discord</>}</Button>
                                </CardContent>
                            </Card>
                        </div>

                    ) : (
                        <div className={"lg:flex lg:space-x-4 space-y-4 lg:space-y-0"}>
                            <ServerAllocation/>
                            <div className={"space-y-4"}>
                                <Card className={"border-0"}>
                                    <CardHeader className={"flow-root"}>
                                        <CardTitle className={"float-left mt-4"}>Hello, {username!}</CardTitle>
                                        <Button onClick={() => {
                                            logout();
                                        }} variant="destructive" className={"float-right max-w-32"}>
                                            Logout
                                        </Button>
                                    </CardHeader>
                                </Card>
                                <ServerList/>
                            </div>

                        </div>
                    )}
            <footer className={"flex flex-col items-center sticky top-[100vh] mt-4"}>
                <p className={"italic text-muted-foreground"}>Tacki's Pterodactyl Server Allocator</p>
                <a href="https://github.com" className={"text-muted-foreground text-xl mt-4"}><GitHubLogoIcon/></a>
            </footer>
        </div>
)
}

export default App
