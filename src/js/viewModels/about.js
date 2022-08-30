/**
 * @license
 * Copyright (c) 2014, 2022, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
/*
 * Your about ViewModel code goes here
 */
define(['text!../../complaints.json','text!../../officer_list.json','ojs/ojdataprovider','ojs/ojlistdataproviderview','../accUtils','ojs/ojconverter-number','ojs/ojconverterutils-i18n','ojs/ojasyncvalidator-regexp','ojs/ojasyncvalidator-numberrange','knockout','ojs/ojarraydataprovider','ojs/ojselectsingle','ojs/ojinputtext','ojs/ojdatetimepicker','ojs/ojinputnumber','ojs/ojbutton','ojs/ojdialog','ojs/ojtable'],
 function(complaintdata,offjson,ojdataprovider_1,ListDataProviderView,accUtils,ojconverter_number_1,ojconverterutils_i18n_1,AsyncRegExpValidator,AsyncNumberRangeValidator,ko,ArrayDataProvider) {
    function AboutViewModel() {
      // Below are a set of the ViewModel methods invoked by the oj-module component.
      // Please reference the oj-module jsDoc for additional information.

      /**
       * Optional ViewModel method invoked after the View is inserted into the
       * document DOM.  The application can put logic that requires the DOM being
       * attached here.
       * This method might be called multiple times - after the View is created
       * and inserted into the DOM and after the View is reconnected
       * after being disconnected.
       */


       var self = this;
       let off_json_data = (JSON.parse(offjson))["Officers"];
       let complaints_json = (JSON.parse(complaintdata))["Complaints"];
      this.useremailid = ko.observable(localStorage.getItem("useremailid"));
      let j =0;
      let complaints_json_filtered = complaints_json;

        
      for(let i = 0; i <complaints_json.length; i++){
        let now_date = new Date();
        console.log(i);
        let officer_issue_date = new Date(complaints_json[i]["H1IssueTime"].substring(0,10));
        console.log(officer_issue_date);
        let difference = now_date.getTime() - officer_issue_date.getTime();
        console.log(difference);
        if(difference > 604800000){
          let current_officer = complaints_json[i]["Officer"];
          let next_officer = null;
          if(current_officer == "H1"){
            next_officer = "H2";
          } else if(current_officer == "H2" || current_officer == "H3"){
            next_officer = "H3";
          }
          complaints_json[i]["Officer"] = next_officer;

          for(let z = 0; z<off_json_data.length;z++){
          if(off_json_data[z]["HierarchyLevel"] == next_officer){
            complaints_json[i]["OfficerName"] = off_json_data[z]["OfficerName"];
            complaints_json[i]["OfficerEmailId"] = off_json_data[z]["OfficerEmailId"];
          }
        }



        }









      }
      
       this.table_filter_value = ko.observable('');
       this.filter_value_changed = () => {
                  this.table_filter_value(document.getElementById('filter').rawValue);
              };
              console.log(complaints_json);

              this.complaint_dataprovider = ko.computed(function () {
                  let filterCriterion = null;
                  if (this.table_filter_value() && this.table_filter_value() != '') {
                      filterCriterion = ojdataprovider_1.FilterFactory.getFilter({
                          filterDef: { text: this.table_filter_value() }
                      });
                  }
                  const arrayDataProvider = new ArrayDataProvider( complaints_json_filtered, { keyAttributes: 'ComplaintID' });
                  return new ListDataProviderView(arrayDataProvider, { filterCriterion: filterCriterion });
              }, this);


      this.connected = () => {
        accUtils.announce('About page loaded.');
        document.title = "About";
        // Implement further logic if needed
      };

      /**
       * Optional ViewModel method invoked after the View is disconnected from the DOM.
       */
      this.disconnected = () => {
        // Implement if needed
      };

      /**
       * Optional ViewModel method invoked after transition to the new View is complete.
       * That includes any possible animation between the old and the new View.
       */
      this.transitionCompleted = () => {
        // Implement if needed
      };
    }

    /*
     * Returns an instance of the ViewModel providing one instance of the ViewModel. If needed,
     * return a constructor for the ViewModel so that the ViewModel is constructed
     * each time the view is displayed.
     */
    return AboutViewModel;
  }
);
