import { Component, inject } from "@angular/core";
import { Meta } from "@angular/platform-browser";
import { ImageCarousel } from "../../../image-carousel/image-carousel";
import { PartnerCarousel } from "../../../partner-carousel/partner-carousel";

@Component({
  selector: 'app-home',
  imports: [ImageCarousel, PartnerCarousel],
  templateUrl: './home.html',
})
export class Home {
  constructor() {
    inject(Meta).updateTag({
      name: 'description',
      content:
        'Infrashield Systems: instalación física y digital de infraestructura de telefonía, cómputo, redes, conmutadores, grabadores y sistemas de seguridad para tu empresa.',
    });
  }
}
