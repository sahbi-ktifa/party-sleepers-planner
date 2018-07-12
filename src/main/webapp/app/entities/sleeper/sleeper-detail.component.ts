import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISleeper } from 'app/shared/model/sleeper.model';

@Component({
    selector: 'jhi-sleeper-detail',
    templateUrl: './sleeper-detail.component.html'
})
export class SleeperDetailComponent implements OnInit {
    sleeper: ISleeper;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ sleeper }) => {
            this.sleeper = sleeper;
        });
    }

    previousState() {
        window.history.back();
    }
}
