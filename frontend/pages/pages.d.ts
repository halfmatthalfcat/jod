import {IFullUser, IBudget, IBudgetItem, ITagGroup, ITag, IImage} from "../../common/models/models";

interface IHomeProps {
}
interface IHomeState {
  images?: Array<IImage>;
}

interface IAdminProps {
}
interface IAdminState {
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
