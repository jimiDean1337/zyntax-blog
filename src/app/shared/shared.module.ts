import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PostsComponent } from './posts/posts.component';
import { RichTextEditorModule } from '@syncfusion/ej2-angular-richtexteditor';
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { UploaderModule } from '@syncfusion/ej2-angular-inputs';
import { MastheadComponent } from './masthead/masthead.component';
import { TextEditorComponent } from './text-editor/text-editor.component';
import { SafeHtmlPipe } from './safe-html.pipe';

@NgModule({
  declarations: [MastheadComponent, PostsComponent, TextEditorComponent, SafeHtmlPipe],
  imports: [CommonModule, NgbModule, RichTextEditorModule, ToolbarModule, UploaderModule],
  entryComponents: [PostsComponent, TextEditorComponent],
  exports: [MastheadComponent, NgbModule, PostsComponent, CommonModule, TextEditorComponent, SafeHtmlPipe, ToolbarModule, UploaderModule],
})
export class SharedModule { }
