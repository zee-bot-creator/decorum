'use client'

import React from 'react'
import Link from 'next/link'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { HiOutlineShoppingBag, HiOutlineMenu, HiOutlineX } from 'react-icons/hi'
import { useCart } from '../context/CartContext'
import CartSlide from './CartSlide'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const { state } = useCart()

  const menuItems = [
    { name: 'Living Room', href: '/category/living-room' },
    { name: 'Bedroom', href: '/category/bedroom' },
    { name: 'Kitchen', href: '/category/kitchen' },
    { name: 'Office', href: '/category/office' },
  ]

  return (
    <>
      <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="text-xl font-medium text-neutral-soft-900">
              Decorum
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-neutral-soft-600 hover:text-neutral-soft-900 transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Cart Icon */}
            <div className="flex items-center space-x-4">
              <button
                className="p-2 text-neutral-soft-600 hover:text-neutral-soft-900 relative"
                onClick={() => setIsCartOpen(true)}
              >
                <HiOutlineShoppingBag className="h-6 w-6" />
                {state.items.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-neutral-soft-900 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {state.items.length}
                  </span>
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-2 text-neutral-soft-600 hover:text-neutral-soft-900"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? (
                  <HiOutlineX className="h-6 w-6" />
                ) : (
                  <HiOutlineMenu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : -20 }}
          transition={{ duration: 0.2 }}
          className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white shadow-lg">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-3 py-2 text-neutral-soft-600 hover:text-neutral-soft-900 hover:bg-neutral-soft-50 rounded-lg"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </motion.div>
      </nav>

      {/* Cart Slide Panel */}
      <CartSlide isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  )
} 