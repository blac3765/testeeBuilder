import { BrowserModule } 						from '@angular/platform-browser';
import { NgModule } 							from '@angular/core';
import { FormsModule }							from '@angular/forms';

import { AppComponent } 						from './app.component';
import { HeaderComponent } 						from './header/header.component';
import { AppRoutingModule } 					from './/app-routing.module';
import { HomeComponent } 						from './home/home.component';
import { BuilderComponent } 					from './builder/builder.component';
import { ContactComponent } 					from './contact/contact.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    BuilderComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
	FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
