import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { TestEntityComponent } from './list/test-entity.component';
import { TestEntityDetailComponent } from './detail/test-entity-detail.component';
import { TestEntityUpdateComponent } from './update/test-entity-update.component';
import { TestEntityDeleteDialogComponent } from './delete/test-entity-delete-dialog.component';
import { TestEntityRoutingModule } from './route/test-entity-routing.module';

@NgModule({
  imports: [SharedModule, TestEntityRoutingModule],
  declarations: [TestEntityComponent, TestEntityDetailComponent, TestEntityUpdateComponent, TestEntityDeleteDialogComponent],
})
export class TestEntityModule {}
