import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PostService, Post } from '../../core/post.service';
import { Observable } from 'rxjs';
import { switchMap, map, filter } from 'rxjs/operators';
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  @Input() currentAdmin: string;
  @Output() postModified = new EventEmitter<any>();
  adminDataCache: any = {};
  postsCache: Post[] = [];
  posts$: Observable<Post[]>;
  selectedPost: number;
  starAdded = false;
  constructor(private router: Router, private route: ActivatedRoute, private postService: PostService) { }

  ngOnInit() {
    if (this.currentAdmin) {
      this.postService.getAdmin(this.currentAdmin).subscribe(admin => this.adminDataCache = admin);
    }
    this.posts$ = this.postService.getAllPublicPosts().pipe(map(posts => this.postsCache = posts));
  }

  async addStarToPost(postId: string) {
    if (this.starAdded) return;
    await this.postService.addStarToPost(postId)
      .then(() => {
        this.starAdded = true;
        console.log('star added');
      })
      .catch(err => console.log(err));
  }

  async navigateTo(url: string, postId?: string) {
    return await this.router.navigateByUrl(`${url}/${postId}`, { relativeTo: this.route })
      .then((val) => console.log('navigated ok', val))
      .catch(err => console.log(err));
  }

  async openPost(postId: string) {
    return await this.navigateTo('post', postId)
      .then((val) => console.log('navigated ok', val))
      .catch(err => console.log(err));
  }

  async deletePost(postId: string) {
    return await this.postService.deletePostById(postId)
      .then(() => console.log('deleted ok'))
      .catch(err => console.log(err));;
  }

}
