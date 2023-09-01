import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ClientAccountDetailComponent } from './client-account-detail.component';

describe('ClientAccount Management Detail Component', () => {
  let comp: ClientAccountDetailComponent;
  let fixture: ComponentFixture<ClientAccountDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientAccountDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ clientAccount: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(ClientAccountDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(ClientAccountDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load clientAccount on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.clientAccount).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
