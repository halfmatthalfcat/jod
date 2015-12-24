/// <reference path="./components.d.ts" />

class Login extends React.Component<ILoginProps, ILoginState>{

    public state: IToolbarState;

    constructor(props: ILoginProps){
        super(props);
    }

    public componentDidMount(){}

    public render(){
        return(
            React.DOM.div(
                {'className': 'modal modal-fixed-footer', 'id': 'loginModal'},
                React.DOM.div(
                    {'className': 'modal-content'},
                    React.DOM.h4('Login'),
                    React.DOM.form(
                        null,
                        React.DOM.div(
                            {'className': 'row'},
                            React.DOM.div(
                                {'className': 'input-field'},
                                React.DOM.input({'id': 'email', 'type': 'text'}),
                                React.DOM.label({'htmlFor': 'email'}, "Email")    
                            ),
                            React.DOM.div(
                                {'className': 'input-field'},
                                React.DOM.input({'id': 'password', 'type': 'password'}),
                                React.DOM.label({'htmlFor': 'password'}, "Password")    
                            )
                        )
                    )    
                ),
                React.DOM.div(
                    {'className': 'modal-footer'},
                    React.DOM.a(
                        {'className': 'modal-action modal-close waves-effect waves-green btn-flat', 'href': '#!'},
                        "Login"
                    )        
                )
            )        
        );
    }

}

export { Login };
