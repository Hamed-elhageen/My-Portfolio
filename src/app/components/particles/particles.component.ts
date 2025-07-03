import { Component, OnInit, OnDestroy, ElementRef, ViewChild, Inject } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";
import { ThemeService } from "../../services/theme.service";
import{PLATFORM_ID} from '@angular/core'

@Component({
  selector: "app-particles",
  templateUrl: "./particles.component.html",
  styleUrls: ["./particles.component.css"],
})
export class ParticlesComponent implements OnInit, OnDestroy {
  @ViewChild("canvas", { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;
  private particles: Particle[] = [];
  private animationId!: number;
  private isDarkMode = true;
  private isBrowser = false;

  constructor(
    private themeService: ThemeService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    this.themeService.isDarkMode$.subscribe((isDark) => {
      this.isDarkMode = isDark;
    });

    if (this.isBrowser) {
      this.initCanvas();
      this.createParticles();
      this.animate();
    }
  }

  ngOnDestroy() {
    if (this.isBrowser && this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }

  private initCanvas() {
    if (!this.isBrowser) return;

    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext("2d")!;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
  }

  private createParticles() {
    if (!this.isBrowser) return;

    const particleCount = 50;
    for (let i = 0; i < particleCount; i++) {
      this.particles.push(
        new Particle(
          Math.random() * window.innerWidth,
          Math.random() * window.innerHeight
        )
      );
    }
  }

  private animate() {
    if (!this.isBrowser || !this.ctx) return;

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
    ctx.fillStyle = isDarkMode ? "#8b5cf6" : "#6366f1";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}
