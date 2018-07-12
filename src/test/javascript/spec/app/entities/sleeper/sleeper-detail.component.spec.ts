/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PartySleeperPlannerTestModule } from '../../../test.module';
import { SleeperDetailComponent } from 'app/entities/sleeper/sleeper-detail.component';
import { Sleeper } from 'app/shared/model/sleeper.model';

describe('Component Tests', () => {
    describe('Sleeper Management Detail Component', () => {
        let comp: SleeperDetailComponent;
        let fixture: ComponentFixture<SleeperDetailComponent>;
        const route = ({ data: of({ sleeper: new Sleeper(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PartySleeperPlannerTestModule],
                declarations: [SleeperDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(SleeperDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(SleeperDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.sleeper).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
