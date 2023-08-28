import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { TestEntityFormService } from './test-entity-form.service';
import { TestEntityService } from '../service/test-entity.service';
import { ITestEntity } from '../test-entity.model';

import { TestEntityUpdateComponent } from './test-entity-update.component';

describe('TestEntity Management Update Component', () => {
  let comp: TestEntityUpdateComponent;
  let fixture: ComponentFixture<TestEntityUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let testEntityFormService: TestEntityFormService;
  let testEntityService: TestEntityService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [TestEntityUpdateComponent],
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
      .overrideTemplate(TestEntityUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(TestEntityUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    testEntityFormService = TestBed.inject(TestEntityFormService);
    testEntityService = TestBed.inject(TestEntityService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const testEntity: ITestEntity = { id: 456 };

      activatedRoute.data = of({ testEntity });
      comp.ngOnInit();

      expect(comp.testEntity).toEqual(testEntity);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITestEntity>>();
      const testEntity = { id: 123 };
      jest.spyOn(testEntityFormService, 'getTestEntity').mockReturnValue(testEntity);
      jest.spyOn(testEntityService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ testEntity });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: testEntity }));
      saveSubject.complete();

      // THEN
      expect(testEntityFormService.getTestEntity).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(testEntityService.update).toHaveBeenCalledWith(expect.objectContaining(testEntity));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITestEntity>>();
      const testEntity = { id: 123 };
      jest.spyOn(testEntityFormService, 'getTestEntity').mockReturnValue({ id: null });
      jest.spyOn(testEntityService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ testEntity: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: testEntity }));
      saveSubject.complete();

      // THEN
      expect(testEntityFormService.getTestEntity).toHaveBeenCalled();
      expect(testEntityService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITestEntity>>();
      const testEntity = { id: 123 };
      jest.spyOn(testEntityService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ testEntity });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(testEntityService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
