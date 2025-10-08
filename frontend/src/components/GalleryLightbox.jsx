import React, { useState, useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const GalleryLightbox = ({ files, initialIndex = 0, onClose, loadedThumbnails, thumbnailCache }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isLoading, setIsLoading] = useState(true);
  const [imageCache, setImageCache] = useState(thumbnailCache || new window.Map());
  const [loadedImages, setLoadedImages] = useState(loadedThumbnails || new window.Set());
  const [currentImageUrl, setCurrentImageUrl] = useState('');
  const imageRefs = useRef({});

  const currentFile = files[currentIndex];
  const isVideo = currentFile?.type === 'video';

  // Smart URL fallback for images
  const getImageUrl = (file) => {
    return file.url || file.fallbackUrl || `https://drive.google.com/uc?export=view&id=${file.id}`;
  };

  // Set current image URL when file changes
  useEffect(() => {
    if (currentFile && !isVideo) {
      setCurrentImageUrl(getImageUrl(currentFile));
    }
  }, [currentFile, isVideo]);

  // Aggressive preloading for better performance
  useEffect(() => {
    const preloadImage = (url, index) => {
      return new Promise((resolve) => {
        if (loadedImages.has(url)) {
          resolve();
          return;
        }

        const img = new window.Image();
        img.onload = () => {
          setLoadedImages(prev => new window.Set([...prev, url]));
          setImageCache(prev => new window.Map(prev.set(url, img)));
          resolve();
        };
        img.onerror = () => {
          console.warn(`Failed to preload image: ${url}`);
          resolve();
        };
        img.src = url;
      });
    };

    // Preload ALL images aggressively for smooth experience
    files.forEach((file, index) => {
      if (file && file.type === 'image') {
        preloadImage(getImageUrl(file), index);
        // Also preload thumbnail
        if (file.thumbnail) {
          preloadImage(file.thumbnail, index);
        }
      }
    });
  }, [files, loadedImages]);

  // Set loading state based on current image
  useEffect(() => {
    if (currentFile && currentFile.type === 'image') {
      setIsLoading(!loadedImages.has(currentFile.url));
    } else {
      setIsLoading(false);
    }
  }, [currentIndex, currentFile, loadedImages]);

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
    const newIndex = currentIndex === 0 ? files.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    
    // Only show loading if image isn't already loaded
    const newFile = files[newIndex];
    if (newFile && newFile.type === 'image') {
      const imageUrl = getImageUrl(newFile);
      setIsLoading(!loadedImages.has(imageUrl));
    } else {
      setIsLoading(false);
    }
  };

  const handleNext = () => {
    const newIndex = currentIndex === files.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    
    // Only show loading if image isn't already loaded
    const newFile = files[newIndex];
    if (newFile && newFile.type === 'image') {
      const imageUrl = getImageUrl(newFile);
      setIsLoading(!loadedImages.has(imageUrl));
    } else {
      setIsLoading(false);
    }
  };

  const handleThumbnailClick = (index) => {
    setCurrentIndex(index);
    
    // Only show loading if image isn't already loaded
    const newFile = files[index];
    if (newFile && newFile.type === 'image') {
      const imageUrl = getImageUrl(newFile);
      setIsLoading(!loadedImages.has(imageUrl));
    } else {
      setIsLoading(false);
    }
  };

  if (!currentFile) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-black bg-opacity-95 flex flex-col select-none"
      onContextMenu={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
      onKeyDown={(e) => {
        // Disable common keyboard shortcuts that could be used to save images
        if ((e.ctrlKey || e.metaKey) && (e.key === 's' || e.key === 'S')) {
          e.preventDefault();
        }
        if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i'))) {
          e.preventDefault();
        }
        if ((e.ctrlKey || e.metaKey) && (e.key === 'u' || e.key === 'U')) {
          e.preventDefault();
        }
      }}
      style={{
        userSelect: 'none',
        WebkitUserSelect: 'none',
        MozUserSelect: 'none',
        msUserSelect: 'none',
        WebkitTouchCallout: 'none',
        WebkitUserDrag: 'none',
        KhtmlUserSelect: 'none'
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-black bg-opacity-50 backdrop-blur-sm">
        <div className="flex items-center space-x-4">
          <span className="text-white text-lg font-semibold">
            {currentIndex + 1} / {files.length}
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
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
          {/* Loading State */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white mx-auto mb-4"></div>
                <p className="text-white text-sm">Loading image...</p>
              </div>
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
              title={`Video ${currentIndex + 1}`}
            />
          ) : (
            <div className="relative">
              <img
                key={`${currentFile.id}-${currentImageUrl}`} // Force re-render on URL change
                src={currentImageUrl}
                alt={`Image ${currentIndex + 1}`}
                className={`max-w-full max-h-[70vh] object-contain rounded-lg select-none transition-opacity duration-300 ${
                  isLoading ? 'opacity-0' : 'opacity-100'
                }`}
                onLoad={() => setIsLoading(false)}
                onError={() => {
                  // Try fallback URL if main URL fails
                  if (currentImageUrl === currentFile.url && currentFile.fallbackUrl) {
                    setCurrentImageUrl(currentFile.fallbackUrl);
                  } else {
                    setIsLoading(false);
                    console.warn('All image URLs failed for:', currentFile.id);
                  }
                }}
                onContextMenu={(e) => e.preventDefault()}
                onDragStart={(e) => e.preventDefault()}
                style={{ 
                  userSelect: 'none',
                  WebkitUserSelect: 'none',
                  MozUserSelect: 'none',
                  msUserSelect: 'none',
                  pointerEvents: 'none'
                }}
              />
              {/* Invisible overlay to prevent right-click on image */}
              <div 
                className="absolute inset-0 z-10"
                onContextMenu={(e) => e.preventDefault()}
                onDragStart={(e) => e.preventDefault()}
                style={{ pointerEvents: 'all' }}
              ></div>
            </div>
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
            <ThumbnailStripItem
              key={file.id}
              file={file}
              index={index}
              isActive={index === currentIndex}
              onClick={() => handleThumbnailClick(index)}
              isLoaded={loadedImages.has(file.id)}
              cache={imageCache}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Thumbnail strip component with shared cache - no loading flash
const ThumbnailStripItem = ({ file, index, isActive, onClick, isLoaded, cache }) => {
  const [imageLoaded, setImageLoaded] = useState(isLoaded || false);

  // Use shared cache to avoid reloading
  useEffect(() => {
    if (isLoaded) {
      setImageLoaded(true);
    } else {
      // Only load if not already cached
      const img = new window.Image();
      img.onload = () => setImageLoaded(true);
      img.onerror = () => console.warn('Failed to load thumbnail for lightbox nav:', file.id);
      img.src = file.thumbnail;
    }
  }, [file.thumbnail, isLoaded]);

  return (
    <button
      onClick={onClick}
      className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden transition-all ${
        isActive
          ? 'ring-4 ring-blue-500 scale-110'
          : 'opacity-60 hover:opacity-100 hover:scale-105'
      }`}
    >
      {/* Always show image, control opacity to prevent flash */}
      <img
        src={file.thumbnail}
        alt={`Thumbnail ${index + 1}`}
        className={`w-full h-full object-cover transition-opacity duration-200 ${
          imageLoaded ? 'opacity-100' : 'opacity-20'
        }`}
        onLoad={() => setImageLoaded(true)}
        style={{
          userSelect: 'none',
          WebkitUserSelect: 'none',
          MozUserSelect: 'none',
          msUserSelect: 'none',
          pointerEvents: 'none'
        }}
        onContextMenu={(e) => e.preventDefault()}
        onDragStart={(e) => e.preventDefault()}
      />
      
      {/* Video indicator */}
      {file.type === 'video' && imageLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
          <svg className="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
          </svg>
        </div>
      )}
    </button>
  );
};

export default GalleryLightbox;
