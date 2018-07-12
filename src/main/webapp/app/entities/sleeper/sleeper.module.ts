import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PartySleeperPlannerSharedModule } from 'app/shared';
import {
    SleeperComponent,
    SleeperDetailComponent,
    SleeperUpdateComponent,
    SleeperDeletePopupComponent,
    SleeperDeleteDialogComponent,
    sleeperRoute,
    sleeperPopupRoute
} from './';

const ENTITY_STATES = [...sleeperRoute, ...sleeperPopupRoute];

@NgModule({
    imports: [PartySleeperPlannerSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        SleeperComponent,
        SleeperDetailComponent,
        SleeperUpdateComponent,
        SleeperDeleteDialogComponent,
        SleeperDeletePopupComponent
    ],
    entryComponents: [SleeperComponent, SleeperUpdateComponent, SleeperDeleteDialogComponent, SleeperDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PartySleeperPlannerSleeperModule {}
