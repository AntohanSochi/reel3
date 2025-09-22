
import { Component, ChangeDetectionStrategy, AfterViewInit, OnDestroy, ElementRef, ViewChild, Renderer2, signal, input } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
}

@Component({
  selector: 'app-animated-background',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './animated-background.component.html',
  styleUrls: ['./animated-background.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimatedBackgroundComponent implements AfterViewInit, OnDestroy {
  @ViewChild('particleCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('aurora') auroraRef!: ElementRef<HTMLDivElement>;

  intensity = input<'low' | 'med' | 'high'>('med');
  parallax = input<boolean>(true);
  speed = input<number>(1);
  palette = input<'purple-cyan'>('purple-cyan');

  private particles: Particle[] = [];
  private animationFrameId?: number;
  private ctx!: CanvasRenderingContext2D;
  private prefersReducedMotion = false;
  private mouseMoveListener?: () => void;
  private deviceOrientationListener?: (event: DeviceOrientationEvent) => void;

  constructor(private renderer: Renderer2, private el: ElementRef) {
    this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  ngAfterViewInit(): void {
    if (this.prefersReducedMotion) {
        this.el.nativeElement.classList.add('reduced-motion');
        return;
    }

    this.initCanvas();
    this.initParallax();
  }

  ngOnDestroy(): void {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    if (this.mouseMoveListener) {
      this.mouseMoveListener();
    }
    if(this.deviceOrientationListener){
        window.removeEventListener('deviceorientation', this.deviceOrientationListener);
    }
  }

  private initCanvas(): void {
    const canvas = this.canvasRef.nativeElement;
    const context = canvas.getContext('2d');
    if (!context) return;
    this.ctx = context;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      this.createParticles();
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    this.animate();
  }

  private createParticles(): void {
    this.particles = [];
    const particleCount = this.getParticleCount();
    for (let i = 0; i < particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.canvasRef.nativeElement.width,
        y: Math.random() * this.canvasRef.nativeElement.height,
        vx: (Math.random() - 0.5) * 0.3 * this.speed(),
        vy: (Math.random() - 0.5) * 0.3 * this.speed(),
        radius: Math.random() * 1.5,
        alpha: Math.random() * 0.5 + 0.2,
      });
    }
  }

  private getParticleCount(): number {
    switch(this.intensity()) {
        case 'low': return 50;
        case 'high': return 200;
        default: return 100;
    }
  }

  private animate(): void {
    this.ctx.clearRect(0, 0, this.canvasRef.nativeElement.width, this.canvasRef.nativeElement.height);

    this.particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > this.canvasRef.nativeElement.width) p.vx *= -1;
      if (p.y < 0 || p.y > this.canvasRef.nativeElement.height) p.vy *= -1;

      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(242, 239, 255, ${p.alpha})`;
      this.ctx.fill();
    });

    this.animationFrameId = requestAnimationFrame(() => this.animate());
  }

  private initParallax(): void {
    if (!this.parallax()) return;

    if (window.DeviceOrientationEvent && 'ontouchstart' in window) {
      this.deviceOrientationListener = (event: DeviceOrientationEvent) => this.handleOrientation(event);
      window.addEventListener('deviceorientation', this.deviceOrientationListener);
    } else {
      this.mouseMoveListener = this.renderer.listen('window', 'mousemove', (event: MouseEvent) => this.handleMouseMove(event));
    }
  }
  
  private handleMouseMove(event: MouseEvent): void {
      const { clientX, clientY } = event;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth - 0.5) * 2;
      const y = (clientY / innerHeight - 0.5) * 2;
      this.applyParallax(x, y);
  }

  private handleOrientation(event: DeviceOrientationEvent): void {
    const { beta, gamma } = event; // beta: front-back tilt, gamma: left-right tilt
    if (beta === null || gamma === null) return;
    
    const x = Math.max(-1, Math.min(1, gamma / 45));
    const y = Math.max(-1, Math.min(1, beta / 45));
    this.applyParallax(x, y);
  }

  private applyParallax(x: number, y: number): void {
    const parallaxAmount = 6;
    const aurora = this.auroraRef.nativeElement;
    if (aurora) {
        this.renderer.setStyle(aurora, 'transform', `translate(${x * parallaxAmount}px, ${y * parallaxAmount}px)`);
    }
  }
}
