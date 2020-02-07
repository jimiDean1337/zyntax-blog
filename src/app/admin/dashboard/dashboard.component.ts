import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ParamMap } from '@angular/router';
import * as moment from 'moment';
import { AngularFireUploadTask, AngularFireStorageReference } from '@angular/fire/storage';
import { PostService, Post } from '../../core/post.service';
import { Observable } from 'rxjs';
import { switchMap, map, filter, tap, finalize } from 'rxjs/operators';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    searchQuery: { queryString?: '', limit?: number };
    newPost: any = {};
    selectedPost: Post = {};
    posts$: Observable<Post[]>;

    hasUploadedImage = false;
    uploadedImages: any[] = [];

    uploadPercent$: Observable<number>;
    downloadURL$: Observable<string>;
    currentTask = 'view';
    constructor(private postService: PostService, private router: Router) { }

    ngOnInit() {
    }

    uploadImage(e: any) {
        const images = this.newPost.images || this.uploadedImages;
        const filePath = e.filePath;
        const fileRef: AngularFireStorageReference = e.fileRef;
        const task: AngularFireUploadTask = e.task;
        if (this.newPost.images && this.newPost.length > 3) {
            return;
        }
        console.log('uploaded image to:', { filePath, fileRef, task });

        // get notified when the download URL is available
        task.snapshotChanges().pipe(
            finalize(() => {
                fileRef.getDownloadURL()
                    .subscribe(url => {
                        images.push({ filePath, url });
                        console.log('image url: ', url, images);
                    });
            })
        )
            .subscribe()
    }

    getTimestamp(m: moment.Moment) {
        return m.format('MM D YY');
    }

    navigateTo(url: string, queryParams?: any) {
        this.router.navigateByUrl(url, { queryParams });
    }

    getEditorContent(content) {
        this.newPost.html = content;
    }

    publishNewPost(data: any) {
        setTimeout(() => {
            data.timestamp = this.getTimestamp(moment());
        })
        console.log('post data', data);
        this.postService.addNewPost(data);
        setTimeout(() => this.toggleTask('view'), 0)
    }

    updatePost(postId: string, data: Post) {
        this.postService.updatePost(postId, data);
    }

    toggleTask(task: string) {
        this.currentTask = task;
    }

    getPublicPosts() {
        this.posts$ = this.postService.getAllPublicPosts();
    }

}
