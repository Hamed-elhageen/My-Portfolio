import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  isDarkMode$ = new BehaviorSubject<boolean>(true);

  constructor() {
    const storedTheme = localStorage.getItem('darkMode');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = storedTheme === 'true' || (!storedTheme && prefersDark);

    this.isDarkMode$.next(isDark);
  }

  toggleTheme(): void {
    const newMode = !this.isDarkMode$.value;
    this.isDarkMode$.next(newMode);
    localStorage.setItem('darkMode', String(newMode));
  }

  setTheme(isDark: boolean): void {
    this.isDarkMode$.next(isDark);
    localStorage.setItem('darkMode', String(isDark));
  }
}
