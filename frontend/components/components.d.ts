interface IToolbarProps { user?: IUser; }
interface IToolbarState {}

interface ILoginProps {
    setUser: (user: IUser) => void;
}
interface ILoginState {
    loading: boolean;
}
