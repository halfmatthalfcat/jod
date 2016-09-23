import {IBudget, IFullUser, IBudgetItem, ITag, ITagGroup} from "../../../common/models/models";

interface IBudgetCardProps {
  budget: IBudget;
  edit: () => void;
  del: () => void;
}

interface IBudgetModalProps {
  budget?: IBudget;
  users: Array<IFullUser>;
  update: (budget: IBudget) => void;
}
interface IBudgetModalState {
  budget: IBudget;
}

interface IBudgetRowState {
  budgetItem: IBudgetItem;
}

interface IBudgetRowProps {
  budgetItem: IBudgetItem;
  del: () => void;
}

interface IBudgetHeaderProps {
  name: string;
  direction: string;
  selectedHeader: string;
  headerClicked: () => void;
}

interface ITagRowProps {
  tags: Array<ITag>;
  tagGroups: Array<ITagGroup>;
  budgetItemId: number;
  addTagMap: (tag: ITag) => void;
  delTagMap: (tag: ITag) => void;
}

interface ITagModalProps {

}