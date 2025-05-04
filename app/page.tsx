import React from 'react'
import Image from 'next/image'
import Navigation from './components/Navigation'
import { useCart } from './context/CartContext'
import { HiOutlineShoppingBag } from 'react-icons/hi'

const featuredProducts = [
  {
    id: 1,
    name: 'Modern Lounge Chair',
    price: 599,
    image: '/images/lounge-chair.jpg',
    category: 'Living Room'
  },
  {
    id: 2,
    name: 'Minimalist Desk Lamp',
    price: 129,
    image: '/images/desk-lamp.jpg',
    category: 'Office'
  },
  {
    id: 3,
    name: 'Scandinavian Dining Table',
    price: 899,
    image: '/images/dining-table.jpg',
    category: 'Kitchen'
  },
  {
    id: 4,
    name: 'Organic Cotton Bedding',
    price: 249,
    image: '/images/bedding.jpg',
    category: 'Bedroom'
  }
]

export default function Home() {
  const { addItem } = useCart()

  return (
    <>
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-interior.jpg"
            alt="Modern interior design"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-neutral-soft-900/30" />
        </div>
        
        <div className="relative z-10 text-center text-white max-w-4xl px-4">
          <h1 className="text-5xl md:text-6xl font-medium mb-6">
            Transform Your Space
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Curated interior design pieces for the modern home
          </p>
          <button className="bg-white text-neutral-soft-900 px-8 py-3 rounded-full text-lg font-medium hover:bg-neutral-soft-100 transition-colors">
            Shop Now
          </button>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 px-4 bg-neutral-soft-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-medium text-neutral-soft-900 mb-12 text-center">
            Featured Collection
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
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
                  <div className="flex items-center justify-between">
                    <p className="text-neutral-soft-900">
                      ${product.price}
                    </p>
                    <button
                      onClick={() => addItem(product)}
                      className="flex items-center gap-2 bg-neutral-soft-900 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-neutral-soft-800 transition-colors"
                    >
                      <HiOutlineShoppingBag className="h-4 w-4" />
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
} 