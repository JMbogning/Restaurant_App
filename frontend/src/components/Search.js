import React, { useState } from "react";

const Search = ({ keyword, setKeyword, setPage }) => {
    const [searchTerm, setSearchTerm] = useState(keyword);

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            handleClickButton();
        }
    };
    const handleClickButton = () => {
        setKeyword(searchTerm);
        setPage(1);
    };
    return (
        <input
            value={searchTerm}
            type="text"
            name="table_search"
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-control float-right"
            placeholder="Rechercher"
            onKeyPress={handleKeyPress} 
        />

    );
};

export default Search;
