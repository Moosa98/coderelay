/**
 * @license
 * Copyright (c) 2014, 2022, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
/*
 * Your customer ViewModel code goes here
 */
define(['text!../../complaints.json','text!../../officer_list.json','ojs/ojdataprovider','ojs/ojkeyset','ojs/ojlistdataproviderview','../accUtils','ojs/ojconverter-number','ojs/ojconverterutils-i18n','ojs/ojasyncvalidator-regexp','ojs/ojasyncvalidator-numberrange','knockout','ojs/ojarraydataprovider','ojs/ojselectsingle','ojs/ojinputtext','ojs/ojdatetimepicker','ojs/ojinputnumber','ojs/ojbutton','ojs/ojdialog','ojs/ojtable'],
 function(complaintdata,offjson,ojdataprovider_1,ojkeyset_1,ListDataProviderView,accUtils,ojconverter_number_1,ojconverterutils_i18n_1,AsyncRegExpValidator,AsyncNumberRangeValidator,ko,ArrayDataProvider) {
    function CustomerViewModel() {
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
       let complaints_json = (JSON.parse(complaintdata))["Complaints"];
       this.error_text = ko.observable('');
       let off_json_data = (JSON.parse(offjson))["Officers"];
       this.buttonaccess = ko.observable(true);
      this.useremailid = ko.observable(localStorage.getItem("useremailid"));
      this.hierarchy = ko.observable(localStorage.getItem("hierarchy"));
      this.selected_complaint = ko.observable(null);
            let complaints_json_filtered = [];
          let f = 0;

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
        console.log(self.hierarchy());
        if(self.hierarchy() == "H1"){
                  if(complaints_json[i]["Officer"] == "H1"){
                      complaints_json_filtered[f] = complaints_json[i];

                    f++;
                      
                    }
                } else if(self.hierarchy() == "H2"){
                  if(complaints_json[i]["Officer"] != "H3"){
                      complaints_json_filtered[f] = complaints_json[i];
                      
                    f++;
                    }
                } else if(self.hierarchy() == "H3"){
                                        complaints_json_filtered[f] = complaints_json[i];

                    f++;
                                        console.log(complaints_json[i]);

                }
                    









      }


console.log(complaints_json_filtered);




          

          this.complaint_dataprovider_filtered = ko.observable(new ArrayDataProvider(complaints_json_filtered, {
                  keyAttributes: "ComplaintID",
              }));

          this.selectedSelectionMode = ko.observable({
                  row: "single",
                  column: "none",
              });

          this.selectedItems = ko.observable({
                  row: new ojkeyset_1.KeySetImpl(),
                  column: new ojkeyset_1.KeySetImpl(),
              });

          this.selectedChangedListener = (event) => {
            const row = event.detail.value.row;
            row.values().forEach(function (key) {
                              self.selected_complaint(key);
                          });
            if(self.selected_complaint() !=null){
              self.buttonaccess(false);
            } else {
              self.buttonaccess(true);
            }
          }

          this.accept_action = (event) => {
              for(let k = 0; k<complaints_json.length; k++){
                if(complaints_json[k]["ComplaintID"] == self.selected_complaint()){
                  complaints_json[k]["Status"] = "RESOLVED";
                }
              }
              console.log(complaints_json);
              let q = 0;

              complaints_json_filtered = [];
              for(let l = 0; l <complaints_json.length; l++){
                if(self.hierarchy() == "H1"){
                  if(complaints_json[l]["Officer"] == "H1"){
                      complaints_json_filtered[q] = complaints_json[l];
                    q++;
                      
                    }
                } else if(self.hierarchy() == "H2"){
                  if(complaints_json[l]["Officer"] != "H3"){
                      complaints_json_filtered[q] = complaints_json[l];
                    q++;
                      
                    }
                } else if(complaints_json[l]["Officer"] == "H3"){
                      complaints_json_filtered[q] = complaints_json[l];
                    q++;
                      
                    }
              }
              self.complaint_dataprovider_filtered(new ArrayDataProvider(complaints_json_filtered, {
                  keyAttributes: "ComplaintID",
              }));
          }
          this.reject_action = (event) => {
            for(let k = 0; k<complaints_json.length; k++){
                if(complaints_json[k]["ComplaintID"] == self.selected_complaint()){
                  complaints_json[k]["Status"] = "REJECTED";
                }
              }
              let q = 0;
              
              complaints_json_filtered = [];
              for(let l = 0; l <complaints_json.length; l++){
                if(self.hierarchy() == "H1"){
                  if(complaints_json[l]["Officer"] == "H1"){
                      complaints_json_filtered[q] = complaints_json[l];

                    q++;
                      
                    }
                } else if(self.hierarchy() == "H2"){
                  if(complaints_json[l]["Officer"] != "H3"){
                      complaints_json_filtered[q] = complaints_json[l];

                    q++;
                      
                    }
                } else if(complaints_json[l]["Officer"] == "H3"){
                      complaints_json_filtered[q] = complaints_json[l];

                    q++;
                      
                    }
              }
              self.complaint_dataprovider_filtered(new ArrayDataProvider(complaints_json_filtered, {
                  keyAttributes: "ComplaintID",
              }));
            
          }
          this.escalate_action = (event) => {
            let current_h = self.hierarchy();
            console.log("escalate");
            let complaint_h = null;









            for(let k = 0; k<complaints_json.length; k++){
                if(complaints_json[k]["ComplaintID"] == self.selected_complaint()){
                  complaint_h = complaints_json[k]["Officer"];
                  if(complaint_h == "H1"){
                    console.log("1");
                    complaints_json[k]["Officer"] = "H2";
                  }
                  else if(complaint_h == "H2" && current_h == "H1"){
                    console.log("2");
                  self.error_text("You do not have access to escalate this complaint");

            document.getElementById("md3").open();
                  } else if(complaint_h == "H2" && current_h != "H1"){
                    console.log("3");
                    complaints_json[k]["Officer"] = "H3";
                  } else if(complaint_h == "H3" && current_h != "H3"){
                    console.log("4");
                    
                  self.error_text("You do not have access to escalate this complaint");
            document.getElementById("md3").open();
                  } else if(complaint_h == "H3" && current_h == "H3"){  
                   console.log(complaint_h);
                   console.log(current_h);
                  self.error_text("You cannot escalate the complaint beyond Hierarchy Level 3");

            document.getElementById("md3").open();
                  }
                }

 for(let z = 0; z<off_json_data.length;z++){
          if(off_json_data[z]["HierarchyLevel"] == complaints_json[k]["Officer"]){
            complaints_json[k]["OfficerName"] = off_json_data[z]["OfficerName"];
            complaints_json[k]["OfficerEmailId"] = off_json_data[z]["OfficerEmailId"];
          }
        }

              }
              console.log(complaints_json);


             


              let q = 0;
              complaints_json_filtered = [];
              for(let l = 0; l <complaints_json.length; l++){
                if(self.hierarchy() == "H1"){
                  if(complaints_json[l]["Officer"] == "H1"){
                      complaints_json_filtered[q] = complaints_json[l];

                    q++;
                      
                    }
                } else if(self.hierarchy() == "H2"){
                  if(complaints_json[l]["Officer"] != "H3"){
                      complaints_json_filtered[q] = complaints_json[l];

                    q++;
                      
                    }
                } else if(complaints_json[l]["Officer"] == "H3"){
                      complaints_json_filtered[q] = complaints_json[l];

                    q++;
                      
                    }
              }







              self.complaint_dataprovider_filtered(new ArrayDataProvider(complaints_json_filtered, {
                  keyAttributes: "ComplaintID",
              }));
          }

          this.error_close = (event) => {
            document.getElementById("md3").close();
          }




      this.connected = () => {
        accUtils.announce('Customers page loaded.');
        document.title = "Customers";
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
    return CustomerViewModel;
  }
);
