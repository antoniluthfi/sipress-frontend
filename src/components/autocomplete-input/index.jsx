/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { cn } from "@/lib/utils";
import React, { useState, useEffect, useRef, forwardRef, memo } from "react";

const AutocompleteInput = forwardRef(
  ({ inputClassName, suggestions, suggestionClassName, onSelectOption, defaultQuery, ...props }, ref) => {
    const [query, setQuery] = useState("");
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const suggestionsRef = useRef([]);

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
          setShowDropdown(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);

    useEffect(() => {
      const handleKeyDown = (event) => {
        if (filteredSuggestions.length > 0) {
          if (event.key === "ArrowDown") {
            setSelectedIndex((prevIndex) => {
              const nextIndex =
                prevIndex === filteredSuggestions.length - 1
                  ? 0
                  : prevIndex + 1;
              suggestionsRef.current[nextIndex]?.scrollIntoView({
                block: "nearest",
                behavior: "smooth",
              });
              return nextIndex;
            });
          } else if (event.key === "ArrowUp") {
            setSelectedIndex((prevIndex) => {
              const nextIndex =
                prevIndex === 0
                  ? filteredSuggestions.length - 1
                  : prevIndex - 1;
              suggestionsRef.current[nextIndex]?.scrollIntoView({
                block: "nearest",
                behavior: "smooth",
              });
              return nextIndex;
            });
          } else if (event.key === "Enter" && selectedIndex >= 0) {
            const selectedSuggestion = filteredSuggestions[selectedIndex];
            setQuery(selectedSuggestion.name); // Tampilkan name
            onSelectOption?.(selectedSuggestion.id);
            props.onChange(selectedSuggestion.name);
            setFilteredSuggestions([]);
            setShowDropdown(false);
            setSelectedIndex(-1);
          }
        }
      };

      document.addEventListener("keydown", handleKeyDown);
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }, [filteredSuggestions, selectedIndex]);

    const handleInputChange = (e) => {
      const value = e.target.value;
      setQuery(value);
      props.onChange(value);
      if (value.length > 0) {
        const filtered = suggestions.filter((suggestion) =>
          suggestion.name.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredSuggestions(filtered);
        setShowDropdown(true);
        setSelectedIndex(-1);
      } else {
        setFilteredSuggestions([]);
        setShowDropdown(false);
        setSelectedIndex(-1);
      }
    };

    const handleSuggestionClick = (suggestion) => {
      setQuery(suggestion.name); // Tampilkan nama saat dipilih
      onSelectOption?.(suggestion.id);
      props.onChange(suggestion.name);
      setFilteredSuggestions([]);
      setShowDropdown(false);
      setSelectedIndex(-1);
    };

    useEffect(() => {
      if (defaultQuery) {
        setQuery(defaultQuery);
      }
    }, [defaultQuery]);

    return (
      <div ref={ref} className="relative w-full">
        <input
          {...props}
          type="text"
          value={query}
          placeholder="Cari data"
          className={cn(
            "flex h-[50px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            inputClassName
          )}
          onChange={handleInputChange}
          autoComplete="off"
        />
        {showDropdown && filteredSuggestions.length > 0 && (
          <ul className="absolute left-0 w-full mt-2 bg-white border rounded-md shadow-lg max-h-60 overflow-y-auto">
            {filteredSuggestions.map((suggestion, index) => (
              <li
                key={suggestion.id}
                ref={(el) => (suggestionsRef.current[index] = el)}
                onClick={() => handleSuggestionClick(suggestion)}
                className={cn(
                  `px-4 py-2 cursor-pointer ${
                    selectedIndex === index ? "bg-gray-200" : ""
                  }`,
                  suggestionClassName
                )}
              >
                {suggestion.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
);

AutocompleteInput.displayName = "AutocompleteInput";

export default memo(AutocompleteInput);
