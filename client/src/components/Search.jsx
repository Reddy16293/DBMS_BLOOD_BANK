// components/Search.js
import React, { useState } from 'react';
import axios from 'axios';

const Search = () => {
    const [query, setQuery] = useState('');
    const [type, setType] = useState('developers');
    const [results, setResults] = useState([]);
    const [error, setError] = useState('');

    const handleSearch = async (e) => {
        e.preventDefault();
        setError(''); // Reset error message

        try {
            const response = await axios.get(`/api/search`, {
                params: { query, type }
            });
            setResults(response.data[type]); // Set the results based on the type
        } catch (err) {
            setError(err.response?.data?.error || 'An error occurred during the search');
        }
    };

    return (
        <div>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Enter skills (comma-separated) or name"
                />
                <select value={type} onChange={(e) => setType(e.target.value)}>
                    <option value="developers">Developers</option>
                    <option value="projects">Projects</option>
                </select>
                <button type="submit">Search</button>
            </form>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <div>
                {results.length > 0 ? (
                    <ul>
                        {results.map((item, index) => (
                            <li key={index}>
                                {type === 'developers' ? (
                                    <div>
                                        <h4>{item.name}</h4>
                                        <p>Skills: {item.skills.join(', ')}</p>
                                    </div>
                                ) : (
                                    <div>
                                        <h4>{item.name}</h4>
                                        <p>Description: {item.description}</p>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No results found.</p>
                )}
            </div>
        </div>
    );
};

export default Search;
