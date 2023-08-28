import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TestEntityDetailComponent } from './test-entity-detail.component';

describe('TestEntity Management Detail Component', () => {
  let comp: TestEntityDetailComponent;
  let fixture: ComponentFixture<TestEntityDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestEntityDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ testEntity: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(TestEntityDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(TestEntityDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load testEntity on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.testEntity).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
