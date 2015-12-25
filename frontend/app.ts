/// <reference path="../typings/tsd.d.ts" />
/// <reference path="./app.d.ts" />

import 'babel-polyfill';
import { User } from './models/user';
import { Toolbar } from './components/toolbar';
import { Login } from './components/login';

declare var Router;

class App extends React.Component<IAppProps, IAppState>{
        
    public state: IAppState;
    
    constructor(props: IAppProps){
        super(props);
        this.state = {
            user: null
        };
    }
    
    public componentDidMount(){
        console.log("app mounted");
        var setState = this.setState;

        var router = Router({
            '/': setState.bind(this, {}),
            '/admin': setState.bind(this, {})
        });

        router.configure({
            on: function(){
                console.log(window.location.hash.slice(2));
            }
        });

        router.init('/');
    }

    public render(){
        return(
            React.DOM.div(
                {'className': 'container'}, 
                React.createElement(Toolbar, {user: this.state.user}), 
                React.createElement(Login, {})       
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
