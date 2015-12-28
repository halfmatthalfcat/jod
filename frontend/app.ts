/// <reference path="../typings/tsd.d.ts" />
/// <reference path="./app.d.ts" />

import 'babel-polyfill';
import { User } from './models/user';
import { Toolbar } from './components/toolbar';
import { Login } from './components/login';
import { Home } from './pages/home';
import { Accounts } from './pages/accounts';

declare var Router;

class App extends React.Component<IAppProps, IAppState>{
        
    public state: IAppState;
    
    constructor(props: IAppProps){
        super(props);
        this.state = {
            page: Home
        };
        this.setUser = this.setUser.bind(this);
    }
    
    public componentDidMount(){
        console.log("app mounted");
        var setState = this.setState;

        var router = Router({
            '/': {
                '/account': {
                    '/:accountId': {
                    },
                    on: (next) => { this.setState({page: Accounts}); console.log("At account"); }
                }, 
                on: (next) => { 
                    if(this.state.user) { next(); console.log("Proceeding"); } 
                    else {
                        next(false); 
                        document.location.href='/#/'; 
                        console.log("User not found: " + JSON.stringify(this.state.user)); 
                    }
                }
            }
        });

        router.configure({ 
            async: true,
            recurse: 'forward', 
            notfound: () => { document.location.href='/#/'; } });

        router.init('/');
    }

    public setUser = (user: User) => {
        this.setState({ user: user, page: this.state.page });
    }

    public render(){
        return(
            React.DOM.div(
                {'className': 'container'}, 
                React.createElement(Toolbar, {user: this.state.user}), 
                React.createElement(Login, {setUser: this.setUser}),
                React.createElement(this.state.page, null)       
            )
        );
    }
}

function render(){
    ReactDOM.render(
        React.createElement(
            App, null    
        ),
        document.getElementsByClassName("app")[0]
    );
}

render();
