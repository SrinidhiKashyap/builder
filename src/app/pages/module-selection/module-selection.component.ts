import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MODULE_DETAILS } from 'src/shared/constant/module-details';

@Component({
  selector: 'app-module-selection',
  templateUrl: './module-selection.component.html',
  styleUrls: ['./module-selection.component.scss'],
})
export class ModuleSelectionComponent implements OnInit {
  availableModules = MODULE_DETAILS;
  selectedModules: { [key: string]: boolean } = {};
  selectModules: string[] = [];
  descriptionsVisible: { [key: string]: boolean } = {};
  user = localStorage.getItem('userName');
  constructor(private modalController: ModalController) {}

  ngOnInit() {

    const storedModules = localStorage.getItem(`selectedModules_${this.user}`);
    console.log(storedModules);
    if (storedModules) {
      this.selectModules = JSON.parse(storedModules);
      console.log(this.selectModules);
      // Initialize the checkboxes for the selected modules

    }
    for (const module of this.selectModules) {
      this.selectedModules[module] = true;

  }
    console.log(this.selectedModules);
  }

  /**
   * Toggle the selection of a module.
   * @param module The name of the module.
   */
  toggleModule(module: string) {
    if (this.selectedModules[module]) {
      delete this.selectedModules[module];
    } else {
      this.selectedModules[module] = true;
    }
    console.log(this.selectedModules[module]);
  }

  /**
   * Go back and dismiss the modal.
   */
  goBack() {
    this.modalController.dismiss(null, 'cancel');
  }

  clearSelections() {
    this.selectedModules = {}; // Reset the selectedModules object
  }


  /**
   * Save the selected modules and dismiss the modal.
   */
  saveSelections() {
    const selectedModules: { [key: string]: boolean } = {};

    for (const module in this.selectedModules) {
      if (this.selectedModules.hasOwnProperty(module) && this.selectedModules[module]) {
        selectedModules[module] = true;
      }
    }

    this.modalController.dismiss(selectedModules);
  }

  /**
   * Show the description of a module on mouse enter.
   * @param module The name of the module.
   */
  showDescription(module: string) {
    this.descriptionsVisible[module] = true;
  }

  /**
   * Hide the description of a module on mouse leave.
   * @param module The name of the module.
   */
  hideDescription(module: string) {
    this.descriptionsVisible[module] = false;
  }

  toggleDescription(module: string) {
    this.descriptionsVisible[module] = !this.descriptionsVisible[module];
  }

}
