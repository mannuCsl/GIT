import { LightningElement } from 'lwc';

// const createData = [{
//     "firstHeader":"State of California DEPARTMENT OF COMMUNITY SERVICE AND DEVELOPMENT 2021 A2 CalEITC+ Education & Outreach Grant Program Report CSD 171PR (Rev. 09/2022)",
//     "secondHeader":"2021 A2 CalEITC+ Education & Outreach Grant Program Report Period of Performance 7/1/2022 through 6/30/2023",
//     "Grantee Organization Name":"HP Corporation", 
//     "Grantee Representative":"Don Shults", 
//     "Telephone Number":"5623148311",
//     "Email Address":"harshad.panchal@csd.ca.gov", 
//     "Contract Number":"null", 
//     "Target Area":"1", 
//     "Reporting Period":"null"
// }];

export default class CreateJSON extends LightningElement {
    isShowDraft = false;
    counter = new Date().getTime();
    screens = [
        {
            "section": {
                "id": ++this.counter,
                "label": "<h1>AUTHORIZED REPRESENTATIVE SIGNATURE</h1>",
                "class": "",
                "hidden": false,
                "rows": [
                    {
                        "id": ++this.counter,
                        "label": "Testing",
                        "class": "",
                        "hidden": false,
                        "columns": [                   
                            {
                                "label": "I attest to the best of my knowledge and belief that the information and data provided by this Grantee, is accurate and complete.",
                                "class": "",
                                "fieldAPIName": "Id",
                                "isLabel": true,
                                "isInput": false,
                                "isTextarea": false,
                                "isCurrency" : false,
                                "isDisabled" : false,
                                "isReadOnly" : false,
                                "formatter" : "currency"
                            },                           
                        ]
                    },
                    {
                        "id": ++this.counter,
                        "label": "Testing",
                        "class": "",
                        "hidden": false,
                        "columns": [
                            {
                                "label": "First Name:",
                                "class": "",
                                "fieldAPIName": "Id",
                                "isLabel": true,
                                "isInput": false,
                                "isTextarea": false,
                                "isCurrency" : false,
                                "isDisabled" : false,
                                "isReadOnly" : false,
                                "formatter" : "currency"
                            },
                            {
                                "label": "",
                                "class": "",
                                "fieldAPIName": "Id",
                                "isRequired" : true,
                                "isLabel": false,
                                "isInput": true,
                                "isTextarea": false,
                                "isCurrency" : false,
                                "isDisabled" : false,
                                "isReadOnly" : false,
                                "formatter" : "currency"
                            },
                            {
                                "label": "Last Name:",
                                "class": "",
                                "fieldAPIName": "Id",
                                "isLabel": true,
                                "isInput": false,
                                "isTextarea": false,
                                "isCurrency" : false,
                                "isDisabled" : false,
                                "isReadOnly" : false,
                                "formatter" : "currency"
                            },
                            {
                                "label": "",
                                "class": "",
                                "fieldAPIName": "Id",
                                "isLabel": false,
                                "isInput": true,
                                "isTextarea": false,
                                "isCurrency" : false,
                                "isDisabled" : false,
                                "isReadOnly" : false,
                                "formatter" : "currency"
                            },                            
                        ]
                    },
                    {
                        "id": ++this.counter,
                        "label": "Testing",
                        "class": "",
                        "hidden": false,
                        "columns": [
                            {
                                "label": "Role/Title:",
                                "class": "",
                                "fieldAPIName": "Id",
                                "isLabel": true,
                                "isInput": false,
                                "isTextarea": false,
                                "isCurrency" : false,
                                "isDisabled" : false,
                                "isReadOnly" : false,
                                "formatter" : "currency"
                            },
                            {
                                "label": "",
                                "class": "",
                                "fieldAPIName": "Id",
                                "isLabel": false,
                                "isInput": true,
                                "isTextarea": false,
                                "isCurrency" : false,
                                "isDisabled" : false,
                                "isReadOnly" : false,
                                "formatter" : "currency"
                            },
                            {
                                "label": "Grantee:",
                                "class": "",
                                "fieldAPIName": "Id",
                                "isLabel": true,
                                "isInput": false,
                                "isTextarea": false,
                                "isCurrency" : false,
                                "isDisabled" : false,
                                "isReadOnly" : false,
                                "formatter" : "currency"
                            },
                            {
                                "label": "",
                                "class": "",
                                "fieldAPIName": "Id",
                                "isLabel": false,
                                "isInput": true,
                                "isTextarea": false,
                                "isCurrency" : false,
                                "isDisabled" : false,
                                "isReadOnly" : true,
                                "formatter" : "currency"
                            },                            
                        ]
                    },
                    {
                        "id": ++this.counter,
                        "label": "Testing",
                        "class": "",
                        "hidden": false,
                        "columns": [
                            {
                                "label": "Email:",
                                "class": "",
                                "fieldAPIName": "Id",
                                "isLabel": true,
                                "isInput": false,
                                "isTextarea": false,
                                "isCurrency" : false,
                                "isDisabled" : false,
                                "isReadOnly" : false,
                                "formatter" : "currency"
                            },
                            {
                                "label": "",
                                "class": "",
                                "fieldAPIName": "Id",
                                "type" : "email",
                                "isLabel": false,
                                "isInput": true,
                                "isTextarea": false,
                                "isCurrency" : false,
                                "isDisabled" : false,
                                "isReadOnly" : false,
                                "formatter" : "currency"
                            },
                            {
                                "label": "Phone:",
                                "class": "",
                                "fieldAPIName": "Id",
                                "isLabel": true,
                                "isInput": false,
                                "isTextarea": false,
                                "isCurrency" : false,
                                "isDisabled" : false,
                                "isReadOnly" : false,
                                "formatter" : "currency"
                            },
                            {
                                "label": "",
                                "class": "",
                                "fieldAPIName": "Id",
                                "type" : "phone",
                                "isLabel": false,
                                "isInput": true,
                                "isTextarea": false,
                                "isCurrency" : false,
                                "isDisabled" : false,
                                "isReadOnly" : false,
                                "formatter" : "currency"
                            },                            
                        ]
                    },                    
                ]
            }
        },
    ]

