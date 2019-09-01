import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Post, PostService } from '../core/post.service';
import { AuthService } from '../core/auth.service';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  postId: string;
  post: Post;
  loggedIn: Observable<boolean>;
  constructor(private router: Router, private route: ActivatedRoute, public postService: PostService, private authService: AuthService) { }

  ngOnInit() {
    this.loggedIn = this.authService.loggedIn();
    this.route.paramMap.
      pipe(
        switchMap((params: ParamMap) => {
          console.log(params.keys)
          return this.postService.getPostById(params.get('id'));
        })
      ).subscribe((post: Post) => {
        this.post = post;
        this.postId = post.id
      });
  }

  editPostById(id: string) {
    return this.router.navigateByUrl(`admin/edit/${id}`);
  }

  addStarToPost(postId: string) {
    return this.postService.addStarToPost(postId);
  }
}
