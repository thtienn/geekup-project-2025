type Column = {
    accessor: string;
    header: string;
}
  
export type ReusableTableProps = {
    columns: Column[];
    data: Record<string, any>[];
}