import ShowAlbumCard from "@/components/card/showalbumcard";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import BackButton from "@/components/button/back-button";
import Infor from "@/components/card/infor";
import BreadcrumbCustom from "@/components/button/breadscumbcustom";
export default function Album() {
    const { albumId } = useParams();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<any>(null);
    const [userId, setUserId] = useState<number | null>(null);

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}`)
            .then((res) => res.json())
            .then((data) => {
                setUserId(data.userId);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching user:", error);
                setLoading(false);
            });
    }, [albumId]);

    useEffect(() => {
        if (userId) {
            fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
                .then((res) => res.json())
                .then((data) => {
                    setUser(data);
                })
                .catch((error) => {
                    console.error("Error fetching user:", error);
                });
        }
    }, [userId]);

    return (
        <div className="h-screen">
            <div className="p-4">
                <BreadcrumbCustom page="albums" />  
            </div>   
            <div className="pl-4">
                <div className="text-xl font-bold mb-4 flex justifiy-center">
                    <BackButton link="/albums"/> Show Album
                </div> 
            </div>    
            <div>
              {loading ? (
                        <tr>
                            <td colSpan={5}>Loading...</td>
                        </tr>
                    ) : (
            <div className="bg-white flex flex-col rounded-[5px] border border-gray-200 p-2 m-5 max-w-6xl">
                <Infor
                    userName={user?.name || "Unknown User"}
                    email={user?.email || "No Email Provided"}
                />
                <div className="justify-items-center border-t-gray-200 max-w-6xl">
                    <ShowAlbumCard albumId={ albumId ? Number(albumId) : 1 } />
                </div> 
            </div>   )}
            </div>      
            
        </div>   
    );
}