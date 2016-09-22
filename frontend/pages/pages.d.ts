import {IFullUser, IBudget, IBudgetItem, ITagGroup} from "../../common/models/models";

interface IHomeProps {
}
interface IHomeState {
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
}
interface IBudgetState {
  budgetItems?: Array<IBudgetItem>;
  tagGroups?: Array<ITagGroup>;
  selectedHeader?: string;
  sortDirection?: string;
}