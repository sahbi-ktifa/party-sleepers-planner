import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ISleeper } from 'app/shared/model/sleeper.model';
import { Principal } from 'app/core';
import { SleeperService } from './sleeper.service';

@Component({
    selector: 'jhi-sleeper',
    templateUrl: './sleeper.component.html',
    styles: ['.not-assigned { background-color: #e06e79 !important; }']
})
export class SleeperComponent implements OnInit, OnDestroy {
    sleepers: ISleeper[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private sleeperService: SleeperService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.sleeperService.query().subscribe(
            (res: HttpResponse<ISleeper[]>) => {
                this.sleepers = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInSleepers();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ISleeper) {
        return item.id;
    }

    registerChangeInSleepers() {
        this.eventSubscriber = this.eventManager.subscribe('sleeperListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
