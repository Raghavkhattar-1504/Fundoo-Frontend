// import { createContext, useState, useContext } from "react"; 

// const SearchContext = createContext();

// export const SearchProvider = ({ children }) => {
//     const [searchTerm, setSearchTerm] = useState('');
//     const [searchResults, setSearchResults] = useState([]);

//     return (
//         <SearchContext.Provider value={{ searchTerm, setSearchTerm, searchResults, setSearchResults}}>
//             {children}
//         </SearchContext.Provider>
//     );
// };

// export const useSearchContext = () => {
//     return useContext(SearchContext);  
// };



import { createContext, useState } from "react"; 

export const SearchContext = createContext();

const SearchProvider = ({ children }) => {
    const [searchTerm, setSearchTerm] = useState("");
    // const [searchResults, setSearchResults] = useState([]);

    return (
        <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
            {children}
        </SearchContext.Provider>
    );
};
export default SearchProvider
