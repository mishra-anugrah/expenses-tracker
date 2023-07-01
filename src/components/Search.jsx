import { Clear, SearchOutlined } from "@mui/icons-material";
import { InputBase, Paper } from "@mui/material";
import React from "react";

export const Search = (props) => {
  const { searchQuery, setSearchQuery, searchTransactions } = props;

  const handleSearchClearButtonClick = () => {
    setSearchQuery("");
    searchTransactions("");
  };

  return (
    <div className="search">
      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: 400,
          my: 5,
        }}
        className={"search-input"}
      >
        <SearchOutlined className="searchbar-icon" />
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search by title..."
          onChange={(event) => {
            setSearchQuery(event.target.value);
          }}
          onKeyUp={(event) =>
            searchTransactions(event.target.value.toLowerCase())
          }
          value={searchQuery}
        />
        {searchQuery ? (
          <Clear
            className="searchbar-icon"
            onClick={handleSearchClearButtonClick}
          />
        ) : (
          <></>
        )}
      </Paper>
    </div>
  );
};
