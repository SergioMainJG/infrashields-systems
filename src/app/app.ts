import { Component, signal } from '@angular/core';
import { ImageCarousel } from '../image-carousel/image-carousel';

@Component({
  selector: 'app-root',
  imports: [ImageCarousel],
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('infrashield-systems');
}
