import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { AppPropertiesDetailComponent } from './app-properties-detail.component';

describe('AppProperties Management Detail Component', () => {
  let comp: AppPropertiesDetailComponent;
  let fixture: ComponentFixture<AppPropertiesDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppPropertiesDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ appProperties: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(AppPropertiesDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(AppPropertiesDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load appProperties on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.appProperties).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
