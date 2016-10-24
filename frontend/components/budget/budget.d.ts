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
  budget?: IBudget;
}

interface IBudgetRowState {
  budgetItem?: IBudgetItem;
}

interface IBudgetRowProps {
  budgetItem: IBudgetItem;
  del: () => void;
  update: () => void;
  addInvoiceItem: () => void;
  removeInvoiceItem: () => void;
}

interface IBudgetHeaderProps {
  name: string;
  direction: string;
  selectedHeader: string;
  headerClicked: () => void;
  width?: number;
}

interface ITagRowProps {
  tags: Array<ITag>;
  tagGroups: Array<ITagGroup>;
  budgetItemId: number;
  addTagMap: (tag: ITag) => void;
  delTagMap: (tag: ITag) => void;
}

interface ITagModalProps {
  tagGroups: Array<ITagGroup>;
}

interface ITagModalState {
  tagText?: string;
  tagColor?: string;
  tagTextColor?: string;
  tagGroups?: Array<ITagGroup>;
}

interface IBudgetActionProps {
  newItem: () => void;
  resetBudget: () => void;
  generateBudget: () => void;
  generateInvoice: () => void;
}

interface IBudgetItemModalProps {
  budgetId: number;
  budgetItem?: IBudgetItem;
  tagGroups: Array<ITagGroup>;
  addBudgetItem?: (budgetItem: IBudgetItem) => void;
  updateBudgetItem?: (budgetItem: IBudgetItem) => void;
  addTagMap?: (budgetItem: IBudgetItem, tag: ITag) => void;
  delTagMap?: (budgetItem: IBudgetItem, tag: ITag) => void;
}
interface IBudgetItemModalState {
  budgetItemId?: number;
  budgetId?: number;
  description?: string;
  created?: string;
  totalPrice?: number;
  notes?: string;
  invoiced?: string;
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

interface ISubTotalRowProps {
  budgetItems?: Array<IBudgetItem>;
}

interface JQuery {
  dropit(): JQuery;
}