import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SecurityModule } from './security';
import { HttpClientModule } from '@angular/common/http';
import { MyCoreModule } from 'src/lib/my-core';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,AppRoutingModule, FormsModule, HttpClientModule, SecurityModule,
    MyCoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
