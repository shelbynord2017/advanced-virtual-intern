"use client"
import guest from "../../assets/guest-icon.png"
import close from "../../assets/close.png"
// import google from "../../assets/google.png"
import { useState } from 'react'
import { useAuth } from "./AuthContextProvider"
import { useRouter } from "next/navigation"


export default function Modal({ isOpen, onClose, error, setError }) {

    const { register, login, guestLogin } = useAuth();
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    

    const router = useRouter();

  if (!isOpen) return null;

  const Modal = {
    isOpen: true,
    onClose: () => console.log('Closed')
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await register(email, password);
      }
      onClose();
      router.push("for-you");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGuest = async () => {
    try {
      await guestLogin();
      onClose();
      router.push("for-you");
    } catch (err) {
      setError(err.message);
    }
  };



  return (
    <body>
        <div className="wrapper wrapper__full">
            <div className='sidebar__overlay'>
                <div className="auth__wrapper">
                    <div className="auth">
                        <div className='auth__content'>
                            <div className='auth__title'>
                                Log in to Summarist
                            </div>
                            <button 
                            onClick={handleGuest}
                            className='btn guest__btn--wrapper'>
                                <figure className='google__icon--mask guest__icon--mask'>
                                    <img src={guest.src} alt="" />
                                </figure>
                                <div>Login as a Guest</div>
                            </button>
                            {/* <div className="auth__separator">
                                <span className="auth__separator--text">or</span>
                            </div>
                            <button 
                            // onClick={register}
                            className="btn google__btn--wrapper">
                                <figure className="google__icon--mask">
                                    <img src={google.src} alt="" />
                                </figure>
                                <div>Register</div>
                            </button> */}
                            <div className="auth__separator">
                                <span className="auth__separator--text">or</span>
                            </div>
                            <form className="auth__main--form" onSubmit={handleSubmit}>
                                <input 
                                    className="auth__main--input" 
                                    type="text" 
                                    placeholder="Email Address"
                                    onChange={(e) => setEmail(e.target.value)}/>
                                <input 
                                    className="auth__main--input" 
                                    type="password" 
                                    placeholder="Password"
                                    onChange={(e) => setPassword(e.target.value)}/>
                                <button 
                                className="btn">
                                    <span>{isLogin ? 'Sign In' : 'Register'}</span>
                                </button>
                                {error && <p className="auth__error">{error}</p>}
                            </form>
                            <p className="toggle__text">
                                {isLogin ? "Need an account? " : "Already have an account? "}
                                <button onClick={() => setIsLogin(!isLogin)} className="auth__switch--btn">{isLogin ? 'Register' : 'Sign In'}</button>
                            </p>
                            <div 
                            onClick={onClose}
                            className="auth__close--btn">
                                <img src={close.src} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </body>
  )
}


