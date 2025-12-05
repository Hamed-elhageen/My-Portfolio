import { AfterViewChecked, AfterViewInit, Component, OnInit } from "@angular/core"
import { trigger, style, transition, animate, state } from "@angular/animations"
import  { ThemeService } from "../../services/theme.service"

@Component({
  selector: "app-contact",
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact.component.css"],
  animations: [
        trigger("slideInBottom", [
          state("hidden", style({ opacity: 0, transform: "translateY(100px)" })),
          state("visible", style({ opacity: 1, transform: "translateY(0)" })),
          transition("hidden => visible", animate("1s ease-out")),
        ]),
  ],
})
export class ContactComponent  implements OnInit, AfterViewInit{
  isDarkMode = true

  contactInfo = [
    {
      icon: "M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
      title: "Email",
      value: "hamedragabmokhtar@gmail.com",
      link: "mailto:hamedragabmokhtar@gmail.com",
    },
    {
      icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z",
      title: "Phone",
      value: "01016305186",
      link: "tel:01016305186",
    },
    {
      icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z",
      title: "Location",
      value: "Damanhour, Beheira, Egypt",
      link: "https://maps.app.goo.gl/vvB3QY8fwzZoatqM9",
    },
  ]

  constructor(private themeService: ThemeService) {
    this.themeService.isDarkMode$.subscribe((isDark) => {
      this.isDarkMode = isDark
    })
  }


  showDetails: boolean[] = [];

  /** Additional + Soft */
  showReady = false;

  ngOnInit() {
    this.showDetails = this.contactInfo.map(() => false);
  }

  ngAfterViewInit() {
    /** مراقبة الكروت */
    this.contactInfo.forEach((_, i) => {
      const el = document.getElementById(`detail-${i}`);

      if (el) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              this.showDetails[i] = true;
              observer.unobserve(entry.target);
            }
          });
        }, { threshold: 0.3 });

        observer.observe(el);
      }
    });

    /** مراقبة Additional */
    const addEl = document.getElementById("ready");
    if (addEl) {
      const observer2 = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          this.showReady = true;
          observer2.unobserve(entries[0].target);
        }
      }, { threshold: 0.3 });
      observer2.observe(addEl);
    }

  }
}
