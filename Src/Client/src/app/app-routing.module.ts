import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompetitionSelectionComponent } from './components/competition-selection/competition-selection.component';

const routes: Routes = [
    {
        path: '',
        component: CompetitionSelectionComponent
    },
    {
        path: 'app',
        component: HomeComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule { }
