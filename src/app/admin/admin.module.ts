import { NgModule } from '@angular/core';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../shared/shared.module';
import { RichTextEditorModule } from '@syncfusion/ej2-angular-richtexteditor';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminComponent } from './admin.component';
import { LoginComponent } from './login/login.component';
import { EditComponent } from './edit/edit.component';

@NgModule({
  declarations: [DashboardComponent, AdminComponent, LoginComponent, EditComponent],
  exports: [DashboardComponent, AdminComponent, LoginComponent, EditComponent],
  entryComponents: [AdminComponent, LoginComponent, EditComponent],
  imports: [SharedModule, RichTextEditorModule, AdminRoutingModule],
})
export class AdminModule { }
