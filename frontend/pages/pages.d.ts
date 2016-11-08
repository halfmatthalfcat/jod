import {IFullUser, IBudget, IBudgetItem, ITagGroup, ITag, IImage, IStatItem, IUser} from "../../common/models/models";
import Chart from "chart.js";

interface IHomeProps {
}
interface IHomeState {
  images?: Array<IImage>;
}

interface IAdminProps {
}
interface IAdminState {
  budgetStats?: Chart.LinearChartData;
  invoiceStats?: Chart.LinearChartData;
  userBudgetStats?: Chart.LinearChartData;
  userInvoiceStats?: Chart.LinearChartData;
  users?: Array<IUser>;
}

interface IAccountsProps {
}
interface IAccountsState {
  users?: Array<[IFullUser, Array<IBudget>]>;
}

interface IUsersProps {
}
interface IUsersState {
  users: Array<IFullUser>;
  user?: IFullUser;
}

interface IBudgetProps {
  params: any;
  searchText: string;
}
interface IBudgetFilters {
  tags?: Array<ITag>;
  searchText?: string;
  fromDateRange?: string;
  toDateRange?: string;
  fromTotalAmount?: number;
  toTotalAmount?: number;
}
interface IBudgetState {
  budget?: IBudget;
  budgetItems?: Array<IBudgetItem>;
  invoiceItems?: Array<IBudgetItem>;
  focusedItem?: IBudgetItem;
  tagGroups?: Array<ITagGroup>;
  selectedHeader?: string;
  sortDirection?: string;
  filters?: IBudgetFilters;
}

interface IGalleryProps {

}
interface IGalleryState {
  focusedItem?: IImage;
  images?: Array<IImage>;
  masonry?: JQuery;
}
