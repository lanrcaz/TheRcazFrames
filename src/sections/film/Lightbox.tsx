import { useEffect, useCallback } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

interface LightboxProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  images: { src: string; title: string; description: string }[]
  currentIndex: number
  onNavigate: (index: number) => void
}

export default function Lightbox({
  open,
  onOpenChange,
  images,
  currentIndex,
  onNavigate,
}: LightboxProps) {
  const handlePrev = useCallback(() => {
    onNavigate(currentIndex > 0 ? currentIndex - 1 : images.length - 1)
  }, [currentIndex, images.length, onNavigate])

  const handleNext = useCallback(() => {
    onNavigate(currentIndex < images.length - 1 ? currentIndex + 1 : 0)
  }, [currentIndex, images.length, onNavigate])

  useEffect(() => {
    if (!open) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrev()
      if (e.key === 'ArrowRight') handleNext()
      if (e.key === 'Escape') onOpenChange(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open, handlePrev, handleNext, onOpenChange])

  const current = images[currentIndex]
  if (!current) return null

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay
          className="fixed inset-0 z-[90] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
          style={{ backgroundColor: 'rgba(10,10,10,0.95)' }}
        />
        <Dialog.Content
          className="fixed inset-0 z-[90] flex items-center justify-center outline-none"
          onPointerDownOutside={() => onOpenChange(false)}
        >
          {/* Close button */}
          <button
            onClick={() => onOpenChange(false)}
            className="absolute top-6 right-6 z-10 w-10 h-10 flex items-center justify-center rounded-full border transition-all duration-300 hover:border-[#C9A96E] hover:scale-105"
            style={{ borderColor: 'var(--color-border)' }}
            aria-label="Close lightbox"
          >
            <X size={18} style={{ color: 'var(--color-text-secondary)' }} />
          </button>

          {/* Previous button */}
          {images.length > 1 && (
            <button
              onClick={handlePrev}
              className="absolute left-4 md:left-8 z-10 w-10 h-10 flex items-center justify-center rounded-full border transition-all duration-300 hover:border-[#C9A96E] hover:scale-105"
              style={{ borderColor: 'var(--color-border)' }}
              aria-label="Previous image"
            >
              <ChevronLeft size={18} style={{ color: 'var(--color-text-secondary)' }} />
            </button>
          )}

          {/* Next button */}
          {images.length > 1 && (
            <button
              onClick={handleNext}
              className="absolute right-4 md:right-8 z-10 w-10 h-10 flex items-center justify-center rounded-full border transition-all duration-300 hover:border-[#C9A96E] hover:scale-105"
              style={{ borderColor: 'var(--color-border)' }}
              aria-label="Next image"
            >
              <ChevronRight size={18} style={{ color: 'var(--color-text-secondary)' }} />
            </button>
          )}

          {/* Image + caption */}
          <div className="flex flex-col items-center max-w-[90vw] max-h-[90vh]">
            <img
              src={current.src}
              alt={current.title}
              className="max-w-full max-h-[75vh] object-contain rounded"
              style={{ borderRadius: 'var(--border-radius-md)' }}
            />
            <div className="mt-4 text-center">
              <p
                className="font-mono tracking-[0.12em] uppercase"
                style={{
                  fontSize: 'clamp(0.65rem, 0.8vw, 0.75rem)',
                  color: 'var(--color-text-primary)',
                }}
              >
                {current.title}
              </p>
              <p
                className="font-body mt-1"
                style={{
                  fontSize: 'clamp(0.875rem, 1vw, 1rem)',
                  color: 'var(--color-text-tertiary)',
                }}
              >
                {current.description}
              </p>
            </div>
            {/* Counter */}
            <p
              className="font-mono tracking-[0.12em] uppercase mt-2"
              style={{
                fontSize: 'clamp(0.6rem, 0.7vw, 0.7rem)',
                color: 'var(--color-text-muted)',
              }}
            >
              {currentIndex + 1} / {images.length}
            </p>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
