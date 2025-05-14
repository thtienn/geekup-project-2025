import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationPrevious,
    PaginationNext,
    PaginationEllipsis,
  } from "@/components/ui/pagination";
  
  interface Props {
    totalPages: number;
    current: number;
    pageSize: number;
    onPageChange: (page: number) => void;
  }
  
  export default function PaginationCustom({
    totalPages,
    current,
    onPageChange,
  }: Props) {
    const getPaginationPages = () => {
      const pages: (number | string)[] = [];
      const maxVisible = 5; // Maximum visible pages before ellipsis
      const siblings = 1; // Number of sibling pages to display
  
      if (totalPages <= maxVisible) {
        // If the total pages are fewer than the maximum visible, show all
        for (let i = 1; i <= totalPages; i++) pages.push(i);
      } else {
        const first = 1;
        const last = totalPages;
  
        // Always show the first page
        pages.push(first);
  
        // Add ellipsis if the current page is far from the first
        if (current > siblings + 2) {
          pages.push("start-ellipsis");
        }
  
        // Add the range of visible pages around the current page
        const start = Math.max(current - siblings, 2);
        const end = Math.min(current + siblings, totalPages - 1);
  
        for (let i = start; i <= end; i++) {
          pages.push(i);
        }
  
        // Add ellipsis if the current page is far from the last
        if (current < totalPages - siblings - 1) {
          pages.push("end-ellipsis");
        }
  
        // Always show the last page
        pages.push(last);
      }
  
      return pages;
    };
  
    return (
      <Pagination className="justify-center">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => current > 1 && onPageChange(current - 1)}
              className={current <= 1 ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
  
          {getPaginationPages().map((page, index) =>
            typeof page === "string" ? (
              <PaginationItem key={page + index}>
                <PaginationEllipsis />
              </PaginationItem>
            ) : (
              <PaginationItem key={page}>
                <PaginationLink
                  isActive={current === page}
                  onClick={() => onPageChange(page)}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            )
          )}
  
          <PaginationItem>
            <PaginationNext
              onClick={() => current < totalPages && onPageChange(current + 1)}
              className={current >= totalPages ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  }
  