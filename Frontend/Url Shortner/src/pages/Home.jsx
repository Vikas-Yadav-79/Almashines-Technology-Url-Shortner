import React, { useState,useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink, faDownload, faL } from '@fortawesome/free-solid-svg-icons';
import AnalyticsForm from '../components/AnalyticsForm';
import { ToastContainer, toast } from 'react-toastify';
import urlelement from '../assets/urlelement.svg';
import 'react-toastify/dist/ReactToastify.css';
import QRCode from 'react-qr-code';
import { useNavigate } from 'react-router-dom'; 
import { shortenURL, validatepasswordProtectedURL, getURLAnalytics } from '../service/api'; 
import '../App.css'


const Home = () => {
    const [URL, setURL] = useState('');
    const navigate = useNavigate(); 
    const [customUrl, setcustomurl] = useState('');
    const [customurlclick, setcustomurlclick] = useState(false);
    const [expiration, setExpiration] = useState('');
    const [expirationField, setExpirationField] = useState(false);

    const [shortURL, setShortURL] = useState('');
    const [password, setPassword] = useState(''); 
    const [showPasswordField, setShowPasswordField] = useState(false);  
    const [isCopied, setIsCopied] = useState(false);
    const [valpassword, setvalPassword] = useState('');
    const apiURL = "http://localhost:5000/api/url";


    const[loggedin,SetLoggedin] = useState(false);

    let qrCodeRef = React.createRef();


    const downloadQRCode = () => {
        const canvas = qrCodeRef.current.querySelector('canvas');
        const pngUrl = canvas
            .toDataURL("image/png")
            .replace("image/png", "image/octet-stream");
        let downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = "QRCode.png";
        document.body.appendChild(downloadLink); 
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            SetLoggedin(true); 
        } else {
            SetLoggedin(false); 
        }
    }, []);
    
    const handleURL = async (e) => {
        e.preventDefault();

        try {
            const payload = {
                originalUrl: URL, 
                customUrl: customUrl || '', 
                password: '', 
                expirationDate: null 
            };

            if (showPasswordField) {
                payload.password = password; 
            }
            if(expirationField){
                payload.expirationDate=expiration;
            }

            const response = await shortenURL(payload.originalUrl, payload.customUrl, payload.password, payload.expirationDate);

            if (response.shortUrl) {
                setShortURL(response.shortUrl);
                toast.success('Shortened URL created successfully!'); 
            } else {
                console.error('Error shortening URL:', response.message);
                toast.error(response.message); 
            }
        } catch (error) {
            console.error('Error shortening URL:', error);
            toast.error('Failed to shorten URL'); 
        }
    };


    const fetchAnalytics = () => {
        if (shortURL) {
            navigate(`/analytics/${shortURL}`); 
        }
    };

    const customurlbtn = () => {
        setcustomurlclick(!customurlclick);
    };

    const handleCopyClick = async (e) => {
        e.preventDefault();
    
        try {
            if (showPasswordField) {
                let pass = prompt("Link is Password Protected Please Enter the Password ");
                setvalPassword(pass);
                const validationResponse = await validatepasswordProtectedURL(shortURL, valpassword);
                
                if (validationResponse.success) {
                    navigator.clipboard.writeText(`${apiURL}/${shortURL}`);
                    setIsCopied(true);
                    toast.success('Shortened URL copied to clipboard!');
                } else {
                    toast.error(validationResponse.message || 'Failed to access the URL.'); 
                }
            } else {
                navigator.clipboard.writeText(`${apiURL}/${shortURL}`);
                setIsCopied(true);
                toast.success('Shortened URL copied to clipboard!');
            }
    
            setTimeout(() => {
                setIsCopied(false);
            }, 2000);
    
        } catch (error) {
            console.error('Error copying URL:', error);
            toast.error('Failed to copy URL'); 
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token'); 
        SetLoggedin(false); 
    };
    

  

  return (
    <div style={{ overflow: 'hidden' }}>
    <div className="navbar">
        <div className="movLeft">
            <a href="/" className="aStyle">
                <h2>URL Shortener</h2>
            </a>
        </div>
        {!loggedin && ( 
                <div className="movRight">
                    <a href="/login" className="aStyle">Login</a>
                    <a href="/signup" className="aStyle">Sign Up</a>
                </div>
            )}

            {loggedin && ( 
                <div className="movRight">
                    <button onClick={handleLogout} className="aStyle">Logout</button>
                </div>
            )}
    </div>
    <div className="add-bg-col">
        <div className="add-bg-row">
            <div className="Box1">
                <form onSubmit={handleURL} className="form">
                    <div className="URLTextBox">
                        <FontAwesomeIcon icon={faLink} style={{ marginRight: '7px' }} />
                        <p>Enter your long URL here</p>
                    </div>

                    <input
                        type="text"
                        onChange={(e) => setURL(e.target.value)}
                        style={{ marginLeft: 0, marginBottom: '20px' }}
                        value={URL}
                        placeholder="https://example.com/"
                        required
                    />
                    <div className="CenterDiv">
                        <div className={`customurltextbox ${customurlclick ? 'active' : ''}`}>
                            <input
                                type="button"
                                value="Custom URL"
                                className="customurl"
                                onClick={customurlbtn}
                            />
                            {customurlclick && (
                                <input
                                    type="text"
                                    placeholder="Enter Custom URL"
                                    className="customurlinput"
                                    value={customUrl}
                                    onChange={(e) => setcustomurl(e.target.value)}
                                />
                            )}
                        </div>
                        <br />
                        <p>
                            Do You Want to Protect Your URL?
                            <input
                                type="checkbox"
                                onChange={() => setShowPasswordField(!showPasswordField)} 
                            />
                        </p>
                        {showPasswordField && (
                            <input
                                type="password"
                                placeholder="Enter Password"
                                className="ProtectPass"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} 
                            />
                        )}
                        <br />
                        <p>
                            Do You Want Set Expiration in Your URL?
                            <input
                                type="checkbox"
                                onChange={() => setExpirationField(!expirationField)} 
                            />
                        </p>
                        {expirationField && (
                             <input 
                             type="datetime-local" 
                             value={expiration} 
                             onChange={(e) => setExpiration(e.target.value)} 
                         />
                        )}

                        <input type="submit" value="Get URL" className="button50" />
                    </div>
                </form>
                {shortURL && (
                    <div className="shortURLDiv">
                        <span className="shortURLDiv1">Shortened URL</span>
                        <span onClick={handleCopyClick} className="shortURLDiv2">{shortURL}</span>

                    </div>
                )}
                {
                    shortURL && (
                        <div className='qr'>

                            <QRCode value={`http://localhost:5000/api/url${shortURL}`} size={200}  ref={qrCodeRef} />
                            <br />
                            <button onClick={downloadQRCode} className="downloadButton" >
                                <FontAwesomeIcon icon={faDownload} />
                            </button>
                        </div>

                    )
                }

            </div>
            <img src={urlelement} alt="" className="urlelements" />
        </div>
    </div>

    {/* React-Toastify notification container */}
    <ToastContainer />
    <AnalyticsForm/>
</div>
  )
}

export default Home;