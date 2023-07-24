import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-creation-modal',
  templateUrl: './app-creation.component.html',
  styleUrls: ['./app-creation.component.scss'],
})
export class AppCreationComponent implements OnInit {
  appName: string = '';
  appIcon: File | null = null;


  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  onFileChange(event: any) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.appIcon = fileList[0];
    }
  }

  confirmAppCreation() {
    if (this.appName) {
      this.modalController.dismiss({ appName: this.appName, appIcon: this.appIcon }, 'confirm');
    }
  }

  goBack() {
    this.modalController.dismiss(null, 'cancel');
  }
}
