import { Injectable, Inject, PLATFORM_ID } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ThemeService {
  private isDarkMode = new BehaviorSubject<boolean>(true);                                                        //here we initialized isDarkMode ad behaviour subject and it will act as both: observable , you can subscribe on it in any component when its value chages  ,,,and observer which can send values and change its value
  public isDarkMode$ = this.isDarkMode.asObservable();                                                                 //here we use isDarkMode$ as observer only , to use it in all components and subscribe on its value when it changes , but in the compoent you cant change the value of it because it isnt an observer , its an observable only here

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {                                                  //here you inject those , which are related to checking if you are running the project on browser or what
    // Only run in browser environment
    if (isPlatformBrowser(this.platformId)) {                                                                                       //here we check first to take care before errors happen , check if it is browser , then run you code , becuase if you was running it on server for examle on , ssr , it will get an error , because things like local storage wont work only on browsers , so we check fisrt and injected the service in the constructor
      this.initializeTheme();                                                                                                                  //here i saying if you are on browser , execute the function named initializeTheme() which will make everything in theme good ,,, inside this main function , you may find alot of functions , but this is the main which controls the theme and inside it alot of functions are separated , you can make all the code after each other but we separated in alot of functions for clean code
    }
  }

 private initializeTheme() {
    // Check for saved theme preference or default to dark mode
    const savedTheme = this.getStorageItem("theme")                                                                  //here we are checking for past saved theme in the local storage (if it way found or not )==>it is saved in the local storage if the user used it
    const prefersDark = savedTheme === "dark" || (!savedTheme && true)                                // Always default to dark mode , here iam telling him if the saved theme is dark make the variable prefersDart = true .....and if there was no saved theme (!savedTheme) also make prefersDark = true
    this.setTheme(prefersDark)                                                                                                      //and here you passed to setTheme function the prefesDark value which is true or false and here it was dark so it is true , so the site starts always at dark mode
  }

  toggleTheme() {                                                                                                                         //this function toggles the value that the setTheme function takes which is true or false
    this.setTheme(!this.isDarkMode.value);                                                                                     //it will take the opposite of the value of the behaviour subject "isDarkMode" .. which is true or false
  }

  private setTheme(isDark: boolean) {                                                                                     //this is the most important function here , it takes a boolean value of is dark .. true or false ..and then update the value of the behaviour subject isDarkMode with it
    this.isDarkMode.next(isDark);
    //now isDarkMode is true and it wont change else you toggle the theme and the function of toggeling the theme use the function of setTheme again
    // Only access localStorage and document in browser
    if (isPlatformBrowser(this.platformId)) {
      this.setStorageItem("theme", isDark ? "dark" : "light");                                                   //and here putting theme in local storage , if isDark true , it will put in local storage dark and if it false it will put light

      if (isDark) {
        document.documentElement.classList.add("dark");                                                 //and if isDark is equal to true , we will add the class dark to the html element which will add styles as background and color and so on
      } else {
        document.documentElement.classList.remove("dark");                                              //and if it was false we will remove this class which contains these styles
      }
    }
  }

  getCurrentTheme(): boolean {
    return this.isDarkMode.value;                                                                                   //this function gets the current theme from the bahaviour subject value
  }


























  // those functions are set item in local storage and get item from local storage but they are with the checking if it is a browser or not , with catching errors , but they are in normal are set and get to local storage
  private getStorageItem(key: string): string | null {
    if (isPlatformBrowser(this.platformId)) {
      try {
        return localStorage.getItem(key);
      } catch (error) {
        console.warn("localStorage not available:", error);
        return null;
      }
    }
    return null;
  }

  private setStorageItem(key: string, value: string): void {
    if (isPlatformBrowser(this.platformId)) {
      try {
        localStorage.setItem(key, value);
      } catch (error) {
        console.warn("localStorage not available:", error);
      }
    }
  }
}
