import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, PartyPopper, Briefcase, Cake, Music, Camera } from "lucide-react"
import { useRef, useCallback } from "react"

const services = [
  {
    icon: Heart,
    title: "Свадьбы",
    description:
      "Организуем свадьбу вашей мечты под ключ: от выбора площадки и декора до ведущего, артистов и фотографа. Продумаем каждую деталь, чтобы этот день остался самым счастливым в вашей жизни.",
  },
  {
    icon: Briefcase,
    title: "Корпоративы",
    description:
      "Тимбилдинги, новогодние вечера, юбилеи компании и презентации. Создаём атмосферу, которая сплачивает коллектив и укрепляет имидж бренда. Берём на себя всё — от сценария до фуршета.",
  },
  {
    icon: Cake,
    title: "Дни рождения",
    description:
      "Яркие праздники для детей и взрослых: аниматоры, шоу-программы, тематический декор и угощения. Подарим море эмоций имениннику и гостям любого возраста.",
  },
  {
    icon: PartyPopper,
    title: "Вечеринки",
    description:
      "Тематические вечеринки, девичники, мальчишники и закрытые мероприятия. Драйвовая атмосфера, яркий свет и музыка — мы знаем, как зажечь любую компанию.",
  },
  {
    icon: Music,
    title: "Артисты и шоу",
    description:
      "Подберём ведущих, музыкантов, кавер-группы, диджеев и оригинальные шоу-номера. Проверенные исполнители под ваш бюджет, формат и настроение праздника.",
  },
  {
    icon: Camera,
    title: "Фото и видео",
    description:
      "Профессиональная съёмка вашего события: фотографы, видеографы и аэросъёмка. Сохраним лучшие моменты праздника в ярких кадрах и эффектном фильме.",
  },
]

const CONFETTI_COLORS = [
  "#FF0035", "#FFD700", "#FF69B4", "#00CED1", "#FF8C00",
  "#9B59B6", "#2ECC71", "#3498DB", "#F39C12", "#E91E63",
  "#00BCD4", "#8BC34A",
]

interface ConfettiParticle {
  x: number
  y: number
  vx: number
  vy: number
  color: string
  size: number
  rotation: number
  rotSpeed: number
  opacity: number
  shape: "rect" | "circle" | "star"
  wobble: number
}

function useConfettiCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<ConfettiParticle[]>([])
  const rafRef = useRef<number>(0)
  const activeRef = useRef(false)

  const spawnConfetti = useCallback((fromX: number, fromY: number) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const cx = fromX - rect.left
    const cy = fromY - rect.top

    particlesRef.current = []

    for (let i = 0; i < 60; i++) {
      const angle = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 1.2
      const speed = 3 + Math.random() * 6
      particlesRef.current.push({
        x: cx,
        y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
        size: 5 + Math.random() * 7,
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 12,
        opacity: 1,
        shape: Math.random() < 0.2 ? "circle" : Math.random() < 0.3 ? "star" : "rect",
        wobble: Math.random() * Math.PI * 2,
      })
    }
  }, [])

  const animate = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    let alive = false
    for (const p of particlesRef.current) {
      p.wobble += 0.07
      p.x += p.vx + Math.sin(p.wobble) * 0.6
      p.y += p.vy
      p.vy += 0.18
      p.vx *= 0.99
      p.rotation += p.rotSpeed
      p.opacity -= 0.013

      if (p.opacity <= 0) continue
      alive = true

      ctx.save()
      ctx.globalAlpha = Math.max(0, p.opacity)
      ctx.translate(p.x, p.y)
      ctx.rotate((p.rotation * Math.PI) / 180)
      ctx.fillStyle = p.color

      if (p.shape === "circle") {
        ctx.beginPath()
        ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2)
        ctx.fill()
      } else if (p.shape === "star") {
        ctx.beginPath()
        for (let i = 0; i < 5; i++) {
          const a = (i * Math.PI * 2) / 5 - Math.PI / 2
          const r = i % 2 === 0 ? p.size / 2 : p.size / 4
          ctx[i === 0 ? "moveTo" : "lineTo"](Math.cos(a) * r, Math.sin(a) * r)
        }
        ctx.closePath()
        ctx.fill()
      } else {
        ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2)
      }
      ctx.restore()
    }

    if (alive) {
      rafRef.current = requestAnimationFrame(animate)
    } else {
      activeRef.current = false
    }
  }, [])

  const trigger = useCallback((e: React.MouseEvent) => {
    const canvas = canvasRef.current
    if (!canvas) return
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    cancelAnimationFrame(rafRef.current)
    spawnConfetti(e.clientX, e.clientY)
    activeRef.current = true
    rafRef.current = requestAnimationFrame(animate)
  }, [spawnConfetti, animate])

  const stop = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    ctx?.clearRect(0, 0, canvas.width, canvas.height)
    cancelAnimationFrame(rafRef.current)
    particlesRef.current = []
    activeRef.current = false
  }, [])

  return { canvasRef, trigger, stop }
}

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const { canvasRef, trigger, stop } = useConfettiCanvas()

  return (
    <div className="relative" onMouseEnter={trigger} onMouseLeave={stop}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none rounded-lg"
        style={{ zIndex: 20 }}
      />
      <Card
        className="group hover:border-primary transition-all duration-300 hover:shadow-xl hover:-translate-y-2 bg-background/50 backdrop-blur-sm h-full"
        style={{ animationDelay: `${index * 0.1}s` }}
      >
        <CardHeader>
          <div className="mb-4 inline-flex p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
            <service.icon className="h-6 w-6" />
          </div>
          <CardTitle className="text-xl group-hover:text-primary transition-colors">{service.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-base leading-relaxed">{service.description}</CardDescription>
        </CardContent>
      </Card>
    </div>
  )
}

export function ServicesSection() {
  return (
    <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 animate-pulse" />

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="inline-block mb-4 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mx-auto block w-fit">
          Что мы организуем
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-4 text-balance">
          Праздник на любой <span className="text-primary">повод</span>
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto text-pretty leading-relaxed text-lg">
          От камерного торжества до масштабного шоу — мы воплощаем любые идеи и превращаем ваше событие в незабываемое впечатление.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
