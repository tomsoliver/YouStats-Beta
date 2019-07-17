import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { NavBarComponent } from './nav/nav-bar/nav-bar.component';
import { HomeComponent } from './pages/home/home.component';
import { LineChartService } from './services/line-chart.service';
import { AboutComponent } from './pages/about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    RouterModule.forRoot(
      [
        { path: '', component: HomeComponent },
        { path: 'home', component: HomeComponent },
        { path: 'about', component: AboutComponent }
      ],
      { enableTracing: false }
    ),
  ],
  providers: [LineChartService],
  bootstrap: [AppComponent]
})
export class AppModule { }
