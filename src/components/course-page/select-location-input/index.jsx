"use client";

import AutocompleteInput from "@/components/autocomplete-input";
import { useLocationDetails } from "@/lib/api/useLocationDetails";
import { useLocationList } from "@/lib/api/useLocationList";
import useDebounce from "@/lib/hooks/useDebounce";
import React, { forwardRef, useState } from "react";

const SelectLocationInput = forwardRef(
  ({ disabled, onSelectOption, value, ...props }, ref) => {
    const [keyword, setKeyword] = useState("");

    const debounceSearch = useDebounce(keyword, 500);
    const { data } = useLocationList({ role: "lecturer", search: debounceSearch });

    const userDetails = useLocationDetails(value);

    return (
      <AutocompleteInput
        ref={ref}
        {...props}
        suggestions={data}
        placeholder="Masukkan Nama Ruangan"
        disabled={disabled}
        defaultQuery={userDetails?.data?.name || ""}
        onChange={(val) => setKeyword(val)}
        onSelectOption={onSelectOption}
      />
    );
  }
);

export default SelectLocationInput;
