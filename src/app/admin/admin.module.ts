import { NgModule } from '@angular/core';
import { RichTextEditorModule } from '@syncfusion/ej2-angular-richtexteditor';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminComponent } from './admin.component';

@NgModule({
  declarations: [DashboardComponent, AdminComponent],
  imports: [SharedModule, RichTextEditorModule, AdminRoutingModule],
})
export class AdminModule {}
