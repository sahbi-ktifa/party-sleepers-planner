/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { PartySleeperPlannerTestModule } from '../../../test.module';
import { SleeperDeleteDialogComponent } from 'app/entities/sleeper/sleeper-delete-dialog.component';
import { SleeperService } from 'app/entities/sleeper/sleeper.service';

describe('Component Tests', () => {
    describe('Sleeper Management Delete Component', () => {
        let comp: SleeperDeleteDialogComponent;
        let fixture: ComponentFixture<SleeperDeleteDialogComponent>;
        let service: SleeperService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PartySleeperPlannerTestModule],
                declarations: [SleeperDeleteDialogComponent]
            })
                .overrideTemplate(SleeperDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(SleeperDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SleeperService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it(
                'Should call delete service on confirmDelete',
                inject(
                    [],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });
});
