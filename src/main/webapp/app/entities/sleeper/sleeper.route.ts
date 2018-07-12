import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable } from 'rxjs';
import { Sleeper } from 'app/shared/model/sleeper.model';
import { SleeperService } from './sleeper.service';
import { SleeperComponent } from './sleeper.component';
import { SleeperDetailComponent } from './sleeper-detail.component';
import { SleeperUpdateComponent } from './sleeper-update.component';
import { SleeperDeletePopupComponent } from './sleeper-delete-dialog.component';
import { ISleeper } from 'app/shared/model/sleeper.model';

@Injectable({ providedIn: 'root' })
export class SleeperResolve implements Resolve<ISleeper> {
    constructor(private service: SleeperService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).map((sleeper: HttpResponse<Sleeper>) => sleeper.body);
        }
        return Observable.of(new Sleeper());
    }
}

export const sleeperRoute: Routes = [
    {
        path: 'sleeper',
        component: SleeperComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'partySleeperPlannerApp.sleeper.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'sleeper/:id/view',
        component: SleeperDetailComponent,
        resolve: {
            sleeper: SleeperResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'partySleeperPlannerApp.sleeper.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'sleeper/new',
        component: SleeperUpdateComponent,
        resolve: {
            sleeper: SleeperResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'partySleeperPlannerApp.sleeper.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'sleeper/:id/edit',
        component: SleeperUpdateComponent,
        resolve: {
            sleeper: SleeperResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'partySleeperPlannerApp.sleeper.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const sleeperPopupRoute: Routes = [
    {
        path: 'sleeper/:id/delete',
        component: SleeperDeletePopupComponent,
        resolve: {
            sleeper: SleeperResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'partySleeperPlannerApp.sleeper.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
