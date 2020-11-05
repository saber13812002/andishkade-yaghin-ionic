import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./bootstrap/bootstrap.module').then(m => m.BootstrapPageModule)
  },
  {
    path: 'bootstrap',
    loadChildren: () => import('./bootstrap/bootstrap.module').then( m => m.BootstrapPageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
