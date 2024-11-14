import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientListComponent } from './components/client-list/client-list.component';
import { ClientAddComponent } from './components/client-add/client-add.component';
import { EditClientComponent } from './components/client-edit/client-edit.component';
import { ClientDetailComponent } from './components/client-detail/client-detail.component';
import { ClientLoginComponent } from './components/client-login/client-login.component';
import { ClientDeleteComponent } from './components/client-delete/client-delete.component';
import { ClientFirstpageComponent } from './components/client-firstpage/client-firstpage.component';



const routes: Routes = [
  { path: '', component: ClientListComponent },
  { path: 'add', component: ClientAddComponent },
  { path: 'edit/:id', component: EditClientComponent },
  { path: 'detail/:id', component: ClientDetailComponent },
  {path: 'login', component: ClientLoginComponent},
  { path: 'delete/:id', component: ClientDeleteComponent },
  {path: 'firstpage', component: ClientFirstpageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsRoutingModule { }