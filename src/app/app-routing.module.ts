import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./components/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'streams',
    loadChildren: () => import('./components/streams/streams.module').then(m => m.StreamsModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'people',
    loadChildren: () => import('./components/people/pepole.module').then(m => m.PepoleModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'following',
    loadChildren: () => import('./components/following/following.module').then(m => m.FollowingModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'followers',
    loadChildren: () => import('./components/followers/followers.module').then(m => m.FollowersModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'notifications',
    loadChildren: () => import('./components/notifications/notifications.module').then(m => m.NotificationsModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'post/:id',
    loadChildren: () => import('./components/comments/comments.module').then(m => m.CommentsModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
