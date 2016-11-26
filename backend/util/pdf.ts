import {Response} from "express";
import {IUserInfo, IBudgetItem} from "../../common/models/models";
const PDFKit = require("pdfkit");
const moment = require("moment-timezone");

class Pdf {

  private doc: PDFKit.PDFDocument;
  private user: IUserInfo;
  private budget: boolean = true;
  private budgetItems: Array<IBudgetItem>;
  private Pacifico = "./public/fonts/Pacifico.ttf";
  private OpenSans = "./public/fonts/OpenSans-Regular.ttf";
  private OpenSansBold = "./public/fonts/OpenSans-Bold.ttf";

  private currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  });

  constructor(res: Response, budgetItems: Array<IBudgetItem>) {
    res.contentType("application/pdf");
    this.doc = new PDFKit();
    this.doc.pipe(res);
    this.budgetItems = budgetItems;
  }

  public build(): void {
    this
      .buildDocType()
      .buildMasthead()
      .buildUser()
      .buildHeaders()
      .buildBudgetItems();
    this.doc.end();
  }

  public addUser(user: IUserInfo): Pdf {
    this.user = user;
    return this;
  }

  public setAsInvoice(): Pdf {
    this.budget = false;
    return this;
  }

  public setAsBudget(): Pdf {
    this.budget = true;
    return this;
  }

  private buildMasthead(): Pdf {
    this.doc
      .font(this.Pacifico)
      .fontSize(36)
      .text("JOliverDecor", 95, 70);
    this.doc
      .font(this.OpenSans)
      .fontSize(28)
      .text("|", 315, 85);
    this.doc
      .font(this.OpenSans)
      .fontSize(24)
      .text("Interior Design", 335, 90);
    return this;
  }

  private buildDocType(): Pdf {
    this.doc
      .font(this.OpenSansBold)
      .fontSize(36)
      .text(this.budget ? "BUDGET" : "INVOICE", 420, 30, {
        lineBreak: false
      });
    return this;
  }

  private buildUser(): Pdf {
    this.doc
      .font(this.OpenSans)
      .fontSize(14)
      .text(`${this.user.lastName}, ${this.user.firstName}`, 50, 150);
    this.doc
      .font(this.OpenSans)
      .fontSize(14)
      .text(this.user.address1, 50, 165);
    if (this.user.address2) {
      this.doc
        .font(this.OpenSans)
        .fontSize(14)
        .text(this.user.address2, 50, 180);
      this.doc
        .font(this.OpenSans)
        .fontSize(14)
        .text(`${this.user.city}, ${this.user.state} ${this.user.zipCode}`, 50, 195);
    } else {
      this.doc
        .font(this.OpenSans)
        .fontSize(14)
        .text(`${this.user.city}, ${this.user.state} ${this.user.zipCode}`, 50, 180);
    }
    return this;
  }

  private buildHeaders(): Pdf {
    this.doc
      .font(this.OpenSansBold)
      .fontSize(16)
      .text("Date", 50, 220);
    this.doc
      .font(this.OpenSansBold)
      .fontSize(16)
      .text("Description", 150, 220);
    this.doc
      .font(this.OpenSansBold)
      .fontSize(16)
      .text("Total Price", 450, 220);
    this.doc
      .moveTo(50, 250)
      .lineTo(550, 250)
      .stroke();
    return this;
  }

  private getGrandTotal(): number {
    return this.budgetItems.reduce((acc, budgetItem) => {
      return acc + budgetItem.totalPrice;
    }, 0.00)
  }


  private buildBudgetItems(): Pdf {
    const endY = this.budgetItems.reduce((acc, budgetItem) => {
      if(acc >= 700) {
        var height = 50;
        this.doc.addPage();
        if (budgetItem.description.length > 30) {
          const line1 = budgetItem.description.substring(
            0, budgetItem.description.indexOf(" ", 30)
          )
          const line2 = budgetItem.description.substring(
            budgetItem.description.indexOf(" ", 30)
          )
          this.doc
            .font(this.OpenSans)
            .fontSize(14)
            .text(moment(budgetItem.created).local().format("MM/DD/YYYY"), 50, height);
          this.doc
            .font(this.OpenSans)
            .fontSize(14)
            .text(line1, 150, height);
          this.doc
            .font(this.OpenSans)
            .fontSize(14)
            .text(this.currencyFormatter.format(budgetItem.totalPrice), 450, height);
          this.doc
            .moveDown()
            .font(this.OpenSans)
            .fontSize(14)
            .text(line2, 150, height + 20);
          height = height + 20;
        } else {
          this.doc
            .font(this.OpenSans)
            .fontSize(14)
            .text(moment(budgetItem.created).local().format("MM/DD/YYYY"), 50, height);
          this.doc
            .font(this.OpenSans)
            .fontSize(14)
            .text(budgetItem.description, 150, height);
          this.doc
            .font(this.OpenSans)
            .fontSize(14)
            .text(this.currencyFormatter.format(budgetItem.totalPrice), 450, height);
        }
        return height;
      } else {
        if (budgetItem.description.length > 30) {
          const line1 = budgetItem.description.substring(
            0, budgetItem.description.indexOf(" ", 30)
          )
          const line2 = budgetItem.description.substring(
            budgetItem.description.indexOf(" ", 30)
          )
          this.doc
            .font(this.OpenSans)
            .fontSize(14)
            .text(moment(budgetItem.created).local().format("MM/DD/YYYY"), 50, acc);
          this.doc
            .font(this.OpenSans)
            .fontSize(14)
            .text(line1, 150, acc);
          this.doc
            .font(this.OpenSans)
            .fontSize(14)
            .text(this.currencyFormatter.format(budgetItem.totalPrice), 450, acc);
          this.doc
            .font(this.OpenSans)
            .fontSize(14)
            .text(line2, 150, acc + 20);
          acc = acc + 20;
        } else {
          this.doc
            .font(this.OpenSans)
            .fontSize(14)
            .text(moment(budgetItem.created).local().format("MM/DD/YYYY"), 50, acc);
          this.doc
            .font(this.OpenSans)
            .fontSize(14)
            .text(budgetItem.description, 150, acc);
          this.doc
            .font(this.OpenSans)
            .fontSize(14)
            .text(this.currencyFormatter.format(budgetItem.totalPrice), 450, acc);
        }
        return acc + 20;
      }
    }, 260);
    this.doc
      .font(this.OpenSansBold)
      .fontSize(14)
      .text("Grand Total", 350, endY);
    this.doc
      .font(this.OpenSansBold)
      .fontSize(14)
      .text(this.currencyFormatter.format(this.getGrandTotal()), 450, endY);
    return this;
  }

}

export {Pdf};
