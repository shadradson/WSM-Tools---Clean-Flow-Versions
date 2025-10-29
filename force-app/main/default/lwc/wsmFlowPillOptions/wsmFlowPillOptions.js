import { LightningElement, api,  } from 'lwc';
import { FlowAttributeChangeEvent, FlowNavigationNextEvent} from 'lightning/flowSupport';

export default class wsmFlowPillOptions extends LightningElement {
    @api InputOptions;
    @api InputOptions2;
    @api OutputSelectedButtonString;
    @api NavigateOnClick;
    @api NavigateOnClick2;

    @api
    get zippedbuttons() {
        let unzippedbuttons = this.InputOptions.split(',');
        let varreturn = [];
        for (let i in unzippedbuttons) {
            let child = {};
            child.value = unzippedbuttons[i];
            varreturn[i] = child;
            console.log(unzippedbuttons[i]);
        };

        unzippedbuttons = this.InputOptions2;
        for (let i in unzippedbuttons) {
            let child = {};
            child.value = unzippedbuttons[i];
            varreturn[i] = child;
            console.log(unzippedbuttons[i]);
        };
        
        return varreturn;
    };

    

    handleholdval(event) {
        console.log('click', event.target.label);
        this.OutputSelectedButtonString = event.target.label;
        const attributeChangeEvent = new FlowAttributeChangeEvent('OutputSelectedButtonString', this.OutputSelectedButtonString);
        this.dispatchEvent(attributeChangeEvent);
        console.log('Output Var = : ', this.OutputSelectedButtonString);
        console.log(this.NavigateOnClick2);
        if(this.NavigateOnClick2) {
            console.log("Go Next In Flow");
            this.handleGoNext();
        };
        
    }

    @api
    handleGoNext() {
        console.log("Go Next Activated");
        const nextNavigationEvent = new FlowNavigationNextEvent();
        this.dispatchEvent(nextNavigationEvent);
    }
}