/**
 * Lightbox overlay for enlarged images
 */

import { X, ChevronLeft, ChevronRight } from "lucide-react";

function Lightbox({ isOpen, src, alt, onClose, imageGroup, currentIndex, onNext, onPrevious }) {
  if (!isOpen || !src) return null;

  const hasMultipleImages = imageGroup && Array.isArray(imageGroup) && imageGroup.length > 1;
  const currentImageNum = currentIndex !== undefined ? currentIndex + 1 : 1;
  const totalImages = imageGroup?.length || 1;

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
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute -top-3 -right-3 z-10 p-3 rounded-full bg-black/70 hover:bg-black/90 border border-white/10 hover:border-white/20 text-white transition-all focus:outline-none focus:ring-2 focus:ring-red-500"
          aria-label="Close"
        >
          <X size={22} />
        </button>

        {/* Previous button */}
        {hasMultipleImages && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onPrevious();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-black/70 hover:bg-black/90 border border-white/10 hover:border-white/20 text-white transition-all focus:outline-none focus:ring-2 focus:ring-red-500"
            aria-label="Previous image"
          >
            <ChevronLeft size={24} />
          </button>
        )}

        {/* Next button */}
        {hasMultipleImages && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-black/70 hover:bg-black/90 border border-white/10 hover:border-white/20 text-white transition-all focus:outline-none focus:ring-2 focus:ring-red-500"
            aria-label="Next image"
          >
            <ChevronRight size={24} />
          </button>
        )}

        {/* Image counter */}
        {hasMultipleImages && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 px-4 py-2 rounded-full bg-black/70 border border-white/10 text-white text-sm font-semibold">
            {currentImageNum} / {totalImages}
          </div>
        )}

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

