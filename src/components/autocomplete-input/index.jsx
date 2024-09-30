"use client";

import { cn } from "@/lib/utils";
import React, { useState, useEffect, useRef } from "react";

const AutocompleteInput = ({
  inputClassName,
  suggestions,
  suggestionClassName,
  ...props
}) => {
  const [query, setQuery] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const wrapperRef = useRef(null);
  const suggestionsRef = useRef([]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (filteredSuggestions.length > 0) {
        if (event.key === "ArrowDown") {
          setSelectedIndex((prevIndex) => {
            const nextIndex =
              prevIndex === filteredSuggestions.length - 1 ? 0 : prevIndex + 1;
            suggestionsRef.current[nextIndex]?.scrollIntoView({
              block: "nearest",
              behavior: "smooth",
            });
            return nextIndex;
          });
        } else if (event.key === "ArrowUp") {
          setSelectedIndex((prevIndex) => {
            const nextIndex =
              prevIndex === 0 ? filteredSuggestions.length - 1 : prevIndex - 1;
            suggestionsRef.current[nextIndex]?.scrollIntoView({
              block: "nearest",
              behavior: "smooth",
            });
            return nextIndex;
          });
        } else if (event.key === "Enter" && selectedIndex >= 0) {
          setQuery(filteredSuggestions[selectedIndex]);
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
    if (value.length > 0) {
      const filtered = suggestions.filter((suggestion) =>
        suggestion.toLowerCase().includes(value.toLowerCase())
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
    setQuery(suggestion);
    setFilteredSuggestions([]);
    setShowDropdown(false);
    setSelectedIndex(-1);
  };

  return (
    <div ref={wrapperRef} className="relative w-full">
      <input
        type="text"
        value={query}
        placeholder="Search..."
        className={cn(
          "flex h-[50px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          inputClassName
        )}
        {...props}
        onChange={handleInputChange}
      />
      {showDropdown && filteredSuggestions.length > 0 && (
        <ul className="absolute left-0 w-full mt-2 bg-white border rounded-md shadow-lg max-h-60 overflow-y-auto">
          {filteredSuggestions.map((suggestion, index) => (
            <li
              key={index}
              ref={(el) => (suggestionsRef.current[index] = el)}
              onClick={() => handleSuggestionClick(suggestion)}
              className={cn(
                `px-4 py-2 cursor-pointer ${
                  selectedIndex === index ? "bg-gray-200" : ""
                }`,
                suggestionClassName
              )}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutocompleteInput;
