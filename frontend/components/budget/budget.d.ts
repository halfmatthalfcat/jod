import {IBudget, IFullUser} from "../../../common/models/models";

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