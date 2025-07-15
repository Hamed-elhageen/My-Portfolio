import { Component, OnInit, Inject, PLATFORM_ID } from "@angular/core";
import { ThemeService } from "./services/theme.service";
import { trigger, style, transition, animate } from "@angular/animations";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  animations: [                                                                                                              //using angluar animations which is installed by default with angular or you install it and import trigger and animate and its thing s from it and use them in the component in animations
    trigger("slideFromUnder", [                                                                                        //firing animation called page transition using trigger key word
      transition(":enter", [style({ opacity: 0 }), animate(".5s ease-in", style({ opacity: 1 }))]),                   //inside the transition word you enter 2 things , when the animation will happen (when opening the page and the [] of the style of the element and the state it will go to it using the two key word style and animate )
    ]),
  ],
})
export class AppComponent implements OnInit {
  title = "hamed-portfolio";
  isDarkMode = true;
  constructor(
    private themeService: ThemeService,
    @Inject(PLATFORM_ID) private platformId: Object // ✅ Fixed
  ) {}
  ngOnInit() {                                                                                       //if you will use an injected service or get data from an api , use ngOnInit
    this.themeService.isDarkMode$.subscribe((isDark) => {
      this.isDarkMode = isDark;
    });
  }
}
