"use client";

import AutocompleteInput from "@/components/autocomplete-input";
import { useUserDetails } from "@/lib/api/useUserDetails";
import { useUserList } from "@/lib/api/useUserList";
import useDebounce from "@/lib/hooks/useDebounce";
import React, { forwardRef, useState } from "react";

const SelectLecturerInput = forwardRef(
  ({ disabled, onSelectOption, value, ...props }, ref) => {
    const [keyword, setKeyword] = useState("");

    const debounceSearch = useDebounce(keyword, 500);
    const { data } = useUserList({ role: "lecturer", search: debounceSearch });

    const userDetails = useUserDetails(value);

    return (
      <AutocompleteInput
        ref={ref}
        {...props}
        suggestions={data}
        placeholder="Masukkan Nama Dosen"
        disabled={disabled}
        defaultQuery={userDetails?.data?.name || ""}
        onChange={(val) => setKeyword(val)}
        onSelectOption={onSelectOption}
      />
    );
  }
);

export default SelectLecturerInput;
