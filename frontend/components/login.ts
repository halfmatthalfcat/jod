/// <reference path="./components.d.ts" />
/// <reference path="../../typings/tsd.d.ts" />

class Login extends React.Component<ILoginProps, ILoginState>{

    public state: ILoginState;

    constructor(props: ILoginProps){
        super(props);
        this.state = {
            loading: false
        };
    }

    public componentDidMount(){
        $(() => {
            $('#login').on('click', () => {
                this.tryLogin();
            });
        });
    }

    private getLoginData(): Object {
        return $("#loginForm input").toArray().reduce( (o, i) => {
            o[i.id] = i.value
            return o;
        }, {});
    }

    private tryLogin(){
        this.setState({loading: true});
        console.log("Sending: " + JSON.stringify(this.getLoginData()));
        $.post(
            "http://joliverdecor.com:3000/login",
            JSON.stringify(this.getLoginData()),
            (data, stat, jqxhr) => {
                this.setState({loading: false});
                console.log(data);        
            },
            'json'
        );
    }

    public render(){
        return(
            React.DOM.div(
                {'className': 'modal modal-fixed-footer', 'id': 'loginModal'},
                React.DOM.div(
                    {'className': 'modal-content'},
                    React.DOM.h4(
                        {'className': 'modal-header loginModalHeader'}, 'Login'),
                    React.DOM.div(
                        {'className': 'row loginForm'},
                        React.DOM.form(
                            {'className': 'col s12', 'id': 'loginForm'},
                            React.DOM.div(
                                {'className': 'row'},
                                React.DOM.div(
                                    {'className': 'input-field col s12'},
                                    React.DOM.input({'id': 'email', 'type': 'text', 'className': 'validate'}),
                                    React.DOM.label({'htmlFor': 'email'}, "Email")    
                                ),
                                React.DOM.div(
                                    {'className': 'input-field col s12'},
                                    React.DOM.input({'id': 'password', 'type': 'password', 'className': 'validate'}),
                                    React.DOM.label({'htmlFor': 'password'}, "Password")    
                                )
                            )
                        )
                    )    
                ), 
                React.DOM.div(
                    {'className': 'modal-footer'},
                    this.isLoading()
                )
            )        
        );
    }

    private isLoading(){
        if(this.state.loading){
            return(
                React.DOM.div(
                    {'className': 'preloader-wrapper small active right loader'},
                    React.DOM.div(
                        {'className': 'spinner-layer spinner-blue-only'},
                        React.DOM.div(
                            {'className': 'circle-clipper left'},
                            React.DOM.div(
                                {'className': 'circle'}    
                            )    
                        ),
                        React.DOM.div(
                            {'className': 'gap-patch'},
                            React.DOM.div(
                                {'className': 'circle'}    
                            )    
                        ),
                        React.DOM.div(
                            {'className': 'circle-clipper right'},
                            React.DOM.div(
                                {'className': 'circle'}    
                            )    
                        )
                    )
                )
            );
        }
        else{ 
            return(
                React.DOM.a(
                    {'className': 'modal-action waves-effect waves-green btn-flat', 'href': '#!', 'id': 'login'},
                    "Login"
                )        
            );
        }
    }

}

export { Login };