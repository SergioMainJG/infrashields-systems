import { Component, inject } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-quienes-somos',
  imports: [],
  templateUrl: './quienes-somos.html',
})
export class QuienesSomos {
  constructor() {
    inject(Meta).updateTag({
      name: 'description',
      content:
        'Conoce quiénes somos en Infrashield Systems: nuestra misión y visión como empresa de infraestructura tecnológica.',
    });
  }
}
