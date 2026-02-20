"use client" 

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Menu, X } from "lucide-react"

interface Navbar1Props {
  logoSrc?: string;
}

const Navbar1 = ({ logoSrc = "/do-logo.png" }: Navbar1Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMenu = () => setIsOpen(!isOpen)

  const navLinks = [
    { label: "Home", href: "#" },
    { label: "Capabilities", href: "#capabilities" },
    { label: "Projects", href: "#projects" },
    { label: "Partners", href: "#partners" },
    { label: "Contact", href: "#contact" },
  ]

  const scrollToSection = (href: string) => {
    if (href === "#") {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
    setIsOpen(false)
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-[300] flex justify-center w-full py-4 px-4">
      <motion.div 
        className={`flex items-center justify-between px-6 py-3 rounded-full shadow-lg w-full max-w-4xl relative transition-all duration-300 ${
          isScrolled 
            ? 'bg-[#0B0C0E]/95 backdrop-blur-md border border-amber-500/20' 
            : 'bg-[#0B0C0E]/80 backdrop-blur-sm border border-white/10'
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex items-center">
          <motion.div
            className="w-10 h-10 mr-4 cursor-pointer"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            onClick={() => scrollToSection("#")}
          >
            <img 
              src={logoSrc} 
              alt="D&O Advanced Engineering" 
              className="w-full h-full object-contain"
            />
          </motion.div>
          <span className="hidden sm:block font-sora font-semibold text-white text-sm">
            D&O Advanced Engineering
          </span>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((item, index) => (
            <motion.button
              key={item.label}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => scrollToSection(item.href)}
              className="text-sm text-gray-300 hover:text-amber-400 transition-colors font-medium"
            >
              {item.label}
            </motion.button>
          ))}
        </nav>

        {/* Desktop CTA Button */}
        <motion.button
          className="hidden md:block"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => scrollToSection("#contact")}
        >
          <span className="inline-flex items-center justify-center px-5 py-2 text-sm text-black bg-amber-500 rounded-full hover:bg-amber-400 transition-colors font-semibold">
            Get Started
          </span>
        </motion.button>

        {/* Mobile Menu Button */}
        <motion.button 
          className="md:hidden flex items-center text-white" 
          onClick={toggleMenu} 
          whileTap={{ scale: 0.9 }}
        >
          <Menu className="h-6 w-6" />
        </motion.button>
      </motion.div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-[#0B0C0E]/98 backdrop-blur-lg z-[400] pt-24 px-6 md:hidden"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <motion.button
              className="absolute top-6 right-6 p-2 text-white"
              onClick={toggleMenu}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <X className="h-6 w-6" />
            </motion.button>
            <div className="flex flex-col space-y-6">
              {navLinks.map((item, i) => (
                <motion.button
                  key={item.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 + 0.1 }}
                  exit={{ opacity: 0, x: 20 }}
                  onClick={() => scrollToSection(item.href)}
                  className="text-2xl font-sora font-semibold text-white hover:text-amber-400 transition-colors text-left"
                >
                  {item.label}
                </motion.button>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                exit={{ opacity: 0, y: 20 }}
                className="pt-6"
              >
                <button
                  onClick={() => scrollToSection("#contact")}
                  className="inline-flex items-center justify-center w-full px-5 py-3 text-base text-black bg-amber-500 rounded-full hover:bg-amber-400 transition-colors font-semibold"
                >
                  Get Started
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export { Navbar1 }
