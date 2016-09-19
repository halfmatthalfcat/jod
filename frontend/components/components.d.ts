import {IUser, IFullUser} from "../../common/models/models";

interface IToolbarProps {
}
interface IToolbarState {
  user?: IUser;
  showLogin: boolean;
}

interface ILoginProps {
  params?: any;
}
