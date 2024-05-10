import React from 'react'

export const Footer = () => {
  const handleJumpToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }
  return (
    <footer className="shadow-lg bottom-0">
      <div className="container mx-auto px-4">
        <hr className="my-8" />
        <div className="text-center">
          <button
            onClick={handleJumpToTop}
            className="font-semibold py-2 px-4 rounded-full shadow  focus:outline-none focus:ring-2 focus:ring-opacity-50"
          >
            Jump to Top
          </button>
          <p className="mt-4">&copy; NC News. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
