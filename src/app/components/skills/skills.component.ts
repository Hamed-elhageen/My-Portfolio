import { Component, type OnInit } from "@angular/core"
import { trigger, style, transition, animate, query, stagger } from "@angular/animations"
import  { ThemeService } from "../../services/theme.service"

@Component({
  selector: "app-skills",
  templateUrl: "./skills.component.html",
  styleUrls: ["./skills.component.css"],
  animations: [
    trigger("progressBar", [
      transition(":enter", [style({ width: "0%" }), animate("1.5s ease-out", style({ width: "*" }))]),
    ]),
    trigger("skillCard", [
      transition(":enter", [
        style({ opacity: 0, transform: "scale(0.8)" }),
        animate("0.6s ease-out", style({ opacity: 1, transform: "scale(1)" })),
      ]),
    ]),
    trigger("staggerSkills", [
      transition("* => *", [
        query(
          ":enter",
          [
            style({ opacity: 0, transform: "translateY(30px)" }),
            stagger(100, [animate("0.6s ease-out", style({ opacity: 1, transform: "translateY(0)" }))]),
          ],
          { optional: true },
        ),
      ]),
    ]),
  ],
})
export class SkillsComponent implements OnInit {
  isDarkMode = true

  skillCategories = [
    {
      title: "Frameworks & Libraries",
      skills: [
        { name: "Angular", level: 90, color: "from-red-500 to-red-600" },
        { name: "React.js", level: 75, color: "from-blue-500 to-blue-600" },
        { name: "Tailwind CSS", level: 85, color: "from-cyan-500 to-cyan-600" },
        { name: "Bootstrap", level: 80, color: "from-purple-500 to-purple-600" },
        { name: "Redux", level: 70, color: "from-violet-500 to-violet-600" },
      ],
    },
    {
      title: "Languages",
      skills: [
        { name: "TypeScript", level: 85, color: "from-blue-600 to-blue-700" },
        { name: "JavaScript", level: 90, color: "from-yellow-500 to-yellow-600" },
        { name: "HTML5", level: 95, color: "from-orange-500 to-orange-600" },
        { name: "CSS3", level: 90, color: "from-blue-500 to-blue-600" },
        { name: "C++", level: 80, color: "from-gray-500 to-gray-600" },
      ],
    },
    {
      title: "Tools & Concepts",
      skills: [
        { name: "Git & GitHub", level: 85, color: "from-gray-700 to-gray-800" },
        { name: "Postman", level: 80, color: "from-orange-500 to-orange-600" },
        { name: "OOP", level: 85, color: "from-green-500 to-green-600" },
        { name: "Data Structures", level: 85, color: "from-indigo-500 to-indigo-600" },
        { name: "Algorithms", level: 85, color: "from-pink-500 to-pink-600" },
      ],
    },
  ]

  constructor(private themeService: ThemeService) {
    this.themeService.isDarkMode$.subscribe((isDark) => {
      this.isDarkMode = isDark
    })
  }

  ngOnInit() {}
}
