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
  @Input() currentAdmin?: string;
  @Output() postModified = new EventEmitter<any>();
  adminDataCache: any = {};
  adminPostsCache: Post[] = [];
  posts$: Observable<Post[]>;
  selectedPost: number;
  constructor(private router: Router, private route: ActivatedRoute, private postService: PostService) { }

  ngOnInit() {
    if (this.currentAdmin) {
      this.postService.getAdmin(this.currentAdmin).subscribe(admin => this.adminDataCache = admin);
    }
    this.posts$ = this.postService.getAllPublicPosts().pipe(map(posts => this.adminPostsCache = posts));
  }

  navigateTo(url: string) {
    this.router.navigateByUrl(url);
  }

  openPost(postId: string) {
    this.router.navigate(['post', `${postId}`], { relativeTo: this.route });
  }

  peekPost(idx: number) {
    this.selectedPost = idx;
  }

  updatePostChanges(data: Post, postId: string) {
    this.postService.updatePost(postId, data);
  }

  deletePost(postId: string) {
    this.postService.deletePostById(postId);
  }

}
