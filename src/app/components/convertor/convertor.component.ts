import { Component, Input } from "@angular/core"
import { ICurrency, ISelectValue } from "../../models/currency"
import { DecimalPipe } from "@angular/common"

@Component({
  selector: "app-converter",
  templateUrl: "./convertor.component.html",
  styleUrls: ["./convertor.component.scss"],
  providers: [DecimalPipe]
})
export class ConvertorComponent {
  constructor(private decimalPipe: DecimalPipe) {}

  @Input() currency: ICurrency[]
  payValue: string = ""
  getValue: string = ""
  payCurrency: number = 980
  getCurrency: number = 840
  errorMessage: string = "enter correct data"
  selectValue: ISelectValue[] = [
    {
      code: 980,
      value: "UAN"
    },
    {
      code: 840,
      value: "USD"
    },
    {
      code: 978,
      value: "EUR"
    },
  ]

  changePayValue() {
    if (!Number(this.payValue)) {
      this.getValue = ""
      return
    }

    const payValue: number = Number(this.payValue)

    if (this.payCurrency === this.getCurrency) {
      this.getValue = this.transformDecimal(this.payValue)
      return
    }

    const currentCurrency = this.currency.filter(elem => elem.currencyCodeB === this.payCurrency && elem.currencyCodeA === this.getCurrency)[0]

    if (currentCurrency) {
      const pricePerOne: number = currentCurrency.rateSell
      this.getValue = this.transformDecimal(String(payValue/pricePerOne))
    } else {
      const pricePerOne: number = this.currency.filter(elem => elem.currencyCodeB === this.getCurrency && elem.currencyCodeA === this.payCurrency)[0].rateSell
      this.getValue = this.transformDecimal(String(payValue*pricePerOne))
    }
  }

  changeGetValue() {
    if (!Number(this.getValue)) {
      this.payValue = ""
      return
    }

    const getValue = Number(this.getValue)

    if (this.payCurrency === this.getCurrency) {
      this.payValue = this.transformDecimal(this.getValue)
      return
    }

    const currentCurrency = this.currency.filter(elem => elem.currencyCodeB === this.payCurrency && elem.currencyCodeA === this.getCurrency)[0]

    if (currentCurrency) {
      const pricePerOne: number = currentCurrency.rateSell
      this.payValue = this.transformDecimal(String(getValue*pricePerOne))
    } else {
      const pricePerOne: number = this.currency.filter(elem => elem.currencyCodeB === this.getCurrency && elem.currencyCodeA === this.payCurrency)[0].rateSell
      this.payValue = this.transformDecimal(String(getValue/pricePerOne))
    }
  }

  transformDecimal(num: string): string {
    return String(this.decimalPipe.transform(num, '0.0-4')).replaceAll(",", "");
  }

  protected readonly Number = Number
}
