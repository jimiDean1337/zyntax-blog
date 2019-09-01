import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { CookieService } from 'ngx-cookie-service';
import { Subject, Observable } from 'rxjs';
import { map, filter, switchMap } from 'rxjs/operators';

export interface Post {
  id?: string;
  timestamp?: any;
  title?: string;
  mastheadImgUrl?: string;
  subtitle?: string;
  html?: any;
  author?: string;
  tags?: string[];
  isPrivate?: boolean;
  comments?: any[];
  stars?: any[];
}
@Injectable({
  providedIn: 'root'
})
export class PostService {
  adminAccount$: Observable<any>;
  postCollection: AngularFirestoreCollection<Post>;
  adminPosts$: Observable<Post[]>;
  postsCache: Post[];
  ADMIN_ID = 'jimi';
  constructor(
    public afs: AngularFirestore,
    private cookieService: CookieService
  ) {
    this.adminAccount$ = this.getAdmin();
    this.postCollection = this.afs.collection<Post>('posts');
    this.adminPosts$ = this.getAllPublicPosts();
  }
  addNewPost(data: any) {
    data.id = this.afs.createId();
    data.stars = [];
    data.comments = [];
    this.postCollection.doc<Post>(data.id).set(data);
  }

  getPostsCollectionLength() {
    let count = 0;
    this.adminPosts$.pipe(map(post => count++)).subscribe();
    return count;
  }

  deletePostById(postId: string) {
    return this.postCollection.doc<Post>(postId).delete();
  }

  getAdmin(author = this.ADMIN_ID) {
    return this.afs.doc<any>(`admins/${author}`).valueChanges();
  }

  getAllPublicPosts() {
    return this.postCollection.valueChanges().pipe(map(posts => this.postsCache = posts));
  }

  getPostById(postId: string) {
    return this.postCollection
      .valueChanges()
      .pipe(
        map(posts => posts.filter((post: Post) => post.id === postId)[0])
      );
  }

  addStarToPost(postId: string) {
    const post = this.postsCache.filter(post => post.id === postId)[0];
    setTimeout(() => {
      post.stars.push(new Date().toString());
      return this.updatePost(postId, post);
    }, 0)
  }

  updatePost(postId: string, data?: Post) {
    if (data.html) {
      return this.postCollection.doc<Post>(postId).update(data);
    } else return;
  }
}
