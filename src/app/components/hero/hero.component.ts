import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ThemeService } from '../../services/theme.service';
import {
  trigger,
  style,
  transition,
  animate,
  query,
  stagger,
  animateChild,
} from '@angular/animations';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css'],
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(50px)' }),
        animate(
          '1s 1s ease',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
    ]),
    trigger('scaleIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.5)' }),
        animate('1s 1s  ease-out', style({ opacity: 1, transform: 'scale(1)' })),
      ]),
    ]),
    trigger('textReveal', [
      transition(':enter', [
        query(
          ':enter',
          [
            style({ opacity: 0, transform: 'translateY(50px)' }),
            stagger(200, [
              animate(
                '1s 1s ease-out',
                style({ opacity: 1, transform: 'translateY(0)' })
              ),
            ]),
          ],
          { optional: true }
        ),
      ]),
    ]),
  ],
})
export class HeroComponent implements OnInit {
  showText = false;

  @ViewChild('heroImage') heroImage!: ElementRef;

  typedText = '';
  fullText = 'Front-End Developer';
  isDarkMode = true;
  nameLetters = ['H', 'a', 'm', 'e', 'd'];

  constructor(
    private themeService: ThemeService,
    @Inject(PLATFORM_ID) private platformId: Object // ✅ FIXED
  ) {
    this.themeService.isDarkMode$.subscribe((isDark) => {
      this.isDarkMode = isDark;
    });
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        this.typeText();
      }, 1000);
    }
    setTimeout(() => {
      this.showText = true;
    }, 1000); // يعني يستنى ثانية بعد ما الصفحة تفتح
  }

  typeText() {
    if (!isPlatformBrowser(this.platformId)) return;

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
  // the function of scrolling to specific section and giving this section the id
  scrollToProjects() {
    if (isPlatformBrowser(this.platformId)) {
      const element = document.getElementById('projects');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  scrollToPersonalDetails() {
    if (isPlatformBrowser(this.platformId)) {
      const element = document.getElementById('about');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }
}
