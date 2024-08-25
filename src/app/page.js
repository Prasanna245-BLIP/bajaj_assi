        body: JSON.stringify({ data: JSON.parse(jsonData) }),
      });

      if (!res.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await res.json();
      setResponse(data);
    } catch (err) {
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">JSON Data Submission</h1>
      <textarea
        value={jsonData}
        onChange={(e) => setJsonData(e.target.value)}
        placeholder='Enter JSON data here, e.g., ["M", "1", "334", "4", "B", "Z", "a"]'
        className="w-full p-2 border border-gray-300 rounded-lg mb-4 dark:bg-gray-700 dark:text-white"
        rows={6}
      ></textarea>
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
      >
        Submit
      </button>
      {response && (
        <pre className="mt-4 p-4 bg-gray-100 rounded-lg dark:bg-gray-800 dark:text-white">
          <code>{JSON.stringify(response, null, 2)}</code>
        </pre>
      )}
      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-lg dark:bg-red-800 dark:text-red-400">
          Error: {error}
        </div>
      )}
    </div>
  );
}
