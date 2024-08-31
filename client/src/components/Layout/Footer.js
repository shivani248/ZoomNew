import React from 'react'
import { Link } from 'react-router-dom'
const Footer = () => {
  return (
    <div className="footer fixed-bottom bg-dark text-light text-center py-2">
    <h6 className="mb-1">All Rights Reserved &copy; Shivani</h6>
    <p className="mb-0 mt-1">
        <Link to="/about" className="text-light">About</Link> |
        <Link to="/contact" className="text-light">Contact</Link> |
        <Link to="/policy" className="text-light">Privacy Policy</Link>
    </p>
</div>

  )
}

export default Footer