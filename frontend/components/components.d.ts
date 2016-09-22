import {IUser, IFullUser} from "../../common/models/models";

interface IToolbarProps {
  route: any;
}
interface IToolbarState {
  user?: IUser;
  showLogin?: boolean;
  showSearch?: boolean;
  searchText?: string;
}

interface ILoginProps {
  params?: any;
}
