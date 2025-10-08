import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const GridMotion = ({ 
  items = [], 
  columns = 3, 
  gap = 20,
  animationDuration = 0.8,
  staggerDelay = 0.1,
  animationType = 'fadeUp', // 'fadeUp', 'scale', 'rotate', 'slideIn'
  className = '',
  containerClassName = '',
  itemClassName = ''
}) => {
  const containerRef = useRef();
  const itemsRef = useRef([]);

  useEffect(() => {
    const container = containerRef.current;
    const gridItems = itemsRef.current;

    if (!container || !gridItems.length) return;

    // Set up grid layout with CSS Grid
    gsap.set(container, {
      display: 'grid',
      gridTemplateColumns: `repeat(${columns}, 1fr)`,
      gap: `${gap}px`,
      width: '100%'
    });

    // Initial state for items
    const initialState = {
      fadeUp: { opacity: 0, y: 50 },
      scale: { opacity: 0, scale: 0.8 },
      rotate: { opacity: 0, rotation: -10, scale: 0.9 },
      slideIn: { opacity: 0, x: -50 }
    };

    const finalState = {
      fadeUp: { opacity: 1, y: 0 },
      scale: { opacity: 1, scale: 1 },
      rotate: { opacity: 1, rotation: 0, scale: 1 },
      slideIn: { opacity: 1, x: 0 }
    };

    // Set initial state
    gsap.set(gridItems, initialState[animationType]);

    // Create scroll-triggered animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    });

    // Animate items with stagger
    tl.to(gridItems, {
      ...finalState[animationType],
      duration: animationDuration,
      stagger: {
        amount: staggerDelay * gridItems.length,
        from: 'start',
        ease: 'power2.out'
      },
      ease: 'power3.out'
    });

    // Add hover effects
    gridItems.forEach((item) => {
      if (!item) return;

      const hoverTl = gsap.timeline({ paused: true });
      
      hoverTl.to(item, {
        scale: 1.05,
        y: -5,
        duration: 0.3,
        ease: 'power2.out'
      });

      item.addEventListener('mouseenter', () => hoverTl.play());
      item.addEventListener('mouseleave', () => hoverTl.reverse());
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      
      gridItems.forEach((item) => {
        if (item) {
          item.removeEventListener('mouseenter', () => {});
          item.removeEventListener('mouseleave', () => {});
        }
      });
    };
  }, [items, columns, gap, animationDuration, staggerDelay, animationType]);

  const renderItem = (item, index) => {
    // Handle different item types
    if (React.isValidElement(item)) {
      // JSX element
      return React.cloneElement(item, {
        key: index,
        ref: (el) => (itemsRef.current[index] = el),
        className: `grid-motion-item ${itemClassName} ${item.props.className || ''}`
      });
    } else if (typeof item === 'string') {
      // Check if it's a URL (image)
      if (item.startsWith('http') && /\.(jpg|jpeg|png|gif|webp|svg)(\?|$)/i.test(item)) {
        return (
          <div
            key={index}
            ref={(el) => (itemsRef.current[index] = el)}
            className={`grid-motion-item overflow-hidden rounded-lg ${itemClassName}`}
          >
            <img
              src={item}
              alt={`Grid item ${index + 1}`}
              className="w-full h-full object-cover transition-transform duration-300"
              loading="lazy"
            />
          </div>
        );
      } else {
        // Regular text
        return (
          <div
            key={index}
            ref={(el) => (itemsRef.current[index] = el)}
            className={`grid-motion-item p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ${itemClassName}`}
          >
            <p className="text-gray-800 font-medium">{item}</p>
          </div>
        );
      }
    } else {
      // Fallback for other types
      return (
        <div
          key={index}
          ref={(el) => (itemsRef.current[index] = el)}
          className={`grid-motion-item p-6 bg-white rounded-lg shadow-md ${itemClassName}`}
        >
          {String(item)}
        </div>
      );
    }
  };

  return (
    <div className={`grid-motion-container ${containerClassName} ${className}`}>
      <div ref={containerRef} className="w-full">
        {items.map((item, index) => renderItem(item, index))}
      </div>
    </div>
  );
};

// Preset configurations for common use cases
export const GridMotionPresets = {
  // Photo gallery
  gallery: {
    columns: 3,
    gap: 15,
    animationType: 'scale',
    animationDuration: 0.6,
    staggerDelay: 0.05
  },
  
  // Feature cards
  features: {
    columns: 2,
    gap: 30,
    animationType: 'fadeUp',
    animationDuration: 0.8,
    staggerDelay: 0.1
  },
  
  // Testimonials
  testimonials: {
    columns: 1,
    gap: 20,
    animationType: 'slideIn',
    animationDuration: 0.7,
    staggerDelay: 0.15
  },
  
  // Services grid
  services: {
    columns: 3,
    gap: 25,
    animationType: 'rotate',
    animationDuration: 0.9,
    staggerDelay: 0.08
  }
};

export default GridMotion;