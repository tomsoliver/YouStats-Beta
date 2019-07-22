import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { HomeComponent } from './pages/home/home.component';
import { LineChartService } from './services/line-chart.service';
import { AboutComponent } from './pages/about/about.component';
import { ChartComponent } from './components/chart/chart.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    AboutComponent,
    ChartComponent
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
