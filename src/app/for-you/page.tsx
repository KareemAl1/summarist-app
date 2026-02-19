"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import { BookSkeleton, SelectedBookSkeleton } from "@/components/Skeleton";
import PageHeader from "@/components/PageHeader";

interface Book {
  id: string;
  title: string;
  author: string;
  subTitle: string;
  imageLink: string;
  audioLink: string;
  totalRating: number;
  averageRating: number;
  keyIdeas: number;
  type: string;
  status: string;
  subscriptionRequired: boolean;
  summary: string;
  tags: string[];
  bookDescription: string;
  authorDescription: string;
}

export default function ForYouPage() {
  const router = useRouter();
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [recommendedBooks, setRecommendedBooks] = useState<Book[]>([]);
  const [suggestedBooks, setSuggestedBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        // Fetch selected book
        const selectedRes = await fetch(
          "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=selected",
        );
        const selectedData = await selectedRes.json();
        setSelectedBook(
          Array.isArray(selectedData) ? selectedData[0] : selectedData,
        );

        // Fetch recommended books
        const recommendedRes = await fetch(
          "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=recommended",
        );
        const recommendedData = await recommendedRes.json();
        setRecommendedBooks(recommendedData);

        // Fetch suggested books
        const suggestedRes = await fetch(
          "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=suggested",
        );
        const suggestedData = await suggestedRes.json();
        setSuggestedBooks(suggestedData);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching books:", error);
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) {
    return (
      <>
        <Sidebar />
        <PageHeader />
        <div className="for-you__wrapper page-with-sidebar page-content">
          <div className="for-you__container">
            <div className="for-you__section">
              <div className="for-you__title">Selected just for you</div>
              <SelectedBookSkeleton />
            </div>

            {/* Recommended Books Skeleton */}
            <div className="for-you__section">
              <div className="for-you__title">Recommended For You</div>
              <div className="for-you__books">
                {[...Array(5)].map((_, i) => (
                  <BookSkeleton key={i} />
                ))}
              </div>
            </div>

            {/* Suggested Books Skeleton */}
            <div className="for-you__section">
              <div className="for-you__title">Suggested Books</div>
              <div className="for-you__books">
                {[...Array(5)].map((_, i) => (
                  <BookSkeleton key={i} />
                ))}
              </div>
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
      <div className="for-you__wrapper page-with-sidebar page-content">
        <div className="for-you__container">
          <div className="for-you__section">
            <div className="for-you__title">Selected just for you</div>
            {selectedBook && (
              <div
                className="selected-book"
                onClick={() => router.push(`/book/${selectedBook.id}`)}
              >
                <div className="selected-book__sub-title">
                  {selectedBook.subTitle}
                </div>
                <div className="selected-book__separator"></div>
                <div className="selected-book__content">
                  <figure className="book__image--wrapper">
                    <Image
                      src={
                        selectedBook.imageLink ||
                        "https://via.placeholder.com/140"
                      }
                      alt={selectedBook.title}
                      width={140}
                      height={140}
                    />
                  </figure>
                  <div className="selected-book__text">
                    <div className="selected-book__title">
                      {selectedBook.title}
                    </div>
                    <div className="selected-book__author">
                      {selectedBook.author}
                    </div>
                    <div className="selected-book__duration">
                      <div className="selected-book__icon">🎧</div>3 mins 23
                      secs
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Recommended Books */}
          <div className="for-you__section">
            <div className="for-you__title">Recommended For You</div>
            <div className="for-you__books">
              {recommendedBooks.map((book) => (
                <div
                  key={book.id}
                  className="book"
                  onClick={() => router.push(`/book/${book.id}`)}
                >
                  {book.subscriptionRequired && (
                    <div className="book__pill">Premium</div>
                  )}
                  <figure className="book__image--wrapper">
                    <Image
                      src={book.imageLink || "https://via.placeholder.com/172"}
                      alt={book.title}
                      width={172}
                      height={172}
                    />
                  </figure>
                  <div className="book__title">{book.title}</div>
                  <div className="book__author">{book.author}</div>
                  <div className="book__subtitle">{book.subTitle}</div>
                  <div className="book__details">
                    <div className="book__time">
                      <div className="book__icon">⏱️</div>
                      04:40
                    </div>
                    <div className="book__rating">
                      <div className="book__icon">⭐</div>
                      {book.averageRating}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Suggested Books */}
          <div className="for-you__section">
            <div className="for-you__title">Suggested Books</div>
            <div className="for-you__books">
              {suggestedBooks.map((book) => (
                <div
                  key={book.id}
                  className="book"
                  onClick={() => router.push(`/book/${book.id}`)}
                >
                  {book.subscriptionRequired && (
                    <div className="book__pill">Premium</div>
                  )}
                  <figure className="book__image--wrapper">
                    <Image
                      src={book.imageLink || "https://via.placeholder.com/172"}
                      alt={book.title}
                      width={172}
                      height={172}
                    />
                  </figure>
                  <div className="book__title">{book.title}</div>
                  <div className="book__author">{book.author}</div>
                  <div className="book__subtitle">{book.subTitle}</div>
                  <div className="book__details">
                    <div className="book__time">
                      <div className="book__icon">⏱️</div>
                      04:40
                    </div>
                    <div className="book__rating">
                      <div className="book__icon">⭐</div>
                      {book.averageRating}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
