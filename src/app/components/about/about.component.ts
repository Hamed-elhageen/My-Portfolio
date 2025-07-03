import { Component, type OnInit, Inject, PLATFORM_ID } from "@angular/core"
import  { ThemeService } from "../../services/theme.service"
import { trigger, style, transition, animate, query, stagger, state } from "@angular/animations"

@Component({
  selector: "app-about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.css"],
  animations: [
    trigger("slideInLeft", [
      transition(":enter", [
        style({ opacity: 0, transform: "translateX(-100px)" }),
        animate("1s ease-out", style({ opacity: 1, transform: "translateX(0)" })),
      ]),
    ]),
    trigger("slideInRight", [
      transition(":enter", [
        style({ opacity: 0, transform: "translateX(100px)" }),
        animate("1s ease-out", style({ opacity: 1, transform: "translateX(0)" })),
      ]),
    ]),
    trigger("staggerIn", [
      transition("* => *", [
        query(
          ":enter",
          [
            style({ opacity: 0, transform: "translateY(30px)" }),
            stagger(200, [animate("0.8s ease-out", style({ opacity: 1, transform: "translateY(0)" }))]),
          ],
          { optional: true },
        ),
      ]),
    ]),
    trigger("cardHover", [
      state("normal", style({ transform: "scale(1)" })),
      state("hovered", style({ transform: "scale(1.05)" })),
      transition("normal <=> hovered", animate("0.3s ease-in-out")),
    ]),
  ],
})
export class AboutComponent implements OnInit {
  isDarkMode = true
  hoveredCard: number | null = null

  personalInfo = [
    {
      label: "Location",
      value: "Damanhour – Beheira – Egypt",
      icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z",
    },
    {
      label: "Phone",
      value: "01016305186",
      icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z",
    },
    {
      label: "Email",
      value: "hamedragabmokhtar@gmail.com",
      icon: "M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
    },
    {
      label: "Date of Birth",
      value: "17 November 2003",
      icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
    },
    {
      label: "Nationality",
      value: "Egyptian",
      icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 104 0 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064",
    },
  ]

  education = {
    degree: "Bachelor of Computer Science",
    university: "Faculty of Computers and Information Science – Damanhour University",
    period: "2021 – 2025",
    gpa: "3.617",
  };

  constructor(
    private themeService: ThemeService,
    @Inject(PLATFORM_ID) private platformId: any,
  ) {
    this.themeService.isDarkMode$.subscribe((isDark) => {
      this.isDarkMode = isDark
    })
  }

  ngOnInit() {}

  onCardHover(index: number) {
    this.hoveredCard = index
  }

  onCardLeave() {
    this.hoveredCard = null
  }
}
