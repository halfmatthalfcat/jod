import {IFullUser} from "../../../common/models/models";

interface IUserModalProps {
  user?: IFullUser;
  update: (user: IFullUser) => void;
}
interface IUserModalState {
  user: IFullUser;
}

interface IUserCardProps {
  user: IFullUser;
  edit: () => void;
  del: () => void;
}
interface IUserCardState {

}
