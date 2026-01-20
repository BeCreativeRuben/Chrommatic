/**
 * Lightbox overlay for enlarged images
 */

import { X } from "lucide-react";

function Lightbox({ isOpen, src, alt, onClose }) {
  if (!isOpen || !src) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center px-4 py-6">
      {/* Backdrop */}
      <button
        type="button"
        className="absolute inset-0 bg-black/85 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Close image"
      />

      <div className="relative w-full max-w-6xl max-h-[88vh]">
        <button
          type="button"
          onClick={onClose}
          className="absolute -top-3 -right-3 p-3 rounded-full bg-black/70 hover:bg-black/90 border border-white/10 hover:border-white/20 text-white transition-all focus:outline-none focus:ring-2 focus:ring-red-500"
          aria-label="Close"
        >
          <X size={22} />
        </button>

        <div className="rounded-2xl overflow-hidden border border-red-900/40 bg-black/60 shadow-2xl">
          <img
            src={src}
            alt={alt || "Image"}
            className="w-full h-[88vh] object-contain bg-black"
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
}

export default Lightbox;

