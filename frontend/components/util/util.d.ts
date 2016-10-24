import {ITag} from "../../../common/models/models";

interface IEmptyCardProps {
  message: string;
  icon?: string;
  clicked: () => void;
}

interface IFloatingActionProps {
  clicked: () => void;
}

interface IStatefulTagProps {
  tag: ITag;
  active: boolean;
  activated: () => void;
  deactivated: () => void;
}
