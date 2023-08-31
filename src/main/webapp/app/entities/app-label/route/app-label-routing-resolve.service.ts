import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IAppLabel } from '../app-label.model';
import { AppLabelService } from '../service/app-label.service';

@Injectable({ providedIn: 'root' })
export class AppLabelRoutingResolveService implements Resolve<IAppLabel | null> {
  constructor(protected service: AppLabelService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAppLabel | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((appLabel: HttpResponse<IAppLabel>) => {
          if (appLabel.body) {
            return of(appLabel.body);
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
