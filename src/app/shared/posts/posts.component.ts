import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { PostService, Post } from '../../core/post.service';
import { Observable } from 'rxjs';
import { switchMap, map, filter } from 'rxjs/operators';
import { JsonAdaptor } from '@syncfusion/ej2-data';
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],

})
export class PostsComponent implements OnInit {
  @Input() currentAdmin: string;
  @Output() postModified = new EventEmitter<any>();
  adminDataCache: any = {};
  postsCache: Post[] = [];
  posts$: Observable<Post[]>;
  selectedPost: string;
  starAdded = false;
  constructor(private router: Router, private route: ActivatedRoute, private postService: PostService, private cookie: CookieService) { }

  ngOnInit() {
    if (this.currentAdmin) {
      this.postService.getAdmin(this.currentAdmin).subscribe(admin => this.adminDataCache = admin);
    }
    this.posts$ = this.postService.getAllPublicPosts().pipe(map(posts => this.postsCache = posts));
  }

  async addStarToPost(postId: string) {
    if (this.starAdded) return;
    return await this.postService.addStarToPost(postId)
      .then(() => {
        this.starAdded = true;
        console.log('star added');
      })
      .catch(err => console.log(err));
  }

  navigateTo(url: string, postId?: string) {
    return this.router.navigateByUrl(`${url}/${postId}`);
  }

  openPost(postId: string) {
    const toStringPostId = JSON.stringify(postId);
    this.selectedPost = postId;
    setTimeout(() => {
      if (this.cookie.check('selectedPost')) {
        this.cookie.delete('selectedPost');
      }
    }, 500)
    this.cookie.set('selectedPost', toStringPostId);
    this.navigateTo('post', postId)
      .then((val) => console.log('navigated ok', val))
      .catch(err => console.log(err));
  }

  async deletePost(postId: string) {
    return await this.postService.deletePostById(postId)
      .then(() => console.log('deleted ok'))
      .catch(err => console.log(err));;
  }

}
