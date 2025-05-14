import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Infor from "./infor";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell} from "@/components/ui/table";
import ShowButton from "@/components/button/showbutton";
export default function ShowUserCard({user}: any) {
    const {userId} = useParams()
    interface Album {
        userId: number;
        id: number;
        title: string;
        userName: string;
    }
    const [albums, setAlbums] = useState<Album[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/albums?userId=${userId}`)
            .then((res) => res.json())
            .then((data) => {
                setAlbums(data)
                setLoading(false)
            })
            .catch((error) => {
                console.error("Error fetching albums:", error)
                setLoading(false)
            })
    }, [])
        
    return (
        <div className="bg-white flex flex-col rounded-[5px] container pl-1 pr-2 pt-2 pb-2 max-w-6xl border-radius">
            <div className="bg-white flex flex-col rounded-[5px] border border-gray-200 p-2 m-5">
                <Infor userName={user?.name || "Unknown"} email={user?.email || "Unknown"}/>
            <div className="justify-items-center border-t-gray-200 max-w-6xl">
                <Table className="w-full">
                <TableHeader className="bg-gray-100">
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {loading ? (
                        <tr>
                            <td colSpan={5}>Loading...</td>
                        </tr>
                    ) : (
                        albums.map((album) => (
                            <TableRow key={album.id}>
                                <TableCell>{album.id}</TableCell>
                                <TableCell>{album.title}</TableCell>
                                <TableCell>
                                    <ShowButton href={`/albums/${album.id}`}/>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
            </div>
            
            </div>
        
        </div>
    )
}