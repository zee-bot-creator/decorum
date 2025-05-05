'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { HiOutlineX } from 'react-icons/hi'
import { useCart } from '../context/CartContext'

type CheckoutFormProps = {
  isOpen: boolean
  onClose: () => void
}

type FormData = {
  shipping: {
    firstName: string
    lastName: string
    email: string
    address: string
    city: string
    state: string
    zipCode: string
  }
  payment: {
    cardNumber: string
    cardName: string
    expiryDate: string
    cvv: string
  }
}

export default function CheckoutForm({ isOpen, onClose }: CheckoutFormProps) {
  const { state, clearCart } = useCart()
  const [currentStep, setCurrentStep] = useState<'shipping' | 'payment'>('shipping')
  const [formData, setFormData] = useState<FormData>({
    shipping: {
      firstName: '',
      lastName: '',
      email: '',
      address: '',
      city: '',
      state: '',
      zipCode: ''
    },
    payment: {
      cardNumber: '',
      cardName: '',
      expiryDate: '',
      cvv: ''
    }
  })

  const handleInputChange = (section: 'shipping' | 'payment', field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (currentStep === 'shipping') {
      setCurrentStep('payment')
      return
    }

    // Here you would typically send the order to your backend
    console.log('Order submitted:', { formData, items: state.items, total: state.total })
    
    // Clear cart and close form
    clearCart()
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

      {/* Form Panel */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: isOpen ? 0 : '100%' }}
        transition={{ type: 'tween', duration: 0.3 }}
        className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-xl z-50"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-neutral-soft-200">
            <h2 className="text-lg font-medium">
              {currentStep === 'shipping' ? 'Shipping Information' : 'Payment Details'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 text-neutral-soft-600 hover:text-neutral-soft-900"
            >
              <HiOutlineX className="h-6 w-6" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4">
            {currentStep === 'shipping' ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-soft-700">
                      First Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.shipping.firstName}
                      onChange={(e) => handleInputChange('shipping', 'firstName', e.target.value)}
                      className="mt-1 block w-full rounded-lg border border-neutral-soft-200 px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-soft-700">
                      Last Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.shipping.lastName}
                      onChange={(e) => handleInputChange('shipping', 'lastName', e.target.value)}
                      className="mt-1 block w-full rounded-lg border border-neutral-soft-200 px-3 py-2"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-soft-700">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.shipping.email}
                    onChange={(e) => handleInputChange('shipping', 'email', e.target.value)}
                    className="mt-1 block w-full rounded-lg border border-neutral-soft-200 px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-soft-700">
                    Address
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.shipping.address}
                    onChange={(e) => handleInputChange('shipping', 'address', e.target.value)}
                    className="mt-1 block w-full rounded-lg border border-neutral-soft-200 px-3 py-2"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-soft-700">
                      City
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.shipping.city}
                      onChange={(e) => handleInputChange('shipping', 'city', e.target.value)}
                      className="mt-1 block w-full rounded-lg border border-neutral-soft-200 px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-soft-700">
                      State
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.shipping.state}
                      onChange={(e) => handleInputChange('shipping', 'state', e.target.value)}
                      className="mt-1 block w-full rounded-lg border border-neutral-soft-200 px-3 py-2"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-soft-700">
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.shipping.zipCode}
                    onChange={(e) => handleInputChange('shipping', 'zipCode', e.target.value)}
                    className="mt-1 block w-full rounded-lg border border-neutral-soft-200 px-3 py-2"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-soft-700">
                    Card Number
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.payment.cardNumber}
                    onChange={(e) => handleInputChange('payment', 'cardNumber', e.target.value)}
                    className="mt-1 block w-full rounded-lg border border-neutral-soft-200 px-3 py-2"
                    placeholder="1234 5678 9012 3456"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-soft-700">
                    Name on Card
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.payment.cardName}
                    onChange={(e) => handleInputChange('payment', 'cardName', e.target.value)}
                    className="mt-1 block w-full rounded-lg border border-neutral-soft-200 px-3 py-2"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-soft-700">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.payment.expiryDate}
                      onChange={(e) => handleInputChange('payment', 'expiryDate', e.target.value)}
                      className="mt-1 block w-full rounded-lg border border-neutral-soft-200 px-3 py-2"
                      placeholder="MM/YY"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-soft-700">
                      CVV
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.payment.cvv}
                      onChange={(e) => handleInputChange('payment', 'cvv', e.target.value)}
                      className="mt-1 block w-full rounded-lg border border-neutral-soft-200 px-3 py-2"
                      placeholder="123"
                    />
                  </div>
                </div>
              </div>
            )}
          </form>

          {/* Footer */}
          <div className="border-t border-neutral-soft-200 p-4 space-y-4">
            <div className="flex items-center justify-between font-medium">
              <span>Total</span>
              <span>${state.total.toFixed(2)}</span>
            </div>
            <button
              onClick={handleSubmit}
              className="w-full bg-neutral-soft-900 text-white py-3 rounded-full font-medium hover:bg-neutral-soft-800 transition-colors"
            >
              {currentStep === 'shipping' ? 'Continue to Payment' : 'Place Order'}
            </button>
            {currentStep === 'payment' && (
              <button
                onClick={() => setCurrentStep('shipping')}
                className="w-full text-neutral-soft-600 py-2 font-medium hover:text-neutral-soft-900"
              >
                Back to Shipping
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </>
  )
}