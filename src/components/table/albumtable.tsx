import {
    Table,
    TableHeader,
    TableBody,
    TableHead,
    TableRow,
    TableCell,
  } from "@/components/ui/table";
  import { useEffect, useState } from "react";
  import { Avatar, AvatarImage } from "@/components/ui/avatar";
  import ShowButton from "@/components/button/showbutton";
  import { useSearchParams, useNavigate } from "react-router-dom";
  import PaginationCustom from "@/layout/pagination-custom";
  import SelectCustom from "../button/select-custom";
  
  export default function AlbumTable() {
    interface Album {
      userId: number;
      id: number;
      title: string;
      userName: string;
    }
  
    const [albums, setAlbums] = useState<Album[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
  
    const [pageSize, setPageSize] = useState(parseInt(searchParams.get("pageSize") || "10"));
    const [current, setCurrent] = useState(parseInt(searchParams.get("current") || "1"));
  
    const startIndex = (current - 1) * pageSize;
    const endIndex = startIndex + pageSize;
  
    const totalPages = Math.ceil(albums.length / pageSize);
  
    useEffect(() => {
      const fetchAlbumsWithUserNames = async () => {
        try {
          const albumRes = await fetch("https://jsonplaceholder.typicode.com/albums");
          const albumData = await albumRes.json();
  
          const albumsWithUserNames = await Promise.all(
            albumData.map(async (album: any) => {
              const userRes = await fetch(`https://jsonplaceholder.typicode.com/users/${album.userId}`);
              const userData = await userRes.json();
              return {
                ...album,
                userName: userData.name,
              };
            })
          );
  
          setAlbums(albumsWithUserNames);
        } catch (error) {
          console.error("Error fetching albums or users:", error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchAlbumsWithUserNames();
    }, []);
  
    const paginatedAlbums = albums.slice(startIndex, endIndex);
  
    const goToPage = (page: number) => {
      setCurrent(page);
      navigate(`/albums?pageSize=${pageSize}&current=${page}`);
    };
  
    const handleChangePageSize = (newPageSize: number) => {
      setPageSize(newPageSize);
      setCurrent(1); // Reset to first page
      navigate(`/albums?pageSize=${newPageSize}&current=1`);
    };
  
    return (
      <>
        <Table className="bg-white border border-gray-200 max-w-6xl">
          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4}>Loading...</TableCell>
              </TableRow>
            ) : (
              paginatedAlbums.map((album) => (
                <TableRow key={album.id}>
                  <TableCell>{album.id}</TableCell>
                  <TableCell>{album.title}</TableCell>
                  <TableCell className="flex items-center gap-2">
                    <Avatar>
                      <AvatarImage
                        src={`https://ui-avatars.com/api/?name=${album.userName}`}
                        alt="User Avatar"
                      />
                    </Avatar>
                    {album.userName}
                  </TableCell>
                  <TableCell>
                    <ShowButton href={`/albums/${album.id}`} />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
  
        {!loading && totalPages > 0 && (
          <div className="mt-4 flex items-center ml-auto pb-3 space-x-2 mr-13 justify-center">
            <PaginationCustom
              totalPages={totalPages}
              current={current}
              pageSize={pageSize}
              onPageChange={goToPage}
            />
            <SelectCustom onChangePageSize={handleChangePageSize} pageSize={pageSize} />
          </div>
        )}
      </>
    );
  }
  