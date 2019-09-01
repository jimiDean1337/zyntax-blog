import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ParamMap } from '@angular/router';
import * as moment from 'moment';
import { PostService, Post } from '../../core/post.service';
import { Observable } from 'rxjs';
import { switchMap, map, filter } from 'rxjs/operators';

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
    currentTask = 'view';
    constructor(private postService: PostService, private router: Router) { }

    ngOnInit() {
    }

    formatPost(title: string, subtitle: string, mastheadImgUrl: string, html: any, isPrivate = false, tags = []) {
        this.newPost = { title, subtitle, mastheadImgUrl, html, isPrivate, tags, timestamp: this.getTimestamp(moment()), author: 'Jimi Flynn' };
    }

    getTimestamp(m: moment.Moment) {
        return m.format('MM D YY');
    }

    navigateTo(url: string, queryParams?: any) {
        this.router.navigateByUrl(url, { queryParams });
    }

    publishNewPost(data: any) {
        console.log('rte content', data);
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
