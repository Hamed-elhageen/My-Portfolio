import { Component, HostListener } from "@angular/core"
import { isPlatformBrowser } from "@angular/common"
import  { ThemeService } from "../../services/theme.service"
import { trigger, style, transition, animate, state } from "@angular/animations"
import { Inject, PLATFORM_ID } from "@angular/core"

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
  animations: [
    trigger("slideIn", [
      transition(":enter", [
        style({ transform: "translateY(-100%)" }),
        animate("0.5s ease-in", style({ transform: "translateY(0%)" })),
      ]),
    ]),
    trigger("menuSlide", [
      state("closed", style({ transform: "translateX(-100%)", opacity: 0 })),
      state("open", style({ transform: "translateX(0)", opacity: 1 })),
      transition("closed <=> open", animate("0.3s ease-in-out")),
    ]),
  ],
})
export class HeaderComponent {
  isScrolled = false
  isMobileMenuOpen = false
  isDarkMode = true
  platformId: Object

  constructor(
    private themeService: ThemeService,
    @Inject(PLATFORM_ID) platformId: Object,
  ) {
    this.platformId = platformId
    this.themeService.isDarkMode$.subscribe((isDark) => {
      this.isDarkMode = isDark
    })
  }

  @HostListener("window:scroll", [])
  onWindowScroll() {
    if (isPlatformBrowser(this.platformId)) {
      this.isScrolled = window.pageYOffset > 50
    }
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen
  }

  scrollToSection(sectionId: string) {
    if (isPlatformBrowser(this.platformId)) {
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    }
    this.isMobileMenuOpen = false
  }
}
