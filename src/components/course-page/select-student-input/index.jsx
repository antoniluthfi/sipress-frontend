"use client";

import AutocompleteInput from "@/components/autocomplete-input";
import { useUserDetails } from "@/lib/api/useUserDetails";
import { useUserList } from "@/lib/api/useUserList";
import useDebounce from "@/lib/hooks/useDebounce";
import React, { forwardRef, memo, useState } from "react";

const SelectStudentInput = forwardRef(
  ({ disabled, onSelectOption, value, ...props }, ref) => {
    const [keyword, setKeyword] = useState("");

    const debounceSearch = useDebounce(keyword, 500);
    const { data } = useUserList({ role: "student", search: debounceSearch });

    const userDetails = useUserDetails(value);

    return (
      <AutocompleteInput
        ref={ref}
        {...props}
        suggestions={data}
        placeholder="Masukkan Nama Mahasiswa"
        disabled={disabled}
        defaultQuery={userDetails?.data?.name || ""}
        onChange={(val) => setKeyword(val)}
        onSelectOption={(val) => {
          const selectedData = data?.find((user) => user?.id === val);
          onSelectOption(selectedData);
        }}
      />
    );
  }
);

SelectStudentInput.displayName = "SelectStudentInput";

export default memo(SelectStudentInput);
