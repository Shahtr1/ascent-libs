import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAppLabel } from '../app-label.model';

@Component({
  selector: 'jhi-app-label-detail',
  templateUrl: './app-label-detail.component.html',
})
export class AppLabelDetailComponent implements OnInit {
  appLabel: IAppLabel | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ appLabel }) => {
      this.appLabel = appLabel;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
