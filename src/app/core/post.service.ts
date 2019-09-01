import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
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
  ) {
    this.postCollection = this.afs.collection<Post>('posts');
    this.adminAccount$ = this.getAdmin();
    this.adminPosts$ = this.getAllPublicPosts();
  }
  addNewPost(data: any) {
    data.id = this.afs.createId();
    this.postCollection.doc(data.id).set(data);
  }

  getPostsCollectionLength() {
    let count = 0;
    this.adminPosts$.pipe(map(post => count++)).subscribe();
    return count;
  }

  deletePostById(postId: string) {
    return this.postCollection.doc(postId).delete();
  }

  getAdmin(author = this.ADMIN_ID) {
    return this.afs.doc(`admins/${author}`).valueChanges();
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

  updatePost(postId: string, data: Post) {
    return this.postCollection.doc(postId).update(data);
  }
}
