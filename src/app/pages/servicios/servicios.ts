import { Component, inject } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-servicios',
  imports: [],
  templateUrl: './servicios.html',
})
export class Servicios {
  constructor() {
    inject(Meta).updateTag({
      name: 'description',
      content:
        'Servicios de instalación física y digital de telefonía, cómputo, redes físicas y virtuales, conmutadores, grabadores y sistemas de seguridad.',
    });
  }
}
