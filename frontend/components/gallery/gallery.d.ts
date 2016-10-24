import {IImage} from "../../../common/models/models";

interface IImageCardProps {
  imgUrl: string;
  description?: string;
  edit?: () => void;
  del?: () => void;
}

interface IImageModalProps {
  image?: IImage;
  addImage: (image: IImage) => void;
}
interface IImageModalState {
  imageId?: number;
  key?: string;
  s3Url?: string;
  description?: string;
  image?: string;
}