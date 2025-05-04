import React from 'react'
import Link from 'next/link'
import { FaInstagram, FaPinterest, FaTwitter } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="bg-white border-t border-neutral-soft-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Decorum</h3>
            <p className="text-neutral-soft-600 text-sm">
              Modern interior design for your home.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-neutral-soft-600 hover:text-neutral-soft-900">
                <FaInstagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-neutral-soft-600 hover:text-neutral-soft-900">
                <FaPinterest className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-neutral-soft-600 hover:text-neutral-soft-900">
                <FaTwitter className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-4">Shop</h3>
            <ul className="space-y-3">
              {['Living Room', 'Bedroom', 'Kitchen', 'Office'].map((item) => (
                <li key={item}>
                  <Link 
                    href={`/category/${item.toLowerCase().replace(' ', '-')}`}
                    className="text-neutral-soft-600 hover:text-neutral-soft-900 text-sm"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-4">Company</h3>
            <ul className="space-y-3">
              {['About', 'Contact', 'Shipping', 'Returns'].map((item) => (
                <li key={item}>
                  <Link 
                    href={`/${item.toLowerCase()}`}
                    className="text-neutral-soft-600 hover:text-neutral-soft-900 text-sm"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-4">Newsletter</h3>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 text-sm border border-neutral-soft-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-soft-900"
              />
              <button
                type="submit"
                className="w-full bg-neutral-soft-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-neutral-soft-800 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-neutral-soft-200 mt-12 pt-8">
          <p className="text-neutral-soft-600 text-sm text-center">
            © {new Date().getFullYear()} Decorum. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
} 