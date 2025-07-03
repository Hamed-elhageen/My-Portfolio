import { Component, OnInit } from "@angular/core";
import { ThemeService } from "./services/theme.service";
import { trigger, style, transition, animate } from "@angular/animations";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  animations: [
    trigger("pageTransition", [
      transition(":enter", [style({ opacity: 0 }), animate("0.5s ease-in", style({ opacity: 1 }))]),
    ]),
  ],
})
export class AppComponent implements OnInit {
  title = "portfolio";
  isDarkMode = true;

  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    this.themeService.isDarkMode$.subscribe((isDark) => {
      this.isDarkMode = isDark;
    });
  }
}
