import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home = () => {
    return (
        <div className="container">
            <motion.div
                className="glass-card"
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
            >
                <h1>Welcome to Valentine's App 💖</h1>
                <p>Make someone's day special!</p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '30px' }}>
                    <Link to="/guest" style={{ textDecoration: 'none' }}>
                        <button className="btn" style={{ width: '100%', background: '#ff8fa3' }}>
                            Create a Link (Guest)
                        </button>
                    </Link>

                    <Link to="/admin" style={{ textDecoration: 'none' }}>
                        <button className="btn" style={{ width: '100%' }}>
                            Admin Login
                        </button>
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};

export default Home;
