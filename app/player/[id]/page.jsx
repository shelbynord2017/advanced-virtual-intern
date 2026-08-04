"use client"
import { useParams } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'
import { BsFillPlayCircleFill, BsFillPauseCircleFill } from "react-icons/bs";
import { RiForward10Line, RiReplay10Line } from "react-icons/ri";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function Player() {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [loadingBook, setLoadingBook] = useState(true);
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    const togglePlay = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    }

    const seekForward = () => {
        if (audioRef.current) {
            audioRef.current.currentTime = Math.min(
                audioRef.current.currentTime + 10,
                audioRef.current.duration
            );
        }
    }

    const seekBackward = () => {
        if (audioRef.current) {
            audioRef.current.currentTime = Math.max(
                audioRef.current.currentTime - 10, 
                0
            );
        }
    }

    // Sync state with audio playback
    const handleTimeUpdate = () => {
        setCurrentTime(audioRef.current.currentTime);
    };

    // Capture total duration once metadata loads
    const handleLoadedMetadata = () => {
        setDuration(audioRef.current.duration);
    };

    // Handle user scrubbing/seeking
    const handleProgressChange = (e) => {
        const newPercentage = e.target.value;
        const newTime = (newPercentage / 100) * duration;
        audioRef.current.currentTime = newTime;
        setCurrentTime(newTime);
    };

    // Helper function to format seconds into MM:SS
    const formatTime = (timeInSeconds) => {
        if (isNaN(timeInSeconds)) return '0:00';
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = Math.floor(timeInSeconds % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    // Calculate current playback percentage
    const currentPercentage = duration ? (currentTime / duration) * 100 : 0;

    useEffect(() => {
        async function fetchBook() {
            try {
                const response = await fetch(
                    `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`
                );
                const data = await response.json();
                setBook(data || null);
            } catch (error) {
                console.error("Error fetching book:", error);
                setBook(null);
            } finally {
                setLoadingBook(false);
            }
        };
        
        if (id) {
            fetchBook();
        }
    }, [id]);

    return (
        <div className="wrapper">
            {loadingBook || !book ? (
                <div className="summary">
                    <div className="audio__book--summary">
                        <div className="audio__book--summary-title">
                            <Skeleton width={400} />
                        </div>
                        <div className="audio__book--summary-text">
                            <Skeleton height={800} />
                        </div>
                    </div>

                    <div className="audio__wrapper">
                        <div className="audio__track--wrapper">
                            <figure className='audio__track--image-mask'>
                                <figure className='player-book__image--wrapper'>
                                    <Skeleton height={40} />
                                </figure>
                            </figure>
                            <div className="audio__track--details-wrapper">
                                <div className="player-audio__track--title">
                                    <Skeleton width={30} />
                                </div>
                                <div className="player-audio__track--author">
                                    <Skeleton width={20} /> 
                                </div>
                            </div>
                        </div>

                        <div className="audio__controls--wrapper">
                            <div className="audio__controls">
                                <button className="audio__controls--btn">
                                    <Skeleton circle width={15} height={15}/>
                                </button>
                                <button className="audio__controls--btn audio__controls--btn-play">
                                    <Skeleton circle width={30} height={30}/>
                                </button>
                                <button className="audio__controls--btn">
                                    <Skeleton circle width={15} height={15}/>
                                </button>
                            </div>
                        </div>

                        <div className="audio__progress--wrapper">
                            <Skeleton width={300} />
                        </div>
                    </div>        
                </div>    
            ) : (
                <div className="summary">
                    <div className="audio__book--summary">
                        <div className="audio__book--summary-title">
                            <b>{book.title}</b>
                        </div>
                        <div className="audio__book--summary-text">
                            {book.summary}
                        </div>
                    </div>
                    
                    <div className="audio__wrapper">
                        <audio 
                            ref={audioRef} 
                            src={book.audioLink}
                            onTimeUpdate={handleTimeUpdate}
                            onLoadedMetadata={handleLoadedMetadata}
                        />
                        <div className="audio__track--wrapper">
                            <figure className='audio__track--image-mask'>
                                <figure className='player-book__image--wrapper'>
                                    <img src={book.imageLink} alt={book.title || ""} />
                                </figure>
                            </figure>
                            <div className="audio__track--details-wrapper">
                                <div className="player-audio__track--title">{book.title}</div>
                                <div className="player-audio__track--author">{book.author}</div>
                            </div>
                        </div>

                        <div className="audio__controls--wrapper">
                            <div className="audio__controls">
                                <button onClick={seekBackward} className="audio__controls--btn">
                                    <RiReplay10Line className="audio__controls--btn"/>
                                </button>
                                <button onClick={togglePlay} className="audio__controls--btn audio__controls--btn-play">
                                    {isPlaying ? 
                                        <BsFillPauseCircleFill className="audio__controls--btn audio__controls--btn-play"/> : 
                                        <BsFillPlayCircleFill className="audio__controls--btn audio__controls--btn-play"/>
                                    }
                                </button>
                                <button onClick={seekForward} className="audio__controls--btn">
                                    <RiForward10Line className="audio__controls--btn"/>
                                </button>
                            </div>
                        </div>

                        <div className="audio__progress--wrapper">
                            <div className="audio__time">{formatTime(currentTime)}</div>
                            <input 
                                type="range"
                                min="0"
                                max="100"
                                value={currentPercentage}
                                onChange={handleProgressChange}
                                style={{ background: `linear-gradient(to right, #2bd97c ${currentPercentage}%, #6D787D ${currentPercentage}%)` }}
                                className='audio__progress--bar'
                            />
                            <div className="audio__time">{formatTime(duration)}</div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}