import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAppProperties } from '../app-properties.model';

@Component({
  selector: 'jhi-app-properties-detail',
  templateUrl: './app-properties-detail.component.html',
})
export class AppPropertiesDetailComponent implements OnInit {
  appProperties: IAppProperties | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ appProperties }) => {
      this.appProperties = appProperties;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
