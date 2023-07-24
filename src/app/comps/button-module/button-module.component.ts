import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button-module',
  template: '<ion-button>{{ label }}</ion-button>',
  styleUrls: ['./button-module.component.scss'],
})
export class ButtonModuleComponent {
  @Input() label!: string;
}
