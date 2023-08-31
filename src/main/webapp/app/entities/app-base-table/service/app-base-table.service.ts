import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IAppBaseTable, NewAppBaseTable } from '../app-base-table.model';

export type PartialUpdateAppBaseTable = Partial<IAppBaseTable> & Pick<IAppBaseTable, 'id'>;

export type EntityResponseType = HttpResponse<IAppBaseTable>;
export type EntityArrayResponseType = HttpResponse<IAppBaseTable[]>;

@Injectable({ providedIn: 'root' })
export class AppBaseTableService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/app-base-tables');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(appBaseTable: NewAppBaseTable): Observable<EntityResponseType> {
    return this.http.post<IAppBaseTable>(this.resourceUrl, appBaseTable, { observe: 'response' });
  }

  update(appBaseTable: IAppBaseTable): Observable<EntityResponseType> {
    return this.http.put<IAppBaseTable>(`${this.resourceUrl}/${this.getAppBaseTableIdentifier(appBaseTable)}`, appBaseTable, {
      observe: 'response',
    });
  }

  partialUpdate(appBaseTable: PartialUpdateAppBaseTable): Observable<EntityResponseType> {
    return this.http.patch<IAppBaseTable>(`${this.resourceUrl}/${this.getAppBaseTableIdentifier(appBaseTable)}`, appBaseTable, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IAppBaseTable>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAppBaseTable[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getAppBaseTableIdentifier(appBaseTable: Pick<IAppBaseTable, 'id'>): number {
    return appBaseTable.id;
  }

  compareAppBaseTable(o1: Pick<IAppBaseTable, 'id'> | null, o2: Pick<IAppBaseTable, 'id'> | null): boolean {
    return o1 && o2 ? this.getAppBaseTableIdentifier(o1) === this.getAppBaseTableIdentifier(o2) : o1 === o2;
  }

  addAppBaseTableToCollectionIfMissing<Type extends Pick<IAppBaseTable, 'id'>>(
    appBaseTableCollection: Type[],
    ...appBaseTablesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const appBaseTables: Type[] = appBaseTablesToCheck.filter(isPresent);
    if (appBaseTables.length > 0) {
      const appBaseTableCollectionIdentifiers = appBaseTableCollection.map(
        appBaseTableItem => this.getAppBaseTableIdentifier(appBaseTableItem)!
      );
      const appBaseTablesToAdd = appBaseTables.filter(appBaseTableItem => {
        const appBaseTableIdentifier = this.getAppBaseTableIdentifier(appBaseTableItem);
        if (appBaseTableCollectionIdentifiers.includes(appBaseTableIdentifier)) {
          return false;
        }
        appBaseTableCollectionIdentifiers.push(appBaseTableIdentifier);
        return true;
      });
      return [...appBaseTablesToAdd, ...appBaseTableCollection];
    }
    return appBaseTableCollection;
  }
}
