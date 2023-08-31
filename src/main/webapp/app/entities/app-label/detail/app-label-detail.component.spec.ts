import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { AppLabelDetailComponent } from './app-label-detail.component';

describe('AppLabel Management Detail Component', () => {
  let comp: AppLabelDetailComponent;
  let fixture: ComponentFixture<AppLabelDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppLabelDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ appLabel: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(AppLabelDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(AppLabelDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load appLabel on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.appLabel).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
