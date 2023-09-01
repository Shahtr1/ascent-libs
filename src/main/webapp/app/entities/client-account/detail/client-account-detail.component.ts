import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IClientAccount } from '../client-account.model';

@Component({
  selector: 'jhi-client-account-detail',
  templateUrl: './client-account-detail.component.html',
})
export class ClientAccountDetailComponent implements OnInit {
  clientAccount: IClientAccount | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ clientAccount }) => {
      this.clientAccount = clientAccount;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
