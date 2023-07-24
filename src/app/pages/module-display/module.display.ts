import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ModuleSelectionComponent } from '../module-selection/module-selection.component';
import { MODULE_DETAILS } from 'src/shared/constant/module-details';
import { NavController } from '@ionic/angular';
import { PageEditorComponent } from '../page-editor/page-editor.component';
import { CommonUtils } from 'src/app/services/common-utils';

@Component({
  selector: 'app-home',
  templateUrl: './module.display.html',
  styleUrls: ['./module.display.scss'],
})
export class ModuleDisplay implements OnInit {

  // Array of available modules
  availableModules = MODULE_DETAILS;
  // Array to store selected modules
  selectedModules: string[] = [];
  // Flag to indicate if the modal is open
  isModalOpen: boolean = false;

  constructor(
    private router: Router,
    private modalController: ModalController,
    private navController: NavController,
    private comms:CommonUtils,
  ) {}

  // Variable to store the logged-in user
  user = '';

  ngOnInit() {
    // Retrieve the logged-in user
    const loggedInUser = localStorage.getItem('userName');
    this.user = loggedInUser ?? 'Guest';

    // Retrieve stored modules from local storage
    const storedModules = localStorage.getItem(`selectedModules_${this.user}`);
    if (storedModules) {
      this.selectedModules = JSON.parse(storedModules);
    }
  }

  // Method to handle logout
  onLogout() {
    this.comms.onLogout();
  }

  // Method to open the module selection modal
  async openModuleSelection() {
    // Set the flag to indicate that the modal is open
    this.isModalOpen = true;

    // Create and present the modal
    const modal = await this.modalController.create({
      component: ModuleSelectionComponent,
      componentProps: {
        availableModules: this.availableModules,
      },
      cssClass: 'custom-modal',
    });

    // Handle the dismiss event of the modal
    modal.onDidDismiss().then((result) => {
      if (result.role === 'cancel') {
        console.log('Module selection cancelled');
      } else {
        // Update the selected modules array
        this.selectedModules = Object.keys(result.data);
        // Store the selected modules in local storage
        localStorage.setItem(
          `selectedModules_${this.user}`,
          JSON.stringify(this.selectedModules)
        );
      }
      // Set the flag to indicate that the modal is closed
      this.isModalOpen = false;
    });

    // Present the modal
    return await modal.present();
  }

  // Method to create tabs based on selected modules
  createTabs() {}

  openPageEditor(module:string){
    localStorage.setItem('currentModule',module);
    this.navController.navigateForward('/page-editor', { state: { module } });
  }

  goBack(){
    this.comms.goBack();
  }

}
