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
    path: 'post/:id',
    loadChildren: () => import('./components/comments/comments.module').then(m => m.CommentsModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
