'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AiOutlineSearch } from 'react-icons/ai';
import Image from 'next/image';

interface Book {
  id: string;
  title: string;
  author: string;
  subTitle: string;
  imageLink: string;
  subscriptionRequired: boolean;
}

export default function SearchBar() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Book[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    // Debounce search - wait 300ms after user stops typing
    const timer = setTimeout(() => {
      if (searchTerm.trim().length > 0) {
        handleSearch(searchTerm);
      } else {
        setSearchResults([]);
        setShowResults(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const handleSearch = async (query: string) => {
    setIsSearching(true);
    try {
      const res = await fetch(
        `https://us-central1-summaristt.cloudfunctions.net/getBooksByAuthorOrTitle?search=${encodeURIComponent(query)}`
      );
      const data = await res.json();
      setSearchResults(data);
      setShowResults(true);
      setIsSearching(false);
    } catch (error) {
      console.error('Search error:', error);
      setIsSearching(false);
    }
  };

  const handleBookClick = (bookId: string) => {
    router.push(`/book/${bookId}`);
    setSearchTerm('');
    setShowResults(false);
  };

  return (
    <div className="search-bar">
      <div className="search-bar__wrapper">
        <AiOutlineSearch className="search-bar__icon" size={20} />
        <input
          type="text"
          className="search-bar__input"
          placeholder="Search for books by title or author"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => searchTerm && setShowResults(true)}
        />
      </div>

      {/* Search Results Dropdown */}
      {showResults && (
        <div className="search-results">
          {isSearching ? (
            <div className="search-results__loading">Searching...</div>
          ) : searchResults.length > 0 ? (
            <>
              {searchResults.map((book) => (
                <div
                  key={book.id}
                  className="search-result"
                  onClick={() => handleBookClick(book.id)}
                >
                  <div className="search-result__image">
                    <Image
                      src={book.imageLink || 'https://via.placeholder.com/80'}
                      alt={book.title}
                      width={80}
                      height={80}
                    />
                  </div>
                  <div className="search-result__info">
                    <div className="search-result__title">{book.title}</div>
                    <div className="search-result__author">{book.author}</div>
                    {book.subscriptionRequired && (
                      <span className="search-result__premium">Premium</span>
                    )}
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div className="search-results__empty">No books found</div>
          )}
        </div>
      )}

      {/* Overlay to close search results */}
      {showResults && (
        <div
          className="search-overlay"
          onClick={() => setShowResults(false)}
        />
      )}
    </div>
  );
}