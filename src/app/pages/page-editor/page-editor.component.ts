import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonUtils } from 'src/app/services/common-utils';
import { ModalController } from '@ionic/angular';
import { FieldModalComponent } from '../field-modal/field-modal.component';

@Component({
  selector: 'app-page-editor',
  templateUrl: './page-editor.component.html',
  styleUrls: ['./page-editor.component.scss'],
})
export class PageEditorComponent {
  @Input() head!: string;
  @Output() headChange: EventEmitter<string> = new EventEmitter<string>();
  isEditable: boolean = false;
  selectedFieldType!: string ;
  selectedModules: any[] = [];
  radioOptions: string[] = ['yes', 'no'];
  selectedRadioValue: string = '';

  constructor(private comms: CommonUtils, private modalController: ModalController) {}

  ngOnInit() {
    if (!this.head) {
      this.head = localStorage.getItem('currentModule') ?? 'Unknown';
    }
  }

  toggleEdit() {
    if (!this.isEditable) {
      this.isEditable = !this.isEditable;
    }
  }

  onHeadChange() {
    this.headChange.emit(this.head);
  }

  async openFieldModal() {
    const modal = await this.modalController.create({
      component: FieldModalComponent,
    });

    modal.onDidDismiss().then((result) => {
      console.log(result);
      console.log(this.selectedFieldType);
      if (result.data) {
        const fieldName = result.data as string;
        this.selectedFieldType=result.role as string;
        this.addFieldModule(fieldName);
      }
    });

    return await modal.present();
  }

  addFieldModule(fieldName: string) {
    if (this.selectedFieldType === 'button') {
      this.selectedModules.push({
        type: 'button',
        label: fieldName,
      });
    } else if (this.selectedFieldType === 'label') {
      this.selectedModules.push({
        type: 'label',
        text: fieldName,
      });
    } else if (this.selectedFieldType === 'radio') {
      this.selectedModules.push({
        type: 'radio',
        label: fieldName,
        options: this.radioOptions,
        selectedValue: this.selectedRadioValue,
      });
    }
    console.log(this.selectedModules);
  }

  onLabelChange(updatedLabel: string) {
    console.log(updatedLabel);
  }

  goBack() {
    this.comms.goBack();
  }

  onLogout() {
    this.comms.onLogout();
  }
}
