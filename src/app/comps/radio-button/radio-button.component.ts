import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss'],
})
export class RadioButtonComponent {
  @Input() options: string[] = ['yes','no'];
  @Input() selectedValue: string = '';
  @Output() selectedValueChange: EventEmitter<string> = new EventEmitter<string>();
  @Input() label!: string;

  constructor() {}

  onSelectionChange(value: string) {
    this.selectedValue = value;
    this.selectedValueChange.emit(this.selectedValue);
  }
}
