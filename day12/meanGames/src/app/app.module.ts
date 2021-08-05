import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { FooterComponent } from './footer/footer.component';
import { GamesListComponent } from './games-list/games-list.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    FooterComponent,
    GamesListComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {
      path:"",
      component : WelcomeComponent
    },
    {
      path:"games",
      component: GamesListComponent
    },
    {
      path:'**',
      component: WelcomeComponent
    }
])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
