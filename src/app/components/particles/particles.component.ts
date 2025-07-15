import { Component, OnInit, OnDestroy, ElementRef, ViewChild, Inject, PLATFORM_ID } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";
import { ThemeService } from "../../services/theme.service";

@Component({
  selector: "app-particles",
  templateUrl: "./particles.component.html",
  styleUrls: ["./particles.component.css"],
})
export class ParticlesComponent implements OnInit, OnDestroy {
  @ViewChild("canvas", { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;                    //linking with the canvas element in html
  private ctx!: CanvasRenderingContext2D;                                                                                          //this is like a painter which will paint on the board (canvas)
  private particles: Particle[] = [];                                                                                                          // this is the array which contains the particles which will be on the canvas
  private animationId!: number;
  private isDarkMode = true;

  constructor(
    private themeService: ThemeService,
    @Inject(PLATFORM_ID) private platformId: Object // ✅ FIXED                                                         //injecting the services to the constructor
  ) {}

  ngOnInit() {
    this.themeService.isDarkMode$.subscribe((isDark) => {                                                                               //this to cotrol the dark mode
      this.isDarkMode = isDark;
    });

    if (isPlatformBrowser(this.platformId)) {
      this.initCanvas();                                                                                                                                        //this to create the board where we will paint the particles (board)
      this.createParticles();                                                                                                                                //creating the particles
      this.animate();                                                                                                                                         //this is to create the animation which moves the particles
    // you will see the execution of each function
    }
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId) && this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }

  private initCanvas() {
    if (!isPlatformBrowser(this.platformId)) return;

    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext("2d")!;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;                                                                                              //making the canvas (board) width = the width of the window
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
  }

  private createParticles() {
    if (!isPlatformBrowser(this.platformId)) return;

    const particleCount = 100;
    for (let i = 0; i < particleCount; i++) {
      this.particles.push(new Particle(Math.random() * window.innerWidth, Math.random() * window.innerHeight));
    }
  }

  private animate() {
    if (!isPlatformBrowser(this.platformId) || !this.ctx) return;

    this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    this.particles.forEach((particle) => {
      particle.update();
      particle.draw(this.ctx, this.isDarkMode);
    });

    this.animationId = requestAnimationFrame(() => this.animate());
  }
}

class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.vx = (Math.random() - 0.5) * 0.5;
    this.vy = (Math.random() - 0.5) * 0.5;
    this.size = Math.random() * 3 + 1;
    this.opacity = Math.random() * 0.5 + 0.2;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    if (typeof window !== "undefined") {
      if (this.x < 0 || this.x > window.innerWidth) this.vx *= -1;
      if (this.y < 0 || this.y > window.innerHeight) this.vy *= -1;
    }
  }

  draw(ctx: CanvasRenderingContext2D, isDarkMode: boolean) {
    ctx.save();
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle = isDarkMode ? "#3b82f6" : "#1e40af";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}
