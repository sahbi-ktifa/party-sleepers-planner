/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PartySleeperPlannerTestModule } from '../../../test.module';
import { SleeperComponent } from 'app/entities/sleeper/sleeper.component';
import { SleeperService } from 'app/entities/sleeper/sleeper.service';
import { Sleeper } from 'app/shared/model/sleeper.model';

describe('Component Tests', () => {
    describe('Sleeper Management Component', () => {
        let comp: SleeperComponent;
        let fixture: ComponentFixture<SleeperComponent>;
        let service: SleeperService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PartySleeperPlannerTestModule],
                declarations: [SleeperComponent],
                providers: []
            })
                .overrideTemplate(SleeperComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(SleeperComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SleeperService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Sleeper(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.sleepers[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
