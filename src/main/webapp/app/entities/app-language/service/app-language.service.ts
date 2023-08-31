import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IAppLanguage, NewAppLanguage } from '../app-language.model';

export type PartialUpdateAppLanguage = Partial<IAppLanguage> & Pick<IAppLanguage, 'id'>;

export type EntityResponseType = HttpResponse<IAppLanguage>;
export type EntityArrayResponseType = HttpResponse<IAppLanguage[]>;

@Injectable({ providedIn: 'root' })
export class AppLanguageService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/app-languages');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(appLanguage: NewAppLanguage): Observable<EntityResponseType> {
    return this.http.post<IAppLanguage>(this.resourceUrl, appLanguage, { observe: 'response' });
  }

  update(appLanguage: IAppLanguage): Observable<EntityResponseType> {
    return this.http.put<IAppLanguage>(`${this.resourceUrl}/${this.getAppLanguageIdentifier(appLanguage)}`, appLanguage, {
      observe: 'response',
    });
  }

  partialUpdate(appLanguage: PartialUpdateAppLanguage): Observable<EntityResponseType> {
    return this.http.patch<IAppLanguage>(`${this.resourceUrl}/${this.getAppLanguageIdentifier(appLanguage)}`, appLanguage, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IAppLanguage>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAppLanguage[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getAppLanguageIdentifier(appLanguage: Pick<IAppLanguage, 'id'>): number {
    return appLanguage.id;
  }

  compareAppLanguage(o1: Pick<IAppLanguage, 'id'> | null, o2: Pick<IAppLanguage, 'id'> | null): boolean {
    return o1 && o2 ? this.getAppLanguageIdentifier(o1) === this.getAppLanguageIdentifier(o2) : o1 === o2;
  }

  addAppLanguageToCollectionIfMissing<Type extends Pick<IAppLanguage, 'id'>>(
    appLanguageCollection: Type[],
    ...appLanguagesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const appLanguages: Type[] = appLanguagesToCheck.filter(isPresent);
    if (appLanguages.length > 0) {
      const appLanguageCollectionIdentifiers = appLanguageCollection.map(
        appLanguageItem => this.getAppLanguageIdentifier(appLanguageItem)!
      );
      const appLanguagesToAdd = appLanguages.filter(appLanguageItem => {
        const appLanguageIdentifier = this.getAppLanguageIdentifier(appLanguageItem);
        if (appLanguageCollectionIdentifiers.includes(appLanguageIdentifier)) {
          return false;
        }
        appLanguageCollectionIdentifiers.push(appLanguageIdentifier);
        return true;
      });
      return [...appLanguagesToAdd, ...appLanguageCollection];
    }
    return appLanguageCollection;
  }
}
