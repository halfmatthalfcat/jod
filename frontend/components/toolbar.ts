/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="./components.d.ts" />
/// <reference path="../models/models.d.ts" />

import { User } from '../models/user';
import { Login } from './login';
import * as $ from 'jquery';

class Toolbar extends React.Component<IToolbarProps, IToolbarState>{

    public state: IToolbarState;

    constructor(props: IToolbarProps){
        super(props);
    }

    public componentDidMount(){
        $(() => {
            $(".loginModal").leanModal({
                dismissable: true
            });
        });
    }

    public render(){
        return(
            React.createElement( 
                "nav",
                {'className': 'blue-grey darken-4'},
                React.DOM.div(
                    {'className': 'nav-wrapper'},
                    React.DOM.a(
                        {'href': '#', 'className': 'center brand-logo'},
                        'Logo'
                    ),
                    this.buildButtons()
                ),
                React.createElement(Login, {})       
            ) 
        );
    }


    private buildButtons() {
    
        if(this.isLoggedIn()){
            return(
                React.DOM.ul(
                    {'className': 'right'},
                    React.DOM.li(
                        null,
                        React.DOM.div(
                            null,
                            "Welcome, " + this.props.user.username
                        )
                    )
                ),
                React.DOM.ul(
                    {'className': 'right'},
                    React.DOM.li(
                        null,
                        React.DOM.a(
                            {'href': '#/accounts'},
                            'Accounts'
                        )
                    )
                ),
                React.DOM.ul(
                    {'className': 'right'},
                    React.DOM.li(
                        null,
                        React.DOM.a(
                            {'href': '#/logout'},
                            'Logout'
                        )
                    )
                )
            );
        } else {
           return(
                React.DOM.ul(
                    {'className': 'right'},
                    React.DOM.li(
                        null,
                        React.DOM.a(
                            {'href': '#loginModal', 'className': 'modal-action modal-close waves-effect waves-green btn-flat'},
                            'Login'
                        )
                    )
                )
            ); 
        }
    
    }

    private isLoggedIn(): boolean {
        if(this.props.user){ return true; }
        else { return false; }
    }

}

export { Toolbar };
