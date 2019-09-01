import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { RichTextEditorComponent, ToolbarService, LinkService, ImageService } from '@syncfusion/ej2-angular-richtexteditor';
import { HtmlEditorService, CountService, QuickToolbarService } from '@syncfusion/ej2-angular-richtexteditor';
import { Link, Count, HtmlEditor, QuickToolbar } from '@syncfusion/ej2-angular-richtexteditor';
import { BehaviorSubject, combineLatest } from 'rxjs';
@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.scss'],
  providers: [ToolbarService, LinkService, ImageService, HtmlEditorService, CountService, QuickToolbarService]
})
export class TextEditorComponent implements OnInit {
  @Input() htmlValue?: any;
  @ViewChild('apiRTE', null) rteObj: RichTextEditorComponent;
  @ViewChild('readonly', null) readonlyObj: /* CheckBoxComponent */ any;
  @ViewChild('enable', null) enableObj: /* CheckBoxComponent */ any;
  @ViewChild('enablehtml', null) enablehtmlObj: /* CheckBoxComponent */ any;
  @ViewChild('numeric', null) numericObj: /* NumericTextBoxComponent */ any;
  @Output() editorContentChanged = new EventEmitter<any>(null);
  maxLength: number = 2000;
  numericValue: number = 1000;
  numericmin: number = 555;
  numericmax: number = 2000;
  numericformat: string = 'n0';
  iframe: object = { enable: false, };
  height: number = 500;
  postContentCache$: BehaviorSubject<any>;

  constructor() {
    this.postContentCache$ = new BehaviorSubject(null);
  }

  ngOnInit() {
    // if (this.htmlValue) {
    //   this.rteObj.value = this.rteObj.this.htmlValue;
    // }
  }

  showNewValue(e) {
    console.log('event', this.rteObj.value);
    this.postContentCache$.next(e);
    this.editorContentChanged.emit(e);
  }
  public onValChange(): void {
    this.rteObj.maxLength = this.numericObj.value;
    this.rteObj.dataBind();
  }
  public onChangeRead(): void {
    this.rteObj.readonly = this.readonlyObj.checked;
    this.rteObj.dataBind();
  }
  public onChangeEnable(): void {
    this.rteObj.enabled = this.enableObj.checked;
    this.rteObj.dataBind();
  }
  public onChangeHtml(): void {
    this.rteObj.enableHtmlEncode = this.enablehtmlObj.checked;
    this.rteObj.dataBind();
  }
  public getVal(): void {
    alert(this.rteObj.value);
  }
  public getSelect(): void {
    alert(this.rteObj.getSelection());
  }
  public selectAll(): void {
    this.rteObj.selectAll();
  }
}
