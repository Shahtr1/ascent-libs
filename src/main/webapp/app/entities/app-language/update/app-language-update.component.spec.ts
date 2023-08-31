import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { AppLanguageFormService } from './app-language-form.service';
import { AppLanguageService } from '../service/app-language.service';
import { IAppLanguage } from '../app-language.model';

import { AppLanguageUpdateComponent } from './app-language-update.component';

describe('AppLanguage Management Update Component', () => {
  let comp: AppLanguageUpdateComponent;
  let fixture: ComponentFixture<AppLanguageUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let appLanguageFormService: AppLanguageFormService;
  let appLanguageService: AppLanguageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [AppLanguageUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(AppLanguageUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(AppLanguageUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    appLanguageFormService = TestBed.inject(AppLanguageFormService);
    appLanguageService = TestBed.inject(AppLanguageService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const appLanguage: IAppLanguage = { id: 456 };

      activatedRoute.data = of({ appLanguage });
      comp.ngOnInit();

      expect(comp.appLanguage).toEqual(appLanguage);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAppLanguage>>();
      const appLanguage = { id: 123 };
      jest.spyOn(appLanguageFormService, 'getAppLanguage').mockReturnValue(appLanguage);
      jest.spyOn(appLanguageService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ appLanguage });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: appLanguage }));
      saveSubject.complete();

      // THEN
      expect(appLanguageFormService.getAppLanguage).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(appLanguageService.update).toHaveBeenCalledWith(expect.objectContaining(appLanguage));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAppLanguage>>();
      const appLanguage = { id: 123 };
      jest.spyOn(appLanguageFormService, 'getAppLanguage').mockReturnValue({ id: null });
      jest.spyOn(appLanguageService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ appLanguage: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: appLanguage }));
      saveSubject.complete();

      // THEN
      expect(appLanguageFormService.getAppLanguage).toHaveBeenCalled();
      expect(appLanguageService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAppLanguage>>();
      const appLanguage = { id: 123 };
      jest.spyOn(appLanguageService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ appLanguage });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(appLanguageService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
