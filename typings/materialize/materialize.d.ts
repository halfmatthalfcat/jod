/// <reference path="../jquery/jquery.d.ts" />


interface JQuery {
    leanModal(modalOpts?: MaterializeModalOpts): JQuery;
}

interface MaterializeModalOpts {
    dismissable?: boolean;
    opacity?: number;
    in_duration?: number;
    out_duration?: number;
    ready?: () => void;
    complete?: () => void;
}


declare module "materialize" {}
