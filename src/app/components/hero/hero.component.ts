import { Component, OnInit, Inject, PLATFORM_ID, ElementRef, ViewChild } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";
import { ThemeService } from "../../services/theme.service";
import { trigger, style, transition, animate, query, stagger } from "@angular/animations";

@Component({
  selector: "app-hero",
  templateUrl: "./hero.component.html",
  styleUrls: ["./hero.component.css"],
  animations: [
    trigger("fadeInUp", [
      transition(":enter", [
        style({ opacity: 0, transform: "translateY(50px)" }),
        animate("1s ease-out", style({ opacity: 1, transform: "translateY(0)" })),
      ]),
    ]),
    trigger("slideInLeft", [
      transition(":enter", [
        style({ opacity: 0, transform: "translateX(-100px)" }),
        animate("1.2s ease-out", style({ opacity: 1, transform: "translateX(0)" })),
      ]),
    ]),
    trigger("scaleIn", [
      transition(":enter", [
        style({ opacity: 0, transform: "scale(0.5)" }),
        animate("1s ease-out", style({ opacity: 1, transform: "scale(1)" })),
      ]),
    ]),
    trigger("textReveal", [
      transition(":enter", [
        query(
          ".letter",
          [
            style({ opacity: 0, transform: "translateY(50px)" }),
            stagger(100, [animate("0.6s ease-out", style({ opacity: 1, transform: "translateY(0)" }))]),
          ],
          { optional: true },
        ),
      ]),
    ]),
  ],
})
export class HeroComponent implements OnInit {
  @ViewChild("heroImage") heroImage!: ElementRef;

  typedText = "";
  fullText = "Front-End Developer";
  isDarkMode = true;
  nameLetters = ["H", "a", "m", "e", "d"];
  isBrowser = false;

  constructor(
    private themeService: ThemeService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);

    this.themeService.isDarkMode$.subscribe((isDark) => {
      this.isDarkMode = isDark;
    });
  }

  ngOnInit() {
    if (this.isBrowser) {
      setTimeout(() => {
        this.typeText();
      }, 1000);
    }
  }

  typeText() {
    if (!this.isBrowser) return;

    let i = 0;
    const timer = setInterval(() => {
      if (i < this.fullText.length) {
        this.typedText += this.fullText.charAt(i);
        i++;
      } else {
        clearInterval(timer);
      }
    }, 100);
  }

  scrollToProjects() {
    if (this.isBrowser) {
      const element = document.getElementById("projects");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }
}
