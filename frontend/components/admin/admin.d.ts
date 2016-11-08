import Chart from "chart.js";
import {IUser} from "../../../common/models/models";

interface IChartCardProps {
  title: string;
  dataSet: Chart.LinearChartData;
}
interface IChartCardState {}

interface IChartCardWithSelectProps {
  title: string;
  dataSet: Chart.LinearChartData;
  users: Array<IUser>;
  setUser: (userId: number) => void;
}