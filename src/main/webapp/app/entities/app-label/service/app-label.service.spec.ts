import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IAppLabel } from '../app-label.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../app-label.test-samples';

import { AppLabelService } from './app-label.service';

const requireRestSample: IAppLabel = {
  ...sampleWithRequiredData,
};

describe('AppLabel Service', () => {
  let service: AppLabelService;
  let httpMock: HttpTestingController;
  let expectedResult: IAppLabel | IAppLabel[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(AppLabelService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a AppLabel', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const appLabel = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(appLabel).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a AppLabel', () => {
      const appLabel = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(appLabel).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a AppLabel', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of AppLabel', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a AppLabel', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addAppLabelToCollectionIfMissing', () => {
      it('should add a AppLabel to an empty array', () => {
        const appLabel: IAppLabel = sampleWithRequiredData;
        expectedResult = service.addAppLabelToCollectionIfMissing([], appLabel);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(appLabel);
      });

      it('should not add a AppLabel to an array that contains it', () => {
        const appLabel: IAppLabel = sampleWithRequiredData;
        const appLabelCollection: IAppLabel[] = [
          {
            ...appLabel,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addAppLabelToCollectionIfMissing(appLabelCollection, appLabel);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a AppLabel to an array that doesn't contain it", () => {
        const appLabel: IAppLabel = sampleWithRequiredData;
        const appLabelCollection: IAppLabel[] = [sampleWithPartialData];
        expectedResult = service.addAppLabelToCollectionIfMissing(appLabelCollection, appLabel);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(appLabel);
      });

      it('should add only unique AppLabel to an array', () => {
        const appLabelArray: IAppLabel[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const appLabelCollection: IAppLabel[] = [sampleWithRequiredData];
        expectedResult = service.addAppLabelToCollectionIfMissing(appLabelCollection, ...appLabelArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const appLabel: IAppLabel = sampleWithRequiredData;
        const appLabel2: IAppLabel = sampleWithPartialData;
        expectedResult = service.addAppLabelToCollectionIfMissing([], appLabel, appLabel2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(appLabel);
        expect(expectedResult).toContain(appLabel2);
      });

      it('should accept null and undefined values', () => {
        const appLabel: IAppLabel = sampleWithRequiredData;
        expectedResult = service.addAppLabelToCollectionIfMissing([], null, appLabel, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(appLabel);
      });

      it('should return initial array if no AppLabel is added', () => {
        const appLabelCollection: IAppLabel[] = [sampleWithRequiredData];
        expectedResult = service.addAppLabelToCollectionIfMissing(appLabelCollection, undefined, null);
        expect(expectedResult).toEqual(appLabelCollection);
      });
    });

    describe('compareAppLabel', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareAppLabel(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareAppLabel(entity1, entity2);
        const compareResult2 = service.compareAppLabel(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareAppLabel(entity1, entity2);
        const compareResult2 = service.compareAppLabel(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareAppLabel(entity1, entity2);
        const compareResult2 = service.compareAppLabel(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