    columnmethodName(ev){
        //ev.target.value;
        console.log(" onClickHandler == ",ev.target.value);
    }



    handleStepFocus(e) {
        let stepNumber = e.target.value;
        let indicatorData = JSON.parse(JSON.stringify(this.progressIndicatorSteps));
        let currentSteps = indicatorData.filter(indicator => indicator.step === stepNumber);
        if (currentSteps.length > 0) {
            this.showDraft = currentSteps[0].showDraft;
        }
    }
    handleStepClick(e) {
        this.handleStepFocus(e);
    }
}



//     jsonData;

//     connectedCallback(){
//         console.log('createData: ', createData);
//         this.jsonData = this.json;
//         console.log('jsonData: ', this.jsonData);
//         console.log('Label: ',this.json[0]);
//         console.log('Label: ',this.json[0].Section);
//         console.log('Label: ',this.json[0].Section.H1);
//         console.log('Label: ',this.json[0].Section.H1.label);
//     }
//     json = [{
//         "Section": {
//             "H1":{
//                 "label": "Web",
//             },
//             "rows": {
//                 "data": [
//                     { "label": "Category"},
//                     { "label": "Target"},
//                     { "label": "Metrics"},
//                     { "label": "EITC Website Hits", "value": ""},
//                     { "label": "Total Web Expenditures for Reporting Period", "value": ""}                    
//                 ]
//             },
//             "H2":{
//                 "label":"Narrative of Expenditures in EARS and Outreach Activities",
//             },
//             "data": [
//                 { "label": "List the various activity-expenditures charged for this month and their cost", "value":""},
//                 { "label": "Provide a brief narrative of education and outreach activities conducted during the reporting period under Web", "value":""},
//                 { "label": "Any other additional information pertinent to work conducted during the reporting period in relation to Web presence, including indicating any leveraging of other resources", "value":""},                                   
//             ]
//         },
//         // "Section": {
//         //     "H1": {
//         //         "label": "Social Media",
//         //     },
//         //     "rows": {
//         //         "data": [
//         //             { "label": ""},
//         //             { "label": "Target"},
//         //             { "label": ""},
//         //             { "label": ""},
//         //             { "label": "Target"},
//         //             { "label": ""},                    
//         //             { "label": "Number of Facebook Posts", "value":""},
//         //             { "label": ""},
//         //             { "label": "Exact Messaging of Most-Liked Facebook Post", "value":""},
//         //             { "label": ""},
//         //             { "label": "Number of Tweets", "value":""},
//         //             { "label": ""},                    
//         //             { "label": "Exact Messaging of Most-Favorited Twitter Post", "value": ""},  
//         //             { "label": ""},                 
//         //         ],
//         //         "data2":[
//         //             { "label": ""},
//         //             { "label": "Target"},
//         //             { "label": ""},
//         //             { "label": ""},
//         //             { "label": "Target"},
//         //             { "label": ""},                    
//         //             { "label": "Number of Other Posts (Instagram, TikTok etc.)", "value":""},
//         //             { "label": ""},
//         //             { "label": "Exact Messaging of Most-Liked 'Other' Post", "value":""},
//         //             { "label": ""}
//         //         ],
//         //         "data3" :[
//         //             { "label": ""},
//         //             { "label": "Target"},
//         //             { "label": ""},                                   
//         //             { "label": "Total Social Media Expenditures for Reporting Period", "value":""},
//         //             { "label": ""}                    
//         //         ]
//         //     },
//         //     "H2":{
//         //         "label":"Narrative of Expenditures in EARS and Outreach Activites",
//         //     },
//         //     "data": [
//         //         { "label": "List the various activity-expenditures charged for this month and their cost", "value":""},
//         //         { "label": "Provide a brief narrative of education and outreach activities conducted during the reporting period under Social Media", "value":""},
//         //         { "label": "Indicate any leveraging of other resources conducted this reporting period in regards to Social Media", "value":""},                                   
//         //     ]
//         // }
//     }]

