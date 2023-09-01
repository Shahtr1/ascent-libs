import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ClientAccountFormService } from './client-account-form.service';
import { ClientAccountService } from '../service/client-account.service';
import { IClientAccount } from '../client-account.model';

import { ClientAccountUpdateComponent } from './client-account-update.component';

describe('ClientAccount Management Update Component', () => {
  let comp: ClientAccountUpdateComponent;
  let fixture: ComponentFixture<ClientAccountUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let clientAccountFormService: ClientAccountFormService;
  let clientAccountService: ClientAccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [ClientAccountUpdateComponent],
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
      .overrideTemplate(ClientAccountUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ClientAccountUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    clientAccountFormService = TestBed.inject(ClientAccountFormService);
    clientAccountService = TestBed.inject(ClientAccountService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const clientAccount: IClientAccount = { id: 456 };

      activatedRoute.data = of({ clientAccount });
      comp.ngOnInit();

      expect(comp.clientAccount).toEqual(clientAccount);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IClientAccount>>();
      const clientAccount = { id: 123 };
      jest.spyOn(clientAccountFormService, 'getClientAccount').mockReturnValue(clientAccount);
      jest.spyOn(clientAccountService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ clientAccount });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: clientAccount }));
      saveSubject.complete();

      // THEN
      expect(clientAccountFormService.getClientAccount).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(clientAccountService.update).toHaveBeenCalledWith(expect.objectContaining(clientAccount));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IClientAccount>>();
      const clientAccount = { id: 123 };
      jest.spyOn(clientAccountFormService, 'getClientAccount').mockReturnValue({ id: null });
      jest.spyOn(clientAccountService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ clientAccount: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: clientAccount }));
      saveSubject.complete();

      // THEN
      expect(clientAccountFormService.getClientAccount).toHaveBeenCalled();
      expect(clientAccountService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IClientAccount>>();
      const clientAccount = { id: 123 };
      jest.spyOn(clientAccountService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ clientAccount });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(clientAccountService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
