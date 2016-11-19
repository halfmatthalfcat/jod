import {IChartCardWithSelectProps} from "./admin";
import Chart from "chart.js";

class ChartCardWithSelect extends React.Component<IChartCardWithSelectProps, {}> {

  private currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  });

  constructor(props: IChartCardWithSelectProps) {
    super(props);
  }

  public componentDidMount(): void {
    $(`#${this.props.title.replace(" ", "_")}_Select`).material_select();
    $(`#${this.props.title.replace(" ", "_")}_Select`).on("change", (event) => {
      this.props.setUser($(event.target).val());
    });
    const chart = new Chart(
      (document.getElementById(`chart${this.props.title.replace(" ", "_")}`) as HTMLCanvasElement).getContext("2d"),
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
    );

  }

  public componentWillReceiveProps(newProps: IChartCardWithSelectProps): void {
    $(`#${this.props.title.replace(" ", "_")}_Select`).material_select();
    const chart = new Chart(
      (document.getElementById(`chart${this.props.title.replace(" ", "_")}`) as HTMLCanvasElement).getContext("2d"),
      {
        type: "line",
        data: newProps.dataSet,
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
    );
  }

  public render() {
    return(
      <div className="col s6">
        <div className="card">
          <div className="card-content">
            <div className="row" style={{ display: "flex", alignItems: "center" }}>
              <span className="card-title col s8">{this.props.title}</span>
              <div className="input-field col s4">
                <select id={`${this.props.title.replace(" ", "_")}_Select`}>
                  <option value="" disabled selected >Choose a user</option>
                  {(() => {
                    if(this.props.users) {
                      return this.props.users.map((user) => {
                        return <option value={ user.userId }>{ user.username }</option>;
                      });
                    }
                  })()}
                </select>
              </div>
            </div>
            <canvas id={`chart${this.props.title.replace(" ", "_")}`}>
            </canvas>
          </div>
        </div>
      </div>
    );
  }

}

export {ChartCardWithSelect};