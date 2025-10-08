import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Download, ExternalLink } from 'lucide-react';

const GalleryLightbox = ({ files, initialIndex = 0, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isLoading, setIsLoading] = useState(true);

  const currentFile = files[currentIndex];
  const isVideo = currentFile?.type === 'video';

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrevious();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, files.length]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handlePrevious = () => {
    setIsLoading(true);
    setCurrentIndex((prev) => (prev === 0 ? files.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setIsLoading(true);
    setCurrentIndex((prev) => (prev === files.length - 1 ? 0 : prev + 1));
  };

  const handleThumbnailClick = (index) => {
    setIsLoading(true);
    setCurrentIndex(index);
  };

  if (!currentFile) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-95 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-black bg-opacity-50 backdrop-blur-sm">
        <div className="flex items-center space-x-4">
          <h3 className="text-white text-lg font-semibold truncate max-w-xs md:max-w-md">
            {currentFile.name}
          </h3>
          <span className="text-gray-400 text-sm">
            {currentIndex + 1} / {files.length}
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          {/* Download Button */}
          <a
            href={currentFile.url}
            download
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 hover:bg-white hover:bg-opacity-10 rounded-lg transition-colors"
            title="Download"
          >
            <Download className="h-5 w-5 text-white" />
          </a>
          
          {/* Open in Drive Button */}
          <a
            href={`https://drive.google.com/file/d/${currentFile.id}/view`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 hover:bg-white hover:bg-opacity-10 rounded-lg transition-colors"
            title="Open in Google Drive"
          >
            <ExternalLink className="h-5 w-5 text-white" />
          </a>
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="p-2 hover:bg-white hover:bg-opacity-10 rounded-lg transition-colors"
            title="Close (Esc)"
          >
            <X className="h-6 w-6 text-white" />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex items-center justify-center p-4 relative">
        {/* Previous Button */}
        <button
          onClick={handlePrevious}
          className="absolute left-4 z-10 p-3 bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full transition-all transform hover:scale-110"
          title="Previous (←)"
        >
          <ChevronLeft className="h-8 w-8 text-white" />
        </button>

        {/* Media Display */}
        <div className="max-w-7xl max-h-full w-full h-full flex items-center justify-center">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
            </div>
          )}

          {isVideo ? (
            <iframe
              src={currentFile.previewUrl}
              className="w-full h-full max-h-[70vh] rounded-lg"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              onLoad={() => setIsLoading(false)}
              title={currentFile.name}
            />
          ) : (
            <img
              src={currentFile.url}
              alt={currentFile.name}
              className="max-w-full max-h-[70vh] object-contain rounded-lg"
              onLoad={() => setIsLoading(false)}
              onError={() => setIsLoading(false)}
            />
          )}
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          className="absolute right-4 z-10 p-3 bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full transition-all transform hover:scale-110"
          title="Next (→)"
        >
          <ChevronRight className="h-8 w-8 text-white" />
        </button>
      </div>

      {/* Thumbnail Strip */}
      <div className="bg-black bg-opacity-50 backdrop-blur-sm p-4 overflow-x-auto">
        <div className="flex space-x-2 justify-center min-w-max mx-auto">
          {files.map((file, index) => (
            <button
              key={file.id}
              onClick={() => handleThumbnailClick(index)}
              className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden transition-all ${
                index === currentIndex
                  ? 'ring-4 ring-blue-500 scale-110'
                  : 'opacity-60 hover:opacity-100 hover:scale-105'
              }`}
            >
              <img
                src={file.thumbnail}
                alt={file.name}
                className="w-full h-full object-cover"
              />
              {file.type === 'video' && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                  <svg className="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                  </svg>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GalleryLightbox;
