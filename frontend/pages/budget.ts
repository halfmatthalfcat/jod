/// <reference path="./pages.d.ts" />
/// <reference path="../../typings/index.d.ts" />

import * as React from 'react';

class Budget extends React.Component<IBudgetProps, IBudgetState>{

    public state: IBudgetState;

    constructor(props: IBudgetProps){
        super(props);
        this.state = {}
    }

    public componentDidMount(){

    }

    public render(){
        return(
            React.DOM.div(null, "Budget")
        );
    }

}

export { Budget };
