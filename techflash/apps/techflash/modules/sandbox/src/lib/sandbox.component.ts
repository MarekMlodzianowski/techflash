import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'tech-techflash-sandbox',
  imports: [CommonModule],
  template: `<p>TechflashSandbox works!</p>`,
  styles: `
    :host {
      display: block;
    }
  `,
})
export class SandboxComponent {}
