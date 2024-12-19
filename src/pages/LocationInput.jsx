import React, { useState } from 'react';
import axios from 'axios';

const LocationInput = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState('');

    const fetchSuggestions = async (query) => {
        if (!query) return setSuggestions([]);
        try {
            const response = await axios.get(`/api/location/suggestions?searchQuery=${query}`);
            setSuggestions(response.data.suggestions);
        } catch (error) {
            console.error('Error fetching suggestions', error);
        }
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchQuery(value);
        fetchSuggestions(value);
    };

    const handleSuggestionClick = (suggestion) => {
        setSelectedLocation(`${suggestion.village}, ${suggestion.street}, ${suggestion.city}, ${suggestion.state}`);
        setSuggestions([]);
        setSearchQuery('');
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Enter location..."
                value={searchQuery}
                onChange={handleInputChange}
            />
            {suggestions.length > 0 && (
                <ul>
                    {suggestions.map((suggestion) => (
                        <li
                            key={suggestion._id}
                            onClick={() => handleSuggestionClick(suggestion)}
                        >
                            {`${suggestion.village}, ${suggestion.street}, ${suggestion.city}, ${suggestion.state}`}
                        </li>
                    ))}
                </ul>
            )}
            {selectedLocation && <p>Selected Location: {selectedLocation}</p>}
        </div>
    );
};

export default LocationInput;
