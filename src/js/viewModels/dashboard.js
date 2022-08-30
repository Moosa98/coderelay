/**
 * @license
 * Copyright (c) 2014, 2022, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
/*
 * Your dashboard ViewModel code goes here
 */
define(['text!../../complaints.json','text!../../officer_list.json','../accUtils','ojs/ojconverter-number','ojs/ojconverterutils-i18n','ojs/ojasyncvalidator-regexp','ojs/ojasyncvalidator-numberrange','knockout','ojs/ojarraydataprovider','ojs/ojselectsingle','ojs/ojinputtext','ojs/ojdatetimepicker','ojs/ojinputnumber','ojs/ojbutton','ojs/ojdialog'],
 function(complaintsjson,officerjson,accUtils,ojconverter_number_1,ojconverterutils_i18n_1,AsyncRegExpValidator,AsyncNumberRangeValidator,ko,ArrayDataProvider) {
    function DashboardViewModel() {
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
       this.complaint_description = ko.observable("Enter Complaint Description here");
       this.room_no_validator = new AsyncRegExpValidator({
                  pattern: "[1-3][1-4][0-9]",
                  hint: "Enter valid Room Numbers",
                  messageDetail: "This is not a valid Room Number",
              });
       this.phone_no_validator = new AsyncRegExpValidator({
                  pattern: "[1-9][0-9]{9}",
                  hint: "Enter valid Phone Number",
                  messageDetail: "This is not a valid Phone Number",
              });

       this.phone_no_converter = new ojconverter_number_1.IntlNumberConverter({
                  style: "decimal",
                  roundingMode: "HALF_DOWN",
                  maximumFractionDigits: 0,
                  useGrouping: false,
              });


 this.userAction = async () => {
  const response = await fetch('https://68c694bd-10d6-4e88-a383-397d6fdb4d91-asia-south1.apps.astra.datastax.com/api/rest/v2/keyspaces/coderelay/finaladminslist/H1', {
    method: 'GET', // string or object
    headers: {
      'x-cassandra-token': 'AstraCS:jOZypTdfPpvKqInaITayGdka:5823f2f9c98e4b4d0333a87a3b6dd7271498f80828bf30d69c8e75f67c2bf949'
    }
  });
  const myJson = await response.json();
  console.log(myJson);
  return myJson["data"][0];
  //extract JSON from the http response
  // do something with myJson
}
       this.addcomplaint = async (ComplaintID,ComplaineeEmailId,Status,Availability,Category,ComplaineeName,Description,H1IssueTime,Hostel,Officer,OfficerEmailId,OfficerName,Phone,Room) => {
  let temp = '{"ComplaintID":"'+ComplaintID+'","ComplaineeEmailId":"'+ ComplaineeEmailId +'","Status":"'+ Status+'","Availability":"'+Availability+'","Category":"'+Category+'","ComplaineeName":"'+ComplaineeName+'","Description":"'+Description+'","H1IssueTime":"'+H1IssueTime+'","Hostel":"'+ Hostel+'","Officer":"'+Officer+'","Category":"'+OfficerEmailId+'","OfficerName":"'+OfficerName+'","Room":"'+ Room+'","Phone":"'+Phone+'"}';
  console.log(temp);
  let x = JSON.parse(temp);
  console.log(x);
  const response = await fetch('https://68c694bd-10d6-4e88-a383-397d6fdb4d91-asia-south1.apps.astra.datastax.com/api/rest/v2/keyspaces/coderelay/regard', {
    method: 'POST',
    body: temp.toString(),
    headers: {
      'content-type': 'application/json',
      'x-cassandra-token': 'AstraCS:jOZypTdfPpvKqInaITayGdka:5823f2f9c98e4b4d0333a87a3b6dd7271498f80828bf30d69c8e75f67c2bf949'
    }
  });
  const myJson = await response.json();
  console.log(myJson);
  //extract JSON from the http response
  // do something with myJson
}
       this.last_complaint_value = ko.observable("No Complaint Submitted");
       this.room_no_value = ko.observable();
       this.phone_no_value = ko.observable();
      this.usertype = ko.observable(localStorage.getItem("usertype"));
      this.hierarchy = ko.observable(localStorage.getItem("hierarchy"));
      this.username = ko.observable(localStorage.getItem("username"));
      this.useremailid = ko.observable(localStorage.getItem("useremailid"));
      this.complainee_name_value = ko.observable(this.username());
      this.complainee_mailid_value = ko.observable(this.useremailid());

      this.today = ojconverterutils_i18n_1.IntlConverterUtils.dateToLocalIso(new Date());
      this.availabilitytime = ko.observable(this.today);
      this.hostelselectVal = ko.observable("DM");
      this.hostels = [
                  { value: "Diamond", label: "Diamond" },
                  { value: "Agate", label: "Agate" },
                  { value: "Coral", label: "Coral" },
                  { value: "Jade", label: "Jade" },
                  { value: "Opal", label: "Opal" },
              ];
              this.hostelDP = new ArrayDataProvider(this.hostels, {
                  keyAttributes: "value",
              });

      this.categoryselectVal = ko.observable("EC");
      this.category = [
                  { value: "Electricity/Electrical Machinery Repair", label: "Electricity/Electrical Machinery Repair" },
                  { value: "Furniture Replacement", label: "Furniture Replacement" },
                  { value: "Cleanliness", label: "Cleanliness" },
                  { value: "Carpentry", label: "Carpentry" },
                  { value: "Painting", label: "Painting" },
                  { value: "Room Access", label: "Room Access" },
              ];
              this.complaintcategoryDP = new ArrayDataProvider(this.category, {
                  keyAttributes: "value",
              });
this.error_dialog_close = (event) => {
document.getElementById("modalDialog1").close();
};
this.submit_complaint = async (event) => {
          if(self.hostelselectVal() == null || self.categoryselectVal() == null || self.complainee_name_value() == null || self.availabilitytime() == null || self.room_no_value() == null || self.phone_no_value() == null || self.complaint_description() == null){
            document.getElementById("modalDialog1").open();
          } else {
            
            let complaint_id = null;
            let complaints_json_data = (JSON.parse(complaintsjson))["Complaints"];
            let rand_found = 0;
            while(rand_found !=2){

              let complaint_id1 = (Math.random()+' ').substring(2,10)+(Math.random()+' ').substring(2,10);
            for(let k = 0; k<complaints_json_data.length; k++){
              if(complaints_json_data[k]["ComplaintID"] == complaint_id1){
                rand_found = 1;
              }
            }
            if(rand_found == 1){
              rand_found = 0;
            } else {
              complaint_id = complaint_id1;
              rand_found = 2;
            }
          }
            let officer_json_data = (JSON.parse(officerjson))["Officers"];
            let officer_name = null;
            let officer_email = null;
            for(let y = 0; y< officer_json_data.length; y++){
              if(officer_json_data[y]["HierarchyLevel"] == "H1"){
                officer_name = officer_json_data[y]["OfficerName"];

                officer_email = officer_json_data[y]["OfficerEmailId"];
              }
            }


            let complaint_status = "PENDING";
            let H1_officer = await self.userAction();
            console.log(H1_officer);
            officer_name = H1_officer["OfficerName"];
            officer_email = H1_officer["OfficerEmailId"];
            let new_complaint_data = JSON.parse("{}");
            new_complaint_data["ComplaineeName"] = self.complainee_name_value();
            new_complaint_data["ComplaineeEmailId"] = self.complainee_mailid_value();
            new_complaint_data["Hostel"] = self.hostelselectVal();
            new_complaint_data["Category"] = self.categoryselectVal();
            new_complaint_data["Availability"] = self.availabilitytime();
            new_complaint_data["Room"] = self.room_no_value();
            new_complaint_data["Phone"] = self.phone_no_value();
            new_complaint_data["Description"] = self.complaint_description();
            new_complaint_data["Status"] = complaint_status;
            new_complaint_data["ComplaintID"] = complaint_id;
            new_complaint_data["Officer"] = "H1";
            new_complaint_data["OfficerName"] = officer_name;
            new_complaint_data["OfficerEmailId"] = officer_email;
            new_complaint_data["H1IssueTime"] = self.availabilitytime();
            await self.addcomplaint(complaint_id.toString(),new_complaint_data["ComplaineeEmailId"],new_complaint_data["Status"],new_complaint_data["Availability"].substring(0,10),new_complaint_data["Category"],new_complaint_data["ComplaineeName"],new_complaint_data["Description"],new_complaint_data["H1IssueTime"].substring(1,10),new_complaint_data["Hostel"],new_complaint_data["Officer"],new_complaint_data["OfficerEmailId"],new_complaint_data["OfficerName"],new_complaint_data["Phone"],new_complaint_data["Room"]);
            console.log(new_complaint_data);
            self.last_complaint_value("Last Complaint Submitted: " + complaint_id.toString());
            

          }
                  return true;
              };


      this.connected = () => {
        accUtils.announce('Dashboard page loaded.');
        document.title = "Dashboard";
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
    return DashboardViewModel;
  }
);
