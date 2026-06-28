import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="w-full mt-section-gap border-t border-outline-variant/30 bg-surface-container-low dark:bg-tertiary-container">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter px-4 md:px-margin-desktop py-section-gap max-w-container-max mx-auto">
        <div className="flex flex-col">
          <h2 className="font-display-lg text-headline-lg text-primary dark:text-primary-fixed mb-4 uppercase tracking-tighter">Karma Threads</h2>
          <p className="font-body-md text-on-surface-variant mb-6 leading-relaxed">
            Preserving the soul of traditional menswear through uncompromising quality and timeless silhouettes.
          </p>
          <div className="flex gap-4">
            <a className="w-10 h-10 gold-border flex items-center justify-center hover:bg-primary hover:text-white transition-all group rounded-sm" href="#">
              <span className="material-symbols-outlined text-lg group-hover:text-white">public</span>
            </a>
            <a className="w-10 h-10 gold-border flex items-center justify-center hover:bg-primary hover:text-white transition-all group rounded-sm" href="#">
              <span className="material-symbols-outlined text-lg group-hover:text-white">share</span>
            </a>
            <a className="w-10 h-10 gold-border flex items-center justify-center hover:bg-primary hover:text-white transition-all group rounded-sm" href="#">
              <span className="material-symbols-outlined text-lg group-hover:text-white">camera</span>
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <h5 className="font-label-sm uppercase tracking-widest text-primary mb-4 mt-8 md:mt-0">Discover</h5>
          <Link className="font-body-md text-on-surface-variant hover:text-primary transition-colors" to="/aboutus">Our Story</Link>
          <Link className="font-body-md text-on-surface-variant hover:text-primary transition-colors" to="/aboutus">Artisanal Process</Link>
          <Link className="font-body-md text-on-surface-variant hover:text-primary transition-colors" to="/home">Store Locator</Link>
        </div>

        <div className="flex flex-col gap-3">
          <h5 className="font-label-sm uppercase tracking-widest text-primary mb-4 mt-8 md:mt-0">Client Services</h5>
          <Link className="font-body-md text-on-surface-variant hover:text-primary transition-colors" to="/shippingpolicy">Shipping Policy</Link>
          <Link className="font-body-md text-on-surface-variant hover:text-primary transition-colors" to="/exchangepolicy">Exchange Policy</Link>
          <Link className="font-body-md text-on-surface-variant hover:text-primary transition-colors" to="/cancelationpolicy">Cancelation Policy</Link>
          <Link className="font-body-md text-on-surface-variant hover:text-primary transition-colors" to="/privacypolicy">Privacy Policy</Link>
          <Link className="font-body-md text-on-surface-variant hover:text-primary transition-colors" to="/termsandcondition">Terms and Condition</Link>
          <Link className="font-body-md text-on-surface-variant hover:text-primary transition-colors" to="/">Contact Us</Link>
        </div>

        <div className="flex flex-col">
          <h5 className="font-label-sm uppercase tracking-widest text-primary mb-4 mt-8 md:mt-0">Join the Inner Circle</h5>
          <p className="font-body-md text-on-surface-variant mb-6">Receive early access to new collections and private exhibitions.</p>
          <div className="relative">
            <input 
              type="email" 
              placeholder="Email Address" 
              className="w-full bg-transparent border-0 border-b border-secondary/30 py-3 focus:outline-none focus:border-primary focus:ring-0 font-body-md text-on-surface placeholder:text-on-surface-variant/50" 
            />
            <button className="absolute right-0 bottom-3 text-secondary hover:text-primary cursor-pointer transition-colors">
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-container-max mx-auto px-4 md:px-margin-desktop py-8 border-t border-outline-variant/10 text-center">
        <p className="font-label-sm text-on-surface-variant/60 uppercase tracking-widest">
          © 2024 Karma Threads. All rights reserved. Heritage Craftsmanship for the Modern Man.
        </p>
      </div>
    </footer>
  )
}

export default Footer
