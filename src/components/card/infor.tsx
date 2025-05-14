import { Avatar, AvatarImage } from "@/components/ui/avatar";

interface InforProps {
  userName: string;
  email: string;
}

export default function Infor({ userName, email }: InforProps) {
  return (
    <div className="flex flex-wrap p-5">
        <Avatar className="h-10 w-10 size-7">
            <AvatarImage src={`https://ui-avatars.com/api/?name=${userName}?rounded=true}`} alt="User Avatar" />
        </Avatar>
        <div className="ml-4">
            <h2 className="text-lg font-bold">{userName}</h2>
            <a href={`mailto:${email}`}>{email}</a>
        </div>
    </div>
  );
}