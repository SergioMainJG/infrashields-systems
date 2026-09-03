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
      id: 'networking-telefonia',
      tag: 'TELEFONÍA Y REDES',
      badgeClass: 'badge-primary',
      title: 'Arquitectura de Redes y Telefonía IP',
      subtitle: 'Comunicaciones VoIP de alta fidelidad sobre redes empresariales escalables',
      description: 'Diseño, implementación y gestión de topologías de red escalables (LAN/WAN) y switches empresariales. Optimizamos el tráfico de red (QoS) para garantizar comunicaciones VoIP de alta fidelidad, integración de sistemas IP PBX y estabilidad total en tus troncales SIP.',
      ctaText: 'Ver arquitectura de redes',
      ctaLink: '/servicios',
      image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=1600&q=80',
      alt: 'Equipo de telefonía IP y networking empresarial instalado en oficina',
    },
    {
      id: 'cloud-microsoft',
      tag: 'SERVICIOS EN LA NUBE',
      badgeClass: 'badge-secondary',
      title: 'Arquitectura Cloud: Azure y Microsoft 365',
      subtitle: 'Identidad, respaldo y cifrado para tu ecosistema Microsoft 365 y Azure',
      description: 'Protegemos la infraestructura y los datos de tu empresa. Implementamos gestión de identidad y accesos con Microsoft Entra ID, respaldo seguro con Recovery Services Vault, cifrado con BitLocker y políticas de retención estrictas en Exchange Online.',
      ctaText: 'Ver servicios cloud',
      ctaLink: '/servicios',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1600&q=80',
      alt: 'Servidores e infraestructura cloud sobre Azure y Microsoft 365',
    },
    {
      id: 'redes-wifi',
      tag: 'REDES DE DATOS Y WIFI',
      badgeClass: 'badge-accent',
      title: 'Arquitectura Integral de Redes LAN y WLAN',
      subtitle: 'Cableado estructurado y Wi-Fi de alta densidad sin zonas muertas',
      description: 'Diseño e implementación de infraestructura de voz y datos de extremo a extremo. Desde el tendido físico y auditoría de enlaces, hasta la configuración de switches empresariales, segmentación por VLANs y despliegue de redes Wi-Fi de alta densidad con roaming sin interrupciones.',
      ctaText: 'Ver diseño de redes y Wi-Fi',
      ctaLink: '/servicios',
      image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1600&q=80',
      alt: 'Cables de fibra óptica y switches de red estructurada',
    },
    {
      id: 'fortinet',
      tag: 'ECOSISTEMA FORTINET',
      badgeClass: 'badge-info',
      title: 'Seguridad Perimetral y Redes Empresariales (Ecosistema Fortinet)',
      subtitle: 'Firewalls NGFW, switches y access points gestionados desde FortiCloud',
      description: 'Unificación de infraestructura y ciberseguridad. Diseñamos, desplegamos y administramos firewalls de siguiente generación (NGFW) FortiGate, segmentación LAN con FortiSwitch y redes inalámbricas seguras con FortiAP. Todo gestionado y monitoreado de manera centralizada a través de FortiCloud.',
      ctaText: 'Ver ecosistema Fortinet',
      ctaLink: '/servicios',
      image: 'https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=1600&q=80',
      alt: 'Racks de firewalls y switches del ecosistema Fortinet',
    },
    {
      id: 'ciberseguridad-endpoints',
      tag: 'CIBERSEGURIDAD Y ENDPOINTS',
      badgeClass: 'badge-warning',
      title: 'Ciberseguridad y Protección de Endpoints',
      subtitle: 'Defensa en profundidad con Microsoft Defender y respaldos inmutables de Acronis',
      description: 'Implementación de estrategias de defensa en profundidad. Desplegamos Microsoft Defender (XDR/EDR) para el bloqueo avanzado de malware y ransomware, respaldado por soluciones de Disaster Recovery y copias de seguridad inmutables con tecnología de Acronis.',
      ctaText: 'Ver ciberseguridad y endpoints',
      ctaLink: '/servicios',
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1600&q=80',
      alt: 'Equipos de seguridad y protección de endpoints',
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
