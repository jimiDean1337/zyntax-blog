import { Component, OnInit, ViewChild, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { HttpClient, HttpBackend } from '@angular/common/http';

import { RichTextEditorComponent, ToolbarService, LinkService, ImageService } from '@syncfusion/ej2-angular-richtexteditor';
import { HtmlEditorService, CountService, QuickToolbarService } from '@syncfusion/ej2-angular-richtexteditor';
import { Link, Count, HtmlEditor, QuickToolbar, ImageSettingsModel } from '@syncfusion/ej2-angular-richtexteditor';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { outputs } from '@syncfusion/ej2-angular-navigations/src/treeview/treeview.component';
@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.scss'],
  providers: [ToolbarService, LinkService, ImageService, HtmlEditorService, CountService, QuickToolbarService]
})
export class TextEditorComponent implements OnInit {
  @Input() htmlValue?: any;
  @Input() postId?: string;
  @ViewChild('apiRTE', null) rteObj: RichTextEditorComponent;
  @ViewChild('readonly', null) readonlyObj: /* CheckBoxComponent */ any;
  @ViewChild('enable', null) enableObj: /* CheckBoxComponent */ any;
  @ViewChild('enablehtml', null) enablehtmlObj: /* CheckBoxComponent */ any;
  @ViewChild('numeric', null) numericObj: /* NumericTextBoxComponent */ any;
  @Output() editorContentChanged = new EventEmitter<any>(null);
  @Output() imageUploaded = new EventEmitter<any>(null);
  maxLength: number = 2000;
  numericValue: number = 1000;
  numericmin: number = 555;
  numericmax: number = 2000;
  numericformat: string = 'n0';
  iframe: object = { enable: true };
  insertImageSettings: ImageSettingsModel = {
    display: 'inline',
    saveFormat: 'Blob',
  }
  path: Object = {
    saveUrl: 'https://aspnetmvc.syncfusion.com/services/api/uploadbox/Save',
    removeUrl: 'https://aspnetmvc.syncfusion.com/services/api/uploadbox/Remove',
    // set chunk size for enable the chunk upload
    chunkSize: 102400
  };
  // height: number = 600;
  // postContentCache$: BehaviorSubject<any>;

  constructor(private http: HttpClient, private storage: AngularFireStorage) {
    // this.postContentCache$ = new BehaviorSubject(null);
  }

  ngOnInit() {
  }

  getEditorValue() {
    return this.rteObj.getContent();
  }

  showNewValue(e: any) {
    console.log('event', this.rteObj);
    // this.postContentCache$.next(e);
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

  public getUploadObj() {
    return this.rteObj.imageModule.uploadObj;
  }

  public removeImage(imagePath: string) {
    console.log('removing image', imagePath)
    // const ref = this.storage.ref(imagePath);
    // return ref.delete();
  }

  public uploadImage(e: any) {
    console.log('text editor upload', e)
    const files = e.event.target.files;
    // const uploadObj = this.getUploadObj();
    const name = files[0].name;
    const filePath = `post-uploads/${name}`;
    const fileRef = this.storage.ref(`post-uploads`);
    const task = this.storage.upload(filePath, files[0]);
    const uploadConfig = { filePath, fileRef, task };
    console.log('image uploaded', { name, event, files, fileRef, task });
    this.imageUploaded.emit(uploadConfig);
  }

  uploading(e: any) {
    console.log('uploading...', e)
  }

  uploadSuccess(e) {
    console.log('upload success', e);
  }
}
