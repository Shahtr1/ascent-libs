import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { AppLabelFormService } from './app-label-form.service';
import { AppLabelService } from '../service/app-label.service';
import { IAppLabel } from '../app-label.model';
import { IAppLanguage } from 'app/entities/app-language/app-language.model';
import { AppLanguageService } from 'app/entities/app-language/service/app-language.service';

import { AppLabelUpdateComponent } from './app-label-update.component';

describe('AppLabel Management Update Component', () => {
  let comp: AppLabelUpdateComponent;
  let fixture: ComponentFixture<AppLabelUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let appLabelFormService: AppLabelFormService;
  let appLabelService: AppLabelService;
  let appLanguageService: AppLanguageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [AppLabelUpdateComponent],
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
      .overrideTemplate(AppLabelUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(AppLabelUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    appLabelFormService = TestBed.inject(AppLabelFormService);
    appLabelService = TestBed.inject(AppLabelService);
    appLanguageService = TestBed.inject(AppLanguageService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call AppLanguage query and add missing value', () => {
      const appLabel: IAppLabel = { id: 456 };
      const language: IAppLanguage = { id: 37319 };
      appLabel.language = language;

      const appLanguageCollection: IAppLanguage[] = [{ id: 98064 }];
      jest.spyOn(appLanguageService, 'query').mockReturnValue(of(new HttpResponse({ body: appLanguageCollection })));
      const additionalAppLanguages = [language];
      const expectedCollection: IAppLanguage[] = [...additionalAppLanguages, ...appLanguageCollection];
      jest.spyOn(appLanguageService, 'addAppLanguageToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ appLabel });
      comp.ngOnInit();

      expect(appLanguageService.query).toHaveBeenCalled();
      expect(appLanguageService.addAppLanguageToCollectionIfMissing).toHaveBeenCalledWith(
        appLanguageCollection,
        ...additionalAppLanguages.map(expect.objectContaining)
      );
      expect(comp.appLanguagesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const appLabel: IAppLabel = { id: 456 };
      const language: IAppLanguage = { id: 31325 };
      appLabel.language = language;

      activatedRoute.data = of({ appLabel });
      comp.ngOnInit();

      expect(comp.appLanguagesSharedCollection).toContain(language);
      expect(comp.appLabel).toEqual(appLabel);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAppLabel>>();
      const appLabel = { id: 123 };
      jest.spyOn(appLabelFormService, 'getAppLabel').mockReturnValue(appLabel);
      jest.spyOn(appLabelService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ appLabel });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: appLabel }));
      saveSubject.complete();

      // THEN
      expect(appLabelFormService.getAppLabel).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(appLabelService.update).toHaveBeenCalledWith(expect.objectContaining(appLabel));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAppLabel>>();
      const appLabel = { id: 123 };
      jest.spyOn(appLabelFormService, 'getAppLabel').mockReturnValue({ id: null });
      jest.spyOn(appLabelService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ appLabel: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: appLabel }));
      saveSubject.complete();

      // THEN
      expect(appLabelFormService.getAppLabel).toHaveBeenCalled();
      expect(appLabelService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAppLabel>>();
      const appLabel = { id: 123 };
      jest.spyOn(appLabelService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ appLabel });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(appLabelService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareAppLanguage', () => {
      it('Should forward to appLanguageService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(appLanguageService, 'compareAppLanguage');
        comp.compareAppLanguage(entity, entity2);
        expect(appLanguageService.compareAppLanguage).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
