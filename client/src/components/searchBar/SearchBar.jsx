import React from "react";
import { InputGroup, FormControl } from "react-bootstrap";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = () => {
  return (
    <InputGroup className="mb-3" style={{ margin: "1rem" }}>
      <InputGroup.Text>
        <SearchIcon />
      </InputGroup.Text>
      <FormControl placeholder="Search books..." />
    </InputGroup>
  );
};

export default SearchBar;
