import React from 'react'
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className='bg-green-800 text-green-50 mt-10'>
      <div className='container mx-auto px-4 py-10'>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-8'>
          <div>
            <h4 className='text-lg font-semibold mb-3'>About Us</h4>
            <ul className='space-y-2 text-green-100/90'>
              <li><Link to='/about' className='hover:underline'>Our Story</Link></li>
              <li><a href='#' className='hover:underline'>Our Farmers</a></li>
              <li><a href='#' className='hover:underline'>Sustainability</a></li>
              <li><a href='#' className='hover:underline'>Press</a></li>
            </ul>
          </div>

          <div>
            <h4 className='text-lg font-semibold mb-3'>Customer Service</h4>
            <ul className='space-y-2 text-green-100/90'>
              <li><a href='#' className='hover:underline'>Contact Us</a></li>
              <li><a href='#' className='hover:underline'>FAQ</a></li>
              <li><a href='#' className='hover:underline'>Returns & Refunds</a></li>
              <li><a href='#' className='hover:underline'>Delivery Information</a></li>
            </ul>
          </div>

          <div>
            <h4 className='text-lg font-semibold mb-3'>Information</h4>
            <ul className='space-y-2 text-green-100/90'>
              <li><a href='#' className='hover:underline'>Terms & Conditions</a></li>
              <li><a href='#' className='hover:underline'>Privacy Policy</a></li>
              <li><a href='#' className='hover:underline'>Cookies</a></li>
              <li><a href='#' className='hover:underline'>Accessibility</a></li>
            </ul>
          </div>

          <div>
            <h4 className='text-lg font-semibold mb-3'>Contact Us</h4>
            <ul className='space-y-2 text-green-100/90'>
              <li>📞 +91 85916 52079</li>
              <li>✉️ contact@ecokart.com</li>
              <li>📍 Mumbai, India</li>
            </ul>
            <div className='flex items-center gap-3 mt-4'>
              <a href='#' className='w-9 h-9 rounded-full bg-green-700 hover:bg-green-600 flex items-center justify-center text-white'><FaFacebookF/></a>
              <a href='#' className='w-9 h-9 rounded-full bg-green-700 hover:bg-green-600 flex items-center justify-center text-white'><FaInstagram/></a>
              <a href='#' className='w-9 h-9 rounded-full bg-green-700 hover:bg-green-600 flex items-center justify-center text-white'><FaTwitter/></a>
              <a href='#' className='w-9 h-9 rounded-full bg-green-700 hover:bg-green-600 flex items-center justify-center text-white'><FaLinkedinIn/></a>
            </div>
          </div>
        </div>
      </div>
      <div className='border-t border-green-700'>
        <div className='container mx-auto px-4 py-4 text-center text-green-100/80 text-sm'>
          © EcoKart 2025. All Rights Reserved
        </div>
      </div>
    </footer>
  )
}

export default Footer
