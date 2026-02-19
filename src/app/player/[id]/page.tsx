'use client';

import { useEffect, useState, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/firebase';
import { AiOutlinePlayCircle, AiOutlinePauseCircle } from 'react-icons/ai';
import { BiSkipNext, BiSkipPrevious } from 'react-icons/bi';
import PageHeader from '@/components/PageHeader';

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

export default function PlayerPage() {
  const params = useParams();
  const router = useRouter();
  const [user] = useAuthState(auth);
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (!user) {
      router.push('/');
      return;
    }

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
  }, [params.id, user, router]);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (audioRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const percent = (e.clientX - rect.left) / rect.width;
      audioRef.current.currentTime = percent * duration;
    }
  };

  const skipForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.min(audioRef.current.currentTime + 10, duration);
    }
  };

  const skipBackward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(audioRef.current.currentTime - 10, 0);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

if (loading) {
  return (
    <>
      <Sidebar />
      <PageHeader />
      <div className="player page-with-sidebar page-content">
        <div className="player__container">
          <div>Loading...</div>
        </div>
      </div>
    </>
  );
}

if (!book) {
  return (
    <>
      <Sidebar />
      <PageHeader />
      <div className="player page-with-sidebar page-content">
        <div className="player__container">
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
    <div className="player page-with-sidebar page-content">
      <div className="player__container">
          {/* Book Info */}
          <div className="player__header">
            <h1 className="player__title">{book.title}</h1>
            <p className="player__author">by {book.author}</p>
          </div>

          {/* Book Summary */}
          <div className="player__summary">
            <h2 className="player__summary-title">Summary</h2>
            <div className="player__summary-text">{book.summary}</div>
          </div>

          {/* Audio Player */}
          <div className="player__audio-wrapper">
            <audio
              ref={audioRef}
              src={book.audioLink}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
            />

            {/* Progress Bar */}
            <div className="player__progress-wrapper" onClick={handleProgressClick}>
              <div className="player__progress-bar">
                <div
                  className="player__progress-fill"
                  style={{ width: `${(currentTime / duration) * 100}%` }}
                />
              </div>
            </div>

            {/* Time Display */}
            <div className="player__time">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>

            {/* Controls */}
            <div className="player__controls">
              <button className="player__control-btn" onClick={skipBackward}>
                <BiSkipPrevious size={32} />
              </button>
              <button className="player__play-btn" onClick={togglePlayPause}>
                {isPlaying ? (
                  <AiOutlinePauseCircle size={64} />
                ) : (
                  <AiOutlinePlayCircle size={64} />
                )}
              </button>
              <button className="player__control-btn" onClick={skipForward}>
                <BiSkipNext size={32} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}