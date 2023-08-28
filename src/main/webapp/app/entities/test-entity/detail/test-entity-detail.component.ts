import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITestEntity } from '../test-entity.model';

@Component({
  selector: 'jhi-test-entity-detail',
  templateUrl: './test-entity-detail.component.html',
})
export class TestEntityDetailComponent implements OnInit {
  testEntity: ITestEntity | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ testEntity }) => {
      this.testEntity = testEntity;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
