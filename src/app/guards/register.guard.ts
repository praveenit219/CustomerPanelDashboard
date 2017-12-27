import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { SettingsService } from '../services/settings.service';

@Injectable()
export class RegisterGuard implements CanActivate {

    constructor(private router: Router,
        private settingsSerivce: SettingsService) { }

    canActivate(): boolean {

        if (this.settingsSerivce.getSettings().allowRegistration) {
            return true;
        } else {
            this.router.navigateByUrl('/login');
            return false;
        }
    }
}
