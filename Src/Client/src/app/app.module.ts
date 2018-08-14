import 'zone.js/dist/zone-mix';
import 'reflect-metadata';
import '../polyfills';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

// NG Translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { ElectronService } from './providers/electron.service';
import { TabService } from './providers/tab.service';
import { CommandService } from './providers/command.service';

import { WebviewDirective } from './directives/webview.directive';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { SidemenuComponent } from './components/sidemenu/sidemenu.component';
import { TabComponent } from './components/tab/tab.component';
import { TabContentContainer } from './components/tab/tab-content-container.component';
import { CheckpointsComponent } from './components/checkpoints/checkpoints.component';
import { CommandPaleteComponent } from './components/command-palete/command-palete.component';
import { MapsComponent } from './components/maps/maps.component';
import { ClassesComponent } from './components/classes/classes.component';

import { TabCommandProviderService } from './providers/command-providers/tab-command-provider.service';
import { CompetitionSelectionComponent } from './components/competition-selection/competition-selection.component';
import { ServerStateService } from './providers/server-state.service';
import { GenericCommandProviderService } from './providers/command-providers/generic-command-provider.service';
import { HosturlInterceptorService } from './providers/hosturl-interceptor.service';
import { WebClient } from '../WebClient.Generated';


// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WebviewDirective,
    SidemenuComponent,
    TabComponent,
    TabContentContainer,
    CheckpointsComponent,
    CommandPaleteComponent,
    CompetitionSelectionComponent,
    MapsComponent,
    ClassesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HosturlInterceptorService, multi: true },
    WebClient.CompetitionClient,
    WebClient.CheckpointClient,
    WebClient.ClassClient,
    ElectronService,
    TabService,
    ServerStateService,
    CommandService,
    TabCommandProviderService,
    GenericCommandProviderService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    CheckpointsComponent,
    ClassesComponent,
    MapsComponent
  ]
})
export class AppModule { }
