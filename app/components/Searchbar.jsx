"use client"
import React from 'react'
import { FaSearch } from "react-icons/fa";
import logo from '../../assets/logo.png'


export default function Searchbar() {


  return (
    <div className="search__background">
        <div className="search__wrapper">
            <div className="search__content">
                <div className="search">
                    <div className="search__input--wrapper">
                        <input 
                            className='search__input'
                            placeholder='Search for books'
                            type="text" 
                        />
                        <div className="search__icon">
                            <FaSearch  className="sidebar__icon--img" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
