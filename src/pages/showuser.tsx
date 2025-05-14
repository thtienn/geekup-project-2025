import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ShowUserCard from "@/components/card/showusercard";
import BreadcrumbCustom from "@/components/button/breadscumbcustom";
import BackButton from "@/components/button/back-button";

export default function ShowUser() {
  const { userId } = useParams();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user:", error);
        setLoading(false);
      });
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <>
    <div className="pl-9 pt-2 pb-2">
      <BreadcrumbCustom page="users" />
    </div>
    <div className="pl-9 pt-2 pb-2">
      <div className="text-xl font-bold mb-4 flex">
        <BackButton link="/users" />Show User
      </div>
    </div>
    <div className="flex flex-col h-screen relative items-center">
      <ShowUserCard user={user} />
    </div>
    </>
    
  );
}