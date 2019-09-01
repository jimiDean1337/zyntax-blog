import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import * as moment from 'moment';
import { PostService, Post } from '../../core/post.service';
import { Observable } from 'rxjs';
import { switchMap, map, filter } from 'rxjs/operators';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit, OnDestroy {

  constructor(private postService: PostService, private router: Router, private route: ActivatedRoute) { }
  postContent: Post = {};
  postId: string;
  ngOnInit() {
    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          console.log(params.keys)
          return this.postService.getPostById(params.get('id'));
        }
        )
      ).subscribe((post: Post) => {
        this.postContent = post;
        this.postId = post.id;
        console.log('post', post)
      });
  }

  ngOnDestroy() {
  }

  formatPost(title?: string, subtitle?: string, mastheadImgUrl?: string, html?: any, isPrivate = false, tags = [], comments = [], stars?: string[]) {
    this.postContent = { title, subtitle, mastheadImgUrl, html, isPrivate, tags, timestamp: this.getTimestamp(moment()), author: 'Jimi Flynn', comments, stars };
  }


  getTimestamp(m: moment.Moment) {
    return m.format('MM D YY');
  }

  navigateTo(url: string, postId?: string) {
    return this.router.navigateByUrl(`${url}/${postId}`);
  }

  async updatePost(postId: string, data?: Post) {
    return await this.postService.updatePost(postId, data)
      .then(() => this.navigateTo('post', postId));
  }

}
