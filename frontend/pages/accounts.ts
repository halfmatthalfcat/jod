/// <reference path="./pages.d.ts" />
/// <reference path="../../typings/index.d.ts" />

import * as React from 'react';

class Accounts extends React.Component<IAccountsProps, IAccountsState>{

    public state: IAccountsState;

    constructor(props: IAccountsProps){
        super(props);
        this.state = {}
    }

    public componentDidMount(){
        
    }

    public render(){
        return(
            React.DOM.div(null, "Accounts")        
        );
    }

}

export { Accounts };
