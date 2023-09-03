import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { AppPropertiesFormService } from './app-properties-form.service';
import { AppPropertiesService } from '../service/app-properties.service';
import { IAppProperties } from '../app-properties.model';

import { AppPropertiesUpdateComponent } from './app-properties-update.component';

describe('AppProperties Management Update Component', () => {
  let comp: AppPropertiesUpdateComponent;
  let fixture: ComponentFixture<AppPropertiesUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let appPropertiesFormService: AppPropertiesFormService;
  let appPropertiesService: AppPropertiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [AppPropertiesUpdateComponent],
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
      .overrideTemplate(AppPropertiesUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(AppPropertiesUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    appPropertiesFormService = TestBed.inject(AppPropertiesFormService);
    appPropertiesService = TestBed.inject(AppPropertiesService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const appProperties: IAppProperties = { id: 456 };

      activatedRoute.data = of({ appProperties });
      comp.ngOnInit();

      expect(comp.appProperties).toEqual(appProperties);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAppProperties>>();
      const appProperties = { id: 123 };
      jest.spyOn(appPropertiesFormService, 'getAppProperties').mockReturnValue(appProperties);
      jest.spyOn(appPropertiesService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ appProperties });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: appProperties }));
      saveSubject.complete();

      // THEN
      expect(appPropertiesFormService.getAppProperties).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(appPropertiesService.update).toHaveBeenCalledWith(expect.objectContaining(appProperties));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAppProperties>>();
      const appProperties = { id: 123 };
      jest.spyOn(appPropertiesFormService, 'getAppProperties').mockReturnValue({ id: null });
      jest.spyOn(appPropertiesService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ appProperties: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: appProperties }));
      saveSubject.complete();

      // THEN
      expect(appPropertiesFormService.getAppProperties).toHaveBeenCalled();
      expect(appPropertiesService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAppProperties>>();
      const appProperties = { id: 123 };
      jest.spyOn(appPropertiesService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ appProperties });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(appPropertiesService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
