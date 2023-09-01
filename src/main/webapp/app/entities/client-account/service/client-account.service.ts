import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IClientAccount, NewClientAccount } from '../client-account.model';

export type PartialUpdateClientAccount = Partial<IClientAccount> & Pick<IClientAccount, 'id'>;

export type EntityResponseType = HttpResponse<IClientAccount>;
export type EntityArrayResponseType = HttpResponse<IClientAccount[]>;

@Injectable({ providedIn: 'root' })
export class ClientAccountService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/client-accounts');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(clientAccount: NewClientAccount): Observable<EntityResponseType> {
    return this.http.post<IClientAccount>(this.resourceUrl, clientAccount, { observe: 'response' });
  }

  update(clientAccount: IClientAccount): Observable<EntityResponseType> {
    return this.http.put<IClientAccount>(`${this.resourceUrl}/${this.getClientAccountIdentifier(clientAccount)}`, clientAccount, {
      observe: 'response',
    });
  }

  partialUpdate(clientAccount: PartialUpdateClientAccount): Observable<EntityResponseType> {
    return this.http.patch<IClientAccount>(`${this.resourceUrl}/${this.getClientAccountIdentifier(clientAccount)}`, clientAccount, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IClientAccount>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IClientAccount[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getClientAccountIdentifier(clientAccount: Pick<IClientAccount, 'id'>): number {
    return clientAccount.id;
  }

  compareClientAccount(o1: Pick<IClientAccount, 'id'> | null, o2: Pick<IClientAccount, 'id'> | null): boolean {
    return o1 && o2 ? this.getClientAccountIdentifier(o1) === this.getClientAccountIdentifier(o2) : o1 === o2;
  }

  addClientAccountToCollectionIfMissing<Type extends Pick<IClientAccount, 'id'>>(
    clientAccountCollection: Type[],
    ...clientAccountsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const clientAccounts: Type[] = clientAccountsToCheck.filter(isPresent);
    if (clientAccounts.length > 0) {
      const clientAccountCollectionIdentifiers = clientAccountCollection.map(
        clientAccountItem => this.getClientAccountIdentifier(clientAccountItem)!
      );
      const clientAccountsToAdd = clientAccounts.filter(clientAccountItem => {
        const clientAccountIdentifier = this.getClientAccountIdentifier(clientAccountItem);
        if (clientAccountCollectionIdentifiers.includes(clientAccountIdentifier)) {
          return false;
        }
        clientAccountCollectionIdentifiers.push(clientAccountIdentifier);
        return true;
      });
      return [...clientAccountsToAdd, ...clientAccountCollection];
    }
    return clientAccountCollection;
  }
}
