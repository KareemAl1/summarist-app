'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Sidebar from '@/components/Sidebar';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/firebase';
import { AiOutlineClockCircle, AiOutlineStar, AiOutlineAudio, AiOutlineFileText } from 'react-icons/ai';
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs';
import { BookDetailSkeleton } from '@/components/Skeleton';
import PageHeader from '@/components/PageHeader';
import { saveBook, removeBook, isBookSaved } from '@/lib/library';

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

export default function BookDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [user] = useAuthState(auth);
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await fetch(
          `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${params.id}`
        );
        const data = await res.json();
        setBook(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching book:', error);
        setLoading(false);
      }
    };

    if (params.id) {
      fetchBook();
    }
  }, [params.id]);

  useEffect(() => {
    if (book) {
      setIsSaved(isBookSaved(book.id));
    }
  }, [book]);

  const handleRead = () => {
    if (!user) {
      router.push('/');
      return;
    }
    router.push(`/player/${params.id}`);
  };

  const handleListen = () => {
    if (!user) {
      router.push('/');
      return;
    }
    router.push(`/player/${params.id}`);
  };

  if (loading) {
    return (
      <>
        <Sidebar />
        <PageHeader />
        <div className="book-detail page-with-sidebar page-content">
          <BookDetailSkeleton />
        </div>
      </>
    );
  }

  if (!book) {
    return (
      <>
        <Sidebar />
        <PageHeader />
        <div className="book-detail page-with-sidebar page-content">
          <div className="book-detail__container">
            <div>Book not found</div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Sidebar />
      <PageHeader />
      <div className="book-detail page-with-sidebar page-content">
        <div className="book-detail__container">
          {/* Book Header */}
          <div className="book-detail__header">
            <div className="book-detail__header-content">
              <div className="book-detail__title-wrapper">
                <div className="book-detail__title">{book.title}</div>
                <div className="book-detail__author">{book.author}</div>
                <div className="book-detail__subtitle">{book.subTitle}</div>
              </div>

              <div className="book-detail__stats">
                <div className="book-detail__stat">
                  <AiOutlineStar />
                  <span>{book.averageRating} ({book.totalRating} ratings)</span>
                </div>
                <div className="book-detail__stat">
                  <AiOutlineClockCircle />
                  <span>04:40</span>
                </div>
                <div className="book-detail__stat">
                  {book.type === 'audio' ? <AiOutlineAudio /> : <AiOutlineFileText />}
                  <span>{book.type}</span>
                </div>
                <div className="book-detail__stat">
                  <span>{book.keyIdeas} Key ideas</span>
                </div>
              </div>

              <div className="book-detail__buttons">
                <button className="btn book-detail__btn" onClick={handleRead}>
                  <AiOutlineFileText />
                  Read
                </button>
                <button className="btn book-detail__btn" onClick={handleListen}>
                  <AiOutlineAudio />
                  Listen
                </button>
              </div>

              <button 
                className="book-detail__bookmark"
                onClick={() => {
                  if (!user) {
                    router.push('/');
                    return;
                  }
                  
                  if (isSaved) {
                    removeBook(book.id);
                    setIsSaved(false);
                  } else {
                    saveBook({
                      id: book.id,
                      title: book.title,
                      author: book.author,
                      imageLink: book.imageLink,
                      subscriptionRequired: book.subscriptionRequired,
                      averageRating: book.averageRating,
                      savedAt: Date.now()
                    });
                    setIsSaved(true);
                  }
                }}
              >
                {isSaved ? <BsBookmarkFill size={20} /> : <BsBookmark size={20} />}
                <span>{isSaved ? 'Saved to My Library' : 'Add title to My Library'}</span>
              </button>

              <div className="book-detail__tags">
                {book.tags.map((tag, index) => (
                  <span key={index} className="book-detail__tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <figure className="book-detail__image">
              <Image
                src={book.imageLink || 'https://via.placeholder.com/300'}
                alt={book.title}
                width={300}
                height={300}
              />
            </figure>
          </div>

          {/* Book Description */}
          <div className="book-detail__section">
            <h2 className="book-detail__section-title">What&apos;s it about?</h2>
            <div className="book-detail__description">{book.bookDescription}</div>
          </div>

          {/* Author Description */}
          <div className="book-detail__section">
            <h2 className="book-detail__section-title">About the author</h2>
            <div className="book-detail__description">{book.authorDescription}</div>
          </div>
        </div>
      </div>
    </>
  );
}