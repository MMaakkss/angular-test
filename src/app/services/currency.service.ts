import { Injectable } from "@angular/core"
import { HttpClient, HttpErrorResponse } from "@angular/common/http"
import { catchError, throwError, Observable } from "rxjs"
import { ICurrency } from "../models/currency"
import { ErrorService } from "./error.service"

@Injectable({
  providedIn: "root"
})
export class CurrencyService {
  constructor(
    private http: HttpClient,
    private errorService: ErrorService
  ) {}

  getData(): Observable<ICurrency[]> {
    return this.http.get<ICurrency[]>("https://api.monobank.ua/bank/currency").pipe(
      catchError(this.errorHandler.bind(this))
    )
  }

  private errorHandler(err: HttpErrorResponse) {
    this.errorService.handle(err.error.errorDescription)
    return throwError(() => err.error.errorDescription)
  }
}
