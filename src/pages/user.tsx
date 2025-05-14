import UserTable from "@/components/table/usertable";

export default function User() {
    return (
        <div className="container pl-7 pt-2 pb-7 m-6xl">
            <p className="text-xl font-bold mb-4">Users</p>
            <UserTable />
        </div>
    )
}