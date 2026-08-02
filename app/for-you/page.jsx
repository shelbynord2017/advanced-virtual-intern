"use client"
import logo from '../../assets/logo.png'
import { FaHome, FaRegBookmark, FaPenAlt, FaSearch, FaPlayCircle, FaRegStar } from "react-icons/fa";
import { IoSettingsOutline, IoLogOutOutline } from "react-icons/io5";
import { CiClock2 } from "react-icons/ci";
import { IoMdHelpCircle } from "react-icons/io";
import { useAuth } from "../components/AuthContextProvider";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Searchbar from "../components/Searchbar";
import Sidebar from "../components/Sidebar";


export default function forYou() {
  
    const { logout } = useAuth();
    const router = useRouter();
    const [error, setError] = useState('');
    const [selectedBook, setSelectedBook] = useState([])
    const [recommendedBooks, setRecommendedBooks] = useState([])
    const [suggestedBooks, setSuggestedBooks] = useState([])
    const [loading, setLoading] = useState(true);

    // const handleLogout = async () => {
    //     console.log("logout clicked")
    //     try {
    //     console.log("before logout")
    //     await logout();
    //     console.log("after logout")
    //     router.push("/");
    //     } catch (err) {
    //     setError("invalid email or password");
    //     }
    // };

    useEffect(()=> {
        async function fetchSelectedBook() {
        try {
        const response = await fetch(
            "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=selected"
        );
        const data = await response.json();
        setSelectedBook(data || []);
        setLoading(false);
        console.log(data)
        } catch (error) {
        console.error("Error fetching book:", error);
        setSelectedBook([]);
        setLoading(false);
        }
    };
    fetchSelectedBook();
    }, []);


    useEffect(()=> {
        async function fetchRecommendedBooks() {
        try {
        const response = await fetch(
            "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=recommended"
        );
        const data = await response.json();
        setRecommendedBooks(data || []);
        setLoading(false);
        console.log(data)
        } catch (error) {
        console.error("Error fetching book:", error);
        setRecommendedBooks([]);
        setLoading(false)
        }
    };
    fetchRecommendedBooks();
    }, []);
    
    useEffect(()=> {
        async function fetchSuggestedBooks() {
        try {
        const response = await fetch(
            "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=suggested"
        );
        const data = await response.json();
        setSuggestedBooks(data || []);
        setLoading(false);
        console.log(data)
        } catch (error) {
        console.error("Error fetching book:", error);
        setSuggestedBooks([]);
        setLoading(false)
        }
    };
    fetchSuggestedBooks();
    }, []);
  
  return (
    <>
        <Sidebar />
        <div className="wrapper">
            <Searchbar />
            <div className="row">
                <div className="container">
                    <div className="for-you__wrapper">
                        <div className="for-you__title">
                            Selected just for you
                        </div>
                        <audio ></audio>
                        {loading ? (
                            <div className="selected__book">
                                <div className="selected__book--sub-title">
                                    <Skeleton width={200} />
                                </div>

                                <div className="selected__book--line"></div>

                                <div className="selected__book--content">
                                    <figure className="selected-book__image--wrapper">
                                        <Skeleton height={160} />
                                    </figure>

                                    <div className="selected__book--text">
                                        <div className="selected__book--title">
                                            <Skeleton width={160} />
                                        </div>

                                        <div className="selected__book--author">
                                            <Skeleton width={100} />
                                        </div>

                                        <div className="selected__book--duration">
                                            <Skeleton width={90} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                        selectedBook.map((book, index) => (
                        <button 
                        key={index} 
                        onClick={()=> router.push(`/book/${book?.id}`)} 
                        className='selected__book'>
                            <div className="selected__book--sub-title">
                                {book?.subTitle}
                            </div>
                            <div className="selected__book--line"></div>
                            <div className="selected__book--content">
                                <figure className='selected-book__image--wrapper'>
                                    <img className="selected-book__image" src={book?.imageLink} alt="" />
                                </figure>
                                <div className="selected__book--text">
                                    <div className="selected__book--title">{book?.title}</div> 
                                    <div className="selected__book--author">{book?.author}</div>
                                    <div className="selected__book--duration-wrapper">
                                        <div className="selected__book--icon">
                                            <FaPlayCircle className='selected__book--icon' />
                                        </div>
                                        <div className="selected__book--duration">3 mins 23 secs</div>
                                    </div>
                                </div>
                            </div>
                        </button>
                        ))
                        )}
                        <div>
                            <div className="for-you__title">
                                Recommended For You
                            </div>
                            <div className="for-you__sub-title">
                                We think you'll like these
                            </div>                        
                            <div className="for-you__recommended--books">
                                {loading ? (
                                Array.from({ length: 4 }).map((_, index) => (
                                <div key={index} className="for-you__recommended--books-link">
                                    <div className="recommended-book__image">
                                        <Skeleton 
                                            height={160} 
                                        />
                                    </div>
                                    <div className="recommended__book--title">
                                        <Skeleton width={50}/> 
                                    </div>
                                    <div className="recommended__book--author">
                                        <Skeleton width={50} />
                                    </div>
                                    <div className="recommended__book--sub-title">
                                        <Skeleton width={85} />
                                    </div>
                                    <div className="recommended__book--details">
                                        <Skeleton width={65} />
                                    </div>
                                </div>
                                ))
                                ) : (
                                recommendedBooks.map((book, index) => (
                                <button 
                                key={index} 
                                onClick={()=> router.push(`/book/${book.id}`)} 
                                className="for-you__recommended--books-link">
                                    {book.subscriptionRequired && 
                                        <div className="book__pill book__pill--subscription-required">
                                            Premium
                                        </div>
                                    }
                                    <audio></audio>
                                    <figure className='recommended-book__image--wrapper'>
                                        <img className="recommended-book__image" src={book.imageLink} />
                                    </figure>
                                    <div className="recommended__book--title">
                                        {book.title}
                                    </div>
                                    <div className="recommended__book--author">
                                        {book.author}
                                    </div>
                                    <div className="recommended__book--sub-title">
                                        {book.subTitle}
                                    </div>
                                    <div className="recommended__book--details-wrapper">
                                        <div className="recommended__book--details">
                                            <div className="recommended__book--details-icon">
                                                <CiClock2 />
                                            </div>
                                            <div className="recommended__book--details-text">
                                                03:24
                                            </div>
                                        </div>
                                        <div className="recommended__book--details">
                                            <div className="recommended__book--details-icon">
                                                <FaRegStar />
                                            </div>
                                            <div className="recommended__book--details-text">
                                                {book.averageRating}
                                            </div>
                                        </div>
                                    </div>
                                </button>
                                 ))
                                 )}
                            </div>
                           
                        </div>
                        <div>
                            <div className="for-you__title">
                                Suggested Books
                            </div>
                            <div className="for-you__sub-title">
                                Browse those books
                            </div>
                            <div className="for-you__recommended--books">
                                {loading ? (
                                Array.from({ length: 4 }).map((_, index) => (
                                <div key={index} className="for-you__recommended--books-link">
                                    <div className="book__image">
                                        <Skeleton 
                                            height={160} 
                                        />
                                    </div>
                                    <div className="recommended__book--title">
                                        <Skeleton width={50}/> 
                                    </div>
                                    <div className="recommended__book--author">
                                        <Skeleton width={50} />
                                    </div>
                                    <div className="recommended__book--sub-title">
                                        <Skeleton width={85} />
                                    </div>
                                    <div className="recommended__book--details">
                                        <Skeleton width={65} />
                                    </div>
                                </div>
                                ))
                                ) : ( 
                                suggestedBooks.map((book, index) => (
                                <button 
                                key={index} 
                                onClick={()=> router.push(`/book/${book.id}`)} 
                                className="for-you__recommended--books-link">
                                    <div className="book__pill book__pill--subscription-required">{book.subscriptionRequired && "Premium"}</div>
                                    <audio ></audio>
                                    <figure className='book__image--wrapper'>
                                        <img className="book__image" alt=""src={book.imageLink} />
                                    </figure>
                                    <div className="recommended__book--title">
                                        {book.title}
                                    </div>
                                    <div className="recommended__book--author">
                                        {book.author}
                                    </div>
                                    <div className="recommended__book--sub-title">
                                        {book.subTitle}
                                    </div>
                                    <div className="recommended__book--details-wrapper">
                                        <div className="recommended__book--details">
                                            <div className="recommended__book--details-icon">
                                                <CiClock2 />
                                            </div>
                                            <div className="recommended__book--details-text">
                                                03:24
                                            </div>
                                        </div>
                                        <div className="recommended__book--details">
                                            <div className="recommended__book--details-icon">
                                                <FaRegStar />
                                            </div>
                                            <div className="recommended__book--details-text">
                                                {book.averageRating}
                                            </div>
                                        </div>
                                    </div>
                                </button>
                                ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>  
  )
}
