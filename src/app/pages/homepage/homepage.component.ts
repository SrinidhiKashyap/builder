import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonUtils } from 'src/app/services/common-utils';
import { ModalController } from '@ionic/angular';
import { AppCreationComponent } from '../app-creation/app-creation.component';
@Component({
  selector: 'app-home',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent {

  appIcon: File | null = null;
  username : string = localStorage.getItem('userName') ?? "unknown";
  appData: { name: string; icon: string }[] = [];
  isModalOpen: boolean = false;
  constructor(private router: Router,private comms :CommonUtils,private modalController: ModalController,) {}


  async createNewApp() {
    this.isModalOpen = true;
    const modal = await this.modalController.create({
      component: AppCreationComponent,
      cssClass: 'app-creation-modal',
    });

    modal.onDidDismiss().then((result) => {
      if (result.role === 'confirm' && result.data) {
        const { appName, appIcon } = result.data;
        this.appData.push({ name: appName, icon: appIcon });
        localStorage.setItem(`appName_${this.username}`, JSON.stringify(this.appData));
      }
      this.isModalOpen = false;
    });

    return await modal.present();
  }

  onFileChange(event: any) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.appIcon = fileList[0];
    }
  }

  proceedToModuleSelection(appname:string) {

    localStorage.setItem(`currentApp`,appname );
    this.router.navigate(['module-display']);
  }

  onLogout()
  {
    this.comms.onLogout();
  }

  ngOnInit() {
    this.loadAppData();
  }

  loadAppData() {
    const storedAppData = localStorage.getItem(`appName_${this.username}`);
    if (storedAppData) {
      this.appData = JSON.parse(storedAppData);
    }
  }

  deleteApp(index: number) {
    this.appData.splice(index, 1);
    localStorage.setItem(`appName_${this.username}`, JSON.stringify(this.appData));
  }


}

