import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IAppProperties } from '../app-properties.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../app-properties.test-samples';

import { AppPropertiesService } from './app-properties.service';

const requireRestSample: IAppProperties = {
  ...sampleWithRequiredData,
};

describe('AppProperties Service', () => {
  let service: AppPropertiesService;
  let httpMock: HttpTestingController;
  let expectedResult: IAppProperties | IAppProperties[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(AppPropertiesService);
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

    it('should create a AppProperties', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const appProperties = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(appProperties).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a AppProperties', () => {
      const appProperties = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(appProperties).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a AppProperties', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of AppProperties', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a AppProperties', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addAppPropertiesToCollectionIfMissing', () => {
      it('should add a AppProperties to an empty array', () => {
        const appProperties: IAppProperties = sampleWithRequiredData;
        expectedResult = service.addAppPropertiesToCollectionIfMissing([], appProperties);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(appProperties);
      });

      it('should not add a AppProperties to an array that contains it', () => {
        const appProperties: IAppProperties = sampleWithRequiredData;
        const appPropertiesCollection: IAppProperties[] = [
          {
            ...appProperties,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addAppPropertiesToCollectionIfMissing(appPropertiesCollection, appProperties);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a AppProperties to an array that doesn't contain it", () => {
        const appProperties: IAppProperties = sampleWithRequiredData;
        const appPropertiesCollection: IAppProperties[] = [sampleWithPartialData];
        expectedResult = service.addAppPropertiesToCollectionIfMissing(appPropertiesCollection, appProperties);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(appProperties);
      });

      it('should add only unique AppProperties to an array', () => {
        const appPropertiesArray: IAppProperties[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const appPropertiesCollection: IAppProperties[] = [sampleWithRequiredData];
        expectedResult = service.addAppPropertiesToCollectionIfMissing(appPropertiesCollection, ...appPropertiesArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const appProperties: IAppProperties = sampleWithRequiredData;
        const appProperties2: IAppProperties = sampleWithPartialData;
        expectedResult = service.addAppPropertiesToCollectionIfMissing([], appProperties, appProperties2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(appProperties);
        expect(expectedResult).toContain(appProperties2);
      });

      it('should accept null and undefined values', () => {
        const appProperties: IAppProperties = sampleWithRequiredData;
        expectedResult = service.addAppPropertiesToCollectionIfMissing([], null, appProperties, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(appProperties);
      });

      it('should return initial array if no AppProperties is added', () => {
        const appPropertiesCollection: IAppProperties[] = [sampleWithRequiredData];
        expectedResult = service.addAppPropertiesToCollectionIfMissing(appPropertiesCollection, undefined, null);
        expect(expectedResult).toEqual(appPropertiesCollection);
      });
    });

    describe('compareAppProperties', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareAppProperties(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareAppProperties(entity1, entity2);
        const compareResult2 = service.compareAppProperties(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareAppProperties(entity1, entity2);
        const compareResult2 = service.compareAppProperties(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareAppProperties(entity1, entity2);
        const compareResult2 = service.compareAppProperties(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
