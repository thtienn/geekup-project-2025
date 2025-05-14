import {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";

const link = [
  {
    name: "Users",
    link: "/users",
  },
  {
    name: "Albums",
    link: "/albums",
  },
  {
    name: "Show",
    link: "/users/:userId",
  },
  {
    name: "Show",
    link: "/albums/:albumId",
  }
]
export default function BreadcrumbCustom({page}: {page: string}) {
    let homeLink = null
    let cardLink = null
    if (page === "users") {
      homeLink = link[0]
      cardLink = link[2]
    }
    if (page === "albums") {
      homeLink = link[1]
      cardLink = link[3]
    }

    return (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
              <BreadcrumbLink>
                <Link to={homeLink?.link || "/"}>{homeLink?.name}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink>
            <Link to={cardLink?.link || "/"}>{cardLink?.name}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    )
}