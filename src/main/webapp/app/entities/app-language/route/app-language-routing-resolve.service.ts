import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IAppLanguage } from '../app-language.model';
import { AppLanguageService } from '../service/app-language.service';

@Injectable({ providedIn: 'root' })
export class AppLanguageRoutingResolveService implements Resolve<IAppLanguage | null> {
  constructor(protected service: AppLanguageService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAppLanguage | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((appLanguage: HttpResponse<IAppLanguage>) => {
          if (appLanguage.body) {
            return of(appLanguage.body);
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
