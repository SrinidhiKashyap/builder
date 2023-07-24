import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { ModuleDisplay } from './pages/module-display/module.display';
import { ServiceWorkerModule } from '@angular/service-worker';
import { ModuleSelectionComponent } from './pages/module-selection/module-selection.component';
import { ButtonModuleComponent } from './comps/button-module/button-module.component';
import { LabelModuleComponent } from './comps/label-module/label-module.component';
import { PageEditorComponent } from './pages/page-editor/page-editor.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { CommonUtils } from './services/common-utils';
import { AppCreationComponent } from './pages/app-creation/app-creation.component';
import { RadioButtonComponent } from './comps/radio-button/radio-button.component';
import { FieldModalComponent } from './pages/field-modal/field-modal.component';

@NgModule({
  declarations: [AppComponent,LoginComponent,ModuleDisplay,ModuleSelectionComponent,ButtonModuleComponent,LabelModuleComponent,PageEditorComponent,HomepageComponent,AppCreationComponent,RadioButtonComponent,FieldModalComponent],
  imports: [BrowserModule, IonicModule.forRoot(),FormsModule,AppRoutingModule, ServiceWorkerModule.register('ngsw-worker.js', {
  enabled: !isDevMode(),
  registrationStrategy: 'registerWhenStable:30000'
})],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },CommonUtils],
  bootstrap: [AppComponent],
})
export class AppModule {}
