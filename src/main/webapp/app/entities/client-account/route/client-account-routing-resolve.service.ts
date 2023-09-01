import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IClientAccount } from '../client-account.model';
import { ClientAccountService } from '../service/client-account.service';

@Injectable({ providedIn: 'root' })
export class ClientAccountRoutingResolveService implements Resolve<IClientAccount | null> {
  constructor(protected service: ClientAccountService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IClientAccount | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((clientAccount: HttpResponse<IClientAccount>) => {
          if (clientAccount.body) {
            return of(clientAccount.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(null);
  }
}
