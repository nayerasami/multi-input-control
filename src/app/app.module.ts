import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {ReactiveFormsModule } from '@angular/forms';  // Import FormsModule
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReusableInputControlComponent } from './Components/reusable-input-control/reusable-input-control.component';
import { SharedErrorComponent } from './Components/shared-error/shared-error.component';

@NgModule({
  declarations: [
    AppComponent,
    ReusableInputControlComponent,
    SharedErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
