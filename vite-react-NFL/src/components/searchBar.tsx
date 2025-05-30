import { useState, useEffect, useRef } from "react";
import { Input, Box, List, ListItem } from "@chakra-ui/react";
import axios from "axios";

interface PlayerSearchBoxProps {
  onSelect: (playerName: string) => void;
}

export default function PlayerSearchBox({ onSelect }: PlayerSearchBoxProps) {
  const [query, setQuery] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const fetchSuggestions = () => {
    if (query.length > 0) {
      axios
        .get(`https://127.0.0.1/search?q=${query}`)
        .then((res) => {
          const sorted = res.data.sort((a: string, b: string) =>
            a.localeCompare(b)
          );
          setSuggestions(sorted); // ✅ Sorted on both debounce and refocus
        })
        .catch(() => setSuggestions([]));
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchSuggestions();
    }, 300);
    return () => clearTimeout(timeout);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsFocused(false);
        setSuggestions([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <Box position="relative" ref={containerRef}>
      <Input
        placeholder="Search player"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => {
          setIsFocused(true);
          fetchSuggestions();
        }}
      />
      {isFocused && suggestions.length > 0 && (
        <List
          mt={2}
          border="1px solid gray"
          borderRadius="md"
          bg="gray.800"
          position="absolute"
          width="100%"
          zIndex={10}
        >
          {suggestions.map((name, idx) => (
            <ListItem
              key={idx}
              p={2}
              color="teal.300"
              bg="transparent"
              _hover={{ bg: "teal.500", color: "white", cursor: "pointer" }}
              onClick={() => {
                onSelect(name);
                setQuery(name);
                setSuggestions([]);
                setIsFocused(false);
              }}
            >
              {name}
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
}
