import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Guest = () => {
    const [partnerName, setPartnerName] = useState('');
    const [generatedLink, setGeneratedLink] = useState('');

    const handleCreateLink = () => {
        if (!partnerName.trim()) return;
        const cleanName = partnerName.trim();
        const baseUrl = window.location.origin;
        const link = `${baseUrl}/ask/${encodeURIComponent(cleanName)}`;
        setGeneratedLink(link);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(generatedLink);
        alert('Link copied!');
    };

    return (
        <div className="container">
            <motion.div
                className="glass-card"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
            >
                <h1>Create a Valentine Link 💌</h1>
                <p>Enter your partner's name below.</p>

                <input
                    type="text"
                    placeholder="Partner's Name"
                    value={partnerName}
                    onChange={(e) => setPartnerName(e.target.value)}
                />

                <button className="btn" onClick={handleCreateLink}>
                    Generate Link
                </button>

                {generatedLink && (
                    <motion.div
                        style={{ marginTop: '2rem', padding: '15px', background: 'rgba(255,255,255,0.6)', borderRadius: '15px' }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <p>Your unique link:</p>
                        <div style={{ background: '#fff', padding: '10px', borderRadius: '10px', wordBreak: 'break-all', marginBottom: '10px' }}>
                            {generatedLink}
                        </div>
                        <button className="btn" style={{ background: '#2ecc71', fontSize: '1rem', padding: '8px 20px' }} onClick={copyToClipboard}>
                            Copy Link
                        </button>
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
};

export default Guest;
