import React from 'react'

export default function getAudioDuration(url) {
    return new Promise((resolve, reject) => {
        const audio = new Audio();
        audio.src = book.audioLink; // Pass the parameter here!
        audio.preload = "metadata";
        
        audio.onloadedmetadata = () => {
        resolve(audio.duration); // Returns duration in seconds
        };

        // Good practice: Handle errors (e.g., invalid URL or network failure)
        audio.onerror = (error) => {
        reject(error);
        };
    });
}
