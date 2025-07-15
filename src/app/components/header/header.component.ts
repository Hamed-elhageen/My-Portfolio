import { Component, HostListener } from "@angular/core"
import  { ThemeService } from "../../services/theme.service"
import { trigger, style, transition, animate, state } from "@angular/animations"
import { PLATFORM_ID, Inject } from "@angular/core"
import { isPlatformBrowser } from "@angular/common"

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
  animations: [
    trigger("slideIn", [                                                                                                                                       //firstly , this animantion from angular animations for the header , when you open the site the header appears from bottom 50px to top quickly
      transition(":enter", [
        style({ transform: "translateY(-100%)" }),
        animate("0.5s ease-in", style({ transform: "translateY(0%)" })),
      ]),
    ]),
    trigger("menuSlide", [                                                                                                                           //this animation for mobile menu , if it is closed it will be at 100px left and disapearing with opacity 0 , and if it is opened it appear with opacity 1 and togglign between them in .3s
      state("closed", style({ transform: "translateX(-100%)", opacity: 0 })),
      state("open", style({ transform: "translateX(0)", opacity: 1 })),
      transition("closed <=> open", animate("0.3s ease-in-out")),
    ]),
  ],
})
export class HeaderComponent {
  isScrolled = false                                                                                                                                  //the first value of if you scrolled is false
  isMobileMenuOpen = false                                                                                                                 //the first value of if the mobilemeue is false also
  isDarkMode = true                                                                                                                              //this is a value for the dark mode and its value by default is true and we will equal it with the isDarkMode behaviour subjec which is changing when subscribing on it
  platformId: Object                                                                                                                               // to know where you are ( browser or server)

  constructor(
    private themeService: ThemeService,
    @Inject(PLATFORM_ID) platformId: Object,
  ) {

    this.platformId = platformId
    this.themeService.isDarkMode$.subscribe((isDark) => {
      this.isDarkMode = isDark                                                                                                                     //now , our variable isDarkMode is equal to the behaviour subject and if it changed , it will be changed and we will use it in the html to change the styling
    })
  }

  @HostListener("window:scroll", [])                                                                                                 //here we are lestening on window scrolling , if you scrolled more than 50px then isScrolled is true , and if isScrolled is true , you use it in html by conditional styling to change the header color
  onWindowScroll() {
    if (isPlatformBrowser(this.platformId)) {
      this.isScrolled = window.pageYOffset > 50
    }
  }

  toggleMobileMenu() {                                                                                                                    //togglening the mobile menu , if it is openend , it close it and vice versa
    this.isMobileMenuOpen = !this.isMobileMenuOpen
  }

  scrollToSection(sectionId: string) {                                                                                               //this function is for scrolling to a section of navbar when clicking on it
    if (isPlatformBrowser(this.platformId)) {
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    }
    this.isMobileMenuOpen = false                                                                                              //and if this scroll was from mobile , close the menu after clicking on this nav item
  }


















}
