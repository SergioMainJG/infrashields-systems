import { Component, inject } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-contactanos',
  imports: [],
  templateUrl: './contactanos.html',
})
export class Contactanos {
  constructor() {
    inject(Meta).updateTag({
      name: 'description',
      content: 'Ponte en contacto con Infrashield Systems: teléfono, correo y horario de atención.',
    });
  }
}
