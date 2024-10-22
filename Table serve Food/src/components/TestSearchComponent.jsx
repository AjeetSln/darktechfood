// src/TestSearchComponent.jsx
import React, { useState } from 'react';

const TestSearchComponent = () => {
    const mockMenuItems = [
        { id: 1, title: "Burger" },
        { id: 2, title: "Pizza" },
        { id: 3, title: "Pasta" }
    ];

    const [filteredProducts, setFilteredProducts] = useState(mockMenuItems);

    const testSearch = (query) => {
        console.log("Test Query:", query);
        const filtered = mockMenuItems.filter((item) => item.title.toLowerCase().includes(query.toLowerCase()));
        console.log("Test Filtered Products:", filtered);
        setFilteredProducts(filtered);
    };

    return (
        <div>
            <button onClick={() => testSearch("burger")}>Test Search "burger"</button>
            <button onClick={() => testSearch("pasta")}>Test Search "pasta"</button>
            <button onClick={() => testSearch("")}>Test Show All</button>
            
            <ul>
                {filteredProducts.map((item) => (
                    <li key={item.id}>{item.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default TestSearchComponent;
