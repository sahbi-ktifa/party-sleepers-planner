import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISleeper } from 'app/shared/model/sleeper.model';
import { SleeperService } from './sleeper.service';

@Component({
    selector: 'jhi-sleeper-delete-dialog',
    templateUrl: './sleeper-delete-dialog.component.html'
})
export class SleeperDeleteDialogComponent {
    sleeper: ISleeper;

    constructor(private sleeperService: SleeperService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.sleeperService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'sleeperListModification',
                content: 'Deleted an sleeper'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-sleeper-delete-popup',
    template: ''
})
export class SleeperDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ sleeper }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(SleeperDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.sleeper = sleeper;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
