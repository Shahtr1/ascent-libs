import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { AppLanguageDetailComponent } from './app-language-detail.component';

describe('AppLanguage Management Detail Component', () => {
  let comp: AppLanguageDetailComponent;
  let fixture: ComponentFixture<AppLanguageDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppLanguageDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ appLanguage: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(AppLanguageDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(AppLanguageDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load appLanguage on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.appLanguage).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
