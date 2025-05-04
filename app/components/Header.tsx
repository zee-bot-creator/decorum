import Link from 'next/link';
import { FiShoppingCart, FiMenu, FiX } from 'react-icons/fi';
import { useState } from 'react';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Collection', href: '/collection' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 bg-secondary/80 backdrop-blur-md z-50">
      <nav className="container h-[var(--header-height)] flex items-center justify-between">
        <Link href="/" className="text-2xl font-display font-medium">
          Decorum
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-primary hover:text-accent transition-colors"
            >
              {item.name}
            </Link>
          ))}
          <Link href="/cart" className="p-2 hover:bg-secondary-dark rounded-full transition-colors">
            <FiShoppingCart className="w-6 h-6" />
          </Link>
        </div>

        {/* Mobile Navigation */}
        <button
          className="p-2 md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <FiX className="w-6 h-6" />
          ) : (
            <FiMenu className="w-6 h-6" />
          )}
        </button>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-[var(--header-height)] left-0 right-0 bg-secondary md:hidden">
            <div className="container py-4 space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block text-primary hover:text-accent transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/cart"
                className="flex items-center gap-2 text-primary hover:text-accent transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <FiShoppingCart className="w-5 h-5" />
                Cart
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
} 