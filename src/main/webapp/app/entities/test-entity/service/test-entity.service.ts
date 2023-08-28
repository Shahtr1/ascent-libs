import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ITestEntity, NewTestEntity } from '../test-entity.model';

export type PartialUpdateTestEntity = Partial<ITestEntity> & Pick<ITestEntity, 'id'>;

export type EntityResponseType = HttpResponse<ITestEntity>;
export type EntityArrayResponseType = HttpResponse<ITestEntity[]>;

@Injectable({ providedIn: 'root' })
export class TestEntityService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/test-entities');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(testEntity: NewTestEntity): Observable<EntityResponseType> {
    return this.http.post<ITestEntity>(this.resourceUrl, testEntity, { observe: 'response' });
  }

  update(testEntity: ITestEntity): Observable<EntityResponseType> {
    return this.http.put<ITestEntity>(`${this.resourceUrl}/${this.getTestEntityIdentifier(testEntity)}`, testEntity, {
      observe: 'response',
    });
  }

  partialUpdate(testEntity: PartialUpdateTestEntity): Observable<EntityResponseType> {
    return this.http.patch<ITestEntity>(`${this.resourceUrl}/${this.getTestEntityIdentifier(testEntity)}`, testEntity, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITestEntity>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITestEntity[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getTestEntityIdentifier(testEntity: Pick<ITestEntity, 'id'>): number {
    return testEntity.id;
  }

  compareTestEntity(o1: Pick<ITestEntity, 'id'> | null, o2: Pick<ITestEntity, 'id'> | null): boolean {
    return o1 && o2 ? this.getTestEntityIdentifier(o1) === this.getTestEntityIdentifier(o2) : o1 === o2;
  }

  addTestEntityToCollectionIfMissing<Type extends Pick<ITestEntity, 'id'>>(
    testEntityCollection: Type[],
    ...testEntitiesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const testEntities: Type[] = testEntitiesToCheck.filter(isPresent);
    if (testEntities.length > 0) {
      const testEntityCollectionIdentifiers = testEntityCollection.map(testEntityItem => this.getTestEntityIdentifier(testEntityItem)!);
      const testEntitiesToAdd = testEntities.filter(testEntityItem => {
        const testEntityIdentifier = this.getTestEntityIdentifier(testEntityItem);
        if (testEntityCollectionIdentifiers.includes(testEntityIdentifier)) {
          return false;
        }
        testEntityCollectionIdentifiers.push(testEntityIdentifier);
        return true;
      });
      return [...testEntitiesToAdd, ...testEntityCollection];
    }
    return testEntityCollection;
  }
}
