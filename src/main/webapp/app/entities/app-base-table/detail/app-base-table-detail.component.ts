import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAppBaseTable } from '../app-base-table.model';
import { DataUtils } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-app-base-table-detail',
  templateUrl: './app-base-table-detail.component.html',
})
export class AppBaseTableDetailComponent implements OnInit {
  appBaseTable: IAppBaseTable | null = null;

  constructor(protected dataUtils: DataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ appBaseTable }) => {
      this.appBaseTable = appBaseTable;
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    this.dataUtils.openFile(base64String, contentType);
  }

  previousState(): void {
    window.history.back();
  }
}
