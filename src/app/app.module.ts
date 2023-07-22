import { NgModule } from "@angular/core"
import { BrowserModule } from "@angular/platform-browser"

import { AppComponent } from "./app.component"
import { ConvertorComponent } from "./components/convertor/convertor.component"
import { HttpClientModule } from "@angular/common/http"
import { ErrorComponent } from "./components/error/error.component"
import { FormsModule } from "@angular/forms"

@NgModule({
  declarations: [
    AppComponent,
    ConvertorComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
