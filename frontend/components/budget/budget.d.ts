import {IBudget, IFullUser, IBudgetItem, ITag} from "../../../common/models/models";

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

interface IBudgetRowProps {
  budgetItem: IBudgetItem
}

interface IBudgetHeaderProps {
  name: string;
  direction: string;
  selectedHeader: string;
  headerClicked: () => void;
}

interface ITagRowProps {
  tags: Array<ITag>;
}