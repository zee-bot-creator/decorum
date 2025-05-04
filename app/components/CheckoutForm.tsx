import React, { useState } from 'react'
import { useCart } from '../context/CartContext'
import { motion } from 'framer-motion'
import { HiOutlineX } from 'react-icons/hi'

type CheckoutFormProps = {
  isOpen: boolean
  onClose: () => void
}

type FormData = {
  firstName: string
  lastName: string
  email: string
  address: string
  city: string
  state: string
  zipCode: string
  cardNumber: string
  expiryDate: string
  cvv: string
}

export default function CheckoutForm({ isOpen, onClose }: CheckoutFormProps) {
  const { state, clearCart } = useCart()
  const [step, setStep] = useState<'shipping' | 'payment' | 'confirmation'>('shipping')
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmitShipping = (e: React.FormEvent) => {
    e.preventDefault()
    setStep('payment')
  }

  const handleSubmitPayment = async (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically process the payment with a payment provider
    // For this example, we'll simulate a successful payment
    setTimeout(() => {
      setStep('confirmation')
      clearCart()
    }, 1500)
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

      {/* Checkout Panel */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: isOpen ? 0 : '100%' }}
        transition={{ type: 'tween', duration: 0.3 }}
        className="fixed top-0 right-0 h-full w-full max-w-2xl bg-white shadow-xl z-50 overflow-y-auto"
      >
        <div className="flex flex-col min-h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-neutral-soft-200">
            <h2 className="text-lg font-medium">
              {step === 'shipping' && 'Shipping Details'}
              {step === 'payment' && 'Payment Information'}
              {step === 'confirmation' && 'Order Confirmation'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 text-neutral-soft-600 hover:text-neutral-soft-900"
            >
              <HiOutlineX className="h-6 w-6" />
            </button>
          </div>

          <div className="flex-1 p-6">
            {step === 'shipping' && (
              <form onSubmit={handleSubmitShipping} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-soft-700 mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-neutral-soft-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-soft-900"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-soft-700 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-neutral-soft-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-soft-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-soft-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-neutral-soft-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-soft-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-soft-700 mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-neutral-soft-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-soft-900"
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-soft-700 mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-neutral-soft-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-soft-900"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-soft-700 mb-1">
                      State
                    </label>
                    <input
                      type="text"
                      name="state"
                      required
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-neutral-soft-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-soft-900"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-soft-700 mb-1">
                      ZIP Code
                    </label>
                    <input
                      type="text"
                      name="zipCode"
                      required
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-neutral-soft-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-soft-900"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-neutral-soft-900 text-white py-3 rounded-full font-medium hover:bg-neutral-soft-800 transition-colors"
                >
                  Continue to Payment
                </button>
              </form>
            )}

            {step === 'payment' && (
              <form onSubmit={handleSubmitPayment} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-soft-700 mb-1">
                    Card Number
                  </label>
                  <input
                    type="text"
                    name="cardNumber"
                    required
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    placeholder="1234 5678 9012 3456"
                    className="w-full px-4 py-2 border border-neutral-soft-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-soft-900"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-soft-700 mb-1">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      name="expiryDate"
                      required
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      placeholder="MM/YY"
                      className="w-full px-4 py-2 border border-neutral-soft-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-soft-900"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-soft-700 mb-1">
                      CVV
                    </label>
                    <input
                      type="text"
                      name="cvv"
                      required
                      value={formData.cvv}
                      onChange={handleInputChange}
                      placeholder="123"
                      className="w-full px-4 py-2 border border-neutral-soft-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-soft-900"
                    />
                  </div>
                </div>

                <div className="border-t border-neutral-soft-200 pt-4">
                  <div className="flex justify-between text-lg font-medium mb-4">
                    <span>Total</span>
                    <span>${state.total.toFixed(2)}</span>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-neutral-soft-900 text-white py-3 rounded-full font-medium hover:bg-neutral-soft-800 transition-colors"
                  >
                    Place Order
                  </button>
                </div>
              </form>
            )}

            {step === 'confirmation' && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg
                    className="w-8 h-8 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-medium mb-2">Order Confirmed!</h3>
                <p className="text-neutral-soft-600 mb-8">
                  Thank you for your purchase. We'll send you a confirmation email shortly.
                </p>
                <button
                  onClick={onClose}
                  className="bg-neutral-soft-900 text-white px-8 py-3 rounded-full font-medium hover:bg-neutral-soft-800 transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </>
  )
} 