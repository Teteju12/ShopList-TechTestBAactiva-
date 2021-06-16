import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListComponent } from './components/list/list.component';
import { HomeComponent } from './pages/home/home.component';
import { ShopcartComponent } from './components/shopcart/shopcart.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { DropdownShopcartComponent } from './components/dropdown-shopcart/dropdown-shopcart.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    HomeComponent,
    ShopcartComponent,
    CheckoutComponent,
    DropdownShopcartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
