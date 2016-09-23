interface IEmptyCardProps {
  message: string;
  icon?: string;
  clicked: () => void;
}

interface IFloatingActionProps {
  clicked: () => void;
}

interface JQuery {
  dropit(): JQuery;
}