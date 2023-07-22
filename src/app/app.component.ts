import { Component, OnInit } from "@angular/core"
import { ICurrency } from "./models/currency"
import { CurrencyService } from "./services/currency.service"

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  currency: ICurrency[] = []
  eur: number
  usd: number

  constructor(private currencyService: CurrencyService) {}

  ngOnInit(): void {
    this.currencyService.getData().subscribe((data: ICurrency[])  => {
      const eur: ICurrency[] = data.filter((elem: ICurrency) => elem.currencyCodeB === 980 && elem.currencyCodeA === 978)
      const usd: ICurrency[] = data.filter((elem: ICurrency) => elem.currencyCodeB === 980 && elem.currencyCodeA === 840)
      this.eur = eur[0].rateSell
      this.usd = usd[0].rateSell
      this.currency = data
    })
  }


}
