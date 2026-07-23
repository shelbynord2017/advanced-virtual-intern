"use client"
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { FaRegStar } from "react-icons/fa";
import { CiClock2 } from "react-icons/ci";
import { FiMic } from "react-icons/fi";
import { HiOutlineLightBulb } from "react-icons/hi";
import { FaRegBookmark } from "react-icons/fa";
import { LuBookOpenText } from "react-icons/lu";
import { useRouter } from "next/navigation"

export default function Book() {

const { id } = useParams();
const [book, setBook] = useState([])
const [loadingBook, setLoadingBook] = useState([])
const router = useRouter();

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
    <div className='row'>
        <div className="container">
            <div className="inner__wrapper">
                <div className="inner__book">
                    <div className="inner-book__title">{book.title}</div>
                    <div className="inner-book__author">{book.author}</div>
                    <div className="inner-book__sub--title">{book.subTitle}</div>
                    <div className="inner-book__wrapper">
                        <div className='inner-book__description--wrapper'>
                            <div className="inner-book__description">
                                <div className="inner-book__icon">
                                    <FaRegStar className='inner-book__icon'/>
                                </div>
                                <div className="inner-book__overall--rating">{book.averageRating}</div>
                                <div className="inner-book__total--rating">
                                    &nbsp;({book.totalRating} ratings)
                                </div>
                            </div>
                            <div className="inner-book__description">
                                <div className="inner-book__icon">
                                    <CiClock2 className='inner-book__icon'/>
                                </div>
                                <div className="inner-book__duration">00:00</div>
                            </div>
                            <div className="inner-book__description">
                                <div className="inner-book__icon">
                                    <FiMic className='inner-book__icon'/>
                                </div>
                                <div className="inner-book__type">{book.type}</div>
                            </div>
                            <div className="inner-book__description">
                                <div className="inner-book__icon">
                                    <HiOutlineLightBulb className='inner-book__icon'/>
                                </div>
                                <div className="inner-book__key--ideas">{book.keyIdeas} key ideas</div>
                            </div>
                        </div>
                    </div>
                    <div className="inner-book__read--btn-wrapper">
                        <button className='inner-book__read--btn'>
                            <div className="inner-book__read--icon">
                                <LuBookOpenText className="inner-book__read--icon"/>
                            </div>
                            <div className="inner-book__read--text">Read</div>
                        </button>
                        <button 
                        onClick={()=> router.push(`/player/${book.id}`)}
                        className='inner-book__read--btn'>
                            <div className="inner-book__read--icon">
                                <FiMic className="inner-book__read--icon"/>
                            </div>
                            <div className="inner-book__read--text">Listen</div>
                        </button>
                    </div>
                    <div className="inner-book__bookmark">
                        <div className="inner-book__bookmark--icon">
                            <FaRegBookmark />
                        </div>
                        <div className="inner-book__bookmark--text">Add title to my library</div>
                    </div>
                    <div className="inner-book__secondary--title">
                        What's it about?
                    </div>
                    <div className="inner-books__tags--wrapper">
                        <div className="inner-book__tag">{book.tags?.join(", ")}</div>
                    </div>
                    <div className="inner-book__book--description">{book.bookDescription}</div>
                    <h2 className="inner-book__secondary--title">
                        About the author
                    </h2>
                    <div className="inner-book__author--description">{book.authorDescription}</div>
                </div>
                <div className="inner-book__img-wrapper">
                    <figure className="book__image--wrapper">
                        <img src={book.imageLink} alt="" />
                    </figure>
                </div>
            </div>
        </div>
    </div>
  )
}
