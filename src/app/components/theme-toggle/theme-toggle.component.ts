import { Component } from "@angular/core"
import  { ThemeService } from "../../services/theme.service"
import { trigger, state, style, transition, animate } from "@angular/animations"
import { Inject, PLATFORM_ID } from "@angular/core"

@Component({
  selector: "app-theme-toggle",
  templateUrl: "./theme-toggle.component.html",
  styleUrls: ["./theme-toggle.component.css"],
  animations: [
    trigger("toggleSwitch", [
      state("light", style({ transform: "translateX(0)" })),
      state("dark", style({ transform: "translateX(24px)" })),
      transition("light <=> dark", animate("0.3s ease-in-out")),
    ]),
  ],
})
export class ThemeToggleComponent {
  isDarkMode = true;

  constructor(
    private themeService: ThemeService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.themeService.isDarkMode$.subscribe((isDark) => {
      this.isDarkMode = isDark
    })
  }

  toggleTheme() {
    this.themeService.toggleTheme()
  }
}
