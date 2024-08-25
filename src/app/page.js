import { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import styles from './page.module.css';

export default function Home() {
  const [inputValue, setInputValue] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    try {
      const data = JSON.parse(inputValue);
      const result = await axios.post('https://your-backend-url/bfhl', { data });
      setResponseData(result.data);
      setError(null);
    } catch (err) {
      setError('Invalid JSON or server error');
    }
  };

  const handleSelectChange = (selected) => {
    setSelectedOptions(selected || []);
  };

  const renderResponse = () => {
    if (!responseData) return null;

    const selectedKeys = selectedOptions.map(option => option.value);
    const filteredData = {};

    if (selectedKeys.includes('numbers')) {
      filteredData.numbers = responseData.numbers;
    }
    if (selectedKeys.includes('alphabets')) {
      filteredData.alphabets = responseData.alphabets;
    }
    if (selectedKeys.includes('highest_lowercase_alphabet')) {
      filteredData.highest_lowercase_alphabet = responseData.highest_lowercase_alphabet;
    }

    return <pre>{JSON.stringify(filteredData, null, 2)}</pre>;
  };

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>ABCD123</h1>

      <div className={styles.container}>
        <textarea
          className={styles.textarea}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder='Enter JSON input here'
          rows="10"
          cols="50"
        />
        <button className={styles.button} onClick={handleSubmit}>Submit</button>
        
        {error && <p className={styles.error}>{error}</p>}

        {responseData && (
          <>
            <Select
              isMulti
              options={[
                { value: 'alphabets', label: 'Alphabets' },
                { value: 'numbers', label: 'Numbers' },
                { value: 'highest_lowercase_alphabet', label: 'Highest Lowercase Alphabet' }
              ]}
              onChange={handleSelectChange}
            />
            <div className={styles.response}>
              {renderResponse()}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
