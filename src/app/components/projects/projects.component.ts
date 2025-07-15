import { Component } from "@angular/core"
import { trigger, state, style, transition, animate, query, stagger } from "@angular/animations"
import  { ThemeService } from "../../services/theme.service"

@Component({
  selector: "app-projects",
  templateUrl: "./projects.component.html",
  styleUrls: ["./projects.component.css"],
  animations: [
    trigger("cardHover", [
      state("normal", style({ transform: "scale(1)" })),
      state("hovered", style({ transform: "scale(1.05)" })),
      transition("normal <=> hovered", animate("0.3s ease-in-out")),
    ]),
    trigger("staggerCards", [
      transition("* => *", [
        query(
          ":enter",
          [
            style({ opacity: 0, transform: "translateY(50px)" }),
            stagger(200, [animate("0.8s ease-out", style({ opacity: 1, transform: "translateY(0)" }))]),
          ],
          { optional: true },
        ),
      ]),
    ]),
  ],
})
export class ProjectsComponent {
  isDarkMode = true
  hoveredCard: number | null = null

  projects = [
    {
      title: "Damanhour University Portal",
      description:
        "A responsive, multi-language university portal that showcases news, events, media, and student services, built with Angular and integrated backend APIs.",
      techStack: ["Angular", "TypeScript", "Bootstrap", "REST APIs"],
      type: "Graduation Project",
      link: "https://github.com/Hamed-elhageen/graduation-project",
      image: "/damanhour university.png",
    },
    {
      title: "Africa Stores",
      description:
        "An e-commerce sportswear store built with Angular, featuring product filtering, user authentication, and a modern UI. Fully responsive with integrated API calls and routing.",
      techStack: ["Angular", "TypeScript", "Tailwind CSS", "REST APIs"],
      type: "E-commerce",
      link: "https://github.com/Hamed-elhageen/Africa-Store",
      image: "/africa store.png",
    },
    {
      title: "Portfolio",
      description:
        "A modern and responsive web portfolio built with Angular to showcase my front-end development skills, projects, and experience. It features interactive animations, a dark/light theme toggle, smooth navigation, and a dynamic UI designed to highlight my work, skills, and contact information.",
      techStack: ["Angular", "TypeScript", "Tailwind css"],
      type: "Personal App",
      link: "https://github.com/Hamed-elhageen/My-Portfolio",
      image: "/portfolio.png",
    },
    {
      title: "CRUD System",
      description:
        "A lightweight and fully functional CRUD application developed using pure JavaScript. The system allows users to add, view, edit, and delete product records through an interactive user interface.",
      techStack: ["JavaScript", "HTML5", "CSS3", "Local Storage"],
      type: "Web Application",
      link: "https://github.com/Hamed-elhageen/Products-management-system",
      image: "/crud.png",
    },
    {
      title: "Quiz App",
      description:
        "An interactive quiz application built with pure JavaScript. It presents a series of timed questions, tracks user answers, and displays the final score at the end.",
      techStack: ["JavaScript", "HTML5", "CSS3", "DOM Manipulation"],
      type: "Interactive App",
      link: "https://github.com/Hamed-elhageen/Quiz-app",
      image: "/quiz app.png",
    },
    {
      title: "Weather App",
      description:
        "A simple and responsive weather application that allows users to search for any city and view real-time weather data. It displays key information such as temperature, wind speed, and weather conditions using a clean and user-friendly interface. Powered by a public weather API.",
      techStack: ["JavaScript", "HTML5", "CSS3"],
      type: "Interactive App",
      link: "https://github.com/Hamed-elhageen/Weather-app",
      image: "/weather app.png",
    },
  ]

  constructor(private themeService: ThemeService) {
    this.themeService.isDarkMode$.subscribe((isDark) => {
      this.isDarkMode = isDark
    })
  }

  onCardHover(index: number) {
    this.hoveredCard = index
  }

  onCardLeave() {
    this.hoveredCard = null
  }
}
