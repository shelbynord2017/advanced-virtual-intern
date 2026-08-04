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

// Component for rendering dynamically-calculated duration for a book card
function BookDuration({ audioLink, format = "mmss" }) {
  const [durationText, setDurationText] = useState("00:00");

  useEffect(() => {
    if (!audioLink) return;
    const audio = new Audio(audioLink);
    audio.onloadedmetadata = () => {
      const seconds = audio.duration;
      if (isNaN(seconds)) return;

      const mins = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);

      if (format === "verbose") {
        setDurationText(`${mins} mins ${secs} secs`);
      } else {
        setDurationText(`${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`);
      }
    };
  }, [audioLink, format]);

  return <span>{durationText}</span>;
}

export default function ForYou() {
  const { logout } = useAuth();
  const router = useRouter();
  const [selectedBook, setSelectedBook] = useState([]);
  const [recommendedBooks, setRecommendedBooks] = useState([]);
  const [suggestedBooks, setSuggestedBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAllData() {
      try {
        const [resSelected, resRecommended, resSuggested] = await Promise.all([
          fetch("https://us-central1-summaristt.cloudfunctions.net/getBooks?status=selected"),
          fetch("https://us-central1-summaristt.cloudfunctions.net/getBooks?status=recommended"),
          fetch("https://us-central1-summaristt.cloudfunctions.net/getBooks?status=suggested")
        ]);

        const selectedData = await resSelected.json();
        const recommendedData = await resRecommended.json();
        const suggestedData = await resSuggested.json();

        setSelectedBook(selectedData || []);
        setRecommendedBooks(recommendedData || []);
        setSuggestedBooks(suggestedData || []);
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchAllData();
  }, []);

  return (
    <div className="wrapper">
      <div className="row">
        <div className="container">
          <div className="for-you__wrapper">
            <div className="for-you__title">Selected just for you</div>

            {loading ? (
              <div className="selected__book">
                <div className="selected__book--sub-title"><Skeleton width={200} /></div>
                <div className="selected__book--line"></div>
                <div className="selected__book--content">
                  <figure className="selected-book__image--wrapper"><Skeleton height={160} /></figure>
                  <div className="selected__book--text">
                    <div className="selected__book--title"><Skeleton width={160} /></div>
                    <div className="selected__book--author"><Skeleton width={100} /></div>
                    <div className="selected__book--duration"><Skeleton width={90} /></div>
                  </div>
                </div>
              </div>
            ) : (
              selectedBook.map((book, index) => (
                <button 
                  key={book.id || index} 
                  onClick={() => router.push(`/book/${book?.id}`)} 
                  className="selected__book"
                >
                  <div className="selected__book--sub-title">{book?.subTitle}</div>
                  <div className="selected__book--line"></div>
                  <div className="selected__book--content">
                    <figure className="selected-book__image--wrapper">
                      <img className="selected-book__image" src={book?.imageLink} alt="" />
                    </figure>
                    <div className="selected__book--text">
                      <div className="selected__book--title">{book?.title}</div> 
                      <div className="selected__book--author">{book?.author}</div>
                      <div className="selected__book--duration-wrapper">
                        <div className="selected__book--icon">
                          <FaPlayCircle className="selected__book--icon" />
                        </div>
                        <div className="selected__book--duration">
                          <BookDuration audioLink={book?.audioLink} format="verbose" />
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              ))
            )}

            {/* Recommended Books Section */}
            <div>
              <div className="for-you__title">Recommended For You</div>
              <div className="for-you__sub-title">We think you'll like these</div>                        
              <div className="for-you__recommended--books">
                {loading ? (
                  Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} className="for-you__recommended--books-link">
                      <div className="recommended-book__image"><Skeleton height={160} /></div>
                      <div className="recommended__book--title"><Skeleton width={50}/></div>
                      <div className="recommended__book--author"><Skeleton width={50} /></div>
                      <div className="recommended__book--sub-title"><Skeleton width={85} /></div>
                      <div className="recommended__book--details"><Skeleton width={65} /></div>
                    </div>
                  ))
                ) : (
                  recommendedBooks.map((book, index) => (
                    <button 
                      key={book.id || index} 
                      onClick={() => router.push(`/book/${book.id}`)} 
                      className="for-you__recommended--books-link"
                    >
                      {book.subscriptionRequired && (
                        <div className="book__pill book__pill--subscription-required">Premium</div>
                      )}
                      <figure className="recommended-book__image--wrapper">
                        <img className="recommended-book__image" src={book.imageLink} alt="" />
                      </figure>
                      <div className="recommended__book--title">{book.title}</div>
                      <div className="recommended__book--author">{book.author}</div>
                      <div className="recommended__book--sub-title">{book.subTitle}</div>
                      <div className="recommended__book--details-wrapper">
                        <div className="recommended__book--details">
                          <div className="recommended__book--details-icon"><CiClock2 /></div>
                          <div className="recommended__book--details-text">
                            <BookDuration audioLink={book?.audioLink} format="mmss" />
                          </div>
                        </div>
                        <div className="recommended__book--details">
                          <div className="recommended__book--details-icon"><FaRegStar /></div>
                          <div className="recommended__book--details-text">{book.averageRating}</div>
                        </div>
                      </div>
                    </button>
                  ))
                )}
              </div>
            </div>

            {/* Suggested Books Section */}
            <div>
              <div className="for-you__title">Suggested Books</div>
              <div className="for-you__sub-title">Browse those books</div>
              <div className="for-you__recommended--books">
                {loading ? (
                  Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} className="for-you__recommended--books-link">
                      <div className="book__image"><Skeleton height={160} /></div>
                      <div className="recommended__book--title"><Skeleton width={50}/></div>
                      <div className="recommended__book--author"><Skeleton width={50} /></div>
                      <div className="recommended__book--sub-title"><Skeleton width={85} /></div>
                      <div className="recommended__book--details"><Skeleton width={65} /></div>
                    </div>
                  ))
                ) : ( 
                  suggestedBooks.map((book, index) => (
                    <button 
                      key={book.id || index} 
                      onClick={() => router.push(`/book/${book.id}`)} 
                      className="for-you__recommended--books-link"
                    >
                      {book.subscriptionRequired && (
                        <div className="book__pill book__pill--subscription-required">Premium</div>
                      )}
                      <figure className="book__image--wrapper">
                        <img className="book__image" src={book.imageLink} alt="" />
                      </figure>
                      <div className="recommended__book--title">{book.title}</div>
                      <div className="recommended__book--author">{book.author}</div>
                      <div className="recommended__book--sub-title">{book.subTitle}</div>
                      <div className="recommended__book--details-wrapper">
                        <div className="recommended__book--details">
                          <div className="recommended__book--details-icon"><CiClock2 /></div>
                          <div className="recommended__book--details-text">
                            <BookDuration audioLink={book?.audioLink} format="mmss" />
                          </div>
                        </div>
                        <div className="recommended__book--details">
                          <div className="recommended__book--details-icon"><FaRegStar /></div>
                          <div className="recommended__book--details-text">{book.averageRating}</div>
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
  );
}