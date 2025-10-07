import { Component, Inject, OnInit, PLATFORM_ID } from "@angular/core";
import { trigger, state, style, transition, animate, query, stagger } from "@angular/animations";
import { ThemeService } from "../../services/theme.service";
import { isPlatformBrowser } from "@angular/common";

@Component({
  selector: "app-projects",
  templateUrl: "./projects.component.html",
  styleUrls: ["./projects.component.css"],
  animations: [
    // Hover Animation
    trigger("cardHover", [
      state("normal", style({ transform: "scale(1)" })),
      state("hovered", style({ transform: "scale(1.05)" })),
      transition("normal <=> hovered", animate("0.3s ease-in-out")),
    ]),

    // Zoom In Animation for each card
    trigger("cardAnimation", [
      transition(":enter", [
        style({ opacity: 0, transform: "scale(0.5)" }),
        animate("800ms ease-out", style({ opacity: 1, transform: "scale(1)" })),
      ]),
    ]),

    // Stagger (one by one from bottom to top)
    trigger("staggerCards", [
      transition(":enter", [
        query(
          ":enter",
          [
            style({ opacity: 0, transform: "translateY(80px)" }),
            stagger(200, [
              animate("800ms ease-out", style({ opacity: 1, transform: "translateY(0)" })),
            ]),
          ],
          { optional: true }
        ),
      ]),
    ]),
  ],
})
export class ProjectsComponent implements OnInit {
  isDarkMode = true;
  hoveredCard: number | null = null;
  showSection = false;

  projects = [
    {
      title: "Damanhour University Portal",
      demo:"https://dmu.edu.eg/landing",
      description:
        "A responsive, multi-language university portal that showcases news, events, media, and student services, built with Angular and integrated backend APIs.",
      techStack: ["Angular", "TypeScript", "Bootstrap", "REST APIs"],
      type: "Graduation Project",
      link: "https://github.com/Hamed-elhageen/graduation-project",
      image: "/damanhour university.png",
    },
    {
      title: "Africa Stores",
      demo: "https://africastores.netlify.app/",
      description:
        "An e-commerce sportswear store built with Angular, featuring product filtering, user authentication, and a modern UI. Fully responsive with integrated API calls and routing.",
      techStack: ["Angular", "TypeScript", "Tailwind CSS", "REST APIs"],
      type: "E-commerce",
      link: "https://github.com/Hamed-elhageen/Africa-Store",
      image: "/coutinho.png",
    },
    {
      title: "Portfolio",
            demo:"https://hamed-elhageen.netlify.app/",
      description:
        "A modern and responsive web portfolio built with Angular to showcase my front-end development skills, projects, and experience. It features interactive animations, a dark/light theme toggle, smooth navigation, and a dynamic UI designed to highlight my work, skills, and contact information.",
      techStack: ["Angular", "TypeScript", "Tailwind css", "Angular animations"],
      type: "Personal App",
      link: "https://github.com/Hamed-elhageen/My-Portfolio",
      image: "/portfolio.png",
    },
    {
      title: "CRUD System",
            demo:"https://hamed-elhageen.github.io/Products-management-system/",

      description:
        "A lightweight and fully functional CRUD application developed using pure JavaScript. The system allows users to add, view, edit, and delete product records through an interactive user interface.",
      techStack: ["JavaScript", "HTML5", "CSS3", "Local Storage"],
      type: "Web Application",
      link: "https://github.com/Hamed-elhageen/Products-management-system",
      image: "/crud.png",
    },
    {
      title: "Quiz App",
            demo:"https://hamed-elhageen.github.io/Quiz-app/",

      description:
        "An interactive quiz application built with pure JavaScript. It presents a series of timed questions, tracks user answers, and displays the final score at the end.",
      techStack: ["JavaScript", "HTML5", "CSS3", "DOM Manipulation"],
      type: "Interactive App",
      link: "https://github.com/Hamed-elhageen/Quiz-app",
      image: "/quiz app.png",
    },
    {
      title: "Weather App",
            demo:"https://hamed-elhageen.github.io/Weather-app/",

      description:
        "A simple and responsive weather application that allows users to search for any city and view real-time weather data. It displays key information such as temperature, wind speed, and weather conditions using a clean and user-friendly interface. Powered by a public weather API.",
      techStack: ["JavaScript", "HTML5", "CSS3"],
      type: "Interactive App",
      link: "https://github.com/Hamed-elhageen/Weather-app",
      image: "/weather app.png",
    },
  ];

  constructor(
    private themeService: ThemeService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.themeService.isDarkMode$.subscribe((isDark) => {
      this.isDarkMode = isDark;
    });
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const section = document.getElementById("projects");

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              this.showSection = true;
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.8 }
      );

      if (section) {
        observer.observe(section);
      }
    }
  }

  onCardHover(index: number) {
    this.hoveredCard = index;
  }

  onCardLeave() {
    this.hoveredCard = null;
  }
}
