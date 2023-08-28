import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ITestEntity } from '../test-entity.model';
import { TestEntityService } from '../service/test-entity.service';

@Injectable({ providedIn: 'root' })
export class TestEntityRoutingResolveService implements Resolve<ITestEntity | null> {
  constructor(protected service: TestEntityService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITestEntity | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((testEntity: HttpResponse<ITestEntity>) => {
          if (testEntity.body) {
            return of(testEntity.body);
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
