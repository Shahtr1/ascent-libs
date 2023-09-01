import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IClientAccount } from '../client-account.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../client-account.test-samples';

import { ClientAccountService } from './client-account.service';

const requireRestSample: IClientAccount = {
  ...sampleWithRequiredData,
};

describe('ClientAccount Service', () => {
  let service: ClientAccountService;
  let httpMock: HttpTestingController;
  let expectedResult: IClientAccount | IClientAccount[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ClientAccountService);
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

    it('should create a ClientAccount', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const clientAccount = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(clientAccount).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a ClientAccount', () => {
      const clientAccount = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(clientAccount).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a ClientAccount', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of ClientAccount', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a ClientAccount', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addClientAccountToCollectionIfMissing', () => {
      it('should add a ClientAccount to an empty array', () => {
        const clientAccount: IClientAccount = sampleWithRequiredData;
        expectedResult = service.addClientAccountToCollectionIfMissing([], clientAccount);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(clientAccount);
      });

      it('should not add a ClientAccount to an array that contains it', () => {
        const clientAccount: IClientAccount = sampleWithRequiredData;
        const clientAccountCollection: IClientAccount[] = [
          {
            ...clientAccount,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addClientAccountToCollectionIfMissing(clientAccountCollection, clientAccount);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a ClientAccount to an array that doesn't contain it", () => {
        const clientAccount: IClientAccount = sampleWithRequiredData;
        const clientAccountCollection: IClientAccount[] = [sampleWithPartialData];
        expectedResult = service.addClientAccountToCollectionIfMissing(clientAccountCollection, clientAccount);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(clientAccount);
      });

      it('should add only unique ClientAccount to an array', () => {
        const clientAccountArray: IClientAccount[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const clientAccountCollection: IClientAccount[] = [sampleWithRequiredData];
        expectedResult = service.addClientAccountToCollectionIfMissing(clientAccountCollection, ...clientAccountArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const clientAccount: IClientAccount = sampleWithRequiredData;
        const clientAccount2: IClientAccount = sampleWithPartialData;
        expectedResult = service.addClientAccountToCollectionIfMissing([], clientAccount, clientAccount2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(clientAccount);
        expect(expectedResult).toContain(clientAccount2);
      });

      it('should accept null and undefined values', () => {
        const clientAccount: IClientAccount = sampleWithRequiredData;
        expectedResult = service.addClientAccountToCollectionIfMissing([], null, clientAccount, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(clientAccount);
      });

      it('should return initial array if no ClientAccount is added', () => {
        const clientAccountCollection: IClientAccount[] = [sampleWithRequiredData];
        expectedResult = service.addClientAccountToCollectionIfMissing(clientAccountCollection, undefined, null);
        expect(expectedResult).toEqual(clientAccountCollection);
      });
    });

    describe('compareClientAccount', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareClientAccount(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareClientAccount(entity1, entity2);
        const compareResult2 = service.compareClientAccount(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareClientAccount(entity1, entity2);
        const compareResult2 = service.compareClientAccount(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareClientAccount(entity1, entity2);
        const compareResult2 = service.compareClientAccount(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
