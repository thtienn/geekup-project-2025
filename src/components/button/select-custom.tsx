// src/components/button/select-custom.tsx
import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent } from "@/components/ui/select";
import React from "react";

interface SelectCustomProps {
  onChangePageSize: (size: number) => void;
  pageSize: number;
}

const SelectCustom: React.FC<SelectCustomProps> = ({ onChangePageSize, pageSize }) => {
  return (
    <Select value={pageSize.toString()} onValueChange={(value) => onChangePageSize(Number(value))}>
      <SelectTrigger className="border p-2 rounded ml-4">
        <SelectValue placeholder="Select Page Size" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="10">10/ page</SelectItem>
        <SelectItem value="20">20/ page</SelectItem>
        <SelectItem value="50">50/ page</SelectItem>
        <SelectItem value="100">100/ page</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default SelectCustom;
