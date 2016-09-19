import {IFullUser, IBudget} from "../../common/models/models";

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
}
interface IBudgetState {
}