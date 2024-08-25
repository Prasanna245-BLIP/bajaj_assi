import { useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  const [jsonInput, setJsonInput] = useState("");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  // Handle change in text input
  const handleInputChange = (e) => {
    setJsonInput(e.target.value);
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      const parsedData = JSON.parse(jsonInput);
      setError("");
      setShowDropdown(true);

      // Replace with your actual API endpoint
      const res = await fetch("/api/your-backend-endpoint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsedData),
      });

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await res.json();
      setResponse(result);
    } catch (err) {
      setError("Invalid JSON format or API error.");
    }
  };

  // Handle filter changes
  const handleFilterChange = (e) => {
    const value = Array.from(e.target.selectedOptions, (option) => option.value);
    setSelectedFilters(value);
  };

  // Filter response data based on selected filters
  const getFilteredResponse = () => {
    if (!response || !response.data) return [];

    let filteredData = response.data;

    if (selectedFilters.includes("Alphabets")) {
      filteredData = filteredData.filter((item) => /^[a-zA-Z]+$/.test(item));
    }
    if (selectedFilters.includes("Numbers")) {
      filteredData = filteredData.filter((item) => /^[0-9]+$/.test(item));
    }
    if (selectedFilters.includes("Highest lowercase alphabet")) {
      const highestAlphabet = Math.max(...filteredData.map((item) => item.charCodeAt(0) || -1));
      filteredData = filteredData.filter((item) => item.charCodeAt(0) === highestAlphabet);
    }

    return filteredData;
  };

  return (
    <main className={styles.main}>
      <title>Your Roll Number</title>

      <div className={styles.description}>
        <textarea
          value={jsonInput}
          onChange={handleInputChange}
          rows={5}
          placeholder='Enter JSON data here'
          className={styles.textarea}
        />
        <button onClick={handleSubmit} className={styles.submitButton}>
          Submit
        </button>
        {error && <p className={styles.error}>{error}</p>}
      </div>

      {showDropdown && (
        <div className={styles.dropdownContainer}>
          <select multiple onChange={handleFilterChange} className={styles.dropdown}>
            <option value="Alphabets">Alphabets</option>
            <option value="Numbers">Numbers</option>
            <option value="Highest lowercase alphabet">Highest lowercase alphabet</option>
          </select>
        </div>
      )}

      <div className={styles.responseContainer}>
        {response && (
          <div>
            <h2>Filtered Response:</h2>
            <ul>
              {getFilteredResponse().map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </main>
  );
}

