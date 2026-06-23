import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, PartyPopper, Briefcase, Cake, Music, Camera } from "lucide-react"

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
            <Card
              key={index}
              className="group hover:border-primary transition-all duration-300 hover:shadow-xl hover:-translate-y-2 bg-background/50 backdrop-blur-sm"
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
          ))}
        </div>
      </div>
    </section>
  )
}