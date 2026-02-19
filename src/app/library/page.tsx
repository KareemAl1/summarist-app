'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Sidebar from '@/components/Sidebar';
import PageHeader from '@/components/PageHeader';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/firebase';
import { getSavedBooks, removeBook, SavedBook } from '@/lib/library';

export default function LibraryPage() {
  const router = useRouter();
  const [user, loading] = useAuthState(auth);
  const [savedBooks, setSavedBooks] = useState<SavedBook[]>([]);

  useEffect(() => {
    if (user) {
      setSavedBooks(getSavedBooks());
    }
  }, [user]);

  const handleRemoveBook = (bookId: string) => {
    removeBook(bookId);
    setSavedBooks(getSavedBooks());
  };

  if (loading) {
    return (
      <>
        <Sidebar />
        <PageHeader />
        <div className="library page-with-sidebar page-content">
          <div className="library__container">
            <div>Loading...</div>
          </div>
        </div>
      </>
    );
  }

  if (!user) {
    return (
      <>
        <Sidebar />
        <PageHeader />
        <div className="library page-with-sidebar page-content">
          <div className="library__container">
            <div className="library__login-required">
              <img src="/assets/login.png" alt="login" />
              <h2>Log in to your account to see your library.</h2>
              <button className="btn" onClick={() => router.push('/')}>
                Login
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Sidebar />
      <PageHeader />
      <div className="library page-with-sidebar page-content">
        <div className="library__container">
          <h1 className="library__title">My Library</h1>

          {/* Saved Books */}
          <div className="library__section">
            <h2 className="library__section-title">Saved Books</h2>
            {savedBooks.length > 0 ? (
              <div className="for-you__books">
                {savedBooks.map((book) => (
                  <div key={book.id} className="book">
                    {book.subscriptionRequired && (
                      <div className="book__pill">Premium</div>
                    )}
                    <div onClick={() => router.push(`/book/${book.id}`)}>
                      <figure className="book__image--wrapper">
                        <Image
                          src={book.imageLink || 'https://via.placeholder.com/172'}
                          alt={book.title}
                          width={172}
                          height={172}
                        />
                      </figure>
                      <div className="book__title">{book.title}</div>
                      <div className="book__author">{book.author}</div>
                    </div>
                    <button
                      onClick={() => handleRemoveBook(book.id)}
                      className="library__remove-btn"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="library__empty">
                <p>Save your favorite books to see them here!</p>
              </div>
            )}
          </div>

          {/* Finished Books */}
          <div className="library__section">
            <h2 className="library__section-title">Finished</h2>
            <div className="library__empty">
              <p>Books you've finished will appear here.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}