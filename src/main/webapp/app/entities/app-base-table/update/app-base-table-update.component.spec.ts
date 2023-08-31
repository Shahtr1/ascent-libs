import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { AppBaseTableFormService } from './app-base-table-form.service';
import { AppBaseTableService } from '../service/app-base-table.service';
import { IAppBaseTable } from '../app-base-table.model';

import { AppBaseTableUpdateComponent } from './app-base-table-update.component';

describe('AppBaseTable Management Update Component', () => {
  let comp: AppBaseTableUpdateComponent;
  let fixture: ComponentFixture<AppBaseTableUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let appBaseTableFormService: AppBaseTableFormService;
  let appBaseTableService: AppBaseTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [AppBaseTableUpdateComponent],
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
      .overrideTemplate(AppBaseTableUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(AppBaseTableUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    appBaseTableFormService = TestBed.inject(AppBaseTableFormService);
    appBaseTableService = TestBed.inject(AppBaseTableService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const appBaseTable: IAppBaseTable = { id: 456 };

      activatedRoute.data = of({ appBaseTable });
      comp.ngOnInit();

      expect(comp.appBaseTable).toEqual(appBaseTable);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAppBaseTable>>();
      const appBaseTable = { id: 123 };
      jest.spyOn(appBaseTableFormService, 'getAppBaseTable').mockReturnValue(appBaseTable);
      jest.spyOn(appBaseTableService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ appBaseTable });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: appBaseTable }));
      saveSubject.complete();

      // THEN
      expect(appBaseTableFormService.getAppBaseTable).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(appBaseTableService.update).toHaveBeenCalledWith(expect.objectContaining(appBaseTable));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAppBaseTable>>();
      const appBaseTable = { id: 123 };
      jest.spyOn(appBaseTableFormService, 'getAppBaseTable').mockReturnValue({ id: null });
      jest.spyOn(appBaseTableService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ appBaseTable: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: appBaseTable }));
      saveSubject.complete();

      // THEN
      expect(appBaseTableFormService.getAppBaseTable).toHaveBeenCalled();
      expect(appBaseTableService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAppBaseTable>>();
      const appBaseTable = { id: 123 };
      jest.spyOn(appBaseTableService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ appBaseTable });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(appBaseTableService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
