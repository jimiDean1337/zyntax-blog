import { Component, OnInit, OnDestroy, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import * as moment from 'moment';
import { AngularFireUploadTask, AngularFireStorageReference } from '@angular/fire/storage';
import { PostService, Post } from '../../core/post.service';
import { Observable } from 'rxjs';
import { switchMap, map, filter, take, finalize, tap } from 'rxjs/operators';
import { RichTextEditor } from '@syncfusion/ej2-richtexteditor';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit, OnDestroy {

  @ViewChild('rteEdit', null) rteObj: RichTextEditor;
  postContent: Post = {};
  postId: string;

  uploadPercent$: Observable<number>;
  downloadURL$: Observable<string>;
  constructor(private postService: PostService, private router: Router, private route: ActivatedRoute) { }
  ngOnInit() {
    this.route.paramMap
      .pipe(
        take(1),
        switchMap((params: ParamMap) => {
          // console.log(params.keys)
          return this.postService.getPostById(params.get('id'));
        }
        )
      ).subscribe((post: Post) => {
        this.postContent = post;
        this.postId = post.id;
        console.log('post', post);
      });
  }

  ngOnDestroy() {
  }

  getTimestamp(m: moment.Moment) {
    return m.format('MM D YY');
  }

  navigateTo(url: string, postId?: string) {
    return this.router.navigateByUrl(`${url}/${postId}`);
  }

  updatePost(postId: string, data?: Post) {
    this.postService.updatePost(postId, { ...data })
      .then(() => this.navigateTo('post', postId));
  }

  uploadImage(e: any) {
    const filePath = e.filePath;
    const fileRef: AngularFireStorageReference = e.fileRef;
    const task: AngularFireUploadTask = e.task;
    if (this.postContent.images.length > 3) {
      return;
    }

    console.log('uploaded image to:', { filePath, fileRef, task });

    // get notified when the download URL is available
    return task.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL()
          .subscribe(url => {
            console.log('image url: ', url);
            this.postContent.images.push({ filePath, url });
          });
      })
    )
      .subscribe()
  }

}
