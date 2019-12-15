import { BrowserModule, BrowserTransferStateModule, makeStateKey, TransferState } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ApolloModule, Apollo } from "apollo-angular";
import { HttpLinkModule, HttpLink, HttpLinkHandler } from "apollo-angular-link-http";
import { InMemoryCache, NormalizedCacheObject } from "apollo-cache-inmemory";

import { AppComponent } from './app.component';
import { PlatformService } from './platform.service';
import { LoginComponent } from './components/login/login.component';

const STATE_KEY = makeStateKey<any>('apollo.state');

@NgModule({
  declarations: [AppComponent, LoginComponent],
  imports: [
    BrowserModule.withServerTransition({appId: 'ui'}),
    RouterModule.forRoot([
      { path: 'login', component: LoginComponent },
    ], { initialNavigation: 'enabled' }),
    BrowserTransferStateModule,
    HttpClientModule,
    HttpLinkModule,
    ApolloModule
  ],
  providers: [PlatformService],
  bootstrap: [AppComponent]
})
export class AppModule {
  cache: InMemoryCache;
  link: HttpLinkHandler;

  constructor(
    private readonly apollo: Apollo,
    private readonly transferState: TransferState,
    private readonly httpLink: HttpLink,
    private readonly platformService: PlatformService
  ) {
    this.cache = new InMemoryCache();
    this.link = this.httpLink.create({ uri: 'http://localhost:3333/graphql' }); // http://ec2-35-173-232-167.compute-1.amazonaws.com

    this.apollo.create({
      link: this.link,
      cache: this.cache,
      ...(this.platformService.isPlatformServer()
        ? {
            ssrMode: true,
          }
        : {
            ssrForceFetchDelay: 200,
          }),
    });

    if (this.platformService.isPlatformServer()) {
      this.transferState.onSerialize(STATE_KEY, () => this.cache.extract());
    } else {
      const state = this.transferState.get<NormalizedCacheObject>(
        STATE_KEY,
        {},
      );
      this.cache.restore(state);
    }
  }
}
