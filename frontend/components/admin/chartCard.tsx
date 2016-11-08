import {IChartCardProps} from "./admin";
import Chart from "chart.js";

class ChartCard extends React.Component<IChartCardProps, {}> {

  private currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  });

  constructor(props: IChartCardProps) {
    super(props);
  }

  public componentDidMount(): void {
    const chart = new Chart(
      (document.getElementById(`chart${this.props.title}`) as HTMLCanvasElement).getContext("2d"),
      {
        type: "line",
        data: this.props.dataSet,
        options: {
          scales: {
            yAxes: [{
              ticks: {
                callback: (value, index, values) => {
                  return this.currencyFormatter.format(parseInt(value));
                }
              }
            }]
          }
        }
      }
    )
  }

  public render() {
    return(
      <div className="col s6">
        <div className="card">
          <div className="card-content">
            <span className="card-title">{this.props.title}</span>
            <canvas id={`chart${this.props.title}`}>
            </canvas>
          </div>
        </div>
      </div>
    );
  }

}

export {ChartCard};