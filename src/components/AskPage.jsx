import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '../supabaseClient';

const AskPage = () => {
    const { name } = useParams();
    const navigate = useNavigate();
    const [noBtnPosition, setNoBtnPosition] = useState({ position: 'static' });
    const [viewportSize, setViewportSize] = useState({ width: window.innerWidth, height: window.innerHeight });
    const [hoverCount, setHoverCount] = useState(0);

    // User Provided GIFs
    const askingGifs = [
        "https://c.tenor.com/KshIPrRS1aAAAAAd/tenor.gif", // Cute stare
        "https://c.tenor.com/gRcOi64o3oAAAAAC/tenor.gif"  // Another cute one
    ];

    const sadGifs = [
        "https://media.tenor.com/c6nXyQmertAAAAAi/the-voices.gif", // The voices
        "https://media1.tenor.com/m/ZlA0c2L-Ax8AAAAd/sad-cry.gif"  // Sad cry
    ];

    const [currentAskingIndex, setCurrentAskingIndex] = useState(0);
    const [currentMood, setCurrentMood] = useState('asking'); // 'asking' | 'sad'

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentAskingIndex(prev => (prev + 1) % askingGifs.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const getGif = () => {
        if (currentMood === 'sad') {
            return sadGifs[(hoverCount - 1) % sadGifs.length];
        }
        return askingGifs[currentAskingIndex];
    };

    useEffect(() => {
        const handleResize = () => {
            setViewportSize({ width: window.innerWidth, height: window.innerHeight });
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const moveButton = () => {
        setHoverCount(prev => prev + 1);
        setCurrentMood('sad');
        const newX = Math.random() * (viewportSize.width - 150);
        const newY = Math.random() * (viewportSize.height - 150);

        setNoBtnPosition({
            position: 'fixed',
            left: `${Math.max(20, newX)}px`,
            top: `${Math.max(20, newY)}px`
        });
    };

    const handleAccept = async () => {
        // Save to Supabase
        try {
            await supabase
                .from('responses')
                .insert([
                    {
                        partner_name: decodeURIComponent(name),
                        status: 'Accepted',
                        device_info: navigator.userAgent
                    },
                ])
        } catch (error) {
            console.error('Error saving:', error)
        }

        // Local storage backup just in case
        const stored = JSON.parse(localStorage.getItem('valentine_responses') || '[]');
        const updated = stored.map(s => s.name === decodeURIComponent(name) ? { ...s, status: 'Accepted! 💖' } : s);
        localStorage.setItem('valentine_responses', JSON.stringify(updated));

        navigate('/success');
    };

    const handleYesHover = () => {
        setCurrentMood('asking');
    };

    return (
        <div className="container" style={{
            position: 'fixed',
            top: 0,
            left: 0,
            height: '100vh',
            width: '100vw',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            zIndex: 100
        }}>

            {/* Background "Please" Text */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 0,
                opacity: 0.1,
                pointerEvents: 'none',
                display: 'flex',
                flexWrap: 'wrap',
                overflow: 'hidden',
                alignContent: 'flex-start',
                justifyContent: 'center'
            }}>
                {[...Array(50)].map((_, i) => (
                    <span key={i} style={{
                        fontSize: '2rem',
                        margin: '10px',
                        fontFamily: '"Outfit", sans-serif',
                        fontWeight: 'bold',
                        transform: `rotate(${Math.random() * 20 - 10}deg)`
                    }}>
                        please check yes
                    </span>
                ))}
                {[...Array(50)].map((_, i) => (
                    <span key={i + 50} style={{
                        fontSize: '2rem',
                        margin: '10px',
                        fontFamily: '"Outfit", sans-serif',
                        fontWeight: 'bold',
                        color: '#ff4d6d',
                        transform: `rotate(${Math.random() * 20 - 10}deg)`
                    }}>
                        please loop
                    </span>
                ))}
            </div>

            <div className="bg-hearts">
                {[...Array(15)].map((_, i) => (
                    <div
                        key={i}
                        className="heart"
                        style={{
                            left: `${Math.random() * 100}vw`,
                            animationDelay: `${Math.random() * 5}s`,
                            fontSize: `${Math.random() * 20 + 20}px`
                        }}
                    >❤️</div>
                ))}
            </div>

            <motion.div
                className="glass-card"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                style={{
                    zIndex: 10,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    maxWidth: '90%',
                    padding: '1.5rem' // Slightly less padding on mobile internally
                }}
            >
                <div className="gif-container" style={{ minHeight: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img
                        src={getGif()}
                        alt="Reaction"
                        style={{ maxWidth: '100%', maxHeight: '250px', borderRadius: '15px' }}
                    />
                </div>

                <h1 style={{ fontSize: '2.5rem', marginTop: '1rem', wordWrap: 'break-word', fontFamily: '"Pacifico", cursive' }}>
                    {decodeURIComponent(name)}, will you be my Valentine? 🌹
                </h1>

                {hoverCount > 0 && (
                    <p style={{ color: '#e74c3c', fontWeight: 'bold', fontSize: '1.2rem' }}>
                        {hoverCount < 3 ? "Please?" : hoverCount < 6 ? "Don't do checking NO!" : "I'm gonna cry... 😭"}
                    </p>
                )}

                <div className="btn-group">
                    <motion.button
                        className="btn yes-btn"
                        onClick={handleAccept}
                        onMouseEnter={handleYesHover}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Yes!
                    </motion.button>

                    <motion.button
                        className="btn no-btn"
                        style={noBtnPosition}
                        onHoverStart={moveButton}
                        onTouchStart={moveButton}
                        animate={noBtnPosition.position === 'fixed' ? { ...noBtnPosition } : {}}
                    >
                        No
                    </motion.button>
                </div>
            </motion.div>
        </div>
    );
};

export default AskPage;
