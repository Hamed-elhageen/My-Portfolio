import { trigger, style, transition, animate, state } from "@angular/animations";
import { ThemeService } from "../../services/theme.service";
import {
  Component,
  OnInit,
  AfterViewInit,
} from "@angular/core";

@Component({
  selector: "app-skills",
  templateUrl: "./skills.component.html",
  styleUrls: ["./skills.component.css"],
  animations: [

    trigger("slideInLeft", [
      state("hidden", style({ opacity: 0, transform: "translateX(-100px)" })),
      state("visible", style({ opacity: 1, transform: "translateX(0)" })),
      transition("hidden => visible", animate("1s ease-out")),
    ]),

    trigger("slideInBottom", [
      state("hidden", style({ opacity: 0, transform: "translateY(100px)" })),
      state("visible", style({ opacity: 1, transform: "translateY(0)" })),
      transition("hidden => visible", animate("1s ease-out")),
    ]),
  ],
})
export class SkillsComponent implements OnInit, AfterViewInit {
  isDarkMode = true;

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
      title: "Programming Languages",
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
  ];

  constructor(private themeService: ThemeService) {
    this.themeService.isDarkMode$.subscribe((isDark) => {
      this.isDarkMode = isDark;
    });
  }

  /** حالة ظهور الكروت */
  showSkills: boolean[] = [];

  /** Additional + Soft */
  showAdditional = false;
  showSoft = false;

  ngOnInit() {
    this.showSkills = this.skillCategories.map(() => false);
  }

  ngAfterViewInit() {
    /** مراقبة الكروت */
    this.skillCategories.forEach((_, i) => {
      const el = document.getElementById(`skill-${i}`);

      if (el) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              this.showSkills[i] = true;
              observer.unobserve(entry.target);
            }
          });
        }, { threshold: 0.3 });

        observer.observe(el);
      }
    });

    /** مراقبة Additional */
    const addEl = document.getElementById("additional");
    if (addEl) {
      const observer2 = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          this.showAdditional = true;
          observer2.unobserve(entries[0].target);
        }
      }, { threshold: 0.3 });
      observer2.observe(addEl);
    }

    /** مراقبة Soft */
    const softEl = document.getElementById("soft");
    if (softEl) {
      const observer3 = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          this.showSoft = true;
          observer3.unobserve(entries[0].target);
        }
      }, { threshold: 0.3 });
      observer3.observe(softEl);
    }
  }
}
