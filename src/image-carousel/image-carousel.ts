import { Component, computed, ElementRef, OnDestroy, OnInit, signal, viewChild } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';

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
  imports: [NgOptimizedImage, RouterLink],
  templateUrl: './image-carousel.html',
})
export class ImageCarousel implements OnInit, OnDestroy {
  readonly carouselContainer = viewChild<ElementRef<HTMLDivElement>>('carouselElement');

  readonly slides: CarouselSlide[] = [
    {
      id: 'telefonia',
      tag: 'INSTALACIÓN FÍSICA Y DIGITAL',
      badgeClass: 'badge-primary',
      title: 'Infraestructura de Telefonía Empresarial',
      subtitle: 'Sistemas IP y analógicos con cobertura en toda tu operación',
      description: 'Instalación física y digital de centrales telefónicas, extensiones y líneas troncales, integradas con tu red de datos existente.',
      ctaText: 'Ver servicios de telefonía',
      ctaLink: '/servicios',
      image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=1600&q=80',
      alt: 'Equipo de telefonía empresarial instalado en oficina',
    },
    {
      id: 'computo',
      tag: 'CÓMPUTO EMPRESARIAL',
      badgeClass: 'badge-secondary',
      title: 'Infraestructura de Cómputo de Alto Rendimiento',
      subtitle: 'Servidores y estaciones de trabajo para cargas críticas',
      description: 'Instalación y configuración de servidores, workstations y equipos de cómputo dimensionados para las necesidades de tu empresa.',
      ctaText: 'Ver servicios de cómputo',
      ctaLink: '/servicios',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1600&q=80',
      alt: 'Servidores e infraestructura de cómputo',
    },
    {
      id: 'redes',
      tag: 'REDES FÍSICAS Y VIRTUALES',
      badgeClass: 'badge-accent',
      title: 'Redes Físicas y Virtuales Empresariales',
      subtitle: 'Cableado estructurado, switches y virtualización de red',
      description: 'Diseño e instalación de redes físicas (cableado, switches, puntos de acceso) y redes virtuales (VLANs, SD-WAN) para tu operación.',
      ctaText: 'Ver servicios de redes',
      ctaLink: '/servicios',
      image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1600&q=80',
      alt: 'Cables de fibra óptica y switches de red',
    },
    {
      id: 'conmutadores-grabadores',
      tag: 'CONMUTADORES Y GRABADORES',
      badgeClass: 'badge-info',
      title: 'Instalación de Conmutadores y Grabadores',
      subtitle: 'Centrales de conmutación y sistemas de grabación integrados',
      description: 'Instalación física de conmutadores telefónicos y equipos de grabación de llamadas, con configuración a la medida de tu operación.',
      ctaText: 'Ver servicios de conmutadores',
      ctaLink: '/servicios',
      image: 'https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=1600&q=80',
      alt: 'Racks de equipos de conmutación y grabación',
    },
    {
      id: 'seguridad',
      tag: 'SISTEMAS DE SEGURIDAD',
      badgeClass: 'badge-warning',
      title: 'Sistemas de Seguridad Física y Digital',
      subtitle: 'Videovigilancia, control de acceso y ciberseguridad perimetral',
      description: 'Instalación de cámaras, control de acceso y firewalls de próxima generación para proteger tus instalaciones y tu red.',
      ctaText: 'Ver servicios de seguridad',
      ctaLink: '/servicios',
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1600&q=80',
      alt: 'Equipos de seguridad y protección eléctrica',
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
