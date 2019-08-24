import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { RichTextEditorModule } from '@syncfusion/ej2-angular-richtexteditor';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { ButtonModule, CheckBoxModule, RadioButtonModule, SwitchModule, ChipListModule } from '@syncfusion/ej2-angular-buttons';
import { MastheadComponent } from './masthead/masthead.component';

@NgModule({
  declarations: [MastheadComponent, DropDownListComponent],
  imports: [CommonModule, RichTextEditorModule,
    ButtonModule, CheckBoxModule, RadioButtonModule, SwitchModule, ChipListModule],
  exports: [MastheadComponent, CommonModule],
})
export class SharedModule {}
