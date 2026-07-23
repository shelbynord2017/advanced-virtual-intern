"use client"
import { useParams } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'
import { BsFillPlayCircleFill, BsFillPauseCircleFill } from "react-icons/bs";
import { RiForward10Line } from "react-icons/ri";
import { RiReplay10Line } from "react-icons/ri";


export default function Player() {

    const { id } = useParams();
    const [book, setBook] = useState([])
    const [loadingBook, setLoadingBook] = useState([])
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

    const seekBackward = () =>{
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


    useEffect(()=> {
        async function fetchBook() {
        try {
        const response = await fetch(
            `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`
        );
        const data = await response.json();
        setBook(data || []);
        setLoadingBook(false);
        console.log(data)
        } catch (error) {
        console.error("Error fetching book:", error);
        setBook([]);
        setLoadingBook(false)
        }
    };
    fetchBook();
    }, []);


  return (
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
            >
            </audio>
            <div className="audio__track--wrapper">
                <figure className='audio__track--image-mask'>
                    <figure className='player-book__image--wrapper'>
                        <img src={book.imageLink} alt="" />
                    </figure>
                </figure>
                <div className="audio__track--details-wrapper">
                    <div className="player-audio__track--title">{book.title}</div>
                    <div className="player-audio__track--author">{book.author}</div>
                </div>
            </div>


            <div className="audio__controls--wrapper">
                <div className="audio__controls">
                    <button 
                    onClick={seekBackward}
                    className="audio__controls--btn">
                        <RiReplay10Line className="audio__controls--btn"/>
                    </button>
                    <button 
                    onClick={togglePlay}
                    className="audio__controls--btn audio__controls--btn-play">
                        {isPlaying ? 
                            <BsFillPauseCircleFill className="audio__controls--btn audio__controls--btn-play"/> : 
                            <BsFillPlayCircleFill className="audio__controls--btn audio__controls--btn-play"/>
                        }
                    </button>
                    <button 
                    onClick={seekForward}
                    className="audio__controls--btn">
                        <RiForward10Line className="audio__controls--btn"/>
                    </button>
                </div>
            </div>


            <div className="audio__progress--wrapper">
                <div className="audio__time">{formatTime(currentTime)}</div>
                <input 
                    type="range"
                    min="0"
                    max="0"
                    value={currentPercentage}
                    onChange={handleProgressChange}
                    style={{ background: "linear-gradient(to right, #2bd97c 0%, #6D787D 0%)" }}
                    className='audio__progress--bar'
                />
                <div className="audio__time">{formatTime(duration)}</div>
            </div>
        </div>
    </div>
  )
}
