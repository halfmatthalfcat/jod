/// <reference path="./pages.d.ts" />
/// <reference path="../../typings/index.d.ts" />

import * as React from 'react';

class Account extends React.Component<IAccountProps, IAccountState>{

    public state: IAccountState;

    constructor(props: IAccountProps){
        super(props);
        this.state = {}
    }

    public componentDidMount(){

    }

    public render(){
        return(
            React.DOM.div(null, "Account")
        );
    }

}

export { Account };
