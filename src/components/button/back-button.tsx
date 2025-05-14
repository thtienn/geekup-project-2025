import {ArrowLeft} from "lucide-react"
import { Link } from 'react-router-dom'


export default function BackButton({link} : {link:string}) {
    return (
        <>
            <Link to={`${link}`} className="decoration-black pr-3">
                <ArrowLeft />
            </Link>
        </>
    )
}