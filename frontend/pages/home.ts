/// <reference path="./pages.d.ts" />
/// <reference path="../../typings/tsd.d.ts" />

class Home extends React.Component<IHomeProps, IHomeState>{

    public state: IHomeState;

    constructor(props: IHomeProps){
        super(props);
        this.state = {}
    }

    public componentDidMount(){
        
    }

    public render(){
        return(
            React.DOM.div(null, "Home")        
        );
    }

}

export { Home };
