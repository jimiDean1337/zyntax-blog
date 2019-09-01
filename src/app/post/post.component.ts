import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Post, PostService } from '../core/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  postId: string;
  post: Post;
  constructor(private router: Router, private route: ActivatedRoute, public postService: PostService) { }

  ngOnInit() {
    this.route.paramMap.
      pipe(
        map((params: ParamMap) => params.get('id')),
        map(id => this.postId = id),
        map(id => this.postService.getPostById(id))
      ).subscribe(obs => {
        obs.subscribe(post => this.post = post)
      });
  }

}
