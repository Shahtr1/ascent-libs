import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IAppBaseTable } from '../app-base-table.model';
import { AppBaseTableService } from '../service/app-base-table.service';

@Injectable({ providedIn: 'root' })
export class AppBaseTableRoutingResolveService implements Resolve<IAppBaseTable | null> {
  constructor(protected service: AppBaseTableService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAppBaseTable | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((appBaseTable: HttpResponse<IAppBaseTable>) => {
          if (appBaseTable.body) {
            return of(appBaseTable.body);
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
