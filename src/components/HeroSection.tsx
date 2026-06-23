import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
import { useEffect, useRef, useState } from "react"

const EMOJIS = ["🎉", "🎊", "🎈", "✨", "🎁", "🌟", "💫", "🎶", "🥂", "🎀"]
const CONFETTI_COLORS = [
  "#FF0035", "#FFD700", "#FF69B4", "#00CED1", "#FF8C00",
  "#9B59B6", "#2ECC71", "#E74C3C", "#3498DB", "#F39C12",
]

interface Particle {
  id: number
  x: number
  y: number
  size: number
  color: string
  speedX: number
  speedY: number
  rotation: number
  rotationSpeed: number
  opacity: number
  shape: "rect" | "circle" | "emoji"
  emoji?: string
  wobble: number
  wobbleSpeed: number
}

interface FloatingEmoji {
  id: number
  emoji: string
  x: number
  delay: number
  duration: number
  size: number
}

let particleId = 0

export function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const rafRef = useRef<number>(0)
  const [floatingEmojis] = useState<FloatingEmoji[]>(() =>
    Array.from({ length: 12 }, (_, i) => ({
      id: i,
      emoji: EMOJIS[i % EMOJIS.length],
      x: 5 + (i * 8.5) % 90,
      delay: i * 0.7,
      duration: 6 + (i % 4) * 1.5,
      size: 20 + (i % 3) * 10,
    }))
  )

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener("resize", resize)

    const spawnBurst = () => {
      const x = Math.random() * canvas.width
      const y = Math.random() * canvas.height * 0.5
      for (let i = 0; i < 18; i++) {
        const angle = (Math.PI * 2 * i) / 18 + Math.random() * 0.5
        const speed = 1.5 + Math.random() * 3
        particlesRef.current.push({
          id: particleId++,
          x,
          y,
          size: 5 + Math.random() * 8,
          color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
          speedX: Math.cos(angle) * speed,
          speedY: Math.sin(angle) * speed - 2,
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 8,
          opacity: 1,
          shape: Math.random() < 0.3 ? "circle" : "rect",
          wobble: Math.random() * Math.PI * 2,
          wobbleSpeed: 0.05 + Math.random() * 0.05,
        })
      }
    }

    spawnBurst()
    const burstInterval = setInterval(spawnBurst, 1800)

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particlesRef.current = particlesRef.current.filter(p => p.opacity > 0.02)

      for (const p of particlesRef.current) {
        p.wobble += p.wobbleSpeed
        p.x += p.speedX + Math.sin(p.wobble) * 0.5
        p.y += p.speedY
        p.speedY += 0.06
        p.rotation += p.rotationSpeed
        p.opacity -= 0.007

        ctx.save()
        ctx.globalAlpha = Math.max(0, p.opacity)
        ctx.translate(p.x, p.y)
        ctx.rotate((p.rotation * Math.PI) / 180)
        ctx.fillStyle = p.color

        if (p.shape === "circle") {
          ctx.beginPath()
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2)
          ctx.fill()
        } else {
          ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2)
        }
        ctx.restore()
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resize)
      clearInterval(burstInterval)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Canvas confetti background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 1 }}
      />

      {/* Floating emoji balloons */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 2 }}>
        {floatingEmojis.map((item) => (
          <span
            key={item.id}
            className="absolute select-none"
            style={{
              left: `${item.x}%`,
              bottom: "-60px",
              fontSize: `${item.size}px`,
              animation: `heroFloat ${item.duration}s ease-in-out ${item.delay}s infinite`,
              opacity: 0.55,
            }}
          >
            {item.emoji}
          </span>
        ))}
      </div>

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 70% 60% at 50% 40%, hsl(350 100% 50% / 0.07) 0%, transparent 70%)",
          zIndex: 1,
        }}
      />

      <div className="container mx-auto text-center max-w-5xl relative" style={{ zIndex: 10 }}>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 animate-fade-in-up">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-primary">Организация праздников и мероприятий под ключ</span>
        </div>

        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 animate-fade-in-up text-balance">
          Праздники, которые{" "}
          <span className="text-primary relative inline-block">
            запоминаются
            <svg
              className="absolute -bottom-2 left-0 w-full"
              height="12"
              viewBox="0 0 200 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 10C50 5 150 5 198 10"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                className="text-primary"
              />
            </svg>
          </span>
        </h1>

        <p className="text-xl sm:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto animate-fade-in-up animate-delay-100 leading-relaxed">
          От идеи до последнего гостя. Организуем свадьбы, корпоративы, дни рождения и вечеринки под ключ — вам останется только наслаждаться праздником.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up animate-delay-200 mb-12">
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-6 text-lg group shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all"
            asChild
          >
            <a href="#contact">
              Организовать праздник
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-2 border-primary/20 text-foreground hover:bg-primary/5 hover:border-primary font-semibold px-8 py-6 text-lg backdrop-blur-sm bg-transparent"
            asChild
          >
            <a href="#portfolio">Наши мероприятия</a>
          </Button>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-muted-foreground animate-fade-in-up animate-delay-300">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span>500+ мероприятий</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: "0.5s" }} />
            <span>450+ счастливых клиентов</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: "1s" }} />
            <span>8+ лет опыта</span>
          </div>
        </div>
      </div>
    </section>
  )
}
