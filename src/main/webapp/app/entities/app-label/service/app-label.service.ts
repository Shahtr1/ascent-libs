import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IAppLabel, NewAppLabel } from '../app-label.model';

export type PartialUpdateAppLabel = Partial<IAppLabel> & Pick<IAppLabel, 'id'>;

export type EntityResponseType = HttpResponse<IAppLabel>;
export type EntityArrayResponseType = HttpResponse<IAppLabel[]>;

@Injectable({ providedIn: 'root' })
export class AppLabelService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/app-labels');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(appLabel: NewAppLabel): Observable<EntityResponseType> {
    return this.http.post<IAppLabel>(this.resourceUrl, appLabel, { observe: 'response' });
  }

  update(appLabel: IAppLabel): Observable<EntityResponseType> {
    return this.http.put<IAppLabel>(`${this.resourceUrl}/${this.getAppLabelIdentifier(appLabel)}`, appLabel, { observe: 'response' });
  }

  partialUpdate(appLabel: PartialUpdateAppLabel): Observable<EntityResponseType> {
    return this.http.patch<IAppLabel>(`${this.resourceUrl}/${this.getAppLabelIdentifier(appLabel)}`, appLabel, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IAppLabel>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAppLabel[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getAppLabelIdentifier(appLabel: Pick<IAppLabel, 'id'>): number {
    return appLabel.id;
  }

  compareAppLabel(o1: Pick<IAppLabel, 'id'> | null, o2: Pick<IAppLabel, 'id'> | null): boolean {
    return o1 && o2 ? this.getAppLabelIdentifier(o1) === this.getAppLabelIdentifier(o2) : o1 === o2;
  }

  addAppLabelToCollectionIfMissing<Type extends Pick<IAppLabel, 'id'>>(
    appLabelCollection: Type[],
    ...appLabelsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const appLabels: Type[] = appLabelsToCheck.filter(isPresent);
    if (appLabels.length > 0) {
      const appLabelCollectionIdentifiers = appLabelCollection.map(appLabelItem => this.getAppLabelIdentifier(appLabelItem)!);
      const appLabelsToAdd = appLabels.filter(appLabelItem => {
        const appLabelIdentifier = this.getAppLabelIdentifier(appLabelItem);
        if (appLabelCollectionIdentifiers.includes(appLabelIdentifier)) {
          return false;
        }
        appLabelCollectionIdentifiers.push(appLabelIdentifier);
        return true;
      });
      return [...appLabelsToAdd, ...appLabelCollection];
    }
    return appLabelCollection;
  }
}
