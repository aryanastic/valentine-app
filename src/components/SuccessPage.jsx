import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { motion } from 'framer-motion';

const SuccessPage = () => {
    const happyGifs = [
        "https://media.tenor.com/4DiFwww6548AAAAi/kitty.gif", // Kitty happy
        "https://media.tenor.com/kQA86PqyXZQAAAAi/small-dancing-white-cat-dance-funny.gif" // Dancing cat
    ];

    useEffect(() => {
        const duration = 15 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
        const randomInRange = (min, max) => Math.random() * (max - min) + min;

        const interval = setInterval(function () {
            const timeLeft = animationEnd - Date.now();
            if (timeLeft <= 0) return clearInterval(interval);
            const particleCount = 50 * (timeLeft / duration);
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
        }, 250);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="container">
            <div className="bg-hearts">
                {[...Array(30)].map((_, i) => (
                    <div
                        key={i}
                        className="heart"
                        style={{
                            left: `${Math.random() * 100}vw`,
                            animationDelay: `${Math.random() * 5}s`,
                            color: '#ff4d6d'
                        }}
                    >💖</div>
                ))}
            </div>

            <motion.div
                className="glass-card"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                style={{ maxWidth: '600px' }}
            >
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
                    {happyGifs.map((gif, index) => (
                        <div key={index} className="gif-container" style={{ margin: '5px' }}>
                            <img src={gif} alt="Happy celebration" style={{ width: '200px', borderRadius: '10px' }} />
                        </div>
                    ))}
                </div>

                <h1 style={{ fontSize: '3.5rem', marginBottom: '0' }}>YAY!!! 🎉❤️</h1>
                <p style={{ fontSize: '1.5rem', marginTop: '1rem' }}>
                    Best. Day. Ever. <br />
                    (I promise not to be as annoying as that button!)
                </p>
            </motion.div>
        </div>
    );
};

export default SuccessPage;
