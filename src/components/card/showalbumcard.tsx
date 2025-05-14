import { useState, useEffect } from "react";

export default function ShowAlbumCard({albumId}: { albumId: number }) {
    interface Photo {
        albumId: number;
        id: number;
        title: string;
        url: string;
        thumbnailUrl: string;
    }
    const [photos, setPhotos] = useState<Photo[]>([])
    const [loading, setLoading] = useState(true)

 
    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`)
            .then((res) => res.json())
            .then((data) => {
                setPhotos(data.slice(0, 10))
                setLoading(false)
            })
            .catch((error) => {
                console.error("Error fetching photos:", error)
                setLoading(false)
            })
    }, [])
    return (
        <>
            {loading ? (
                        <tr>
                            <td colSpan={5}>Loading...</td>
                        </tr>
                    ) : (
            <div className="grid grid-cols-5 gap-4">
                {photos.map((photo) => (
                    <div key={photo.id} className="border p-2">
                        <img src={photo.thumbnailUrl} alt={photo.title} className="w-full h-auto" />
                    </div>
                ))}
            </div> )
        }
        </>
    )
}