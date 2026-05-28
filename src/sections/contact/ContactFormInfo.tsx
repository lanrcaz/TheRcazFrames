import { useRef, useState, useEffect } from 'react'
import { Loader2, Mail, Phone, MapPin, Linkedin, Youtube, Clock, Github, ExternalLink } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

const PROJECT_TYPES = [
  'Narrative Film',
  'Commercial / Branded',
  'Music Video',
  'Animation',
  'Motion Graphics',
  'Other',
]

const BUDGET_RANGES = [
  '2,000 USD',
  '3,000 USD',
  '5,000 USD',
  '7,000 USD',
  '10,000 USD',
  '15,000 USD',
  '18,000 USD',
  '30,000+ USD',
]

interface FormData {
  name: string
  email: string
  projectType: string
  budgetRange: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  message?: string
}

type SubmitState = 'idle' | 'loading' | 'success'

export default function ContactFormInfo() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [revealed, setRevealed] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    projectType: '',
    budgetRange: '',
    message: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitState, setSubmitState] = useState<SubmitState>('idle')

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const validate = (): boolean => {
    const newErrors: FormErrors = {}
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setSubmitState('loading')
    // Simulate form submission
    setTimeout(() => {
      setSubmitState('success')
    }, 2000)
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  return (
    <section
      ref={sectionRef}
      style={{
        backgroundColor: 'var(--color-bg-primary)',
        padding: 'var(--space-section-y) var(--space-page-x)',
      }}
    >
      <div className="max-w-[var(--max-content-width)] mx-auto grid grid-cols-1 lg:grid-cols-[55%_40%] gap-[5%]">
        {/* Left Column - Contact Form */}
        <div
          className="transition-all duration-1000"
          style={{
            opacity: revealed ? 1 : 0,
            transform: revealed ? 'translateY(0)' : 'translateY(40px)',
          }}
        >
          <div
            className="rounded-[var(--border-radius-md)] border p-6 md:p-10"
            style={{
              backgroundColor: 'rgba(255,255,255,0.03)',
              borderColor: 'rgba(255,255,255,0.06)',
              backdropFilter: 'blur(12px)',
            }}
          >
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              {/* Name Field */}
              <div
                className="transition-all duration-1000"
                style={{
                  opacity: revealed ? 1 : 0,
                  transform: revealed ? 'translateY(0)' : 'translateY(40px)',
                  transitionDelay: '200ms',
                }}
              >
                <label
                  className="font-mono tracking-[0.2em] uppercase block mb-2"
                  style={{
                    fontSize: 'clamp(0.6rem, 0.7vw, 0.7rem)',
                    color: 'var(--color-text-muted)',
                    lineHeight: 1.4,
                  }}
                >
                  YOUR NAME
                </label>
                <Input
                  type="text"
                  placeholder="Full name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="h-12 w-full rounded-[var(--border-radius-sm)] transition-all duration-300 focus:border-[#C9A96E] focus:ring-2 focus:ring-[rgba(201,169,110,0.1)]"
                  style={{
                    backgroundColor: 'var(--color-bg-secondary)',
                    borderColor: errors.name ? 'rgba(248,113,113,0.5)' : 'var(--color-border)',
                    color: 'var(--color-text-primary)',
                    fontSize: 'clamp(0.875rem, 1vw, 1rem)',
                  }}
                />
                {errors.name && (
                  <p
                    className="font-mono mt-1"
                    style={{
                      fontSize: 'clamp(0.65rem, 0.8vw, 0.75rem)',
                      color: '#F87171',
                      lineHeight: 1.4,
                      letterSpacing: '0.12em',
                    }}
                  >
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div
                className="transition-all duration-1000"
                style={{
                  opacity: revealed ? 1 : 0,
                  transform: revealed ? 'translateY(0)' : 'translateY(40px)',
                  transitionDelay: '280ms',
                }}
              >
                <label
                  className="font-mono tracking-[0.2em] uppercase block mb-2"
                  style={{
                    fontSize: 'clamp(0.6rem, 0.7vw, 0.7rem)',
                    color: 'var(--color-text-muted)',
                    lineHeight: 1.4,
                  }}
                >
                  EMAIL ADDRESS
                </label>
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="h-12 w-full rounded-[var(--border-radius-sm)] transition-all duration-300 focus:border-[#C9A96E] focus:ring-2 focus:ring-[rgba(201,169,110,0.1)]"
                  style={{
                    backgroundColor: 'var(--color-bg-secondary)',
                    borderColor: errors.email ? 'rgba(248,113,113,0.5)' : 'var(--color-border)',
                    color: 'var(--color-text-primary)',
                    fontSize: 'clamp(0.875rem, 1vw, 1rem)',
                  }}
                />
                {errors.email && (
                  <p
                    className="font-mono mt-1"
                    style={{
                      fontSize: 'clamp(0.65rem, 0.8vw, 0.75rem)',
                      color: '#F87171',
                      lineHeight: 1.4,
                      letterSpacing: '0.12em',
                    }}
                  >
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Project Type */}
              <div
                className="transition-all duration-1000"
                style={{
                  opacity: revealed ? 1 : 0,
                  transform: revealed ? 'translateY(0)' : 'translateY(40px)',
                  transitionDelay: '360ms',
                }}
              >
                <label
                  className="font-mono tracking-[0.2em] uppercase block mb-2"
                  style={{
                    fontSize: 'clamp(0.6rem, 0.7vw, 0.7rem)',
                    color: 'var(--color-text-muted)',
                    lineHeight: 1.4,
                  }}
                >
                  PROJECT TYPE
                </label>
                <Select
                  value={formData.projectType}
                  onValueChange={(value) => handleInputChange('projectType', value)}
                >
                  <SelectTrigger
                    className="h-12 w-full rounded-[var(--border-radius-sm)] transition-all duration-300 focus:border-[#C9A96E] focus:ring-2 focus:ring-[rgba(201,169,110,0.1)]"
                    style={{
                      backgroundColor: 'var(--color-bg-secondary)',
                      borderColor: 'var(--color-border)',
                      color: formData.projectType
                        ? 'var(--color-text-primary)'
                        : 'var(--color-text-tertiary)',
                      fontSize: 'clamp(0.875rem, 1vw, 1rem)',
                    }}
                  >
                    <SelectValue placeholder="Select project type" />
                  </SelectTrigger>
                  <SelectContent
                    style={{
                      backgroundColor: 'var(--color-bg-secondary)',
                      borderColor: 'var(--color-border)',
                    }}
                  >
                    {PROJECT_TYPES.map((type) => (
                      <SelectItem
                        key={type}
                        value={type}
                        className="text-[var(--color-text-secondary)] focus:bg-[var(--color-bg-tertiary)] focus:text-[var(--color-text-primary)]"
                      >
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Budget Range */}
              <div
                className="transition-all duration-1000"
                style={{
                  opacity: revealed ? 1 : 0,
                  transform: revealed ? 'translateY(0)' : 'translateY(40px)',
                  transitionDelay: '440ms',
                }}
              >
                <label
                  className="font-mono tracking-[0.2em] uppercase block mb-2"
                  style={{
                    fontSize: 'clamp(0.6rem, 0.7vw, 0.7rem)',
                    color: 'var(--color-text-muted)',
                    lineHeight: 1.4,
                  }}
                >
                  ESTIMATED BUDGET
                </label>
                <Select
                  value={formData.budgetRange}
                  onValueChange={(value) => handleInputChange('budgetRange', value)}
                >
                  <SelectTrigger
                    className="h-12 w-full rounded-[var(--border-radius-sm)] transition-all duration-300 focus:border-[#C9A96E] focus:ring-2 focus:ring-[rgba(201,169,110,0.1)]"
                    style={{
                      backgroundColor: 'var(--color-bg-secondary)',
                      borderColor: 'var(--color-border)',
                      color: formData.budgetRange
                        ? 'var(--color-text-primary)'
                        : 'var(--color-text-tertiary)',
                      fontSize: 'clamp(0.875rem, 1vw, 1rem)',
                    }}
                  >
                    <SelectValue placeholder="Select budget range" />
                  </SelectTrigger>
                  <SelectContent
                    style={{
                      backgroundColor: 'var(--color-bg-secondary)',
                      borderColor: 'var(--color-border)',
                    }}
                  >
                    {BUDGET_RANGES.map((range) => (
                      <SelectItem
                        key={range}
                        value={range}
                        className="text-[var(--color-text-secondary)] focus:bg-[var(--color-bg-tertiary)] focus:text-[var(--color-text-primary)]"
                      >
                        {range}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Message Field */}
              <div
                className="transition-all duration-1000"
                style={{
                  opacity: revealed ? 1 : 0,
                  transform: revealed ? 'translateY(0)' : 'translateY(40px)',
                  transitionDelay: '520ms',
                }}
              >
                <label
                  className="font-mono tracking-[0.2em] uppercase block mb-2"
                  style={{
                    fontSize: 'clamp(0.6rem, 0.7vw, 0.7rem)',
                    color: 'var(--color-text-muted)',
                    lineHeight: 1.4,
                  }}
                >
                  TELL ME ABOUT YOUR PROJECT
                </label>
                <Textarea
                  placeholder="Describe your vision, timeline, and any references or inspiration..."
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  className="min-h-[160px] w-full rounded-[var(--border-radius-sm)] resize-y transition-all duration-300 focus:border-[#C9A96E] focus:ring-2 focus:ring-[rgba(201,169,110,0.1)]"
                  style={{
                    backgroundColor: 'var(--color-bg-secondary)',
                    borderColor: errors.message ? 'rgba(248,113,113,0.5)' : 'var(--color-border)',
                    color: 'var(--color-text-primary)',
                    fontSize: 'clamp(0.875rem, 1vw, 1rem)',
                  }}
                />
                {errors.message && (
                  <p
                    className="font-mono mt-1"
                    style={{
                      fontSize: 'clamp(0.65rem, 0.8vw, 0.75rem)',
                      color: '#F87171',
                      lineHeight: 1.4,
                      letterSpacing: '0.12em',
                    }}
                  >
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div
                className="transition-all duration-1000"
                style={{
                  opacity: revealed ? 1 : 0,
                  transform: revealed ? 'translateY(0)' : 'translateY(40px)',
                  transitionDelay: '600ms',
                }}
              >
                <button
                  type="submit"
                  disabled={submitState === 'loading' || submitState === 'success'}
                  className="w-full h-[52px] rounded-[var(--border-radius-sm)] font-body font-medium uppercase tracking-[0.15em] text-[0.8rem] transition-all duration-200 active:scale-[0.99] disabled:cursor-not-allowed"
                  style={{
                    backgroundColor:
                      submitState === 'success' ? '#4ADE80' : 'var(--color-accent-gold)',
                    color: 'var(--color-bg-primary)',
                  }}
                  onMouseEnter={(e) => {
                    if (submitState === 'idle') {
                      e.currentTarget.style.backgroundColor = 'var(--color-accent-gold-hover)'
                      e.currentTarget.style.transform = 'scale(1.01)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (submitState === 'idle') {
                      e.currentTarget.style.backgroundColor = 'var(--color-accent-gold)'
                      e.currentTarget.style.transform = 'scale(1)'
                    }
                  }}
                >
                  {submitState === 'loading' && (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="animate-spin" size={18} />
                      SENDING...
                    </span>
                  )}
                  {submitState === 'idle' && 'SEND MESSAGE'}
                  {submitState === 'success' && (
                    <span className="flex items-center justify-center gap-2">
                      MESSAGE SENT ✓
                    </span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Column - Contact Info */}
        <div className="flex flex-col gap-6">
          {/* Availability Status */}
          <div
            className="rounded-[var(--border-radius-md)] border p-6 md:p-8 transition-all duration-1000"
            style={{
              backgroundColor: 'rgba(255,255,255,0.03)',
              borderColor: 'rgba(255,255,255,0.06)',
              backdropFilter: 'blur(12px)',
              opacity: revealed ? 1 : 0,
              transform: revealed ? 'translateY(0)' : 'translateY(40px)',
              transitionDelay: '300ms',
            }}
          >
            {/* Status Indicator */}
            <div className="flex items-center gap-3 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#4ADE80] animate-pulse" />
              <span
                className="font-mono tracking-[0.12em] uppercase"
                style={{
                  fontSize: 'clamp(0.65rem, 0.8vw, 0.75rem)',
                  color: 'var(--color-text-secondary)',
                  lineHeight: 1.4,
                }}
              >
                AVAILABLE FOR NEW PROJECTS
              </span>
            </div>
            <p
              className="font-mono tracking-[0.12em] uppercase"
              style={{
                fontSize: 'clamp(0.65rem, 0.8vw, 0.75rem)',
                color: 'var(--color-text-tertiary)',
                lineHeight: 1.4,
              }}
            >
              Senior Creative at Create Production DXB
            </p>
          </div>

          {/* Direct Contact */}
          <div
            className="transition-all duration-1000"
            style={{
              opacity: revealed ? 1 : 0,
              transform: revealed ? 'translateY(0)' : 'translateY(40px)',
              transitionDelay: '500ms',
            }}
          >
            <p
              className="font-mono tracking-[0.2em] uppercase mb-4"
              style={{
                fontSize: 'clamp(0.6rem, 0.7vw, 0.7rem)',
                color: 'var(--color-text-muted)',
                lineHeight: 1.4,
              }}
            >
              DIRECT CONTACT
            </p>
            <div className="flex flex-col gap-3">
              <a
                href="mailto:ferlan.racaza@gmail.com"
                className="flex items-center gap-3 transition-colors duration-300 hover:text-[#C9A96E] group"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                <Mail size={16} style={{ color: 'var(--color-text-muted)' }} />
                <span className="font-body transition-colors duration-300 group-hover:text-[#C9A96E]">
                  ferlan.racaza@gmail.com
                </span>
              </a>
              <a
                href="tel:+971557138926"
                className="flex items-center gap-3 transition-colors duration-300 hover:text-[#C9A96E] group"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                <Phone size={16} style={{ color: 'var(--color-text-muted)' }} />
                <span className="font-body transition-colors duration-300 group-hover:text-[#C9A96E]">
                  +971 557 138 926
                </span>
              </a>
              <div
                className="flex items-center gap-3"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                <MapPin size={16} style={{ color: 'var(--color-text-muted)' }} />
                <span className="font-body">DUBAI, UAE</span>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div
            className="transition-all duration-1000"
            style={{
              opacity: revealed ? 1 : 0,
              transform: revealed ? 'translateY(0)' : 'translateY(40px)',
              transitionDelay: '700ms',
            }}
          >
            <p
              className="font-mono tracking-[0.2em] uppercase mb-4"
              style={{
                fontSize: 'clamp(0.6rem, 0.7vw, 0.7rem)',
                color: 'var(--color-text-muted)',
                lineHeight: 1.4,
              }}
            >
              FOLLOW
            </p>
            <div className="flex items-center gap-5">
              <a
                href="https://linkedin.com/in/ferlanracaza"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-all duration-200 hover:text-[#C9A96E] hover:scale-[1.15]"
                style={{ color: 'var(--color-text-muted)' }}
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://github.com/lanrcaz"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-all duration-200 hover:text-[#C9A96E] hover:scale-[1.15]"
                style={{ color: 'var(--color-text-muted)' }}
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a
                href="https://ferlanportfolio.my.canva.site/ferlanmotionworks"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-all duration-200 hover:text-[#C9A96E] hover:scale-[1.15]"
                style={{ color: 'var(--color-text-muted)' }}
                aria-label="Portfolio"
              >
                <ExternalLink size={20} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-all duration-200 hover:text-[#C9A96E] hover:scale-[1.15]"
                style={{ color: 'var(--color-text-muted)' }}
                aria-label="YouTube"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Response Time Note */}
          <div
            className="flex items-center gap-2 mt-2 transition-all duration-1000"
            style={{
              opacity: revealed ? 1 : 0,
              transform: revealed ? 'translateY(0)' : 'translateY(40px)',
              transitionDelay: '1000ms',
            }}
          >
            <Clock size={14} style={{ color: 'var(--color-text-muted)' }} />
            <span
              className="font-mono tracking-[0.12em] uppercase"
              style={{
                fontSize: 'clamp(0.65rem, 0.8vw, 0.75rem)',
                color: 'var(--color-text-muted)',
                lineHeight: 1.4,
              }}
            >
              Based in Dubai — GMT+4. Usually respond within 24 hours.
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
