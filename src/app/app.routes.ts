import { Routes } from '@angular/router';
import { Home } from './home/home';
import { App } from './app';
import { LandingPage } from './landing-page/landing-page';
import path from 'path';
import { Grafico } from './grafico/grafico';

export const routes: Routes = [
    {
        path: '',
        component: LandingPage
    },
    {
        path: 'home',
        component: Home
    },
    {
        path: 'grafico',
        component: Grafico
    }
];
