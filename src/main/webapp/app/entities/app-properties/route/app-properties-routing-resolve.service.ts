import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IAppProperties } from '../app-properties.model';
import { AppPropertiesService } from '../service/app-properties.service';

@Injectable({ providedIn: 'root' })
export class AppPropertiesRoutingResolveService implements Resolve<IAppProperties | null> {
  constructor(protected service: AppPropertiesService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAppProperties | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((appProperties: HttpResponse<IAppProperties>) => {
          if (appProperties.body) {
            return of(appProperties.body);
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
