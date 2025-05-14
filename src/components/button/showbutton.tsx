import { Button, buttonVariants} from "../ui/button";
import {Eye} from "lucide-react"

export default function ShowButton({ href }: { href: string }) {
    return (
        <a href={href}>
            <Button
            variant="default"
            size="default"
            className={buttonVariants({ variant: "outline", size: "sm" })}
            >
                <Eye className="h-4 w-4" /> Show
            </Button>
        </a>
        // <Button
        // variant="default"
        // size="default"
        // onClick={onClick}
        // className={buttonVariants({ variant: "outline", size: "sm" })}
        // >
        //     <Eye className="h-4 w-4" /> Show
        // </Button>
    );
}