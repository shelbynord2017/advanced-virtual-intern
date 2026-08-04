"use client"
import React, { useEffect, useState } from 'react'
import { FaSearch } from "react-icons/fa";
import logo from '../../assets/logo.png'
import { DataConnect } from 'firebase/data-connect';
import Link from 'next/link';

export default function Searchbar() {

    const [results, setResults] = useState([]);
    const [search, setSearch] = useState("");
    const [loadingSearch, setLoadingSearch] = useState(true);

    useEffect(() => {
        async function fetchSearchResults() {
            setLoadingSearch(true);
            try {
                const response = await fetch(
                    `https://us-central1-summaristt.cloudfunctions.net/getBooksByAuthorOrTitle?search=${search}`
                );
                const data = await response.json();
                setResults(data || []);
                console.log(data)
                setLoadingSearch(false);
            } catch (error) {
                console.error("Error fetching search results:", error);
                setResults(null);
                setLoadingSearch(false);
            }
        }
        if (search) {
            fetchSearchResults();
        }
    }, [search]);

    const closeSearch = () => {
        setSearch("");
        setResults([]);
    };

  return (
    <div className="search__background">
        <div className="search__wrapper">
            <div className="search__content">
                <div className="search">
                    <div className="search__input--wrapper">
                        <input 
                            className='search__input'
                            placeholder='Search for books'
                            type="text" 
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <div className="search__icon">
                            <FaSearch className="sidebar__icon--img" />
                        </div>
                        {loadingSearch && search && <p>Loading...</p>}

                        {results?.map((book) => (
                        <Link 
                            href={`/book/${book.id}`}
                            className="search__results" 
                            key={book.id}
                            onClick={closeSearch}
                        >
                            <figure className='search__results--image-mask'>
                                <img 
                                    src={book.imageLink} 
                                    alt={book.title} 
                                    className='search__results--image' 
                                />
                            </figure>
                            <div className="search__results--details">
                                <h3>{book.title}</h3>
                                <p>{book.author}</p>
                            </div>
                        </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
