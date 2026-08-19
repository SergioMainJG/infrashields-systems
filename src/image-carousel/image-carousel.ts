import { Component, computed, ElementRef, OnDestroy, OnInit, signal, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface CarouselSlide {
  id: string;
  tag: string;
  badgeClass: string;
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  image: string;
  alt: string;
}

@Component({
  selector: 'image-carousel',
  imports: [CommonModule],
  templateUrl: './image-carousel.html',
})
export class ImageCarousel implements OnInit, OnDestroy {
  readonly carouselContainer = viewChild<ElementRef<HTMLDivElement>>('carouselElement');

  readonly slides: CarouselSlide[] = [
    {
      id: 'slide1',
      tag: 'NUEVA GENERACIÓN',
      badgeClass: 'badge-primary',
      title: 'Servidores Enterprise de Alto Rendimiento',
      subtitle: 'Arquitectura escalable para centros de datos modernos',
      description: 'Procesamiento de máxima densidad, redundancia en fuentes y conectividad 100GbE para cargas de misión crítica.',
      ctaText: 'Explorar Servidores',
      ctaLink: '#',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1600&q=80',
      alt: 'Servidores e infraestructura de centro de datos',
    },
    {
      id: 'slide2',
      tag: 'CIBERSEGURIDAD AVANZADA',
      badgeClass: 'badge-secondary',
      title: 'Protección Integral y Conectividad Segura',
      subtitle: 'Firewalls UTM de próxima generación y switches core',
      description: 'Defensa perimetral automatizada contra amenazas de día cero con monitoreo en tiempo real y VPN empresarial.',
      ctaText: 'Ver Soluciones de Red',
      ctaLink: '#',
      image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1600&q=80',
      alt: 'Cables de fibra óptica y switches de red',
    },
    {
      id: 'slide3',
      tag: 'EQUIPAMIENTO PROFESIONAL',
      badgeClass: 'badge-accent',
      title: 'Estaciones de Trabajo y Laptops Corporativas',
      subtitle: 'Rendimiento sin límites para ingeniería y diseño',
      description: 'Equipos certificados con procesadores de última generación y tarjetas gráficas para cálculo intensivo y virtualización.',
      ctaText: 'Cotizar Equipamiento',
      ctaLink: '#',
      image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=1600&q=80',
      alt: 'Estación de trabajo para profesionales',
    },
    {
      id: 'slide4',
      tag: 'CONTINUIDAD DE NEGOCIO',
      badgeClass: 'badge-info',
      title: 'Almacenamiento SAN/NAS y Respaldo Híbrido',
      subtitle: 'Tus datos siempre disponibles y protegidos',
      description: 'Sistemas all-flash con desduplicación en tiempo real y esquemas de snapshot inmutables contra ransomware.',
      ctaText: 'Descubrir Soluciones',
      ctaLink: '#',
      image: 'https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=1600&q=80',
      alt: 'Racks de almacenamiento masivo y discos',
    },
    {
      id: 'slide5',
      tag: 'DISPONIBILIDAD 99.999%',
      badgeClass: 'badge-warning',
      title: 'Sistemas de Energía Ininterrumpida (UPS)',
      subtitle: 'Protección eléctrica confiable para operaciones continuas',
      description: 'Sistemas modulares en línea de doble conversión para proteger equipos sensibles ante cualquier variación o apagón.',
      ctaText: 'Consultar Catálogo',
      ctaLink: '#',
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1600&q=80',
      alt: 'Sistemas de energía y equipos industriales de respaldo',
    },
  ];

  readonly currentIndex = signal(0);
  readonly isPaused = signal(false);

  private autoPlayTimer: any = null;

  ngOnInit(): void {
    this.startAutoPlay();
  }

  ngOnDestroy(): void {
    this.stopAutoPlay();
  }

  startAutoPlay(): void {
    this.stopAutoPlay();
    this.autoPlayTimer = setInterval(() => {
      if (!this.isPaused()) {
        this.nextSlide();
      }
    }, 5000);
  }

  stopAutoPlay(): void {
    if (this.autoPlayTimer) {
      clearInterval(this.autoPlayTimer);
      this.autoPlayTimer = null;
    }
  }

  pauseAutoPlay(): void {
    this.isPaused.set(true);
  }

  resumeAutoPlay(): void {
    this.isPaused.set(false);
  }

  goToSlide(index: number): void {
    if (index >= 0 && index < this.slides.length) {
      this.currentIndex.set(index);
      this.scrollToCurrentSlide();
    }
  }

  nextSlide(): void {
    const next = (this.currentIndex() + 1) % this.slides.length;
    this.goToSlide(next);
  }

  prevSlide(): void {
    const prev = (this.currentIndex() - 1 + this.slides.length) % this.slides.length;
    this.goToSlide(prev);
  }

  private scrollToCurrentSlide(): void {
    const container = this.carouselContainer()?.nativeElement;
    if (!container) return;

    const targetElement = container.querySelector(`#${this.slides[this.currentIndex()].id}`) as HTMLElement;
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start',
      });
    }
  }

  onScroll(event: Event): void {
    const container = event.target as HTMLElement;
    if (!container) return;

    const scrollLeft = container.scrollLeft;
    const itemWidth = container.clientWidth;
    if (itemWidth > 0) {
      const newIndex = Math.round(scrollLeft / itemWidth);
      if (newIndex >= 0 && newIndex < this.slides.length && newIndex !== this.currentIndex()) {
        this.currentIndex.set(newIndex);
      }
    }
  }
}
