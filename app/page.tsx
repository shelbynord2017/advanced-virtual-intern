"use client"
import Navbar from "./components/Navbar";
import Landing from "./components/Landing";
import Features from "./components/Features";
import Numbers from "./components/Numbers";
import Reviews from "./components/Reviews";
import Footer from "./components/Footer";
import Modal from "./components/Modal"
import { useState } from "react";

export default function Home() {

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [error, setError] = useState('');

  const onLoginClick = () => {
    setIsModalOpen(true)
  };

  return (
    <>
      <Navbar onLoginClick={onLoginClick}/>
      <Modal 
        error={error}
        setError={setError}
        isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} 
      />
      <Landing onLoginClick={onLoginClick}/>
      <Features />
      <Numbers />
      <Reviews onLoginClick={onLoginClick}/>
      <Footer />
    </>
  );
}