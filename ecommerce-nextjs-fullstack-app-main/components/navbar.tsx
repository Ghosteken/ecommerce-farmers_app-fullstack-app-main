"use client";

import Link from "next/link";
import {
  ShoppingCartIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useCartStore } from "@/store/cart-store";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

export const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const { items } = useCartStore();
  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const closeMobileMenu = () => setMobileOpen(false);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <Link href="/" className="text-lg font-semibold hover:text-blue-600">
        Farmers' Market
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6 text-gray-700 font-medium">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <Link href="/products" className="hover:text-blue-600">Products</Link>
          <Link href="/checkout" className="hover:text-blue-600">Checkout</Link>
          <Link href="/crop-analysis" className="hover:text-blue-600">Crop Analysis</Link>
        </div>
        
        {/* Cart & Mobile Menu Button */}
        <div className="flex items-center space-x-4">
          <Link href="/checkout" className="relative">
            <ShoppingCartIcon className="h-6 w-6 hover:text-blue-600 transition-colors" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                {cartCount}
              </span>
            )}
          </Link>
          
          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            className="md:hidden"
            onClick={() => setMobileOpen((prev) => !prev)}
          >
            {mobileOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileOpen && (
        <div className="md:hidden bg-white shadow-md">
          <ul className="flex flex-col p-4 space-y-2 text-gray-700 font-medium">
            <li>
              <Link href="/" className="block hover:text-blue-600" onClick={closeMobileMenu}>Home</Link>
            </li>
            <li>
              <Link href="/products" className="block hover:text-blue-600" onClick={closeMobileMenu}>Products</Link>
            </li>
            <li>
              <Link href="/checkout" className="block hover:text-blue-600" onClick={closeMobileMenu}>Checkout</Link>
            </li>
            <li>
              <Link href="/crop-analysis" className="block hover:text-blue-600" onClick={closeMobileMenu}>Crop Analysis</Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};
