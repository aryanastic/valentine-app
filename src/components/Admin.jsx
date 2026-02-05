import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../supabaseClient';

const Admin = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [partnerName, setPartnerName] = useState('');
    const [generatedLink, setGeneratedLink] = useState('');
    const [error, setError] = useState('');

    // Real Data from Supabase
    const [responses, setResponses] = useState([]);

    useEffect(() => {
        if (isAuthenticated) {
            fetchResponses();
        }
    }, [isAuthenticated]);

    const fetchResponses = async () => {
        const { data, error } = await supabase
            .from('responses')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) console.error('Error fetching:', error);
        else setResponses(data || []);
    };

    const handleLogin = () => {
        if (password === '143' || password === 'admin') {
            setIsAuthenticated(true);
            setError('');
        } else {
            setError('Wrong password!');
        }
    };

    const handleCreateLink = () => {
        if (!partnerName.trim()) return;
        const cleanName = partnerName.trim();
        const baseUrl = window.location.origin;
        const link = `${baseUrl}/ask/${encodeURIComponent(cleanName)}`;
        setGeneratedLink(link);
    };

    if (!isAuthenticated) {
        return (
            <div className="container">
                <motion.div
                    className="glass-card"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                >
                    <h1>🔒 Admin Login</h1>
                    <input
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <button className="btn" onClick={handleLogin}>Login</button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="container">
            <motion.div
                className="glass-card"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                <h1>Cupid's Dashboard 💘</h1>

                <div style={{ textAlign: 'left', marginBottom: '30px' }}>
                    <h3>Create New Link</h3>
                    <input
                        type="text"
                        placeholder="Partner's Name"
                        value={partnerName}
                        onChange={(e) => setPartnerName(e.target.value)}
                    />
                    <button className="btn" onClick={handleCreateLink} style={{ width: '100%' }}>Generate</button>

                    {generatedLink && (
                        <div style={{ marginTop: '15px', padding: '10px', background: '#fff', borderRadius: '10px', wordBreak: 'break-all', border: '1px solid #ff4d6d' }}>
                            <small>Link created:</small><br />
                            <a href={generatedLink} target="_blank" rel="noreferrer" style={{ color: '#ff4d6d' }}>{generatedLink}</a>
                        </div>
                    )}
                </div>

                <div style={{ textAlign: 'left', borderTop: '2px dashed #ffccd5', paddingTop: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h3>Results (Global)</h3>
                        <button onClick={fetchResponses} style={{ background: 'none', color: '#ff4d6d', fontSize: '0.9rem', padding: 5 }}>🔄 Refresh</button>
                    </div>

                    {responses.length === 0 ? (
                        <p>No responses yet...</p>
                    ) : (
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            {responses.map((res, i) => (
                                <li key={i} style={{ padding: '10px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span>
                                        💌 <b>{res.partner_name}</b> <br />
                                        <small style={{ color: '#888', fontSize: '0.7rem' }}>{new Date(res.created_at).toLocaleString()}</small>
                                    </span>
                                    <span style={{ color: 'green', fontWeight: 'bold' }}>{res.status} ✅</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

export default Admin;
