import React, { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";

import SearchBox from "./components/SearchBox";
import Table from "./components/Table";
import Pagination from "./components/Pagination";
import Spinner from "./components/Spinner";
import "./App.css";
import "./common.css"

const PAGE_COUNT = 20;

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);

  // state variables for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  // state variable for sorting
  const [sortDirection, setSortDirection] = useState("asc");

  // Debounce search term
  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchTerm) {
        fetchData();
      }
    }, 500); // 500ms debounce time
    return () => clearTimeout(handler);
  }, [searchTerm]);

  // Function to handle API call based on search term
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_COUNTRIES_BASE_URL}/name/${searchTerm}?fields=name,flag`
      );
      setCountries(response?.data);
      calculateTotalPageCount(response?.data);
      setCurrentPage(1); // Reset to first page with new data
    } catch (error) {
      console.error("Error fetching data:", error);
      setCountries([]);
      setTotalPages(0);
    } finally {
      setLoading(false);
    }
  }, [searchTerm]); // fetchData depends on searchTerm

  // Function to calculate total page count
  const calculateTotalPageCount = useCallback((data) => {
    setTotalPages(Math.ceil(data.length / PAGE_COUNT));
  }, []); // calculateTotalPageCount doesn't depend on any props or state

  // Function to handle search input change with debounce
  const handleSearchChange = useCallback((event) => {
    setSearchTerm(event.target.value);
  }, []); // handleSearchChange doesn't depend on any props or state

  const handlePageChange = useCallback((pageSelected) => {
    setCurrentPage(pageSelected);
  }, []); // handlePageChange doesn't depend on any props or state

  // useMemo for slicing countries data according to current pag
  const displayedCountries = useMemo(() => {
    const startIdx = (currentPage - 1) * PAGE_COUNT;
    return countries.slice(startIdx, startIdx + PAGE_COUNT);
  }, [countries, currentPage]); // Recalculate when countries or currentPage changes

  // Function for handling sorting
  const handleTableSort = useCallback(() => {
    setSortDirection((prevDirection) =>
      prevDirection === "asc" ? "desc" : "asc"
    );
    setCountries((prevCountries) =>
      [...prevCountries].sort((a, b) => {
        if (sortDirection === "asc") {
          return a.name.common.localeCompare(b.name.common);
        } else {
          return b.name.common.localeCompare(a.name.common);
        }
      })
    );
  }, [sortDirection]);

  return (
    <div className="main-layout">
      <SearchBox onChange={handleSearchChange} />
      {loading && <Spinner />}
      <Table
        data={searchTerm?.length > 0 ? displayedCountries : null}
        onTableSort={handleTableSort}
      />
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}

export default App;
