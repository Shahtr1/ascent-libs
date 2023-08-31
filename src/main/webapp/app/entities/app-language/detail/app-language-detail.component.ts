import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAppLanguage } from '../app-language.model';

@Component({
  selector: 'jhi-app-language-detail',
  templateUrl: './app-language-detail.component.html',
})
export class AppLanguageDetailComponent implements OnInit {
  appLanguage: IAppLanguage | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ appLanguage }) => {
      this.appLanguage = appLanguage;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
