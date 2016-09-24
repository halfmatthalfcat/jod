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

interface IBudgetActionProps {
}

interface IBudgetItemModalProps {
  budgetId: number;
  tagGroups: Array<ITagGroup>;
  addBudgetItem: (budgetItem: IBudgetItem) => void;
}
interface IBudgetItemModalState {
  budgetId?: number;
  description?: string;
  created?: string;
  totalPrice?: number;
  notes?: string;
  tags?: Array<ITag>
}

interface ISortModalProps {
  tagGroups: Array<ITagGroup>;
  tagsFiltered: Array<ITag>;
  toggleFilter: (tag: ITag) => void;
}

interface ISortModalState {
  tags?: Array<ITag>;
}