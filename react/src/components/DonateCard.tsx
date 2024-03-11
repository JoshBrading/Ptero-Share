import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";
import {donationCard} from "../config.json"

interface DonationButton{
    text: string;
    color: string;
    link: string;
}

export function DonateCard() {
    
    if( donationCard.disabled )
        return <></>
    
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    {donationCard.title}
                </CardTitle>
                <CardDescription>
                    <p className={"whitespace-pre-line"}>{donationCard.description}</p>
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className={"grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"}>
                    {donationCard.buttons.map((btn : DonationButton)=> {
                        return(
                            <Button className={`bg-[${btn.color}] hover:bg-[${btn.color}]/80`}>
                                <a href={btn.link} target={'_blank'}>{btn.text}</a>
                            </Button>
                        )
                    })}
                </div>

            </CardContent>
        </Card>
    );
}
