import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ITestEntity } from '../test-entity.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../test-entity.test-samples';

import { TestEntityService } from './test-entity.service';

const requireRestSample: ITestEntity = {
  ...sampleWithRequiredData,
};

describe('TestEntity Service', () => {
  let service: TestEntityService;
  let httpMock: HttpTestingController;
  let expectedResult: ITestEntity | ITestEntity[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(TestEntityService);
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

    it('should create a TestEntity', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const testEntity = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(testEntity).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a TestEntity', () => {
      const testEntity = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(testEntity).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a TestEntity', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of TestEntity', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a TestEntity', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addTestEntityToCollectionIfMissing', () => {
      it('should add a TestEntity to an empty array', () => {
        const testEntity: ITestEntity = sampleWithRequiredData;
        expectedResult = service.addTestEntityToCollectionIfMissing([], testEntity);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(testEntity);
      });

      it('should not add a TestEntity to an array that contains it', () => {
        const testEntity: ITestEntity = sampleWithRequiredData;
        const testEntityCollection: ITestEntity[] = [
          {
            ...testEntity,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addTestEntityToCollectionIfMissing(testEntityCollection, testEntity);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a TestEntity to an array that doesn't contain it", () => {
        const testEntity: ITestEntity = sampleWithRequiredData;
        const testEntityCollection: ITestEntity[] = [sampleWithPartialData];
        expectedResult = service.addTestEntityToCollectionIfMissing(testEntityCollection, testEntity);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(testEntity);
      });

      it('should add only unique TestEntity to an array', () => {
        const testEntityArray: ITestEntity[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const testEntityCollection: ITestEntity[] = [sampleWithRequiredData];
        expectedResult = service.addTestEntityToCollectionIfMissing(testEntityCollection, ...testEntityArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const testEntity: ITestEntity = sampleWithRequiredData;
        const testEntity2: ITestEntity = sampleWithPartialData;
        expectedResult = service.addTestEntityToCollectionIfMissing([], testEntity, testEntity2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(testEntity);
        expect(expectedResult).toContain(testEntity2);
      });

      it('should accept null and undefined values', () => {
        const testEntity: ITestEntity = sampleWithRequiredData;
        expectedResult = service.addTestEntityToCollectionIfMissing([], null, testEntity, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(testEntity);
      });

      it('should return initial array if no TestEntity is added', () => {
        const testEntityCollection: ITestEntity[] = [sampleWithRequiredData];
        expectedResult = service.addTestEntityToCollectionIfMissing(testEntityCollection, undefined, null);
        expect(expectedResult).toEqual(testEntityCollection);
      });
    });

    describe('compareTestEntity', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareTestEntity(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareTestEntity(entity1, entity2);
        const compareResult2 = service.compareTestEntity(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareTestEntity(entity1, entity2);
        const compareResult2 = service.compareTestEntity(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareTestEntity(entity1, entity2);
        const compareResult2 = service.compareTestEntity(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
