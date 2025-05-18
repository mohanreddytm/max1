import { useState, useEffect } from 'react'

import React from 'react'
import { GoogleLogin } from '@react-oauth/google';

import { FaArrowLeftLong } from "react-icons/fa6";
import {jwtDecode} from 'jwt-decode';
import { FaNotEqual } from "react-icons/fa";
import { HiEye, HiEyeOff  } from "react-icons/hi";
import emailjs from '@emailjs/browser';
import './index.css'
import emptyprofile from "../../images/emptyprofile.jpeg"
import logo from "../../images/logo.png"
import { GoVerified } from "react-icons/go";
import funny from "../../images/funny.png"

const LoginRoute = () => {
    const [passorotp, setPassOrOtp] = useState(true)
    const [logorsign, setLogOrSign] = useState('login')
    const [showwarning, setShowWarning] = useState(false)
    const [email, setEmail] = useState('')
    const [firstname, setFirstName] = useState('')
    const [otp, setOtp] = useState('')
    const [lastname, setLastName] = useState('')
    const [password, setPassword] = useState('')
    const [inValidOTP, setInValidOTP] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [count , setCount] = useState(30)
    const [showOpt, setShowOtp] = useState("getotp")
    const [userOTP, setUserOTP] = useState('')
    const [continueSignUp, setContinueSignUp] = useState(false)
    const [changetopassword, setChangeToPassword] = useState(false)

    const [statusOfTheProfilePhoto, setStatusOfTheProfilePhoto] = useState("PRIMARY")

    const [ishas8length, setIsHas8Length] = useState(false)
    const [isUpperCase, setIsUpperCase] = useState(false)
    const [isLowerCase, setIsLowerCase] = useState(false)
    const [isNumber, setIsNumber] = useState(false)
    const [isSpecialChar, setIsSpecialChar] = useState(false)

    const [renderProfile, setRenderProfile] = useState(false)

    const [showPasswordOne, setShowPasswordOne] = useState(false)
    const [showConfirmPasswordTrue, setShowConfirmPasswordTrue] = useState(false)

    const [signInPassword, setSignInPassword] = useState('')
    const [signInConfirmPassword, setSignInConfirmPassword] = useState('')
    const [signInPasswordShow, setSignInPasswordShow] = useState(false)
    const [signInConfirmPasswordShow, setSignInConfirmPasswordShow] = useState(false)

    const [loginEmail, setLoginEmail] = useState('')
    const [loginPassword, setLoginPassword] = useState('')

    useEffect(() => {
    if (count === 0 || showOpt !== "verify") return;

    const intervalId = setInterval(() => {
        setCount((prevCount) => prevCount - 1);
    }, 1000);

    return () => clearInterval(intervalId);
    }, [showOpt, count]);



    const onChangePasswordOne = (e) => {
        const { value } = e.target
        setLoginPassword(value)
    }

    const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

    const handleSendOtp = (e) => {
        e.preventDefault();
                const form = e.target.closest("form"); // Get form element from the button event
        if (!form.reportValidity()) return;


    if(email !== '' && firstname !== '' && lastname !== ''){
            setShowOtp("verify")
            
    const newOtp = generateOtp();
    setOtp(newOtp);

            const templateParams = {
      user_name: firstname + ' ' + lastname,
      user_email: email,
      otp: newOtp,
    };

    emailjs
      .send(
        'service_qqs8hms',
        'template_8g1y9pr',
        templateParams,
        'S0ZLkMkBWsYwbU2dw'
      )
      

        }

    
  };


  const onClickVeriyOTP = (e) => {
    e.preventDefault();
            const form = e.target.closest("form"); // Get form element from the button event
        if (!form.reportValidity()) return;

    if(userOTP === otp){
        console.log("OTP verified successfully")
        setContinueSignUp(true)
        setShowOtp("done")
        setInValidOTP(false)
  }else{
        setInValidOTP(true)
    }
  }

  const onClickContinue = (e) => {
    e.preventDefault();
            const form = e.target.closest("form"); // Get form element from the button event
        if (!form.reportValidity()) return;

    if(signInPassword === ''){
        setShowPasswordOne(false)
    }else{
        if(ishas8length && isUpperCase && isLowerCase && isNumber && isSpecialChar){
            setShowPasswordOne(false)
        }else{
            setShowPasswordOne(true)
        }
    }
    setChangeToPassword(true)
  }



    const mainButton = () => {
        if(showOpt === "verify"){
            return <button className='send-otp-button' type='submit' onClick={onClickVeriyOTP} >Verify OTP</button>
        }
        else if(showOpt === "done"){
            return <button className='send-otp-button' type='submit' onClick={onClickContinue} >Continue</button>
        }
        else{
            return <button className='send-otp-button' type='submit' onClick={handleSendOtp} >Send OTP</button>
        }
    }

    const onClickBackFinalPage = (e) => {
        e.preventDefault();
        setShowPasswordOne(false)
        setChangeToPassword(false)
        setContinueSignUp(false)
        setShowOtp("done")
    }

    const onChangeConfirmPasswordone = (e) => {
        const { value } = e.target
        setSignInConfirmPassword(value)
        if (value === signInPassword) {
            setShowConfirmPasswordTrue(false);
        } else {
            setShowConfirmPasswordTrue(true);
        }
    }

    const onchangesigninpassword = (e) => {
        const { value } = e.target
        setSignInPassword(value)
        if (value === '') {
            setShowPasswordOne(false);
            setIsLowerCase(false);
            setIsUpperCase(false);
            setIsNumber(false);
            setIsSpecialChar(false);
            setIsHas8Length(false);
            return; 
        }
        const hasUpperCase = /[A-Z]/.test(value);
        const hasLowerCase = /[a-z]/.test(value);
        const hasNumber = /[0-9]/.test(value);
        const hasSpecialChar = /[^A-Za-z0-9]/.test(value);
        const isLongEnough = value.length >= 8;
        setIsLowerCase(hasLowerCase)
        setIsUpperCase(hasUpperCase)
        setIsNumber(hasNumber)
        setIsSpecialChar(hasSpecialChar)
        setIsHas8Length(isLongEnough)
        if (!hasUpperCase || !hasLowerCase || !hasNumber || !hasSpecialChar || !isLongEnough) {
            setShowPasswordOne(true);
        } else {
            setShowPasswordOne(false);
        }
    }

    const onChangeUploadImage = async (e) => {
        setStatusOfTheProfilePhoto("LOADING")
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("image", file);

        const res = await fetch("https://api.imgbb.com/1/upload?key=ec8d175c74f4bcd9fa0103102b222c20", {
            method: "POST",
            body: formData,
        });

        const data = await res.json();
        const imageUrl = data.data.url;
        setStatusOfTheProfilePhoto("DONE")
        setRenderProfile(imageUrl); // Now you have a public URL

    };

    const profileImage = () => {
        if(statusOfTheProfilePhoto === "PRIMARY"){
            return  <img src={emptyprofile} alt="Profile" className='login-profile-image'  />
        }else if(statusOfTheProfilePhoto === "LOADING"){
            return <div className='login-profile-image loading-cont-signin'>
                <div className='loading-one-mini-cont'>
                        <p className='loading-one'></p>
                </div>
                
            </div>
        }else{
            return <img src={renderProfile} alt="Profile" className='login-profile-image' />
        }
    }

    const onClickSignInButton = async (e) => {

        e.preventDefault();

        const form = e.target.closest("form"); // Get form element from the button event
        if (!form.reportValidity()) return;

        if(isLowerCase && isUpperCase && isNumber && isSpecialChar && ishas8length){
            setShowPasswordOne(false)
        }else{
            setShowPasswordOne(true)
        }
        if(showConfirmPasswordTrue){
            setShowConfirmPasswordTrue(true)
        }

        if(showPasswordOne === false && showConfirmPasswordTrue === false){

                const data = {
                    email: email,
                    firstName: firstname,
                    lastName: lastname,
                    password: signInPassword,
                    profileImage: renderProfile,
                    role: "USER",
                    status: "ACTIVE",
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                }
                const url = "http://localhost:5050/addUser"
                const options = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                };
                const respones = await fetch(url, options)
                console.log("respones", respones)
                console.log("data", data)

        }
        

    }


  return (
    <div className='login-route-initial-cont'>
        <div className='login-left-cont'>
            <div className='extra-login-left'>
                <div className='login-left-main-cont'>
                    <div className='login-left-m-container'>
                        <h1 className='login-left-m-head'>M</h1>
                        <p className='login-left-m-head'>-</p>
                        <div className='login-left-m-matter-cont'>
                            <h1 className='login-left-m-text'><span className='login-special-letter'>M</span> is for: ‘My wallet said no, but my finger hit Buy Now anyway.   </h1>
                            <p className='login-left-m-matter'>You came to look. But now you're buying a life-sized duck costume, glow-in-the-dark toilet paper, and a coffee mug that screams when it's empty. Why? Because MAX whispered: do it.</p>
                        </div>
                    </div>
                    <div className='login-left-m-container'>
                        <h1 className='login-left-m-head seperate-a order-1'>A</h1>
                        <p className='login-left-m-head seperate-a order-2' >-</p>
                        <div className='login-left-m-matter-cont seperate-a-mini'>
                            <h1 className='login-left-m-text'><span className='login-special-letter first-special-a'>A</span> is for: ‘Accidentally bought 47 items while sitting on the toilet.</h1>
                            <p className='login-left-m-matter'>Yes, you thought you were just scrolling. But now there's a delivery van named Ramesh outside with 6 boxes of banana-shaped slippers and one air fryer that looks like Iron Man. Add to cart? Bro, you added your life to cart.</p>
                        </div>
                    </div>
                        <div className='login-left-m-container'>
                        <h1 className='login-left-m-head separate-x'>X</h1>
                        <p className='login-left-m-head separate-x'>-</p>
                        <div className='login-left-m-matter-cont separate-x-mini'>
                            <h1 className='login-left-m-text'>
                                <span className='login-special-letter first-special-x'>X</span>
                                is for: ‘Xcuse me, what even is this?!</h1>
                            <p className='login-left-m-matter'>You  blacked out at 3 AM and woke up with a tracking number and a confirmation email for a "Bluetooth-enabled smart watermelon slicer with 16 languages." Welcome to MAX. Reality who?</p>
                        </div>
                    </div>
                    <div className='login-left-m-container-bottom'>
                        <div className='login-left-m-logo-cont-comb'>
                            <h1 className='login-left-m-head'>M</h1>
                            <h1 className='login-left-m-head seperate-a'>A</h1>
                            <h1 className='login-left-m-head separate-x'>X</h1>
                        </div>

                        <img src={funny} alt="Funny" className='login-left-m-funny' />
                        <div className='login-left-m-matter-cont max-total-cont'>
                            <h1 className='login-left-m-text one'>
                                <span className='login-special-letter remove-raduis'>M</span>
                                <span className='login-special-letter remove-raduis first-special-a'>A</span>
                                <span className='login-special-letter first-special-x remove-raduis '>X</span>
                            : Making Absolutely Xtra purchases since… like, five minutes ago.</h1>
                        </div>

                    </div>
                </div>
            </div>


        </div>
        <div className='login-right-cont'>
            <div className='login-right-main-cont'>
                <div className='login-logo-cont'>
                    <div className='login-logo-max-cont'>
                        <h1 className='M'>M</h1>
                        <h1 className='A'>A</h1>
                        <h1 className='X'>X</h1>
                    </div>

                    <p className='login-raid-logo'>RAID</p>
                </div>
                {logorsign === 'sign' ?  
                <form className='login-form signup-form'>
                    <h1 className='login-text-form'>Sign Up</h1>
                    {showPasswordOne &&                      <div className='sign-in-password-warning-cont'>
                        <h1>Password Should be</h1>

                            <p className={`${ishas8length && 'done-sign-in-warning'} warning-message`}>At least 8 characters</p>
                            <p className={`${isUpperCase && 'done-sign-in-warning'} warning-message`}
                            >1. At least 1 uppercase letter</p>
                            <p className={`${isLowerCase && 'done-sign-in-warning'} warning-message`}
                            >2. At least 1 lowercase letter</p>
                            <p className={`${isNumber && 'done-sign-in-warning'} warning-message`}>3. At least 1 number</p>
                            <p className={`${isSpecialChar && 'done-sign-in-warning'} warning-message`}>4. At least 1 special character</p>

                    </div>}

                    {changetopassword ?
                    <>
                    <label className='login-text-element' htmlFor="password">Password</label>
                    <div className='sign-in-password-cont'>
                        <input value={signInPassword} onChange={onchangesigninpassword} className='login-input-element' type={signInPasswordShow ? "text" : "password"} id="password" name="password" placeholder={`Enter your Password / Ex: nxiM2638@#jak`} required />
                        {signInPasswordShow ? <HiEyeOff onClick={() => setSignInPasswordShow(false)} className='eye-login' /> :<HiEye onClick={() => setSignInPasswordShow(true)} className='eye-login' /> }
                    </div>
                    <label className='login-text-element' htmlFor="password">Confirm Password</label>
                    <div className='sign-in-password-cont'>
                        <input value={signInConfirmPassword} onChange={onChangeConfirmPasswordone} className='login-input-element' type={signInConfirmPasswordShow ? "text" : "password"} id="password" name="password" placeholder={`Enter your Password / Ex: nxiM2638@#jak`} required />
                        {signInConfirmPasswordShow ? <HiEyeOff onClick={() => setSignInConfirmPasswordShow(false)} className='eye-login' /> :<HiEye onClick={() => setSignInConfirmPasswordShow(true)} className='eye-login' /> }

                    </div>
                    {showConfirmPasswordTrue &&
                    <p className='sign-in-cofirm-warning-password'>Password Should be Match</p>
                    }

                    <label className='login-text-element'>Upload Profile Image (optional)</label>
                    {profileImage()}

                    <input type="file" accept="image/*" className='upload-image-style' onChange={onChangeUploadImage} />
                    <button className={`login-button main-sign-in ${showPasswordOne && "make-cursor-error" } ${showConfirmPasswordTrue && "make-cursor-error"}`} onClick={onClickSignInButton} type="submit">Sign Up</button>
                    <button className='back-one-button' onClick={onClickBackFinalPage}><FaArrowLeftLong />back</button>

                    </>
                    : <>
                    <div className='login-name-cont'>
                        <div>
                            <label className='login-text-element' htmlFor="firstname">First Name</label>
                            <input value={firstname} onChange={(e) => setFirstName(e.target.value)} className='login-input-element name-inputs first-name-last-text' type="text" id="firstname" name="name" placeholder="Ex: Mohan" required />
                        </div>

                        <div>
                            <label className='login-text-element' htmlFor="lastname">Last Name</label>
                            <input value={lastname} onChange={(e) => setLastName(e.target.value)} className='login-input-element name-inputs first-name-last-text' type="text" id="lastname" name="phone" placeholder="Ex: Reddy" required />
                        </div>
                    </div>
                    <label className='login-text-element' htmlFor="email">Email</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} className='login-input-element' type="email" id="email" name="email" placeholder="Enter your email" required />
                    {showOpt !== "getotp" &&
                    <>
                    <div className={`login-name-cont-mini`}>
                        <label className='login-text-element' htmlFor="otp">OTP</label>
                        <p className={`otp-text ${count === 0 && "bright-login"}`}>
                            Resend OTP({count} sec)
                        </p>
                    </div>

                    
                        <input value={userOTP} onChange={(e) => setUserOTP(e.target.value)} className='login-input-element' type="number" id="otp" name="otp" placeholder="Enter your OTP sended to your provided email" required />
                        {inValidOTP && <div className='login-verified-cont otp-error'>
                            <FaNotEqual />
                            <p className='verfied-text-in-login'>
                                OTP is Incorrect (please check your email)

                            </p>
                        </div> }
                        {showOpt === "done" && <div className='login-verified-cont'>
                            <GoVerified />
                            <p className='verfied-text-in-login'>verified</p>
                        </div> }
                        
                        
                    </>
                    }
                    {mainButton()}
                    <GoogleLogin
                        onSuccess={(credentialResponse) => {
                        const decoded = jwtDecode(credentialResponse.credential);
                        console.log("User Info:", decoded);
                        }}
                        onError={() => {
                        console.log('Login Failed');
                        }}
                    />
                    <button className='back-one-button' onClick={() => setLogOrSign("login")}><FaArrowLeftLong />login</button>

                    </>
                                        }
                    
                    
                </form>
                : <form className='login-form'>
                    <h1 className='login-text-form'>Login</h1>
                    <label className='login-text-element' htmlFor="email">Email</label>
                    <input value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} className='login-input-element' type="email" id="email" name="email" placeholder="Enter your email" required />
              
                    <div className='login-password-cont-otp'>
                    <label className='login-text-element' htmlFor="password">{passorotp ? "Password": "OTP"} </label> 
                    <p className='otp-text' onClick={() => setPassOrOtp(!passorotp)}>-/{passorotp ? "OPT": "Password"}</p>                       
                    </div>
                    <input value={loginPassword} onChange={onChangePasswordOne} className='login-input-element' type="password" id="password" name="password" placeholder={`Enter your ${passorotp ? "Password": "OTP"} / Ex: ${passorotp? "nxiM2638@#jak" : "123456"} `} required />

                    <div className='login-showand-forgot-cont'>
                        <div className='show-password-cont'>    
                            <input className='login-checkbox-element' type="checkbox" id="show-password" name="show-password" />
                            <label className='login-text-element show-password' htmlFor="show-password">Show Password</label>
                        </div>
                        <div className='forgot-password-cont'>
                            <p className='login-text-element forgot-password'>Forgot Password?</p>
                        </div>
                    </div>
                    <button className='login-button' type="submit">Sign In</button>
                    <button className='sign-button' onClick={() => setLogOrSign("sign")} type='button'>Sign Up</button>
                    <GoogleLogin
                        onSuccess={(credentialResponse) => {
                        const decoded = jwtDecode(credentialResponse.credential);
                        console.log("User Info:", decoded);
                        }}
                        onError={() => {
                        console.log('Login Failed');
                        }}
                    />

                    <div className={`login-or-cont ${showwarning ? 'show' : ''}`}>
                        <p className='warning-message'>At least 8 characters</p>
                        <p className='warning-message'>1. At least 1 uppercase letter</p>
                        <p className='warning-message'>2. At least 1 lowercase letter</p>
                        <p className='warning-message'>3. At least 1 number</p>
                        <p className='warning-message'>4. At least 1 special character</p>
                    </div>
                </form>}
               

            </div>
            
        </div>
    </div>
  )
}

export default LoginRoute
