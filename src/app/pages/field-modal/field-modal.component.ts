import { Component, Output, EventEmitter } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-field-modal',
  templateUrl: './field-modal.component.html',
  styleUrls: ['./field-modal.component.scss'],
})
export class FieldModalComponent {
  @Output() fieldAdded: EventEmitter<string> = new EventEmitter<string>();
  selectedFieldType: string = '';
  fieldName: string = '';

  constructor(private modalController: ModalController) {}

  addFieldModule(fieldName:string) {
    this.fieldAdded.emit(fieldName);
    this.fieldName = fieldName;
    console.log(this.fieldName,fieldName);
    this.dismissModal();
  }

  dismissModal() {
    this.modalController.dismiss(this.fieldName,this.selectedFieldType);
  }
}
