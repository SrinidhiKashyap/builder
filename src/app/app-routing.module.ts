import { NgModule } from "@angular/core";
import {Routes,RouterModule} from '@angular/router';
import { ModuleDisplay } from "./pages/module-display/module.display";
import { LoginComponent } from "./pages/login/login.component";
import { AuthenticationGuard } from "./services/authentication.guard";
import { PageEditorComponent } from "./pages/page-editor/page-editor.component";
import { HomepageComponent } from "./pages/homepage/homepage.component";

const routes:Routes=[
  { path:'',component:LoginComponent,pathMatch:'full'},
  { path:'module-display',component:ModuleDisplay,canActivate:[AuthenticationGuard]},
  { path: 'page-editor', component: PageEditorComponent},
  { path:'home',component:HomepageComponent,canActivate:[AuthenticationGuard]}
];

@NgModule({
  imports:[RouterModule.forRoot(routes)],
  exports:[RouterModule]
})

export class AppRoutingModule{}
