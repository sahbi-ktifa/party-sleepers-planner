/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { PartySleeperPlannerTestModule } from '../../../test.module';
import { SleeperUpdateComponent } from 'app/entities/sleeper/sleeper-update.component';
import { SleeperService } from 'app/entities/sleeper/sleeper.service';
import { Sleeper } from 'app/shared/model/sleeper.model';

describe('Component Tests', () => {
    describe('Sleeper Management Update Component', () => {
        let comp: SleeperUpdateComponent;
        let fixture: ComponentFixture<SleeperUpdateComponent>;
        let service: SleeperService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PartySleeperPlannerTestModule],
                declarations: [SleeperUpdateComponent]
            })
                .overrideTemplate(SleeperUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(SleeperUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SleeperService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Sleeper(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.sleeper = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Sleeper();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.sleeper = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
