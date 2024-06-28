import React from 'react'

const Footer = () => {
    const date = new Date().getFullYear()

    return (
        <footer className="footer">
            <div className="copyright text-center">
                <p className="mb-0">©Copyright {date} ProSpeech Admin.</p>
            </div>
        </footer>
    )
}

export default Footer