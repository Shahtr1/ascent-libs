import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IAppProperties, NewAppProperties } from '../app-properties.model';

export type PartialUpdateAppProperties = Partial<IAppProperties> & Pick<IAppProperties, 'id'>;

export type EntityResponseType = HttpResponse<IAppProperties>;
export type EntityArrayResponseType = HttpResponse<IAppProperties[]>;

@Injectable({ providedIn: 'root' })
export class AppPropertiesService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/app-properties');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(appProperties: NewAppProperties): Observable<EntityResponseType> {
    return this.http.post<IAppProperties>(this.resourceUrl, appProperties, { observe: 'response' });
  }

  update(appProperties: IAppProperties): Observable<EntityResponseType> {
    return this.http.put<IAppProperties>(`${this.resourceUrl}/${this.getAppPropertiesIdentifier(appProperties)}`, appProperties, {
      observe: 'response',
    });
  }

  partialUpdate(appProperties: PartialUpdateAppProperties): Observable<EntityResponseType> {
    return this.http.patch<IAppProperties>(`${this.resourceUrl}/${this.getAppPropertiesIdentifier(appProperties)}`, appProperties, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IAppProperties>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAppProperties[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getAppPropertiesIdentifier(appProperties: Pick<IAppProperties, 'id'>): number {
    return appProperties.id;
  }

  compareAppProperties(o1: Pick<IAppProperties, 'id'> | null, o2: Pick<IAppProperties, 'id'> | null): boolean {
    return o1 && o2 ? this.getAppPropertiesIdentifier(o1) === this.getAppPropertiesIdentifier(o2) : o1 === o2;
  }

  addAppPropertiesToCollectionIfMissing<Type extends Pick<IAppProperties, 'id'>>(
    appPropertiesCollection: Type[],
    ...appPropertiesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const appProperties: Type[] = appPropertiesToCheck.filter(isPresent);
    if (appProperties.length > 0) {
      const appPropertiesCollectionIdentifiers = appPropertiesCollection.map(
        appPropertiesItem => this.getAppPropertiesIdentifier(appPropertiesItem)!
      );
      const appPropertiesToAdd = appProperties.filter(appPropertiesItem => {
        const appPropertiesIdentifier = this.getAppPropertiesIdentifier(appPropertiesItem);
        if (appPropertiesCollectionIdentifiers.includes(appPropertiesIdentifier)) {
          return false;
        }
        appPropertiesCollectionIdentifiers.push(appPropertiesIdentifier);
        return true;
      });
      return [...appPropertiesToAdd, ...appPropertiesCollection];
    }
    return appPropertiesCollection;
  }
}
