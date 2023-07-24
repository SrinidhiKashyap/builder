import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { NavController } from "@ionic/angular";

@Injectable()
export class CommonUtils {
  constructor(private router:Router,private navCtrl:NavController) {}

  goBack(){
    this.navCtrl.back();
  }

  onLogout() {
    localStorage.removeItem('userName');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('appName');
    localStorage.removeItem('currentModule');
    this.router.navigate(['']);
  }
}
