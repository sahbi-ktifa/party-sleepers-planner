import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ISleeper } from 'app/shared/model/sleeper.model';
import { SleeperService } from './sleeper.service';
import { ILocation } from 'app/shared/model/location.model';
import { LocationService } from 'app/entities/location';

@Component({
    selector: 'jhi-sleeper-update',
    templateUrl: './sleeper-update.component.html'
})
export class SleeperUpdateComponent implements OnInit {
    private _sleeper: ISleeper;
    isSaving: boolean;

    locations: ILocation[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private sleeperService: SleeperService,
        private locationService: LocationService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ sleeper }) => {
            this.sleeper = sleeper;
        });
        this.locationService.query().subscribe(
            (res: HttpResponse<ILocation[]>) => {
                this.locations = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.sleeper.id !== undefined) {
            this.subscribeToSaveResponse(this.sleeperService.update(this.sleeper));
        } else {
            this.subscribeToSaveResponse(this.sleeperService.create(this.sleeper));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ISleeper>>) {
        result.subscribe((res: HttpResponse<ISleeper>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackLocationById(index: number, item: ILocation) {
        return item.id;
    }
    get sleeper() {
        return this._sleeper;
    }

    set sleeper(sleeper: ISleeper) {
        this._sleeper = sleeper;
    }
}
