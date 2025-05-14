import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { useEffect, useState } from "react"
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import ShowButton from "@/components/button/showbutton";
export default function UserTable() {
  interface User {
    id: number;
    name: string;
    email: string;
    phone: string;
    website: string;
  }

  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data)
        setLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching users:", error)
        setLoading(false)
      })
  }, [])

  function getRandomHexColor() {
    return Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0")
  }

  return (
    <Table className="bg-white border border-gray-200 max-w-6xl scroll-y-hidden">
      <TableHeader className="bg-gray-100">
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Avatar</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead>Website</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {loading ? (
          <tr>
            <td colSpan={3}>Loading...</td>
          </tr>
        ) : (
          users.map((user) => (
            <TableRow className="bg-white" key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>
                <Avatar>
                  <AvatarImage src={`https://ui-avatars.com/api/?name=${user.name}?rounded=true?background=${getRandomHexColor()}`} alt="User Avatar" />
                </Avatar>
              </TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>
                <a href={`mailto:${user.email}`}>{user.email}</a>
              </TableCell>
              <TableCell><a href={`tel:${user.phone}`}>{user.phone}</a></TableCell>
              <TableCell><a href={`${user.website}`}>{user.website}</a></TableCell>
              <TableCell>
                <ShowButton href={`/users/${user.id}`}/>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  )

}
