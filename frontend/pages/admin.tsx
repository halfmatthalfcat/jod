/// <reference path="./pages.d.ts" />
/// <reference path="../../typings/index.d.ts" />

import * as React from "react";
import {IAdminProps, IAdminState} from "./pages";
import {Stats, User} from "../util/api";
import {ChartCard} from "../components/admin/chartCard";
import Chart from "chart.js";
import {ChartCardWithSelect} from "../components/admin/chartCardWithSelect";

class Admin extends React.PureComponent<IAdminProps, IAdminState> {

  public state: IAdminState;

  private months = [
    "Feb", "March", "April", "May", "June",
    "July", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan"
  ];

  constructor(props: IAdminProps) {
    super(props);
    this.state = {
      userBudgetStats: {
        labels: [],
        datasets: [{
          label: "Aggregate Total",
          data: [],
          fillColor: "rgba(0, 0, 0, 1)",
          strokeColor: "rgba(0, 0, 0, 1)"
        }]
      },
      userInvoiceStats: {
        labels: [],
        datasets: [{
          label: "Aggregate Total",
          data: [],
          fillColor: "rgba(0, 0, 0, 1)",
          strokeColor: "rgba(0, 0, 0, 1)"
        }]
      }
    };
  }

  public componentDidMount() {
    Promise.all([
      Stats.getBudgetStats(),
      Stats.getInvoiceStats(),
      User.getAllUsers()
    ]).then((results) => {
      const [budgetStats, invoiceStats, users] = results;

      const budgetStatLabels = budgetStats.map((stat) => {
        const month = this.months[stat.month - 1];
        return `${month}, ${stat.year}`;
      });
      const budgetData = budgetStats.map((stat) => { return stat.total; });

      const invoiceStatLables = invoiceStats.map((stat) => {
        const month = this.months[stat.month - 1];
        return `${month}, ${stat.year}`;
      });
      const invoiceData = invoiceStats.map((stat) => { return stat.total; });

      this.setState({
        budgetStats: {
          labels: budgetStatLabels,
          datasets: [{
            label: "Aggregate Total",
            data: budgetData,
            fillColor: "rgba(0, 0, 0, 1)",
            strokeColor: "rgba(0, 0, 0, 1)"
          }]
        },
        invoiceStats: {
          labels: invoiceStatLables,
          datasets: [{
            label: "Aggregate Total",
            data: invoiceData,
            fillColor: "rgba(0, 0, 0, 1)",
            strokeColor: "rgba(0, 0, 0, 1)"
          }]
        },
        users: users
      });
    }, (err) => {

    });
  }

  private setUserBudgeted(userId: number): void {
    Stats.getUserBudgetStats(userId).then((userBudgetStats) => {
      const budgetStatLabels = userBudgetStats.map((stat) => {
        const month = this.months[stat.month - 1];
        return `${month}, ${stat.year}`;
      });
      const budgetData = userBudgetStats.map((stat) => { return stat.total; });

      this.setState({
        userBudgetStats: {
          labels: budgetStatLabels,
          datasets: [{
            label: "Aggregate Total",
            data: budgetData,
            fillColor: "rgba(0, 0, 0, 1)",
            strokeColor: "rgba(0, 0, 0, 1)"
          }]
        }
      });
    });
  }

  private setUserInvoiced(userId: number): void {
    Stats.getUserInvoiceStats(userId).then((userInvoiceStats) => {
      const invoiceStatLables = userInvoiceStats.map((stat) => {
        const month = this.months[stat.month - 1];
        return `${month}, ${stat.year}`;
      });
      const invoiceData = userInvoiceStats.map((stat) => { return stat.total; });

      this.setState({
        userInvoiceStats: {
          labels: invoiceStatLables,
          datasets: [{
            label: "Aggregate Total",
            data: invoiceData,
            fillColor: "rgba(0, 0, 0, 1)",
            strokeColor: "rgba(0, 0, 0, 1)"
          }]
        }
      });
    });
  }

  public render() {
    return (
      <div style={{ margin: "10px" }}>
        <div className="row">
          {(() => {
            if (this.state.budgetStats) {
              return (
                <ChartCard
                  title="Budgeted"
                  dataSet={this.state.budgetStats}
                />
              );
            }
          })()}
          {(() => {
            if (this.state.invoiceStats) {
              return (
                <ChartCard
                  title="Invoiced"
                  dataSet={this.state.invoiceStats}
                />
              );
            }
          })()}
        </div>
        <div className="row">
          {(() => {
            if (this.state.users) {
              return (
                <ChartCardWithSelect
                  title="User Budgeted"
                  dataSet={this.state.userBudgetStats}
                  users={this.state.users}
                  setUser={this.setUserBudgeted.bind(this)}
                />
              );
            }
          })()}
          {(() => {
            if (this.state.users) {
              return (
                <ChartCardWithSelect
                  title="User Invoiced"
                  dataSet={this.state.userInvoiceStats}
                  users={this.state.users}
                  setUser={this.setUserInvoiced.bind(this)}
                />
              );
            }
          })()}
        </div>
      </div>
    );
  }

}

export {Admin};