// Json=[{"Section1":[]}];

//     SECTION_ITEM_PROPERTIES = [
//         {
//             label: cl_DataPointLabel,
//             disabled: true,
//             _isInput: true,
//             _name: 'dataType',
//             _type: 'text',
//             value: "",
//             _class: "input",
//             _hidden: false
//         },
//         {
//             label: cl_SizeLabel,
//             disabled: true,
//             _isInput: true,
//             _name: 'size',
//             _type: 'number',
//             value: "",
//             _class: "config-input",
//             _hidden: false
//         },
//         {
//             label: cl_PropertyLabel,
//             disabled: false,
//             _isInput: true,
//             _name: 'label',
//             _type: 'text',
//             value: "",
//             _class: "config-input",
//             _hidden: false
//         },
//         {
//             label: cl_HelpText,
//             disabled: false,
//             _isInput: true,
//             _name: 'helpText',
//             _type: 'text',
//             value: "",
//             _class: "config-input",
//             _hidden: false
//         },
//         {
//             label: cl_DefaultValue,
//             disabled: false,
//             _isInput: true,
//             _name: 'defaultValue',
//             _type: 'text',
//             value: "",
//             _class: "validation-input",
//             _hidden: false
//         },
//         {
//             label: cl_MinSize,
//             disabled: false,
//             _isInput: true,
//             _name: 'minSize',
//             _type: 'number',
//             value: "",
//             _class: "validation-input",
//             _hidden: false
//         },
//         {
//             label: 'Alphabets Only',
//             disabled: false,
//             _isCheckBox: true,
//             _name: 'isAlphaOnly',
//             _type: 'checkbox',
//             value: "",
//             _class: "validation-input",
//             _hidden: false
//         },
//         {
//             label: cl_NumberOnly,
//             disabled: false,
//             _isCheckBox: true,
//             _name: 'isNumberOnly',
//             _type: 'checkbox',
//             value: "",
//             _class: "validation-input",
//             _hidden: false
//         },
//         {
//             label: cl_ValidationEnum,
//             disabled: false,
//             _isInput: true,
//             _name: 'validationEnum',
//             _type: 'text',
//             value: "",
//             _class: "validation-input",
//             _hidden: false
//         },
//         {
//             label: cl_Required,
//             disabled: false,
//             _isCheckBox: true,
//             _name: 'isRequired',
//             _type: 'checkbox',
//             value: "",
//             _class: "validation-input",
//             _hidden: false
//         },
//         {
//             label: cl_Protected,
//             disabled: false,
//             _isCheckBox: true,
//             _name: 'isProtected',
//             _type: 'checkbox',
//             value: "",
//             _class: "validation-input",
//             _hidden: false
//         },
//         {
//             label: cl_ValidationErrorMessage,
//             disabled: false,
//             _isInput: true,
//             _name: 'errorText',
//             _type: 'text',
//             value: "",
//             _class: "validation-input",
//             _hidden: false
//         },
//         {
//             label: cl_PicklistValues,
//             disabled: false,
//             columns: [
//                 { label: 'Label', fieldName: 'label' },
//                 { label: 'Value', fieldName: 'value' },
//                 { label: 'Is Visible?', fieldName: 'isVisible', type: 'boolean' },
//     ​
//             ],
//             _isComboBox: true,
//             _name: 'options',
//             _type: 'datatable',
//             value: "",
//             _hidden: false,
//             _class: "config-input",
//         },
//     ​
//     ];
//}