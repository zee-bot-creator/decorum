'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { HiOutlineX, HiOutlinePlus, HiOutlineMinus, HiOutlineTrash } from 'react-icons/hi'
import { useCart } from '../context/CartContext'
import CheckoutForm from './CheckoutForm'

type CartSlideProps = {
  isOpen: boolean
  onClose: () => void
}

export default function CartSlide({ isOpen, onClose }: CartSlideProps) {
  const { state, removeItem, updateQuantity } = useCart()
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)

  const handleCheckout = () => {
    setIsCheckoutOpen(true)
  }

  const handleCloseCheckout = () => {
    setIsCheckoutOpen(false)
    onClose()
  }

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-neutral-soft-900/30 backdrop-blur-sm z-50"
          onClick={onClose}
        />
      )}

      {/* Cart Panel */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: isOpen ? 0 : '100%' }}
        transition={{ type: 'tween', duration: 0.3 }}
        className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-xl z-50"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-neutral-soft-200">
            <h2 className="text-lg font-medium">Shopping Cart</h2>
            <button
              onClick={onClose}
              className="p-2 text-neutral-soft-600 hover:text-neutral-soft-900"
            >
              <HiOutlineX className="h-6 w-6" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {state.items.length === 0 ? (
              <p className="text-center text-neutral-soft-500 py-8">
                Your cart is empty
              </p>
            ) : (
              state.items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 bg-neutral-soft-50 rounded-xl p-4"
                >
                  <div className="relative w-20 h-20">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-neutral-soft-500">{item.category}</p>
                    <div className="flex items-center justify-between mt-2">
                      <p className="font-medium">${item.price}</p>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                          className="p-1 text-neutral-soft-600 hover:text-neutral-soft-900"
                        >
                          <HiOutlineMinus className="h-4 w-4" />
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 text-neutral-soft-600 hover:text-neutral-soft-900"
                        >
                          <HiOutlinePlus className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-1 text-red-500 hover:text-red-600 ml-2"
                        >
                          <HiOutlineTrash className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-neutral-soft-200 p-4 space-y-4">
            <div className="flex items-center justify-between font-medium">
              <span>Total</span>
              <span>${state.total.toFixed(2)}</span>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full bg-neutral-soft-900 text-white py-3 rounded-full font-medium hover:bg-neutral-soft-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={state.items.length === 0}
            >
              Checkout
            </button>
          </div>
        </div>
      </motion.div>

      {/* Checkout Form */}
      <CheckoutForm isOpen={isCheckoutOpen} onClose={handleCloseCheckout} />
    </>
  )
} 