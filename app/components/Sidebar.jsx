"use client"
import React, { useState } from 'react'
import { FaHome, FaRegBookmark, FaPenAlt, FaSearch, FaPlayCircle, FaRegStar } from "react-icons/fa";
import { IoSettingsOutline, IoLogOutOutline } from "react-icons/io5";
import { CiClock2 } from "react-icons/ci";
import { IoMdHelpCircle } from "react-icons/io";
import logo from '../../assets/logo.png'
import { useAuth } from "../components/AuthContextProvider";
import { useRouter } from "next/navigation";
import Link from 'next/link';


export default function Sidebar() {


    const { logout } = useAuth();
    const [error, setError] = useState('');
    const router = useRouter();


    const handleLogout = async () => {
        console.log("logout clicked")
        try {
        console.log("before logout")
        await logout();
        console.log("after logout")
        router.push("/");
        } catch (err) {
        setError("invalid email or password");
        }
    };


  return (
    <div className="sidebar sidebar__closed">
        <div className="sidebar__logo">
            <img src={logo.src} alt="" />
        </div>
        <div className="sidebar__wrapper">
            <div className="sidebar__top">
                <Link href="/for-you" className="sidebar__link--wrapper">
                    <div className="sidebar__icon--wrapper">
                        <FaHome className="sidebar__icon--img" />
                    </div>
                    <div className="sidebar__link--text">For you</div>
                </Link>
                <a className="sidebar__link--wrapper">
                    <div className="sidebar__icon--wrapper">
                        <FaRegBookmark className="sidebar__icon--img" />
                    </div>
                    <div className="sidebar__link--text">My library</div>
                </a>
                <div className="sidebar__link--wrapper sidebar__link--not-allowed">
                    <div className="sidebar__icon--wrapper">
                        <FaPenAlt className="sidebar__icon--img" />
                    </div>
                    <div className="sidebar__link--text">Highlights</div>
                </div>
                <div className="sidebar__link--wrapper sidebar__link--not-allowed">
                    <div className="sidebar__icon--wrapper">
                        <FaSearch  className="sidebar__icon--img" />
                    </div>
                    <div className="sidebar__link--text">Search</div>
                </div>
            </div>
            <div className="sidebar__bottom">
                <Link href="/settings" className="sidebar__link--wrapper">
                    <div className="sidebar__icon--wrapper">
                        <IoSettingsOutline className="sidebar__icon--img" />
                    </div>
                    <div className="sidebar__link--text">Settings</div>
                </Link>
                <div className="sidebar__link--wrapper sidebar__link--not-allowed">
                    <div className="sidebar__icon--wrapper">
                        <IoMdHelpCircle className="sidebar__icon--img" />
                    </div>
                    <div className="sidebar__link--text">Help & Support</div>
                </div>
                <a 
                onClick={handleLogout}
                className="sidebar__link--wrapper">
                    <div className="sidebar__icon--wrapper">
                        <IoLogOutOutline className="sidebar__icon--img" />
                    </div>
                    <div 
                    
                    className="sidebar__link--text">Logout</div>
                </a>
            </div>
        </div>
    </div>
  )
}
