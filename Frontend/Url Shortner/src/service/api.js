const apiURL = "http://localhost:5000/api";

export const shortenURL = async (originalUrl, customSlug = '', password = '', expirationDate = null) => {
    const response = await fetch(`${apiURL}/url/shorten`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ originalUrl, customUrl: customSlug, password, expirationDate }) 
    });
    return response.json();
};


export const getURLAnalytics = async (shortUrl) => {
    const response = await fetch(`${apiURL}/url/analytics/${shortUrl}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response.json();
};

export const redirectShortURL = async (shortUrl) => {
    window.location.href = `${apiURL}/${shortUrl}`;
};

export const validatepasswordProtectedURL = async (shortUrl, password) => {
    try {
        const response = await fetch(`${apiURL}/url/access/${shortUrl}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ password }), 
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data; 
    } catch (error) {
        console.error('Error validating password-protected URL:', error);
        return { success: false, message: 'Error validating URL' }; 
    }
};

