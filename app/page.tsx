'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import Navigation from './components/Navigation'
import { useCart } from './context/CartContext'
import { HiOutlineShoppingBag } from 'react-icons/hi'

const featuredProducts = [
  {
    id: 1,
    name: 'Modern Lounge Chair',
    price: 599,
    image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&q=80',
    category: 'Living Room',
    description: 'Elegant and comfortable modern lounge chair with premium upholstery.'
  },
  {
    id: 2,
    name: 'Minimalist Desk Lamp',
    price: 129,
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80',
    category: 'Office',
    description: 'Adjustable LED desk lamp with sleek, minimalist design.'
  },
  {
    id: 3,
    name: 'Scandinavian Dining Table',
    price: 899,
    image: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?w=800&q=80',
    category: 'Kitchen',
    description: 'Solid oak dining table with clean lines and timeless design.'
  },
  {
    id: 4,
    name: 'Organic Cotton Bedding',
    price: 249,
    image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80',
    category: 'Bedroom',
    description: 'Luxurious organic cotton bedding set in neutral tones.'
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
}

export default function Home() {
  const { addItem } = useCart()

  return (
    <>
      <Navigation />
      
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1600&q=80"
            alt="Modern interior design"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-neutral-soft-900/30" />
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="relative z-10 text-center text-white max-w-4xl px-4"
        >
          <h1 className="text-5xl md:text-6xl font-medium mb-6">
            Transform Your Space
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Curated interior design pieces for the modern home
          </p>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-neutral-soft-900 px-8 py-3 rounded-full text-lg font-medium hover:bg-neutral-soft-100 transition-colors"
          >
            Shop Now
          </motion.button>
        </motion.div>
      </motion.section>

      {/* Featured Products */}
      <section className="py-20 px-4 bg-neutral-soft-50">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-medium text-neutral-soft-900 mb-12 text-center"
          >
            Featured Collection
          </motion.h2>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {featuredProducts.map((product) => (
              <motion.div
                key={product.id}
                variants={itemVariants}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="relative h-64">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <p className="text-sm text-neutral-soft-500 mb-2">
                    {product.category}
                  </p>
                  <h3 className="text-lg font-medium text-neutral-soft-900 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-neutral-soft-600 text-sm mb-4">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="text-neutral-soft-900 font-medium">
                      ${product.price}
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => addItem(product)}
                      className="flex items-center gap-2 bg-neutral-soft-900 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-neutral-soft-800 transition-colors"
                    >
                      <HiOutlineShoppingBag className="h-4 w-4" />
                      Add to Cart
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  )
} 