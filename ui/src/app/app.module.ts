import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ApolloModule, Apollo } from 'apollo-angular';
import {
  HttpLinkModule,
  HttpLink,
  HttpLinkHandler,
} from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    HttpLinkModule,
    ApolloModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  private cache: InMemoryCache;
  private link: HttpLinkHandler;
  public constructor(
    private readonly apollo: Apollo,
    private readonly httpLink: HttpLink,
  ) {
    this.cache = new InMemoryCache();
    const domain = environment.production ? 'ec2-35-173-232-167.compute-1.amazonaws.com' : 'localhost';
    this.link = this.httpLink.create({ uri: `http://${domain}:8081/graphql` });
    this.apollo.create({
      link: this.link,
      cache: this.cache,
    });
  }
}
