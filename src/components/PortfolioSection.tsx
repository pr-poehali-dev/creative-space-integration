import { Card, CardContent } from "@/components/ui/card"
import { ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

const projects = [
  {
    title: "Свадьба в загородной резиденции",
    category: "Свадьба",
    image: "https://cdn.poehali.dev/projects/e47969e0-cab0-48f2-ab66-a05bd853db62/files/e457e06c-3f9e-4de0-a035-27eb854d06d3.jpg",
    description:
      "Камерная свадьба на 80 гостей под открытым небом. Цветочный декор, гирлянды, живая музыка и фуршет от шеф-повара. Романтика и уют в каждой детали.",
    url: "#contact",
    tags: ["Свадьба", "Декор", "Кейтеринг", "Живая музыка"],
  },
  {
    title: "Закрытая вечеринка в клубе",
    category: "Вечеринка",
    image: "https://cdn.poehali.dev/projects/e47969e0-cab0-48f2-ab66-a05bd853db62/files/f049cb9f-4f8d-4ee9-8a15-703c4d0efec9.jpg",
    description:
      "Драйвовая тематическая вечеринка на 200 гостей. Топовый диджей, световое шоу, конфетти-пушки и яркая атмосфера до самого утра.",
    url: "#contact",
    tags: ["Вечеринка", "DJ", "Свет", "Шоу"],
  },
  {
    title: "Юбилей компании",
    category: "Корпоратив",
    image: "https://cdn.poehali.dev/projects/e47969e0-cab0-48f2-ab66-a05bd853db62/files/61baff35-6c06-4374-9b3b-649088bf8035.jpg",
    description:
      "Торжественный гала-ужин в честь 10-летия компании. Сцена, ведущий, награждение сотрудников и выступление кавер-группы в элегантном зале.",
    url: "#contact",
    tags: ["Корпоратив", "Гала-ужин", "Ведущий", "Кавер-группа"],
  },
  {
    title: "Детский день рождения",
    category: "День рождения",
    image: "https://cdn.poehali.dev/projects/e47969e0-cab0-48f2-ab66-a05bd853db62/files/82784deb-e634-4069-a1b5-18e3ceb605c7.jpg",
    description:
      "Яркий праздник для маленького именинника: аниматоры, шоу мыльных пузырей, воздушные шары и сладкий стол. Море улыбок и счастливых детей.",
    url: "#contact",
    tags: ["День рождения", "Аниматоры", "Шоу", "Декор"],
  },
]

export function PortfolioSection() {
  return (
    <section id="portfolio" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-balance">Наши мероприятия</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed">
            Подборка праздников, которые мы организовали. Каждое событие — это уникальная история, созданная с любовью к деталям.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Card
              key={index}
              className="group overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className="relative overflow-hidden aspect-video">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <Button
                    size="sm"
                    variant="secondary"
                    className="gap-2"
                    onClick={() => document.querySelector(project.url)?.scrollIntoView({ behavior: "smooth" })}
                  >
                    Хочу так же <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <CardContent className="p-6">
                <p className="text-sm text-primary font-semibold mb-2">{project.category}</p>
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}