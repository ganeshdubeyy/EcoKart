import React from 'react'
import { Link } from 'react-router-dom'
import { FaLeaf, FaPhoneAlt, FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn, FaGooglePlay } from 'react-icons/fa'
import { FaApple } from 'react-icons/fa6'

const onlineImg = (url)=> url

const About = () => {
  return (
    <main className='bg-green-50/40'>
      {/** Hero Section **/}
      <section className='relative overflow-hidden'>
        <img
          src={onlineImg('https://res.cloudinary.com/dpglftwoo/image/upload/v1758738751/About_Section_Header_iswqou.png')}
          alt='Eco friendly background'
          className='w-full h-72 object-cover'
          referrerPolicy='no-referrer'
        />
        <div className='absolute inset-0 bg-green-900/40 flex flex-col items-center justify-center text-center px-4'>
          <h1 className='text-3xl md:text-5xl font-extrabold text-white drop-shadow'>About EcoKart</h1>
          <p className='mt-3 md:mt-4 text-green-50 text-lg md:text-2xl'>Sustainable Grocery Delivery, Right at Your Doorstep</p>
        </div>
      </section>

      {/** Our Story **/}
      <section className='container mx-auto p-4 md:p-8'>
        <h2 className='text-2xl md:text-3xl font-bold text-green-800 text-center mb-6'>Our Story</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 items-center'>
          <img
            src={onlineImg('https://res.cloudinary.com/dpglftwoo/image/upload/v1758738336/About_Us_Our_Story_fkue3w.png')}
            alt='Farmer and fresh produce'
            className='w-full h-72 md:h-96 object-cover rounded-lg shadow-sm border border-green-100'
            referrerPolicy='no-referrer'
          />
          <div className='text-gray-700 leading-7'>
            <p>EcoKart began with a simple vision — to bring fresh, high-quality groceries to Indian households while caring for our planet. We partner with local farmers and trusted suppliers to ensure every delivery is sustainable and delightful.</p>
            <p className='mt-3'>From our early days, we focused on minimizing waste, using eco-friendly packaging, and building a responsible logistics network. Today, EcoKart is a community of conscious shoppers who choose better for themselves and the environment.</p>
            <p className='mt-3'>We’re constantly innovating to make grocery shopping faster, greener, and more affordable — without compromising on freshness.</p>
          </div>
        </div>
      </section>

      {/** Mission & Vision **/}
      <section className='container mx-auto p-4 md:p-8'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div className='bg-white rounded-lg p-6 border border-green-100 shadow-sm hover:shadow-md transition-shadow'>
            <div className='flex items-center gap-3 mb-2'>
              <span className='text-2xl'>🎯</span>
              <h3 className='text-xl font-semibold text-green-800'>Our Mission</h3>
            </div>
            <p className='text-gray-700'>Deliver fresh, sustainable groceries while empowering farmers and reducing waste through efficient, eco-friendly operations.</p>
          </div>
          <div className='bg-white rounded-lg p-6 border border-green-100 shadow-sm hover:shadow-md transition-shadow'>
            <div className='flex items-center gap-3 mb-2'>
              <span className='text-2xl'>🌍</span>
              <h3 className='text-xl font-semibold text-green-800'>Our Vision</h3>
            </div>
            <p className='text-gray-700'>To be India’s most trusted eco-friendly grocery delivery platform, loved for quality, convenience, and responsibility.</p>
          </div>
        </div>
      </section>

      {/** What We Offer **/}
      <section className='container mx-auto p-4 md:p-8'>
        <h2 className='text-2xl md:text-3xl font-bold text-green-800 text-center mb-6'>What We Offer</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
          {[
            { icon:'🌱', title:'Fresh & Organic Produce', desc:'Handpicked fruits and vegetables sourced responsibly.' },
            { icon:'💰', title:'Affordable Prices in ₹', desc:'Transparent pricing and great value every day.' },
            { icon:'🚚', title:'Fast & Reliable Delivery', desc:'On-time delivery with live order tracking.' },
            { icon:'🌍', title:'Eco-Friendly Packaging', desc:'Reduced plastic, recyclable and compostable materials.' },
            { icon:'👨‍🌾', title:'Local Farmer Support', desc:'Fair partnerships that benefit producers and communities.' },
            { icon:'🛒', title:'Wide Range of Essentials', desc:'Everything from staples to snacks in one place.' },
          ].map((f,idx)=> (
            <div key={idx} className='bg-white rounded-lg p-5 border border-green-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all'>
              <div className='text-3xl'>{f.icon}</div>
              <h4 className='mt-2 text-lg font-semibold text-green-800'>{f.title}</h4>
              <p className='mt-1 text-gray-700'>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/** Impact in Numbers **/}
      <section className='container mx-auto p-4 md:p-8'>
        <div className='bg-white rounded-lg border border-green-100 p-6 shadow-sm'>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-6 text-center'>
            {[
              { label:'Happy Customers', value:'10,000+', icon:'😊' },
              { label:'Farmers Supported', value:'500+', icon:'👨‍🌾' },
              { label:'Categories', value:'10', icon:'🗂️' },
              { label:'On-time Delivery', value:'95%', icon:'⏱️' },
            ].map((s, idx)=> (
              <div key={idx} className='flex flex-col items-center'>
                <div className='text-3xl'>{s.icon}</div>
                <div className='text-2xl md:text-3xl font-extrabold text-green-700 mt-1'>{s.value}</div>
                <div className='text-gray-600 mt-1'>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/** Testimonials **/}
      <section className='container mx-auto p-4 md:p-8'>
        <h2 className='text-2xl md:text-3xl font-bold text-green-800 text-center mb-6'>What Our Customers Say</h2>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          {[
            { name:'Ritu – Mumbai', text:'Super fresh produce and quick delivery. Love the eco-friendly packaging!', stars:5 },
            { name:'Rahul – Pune', text:'Great prices and quality. EcoKart has made weekly groceries effortless.', stars:5 },
            { name:'Ananya – Delhi', text:'Reliable, sustainable, and convenient. Highly recommend!', stars:5 },
          ].map((t,idx)=> (
            <div key={idx} className='bg-white rounded-lg p-5 border border-green-100 shadow-sm'>
              <div className='text-yellow-500 mb-2'>{'⭐'.repeat(t.stars)}</div>
              <p className='text-gray-700'>{t.text}</p>
              <div className='mt-3 font-semibold text-green-800'>{t.name}</div>
            </div>
          ))}
        </div>
      </section>

      {/** Contact **/}
      <section className='container mx-auto p-4 md:p-8'>
        <div className='bg-white rounded-lg p-6 border border-green-100 shadow-sm'>
          <h2 className='text-2xl font-bold text-green-800 mb-4'>Customer Support</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 items-center'>
            <div className='space-y-2 text-gray-700'>
              <p>📞 +91 98765 43210</p>
              <p>✉️ support@ecokart.in</p>
              <div className='flex items-center gap-3 mt-3'>
                <a href='https://facebook.com' target='_blank' rel='noreferrer' className='w-9 h-9 rounded-full bg-green-600 hover:bg-green-700 text-white flex items-center justify-center'><FaFacebookF/></a>
                <a href='https://instagram.com' target='_blank' rel='noreferrer' className='w-9 h-9 rounded-full bg-green-600 hover:bg-green-700 text-white flex items-center justify-center'><FaInstagram/></a>
                <a href='https://twitter.com' target='_blank' rel='noreferrer' className='w-9 h-9 rounded-full bg-green-600 hover:bg-green-700 text-white flex items-center justify-center'><FaTwitter/></a>
                <a href='https://linkedin.com' target='_blank' rel='noreferrer' className='w-9 h-9 rounded-full bg-green-600 hover:bg-green-700 text-white flex items-center justify-center'><FaLinkedinIn/></a>
              </div>
            </div>
            <img
              src={onlineImg('https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1200&auto=format&fit=crop')}
              alt='Customer support'
              className='w-full h-56 md:h-64 object-cover rounded-lg border border-green-100'
              referrerPolicy='no-referrer'
            />
          </div>
        </div>
      </section>

      {/** App Download **/}
      <section className='container mx-auto p-4 md:p-8'>
        <div className='bg-white rounded-lg p-6 border border-green-100 shadow-sm'>
          <h2 className='text-2xl font-bold text-green-800'>Download Our Mobile App Now</h2>
          <p className='text-gray-700 mt-1'>Shop groceries on the go with EcoKart’s mobile app.</p>
          <div className='flex flex-col sm:flex-row items-start sm:items-center gap-3 mt-4'>
            <a href='#' className='flex items-center gap-3 bg-black text-white px-4 py-2 rounded hover:opacity-90'>
              <FaGooglePlay/>
              <span className='text-left'>
                <small className='block text-xs opacity-80'>GET IT ON</small>
                <span className='text-sm font-semibold'>Google Play</span>
              </span>
            </a>
            <a href='#' className='flex items-center gap-3 bg-black text-white px-4 py-2 rounded hover:opacity-90'>
              <FaApple/>
              <span className='text-left'>
                <small className='block text-xs opacity-80'>Download on the</small>
                <span className='text-sm font-semibold'>App Store</span>
              </span>
            </a>
          </div>
        </div>
      </section>

      {/** CTA **/}
      <section className='bg-green-700 text-white'>
        <div className='container mx-auto p-6 md:p-10 text-center'>
          <h3 className='text-xl md:text-2xl font-bold'>Join the EcoKart family today and experience sustainable shopping!</h3>
          <Link to='/' className='inline-block mt-4 bg-white text-green-700 font-semibold px-5 py-2 rounded hover:bg-green-50'>Shop Now</Link>
        </div>
      </section>
    </main>
  )
}

export default About



