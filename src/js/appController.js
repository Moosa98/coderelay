/**
 * @license
 * Copyright (c) 2014, 2022, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
/*
 * Your application specific code will go here
 */
define(['text!../officer_list.json','knockout', 'ojs/ojcontext', 'ojs/ojmodule-element-utils', 'ojs/ojresponsiveutils', 'ojs/ojresponsiveknockoututils', 'ojs/ojcorerouter', 'ojs/ojmodulerouter-adapter', 'ojs/ojknockoutrouteradapter', 'ojs/ojurlparamadapter', 'ojs/ojarraydataprovider', 'ojs/ojknockouttemplateutils', 'ojs/ojmodule-element', 'ojs/ojknockout','ojs/ojnavigationlist','ojs/ojdialog','ojs/ojinputtext'],
  function(jsondata, ko, Context, moduleUtils, ResponsiveUtils, ResponsiveKnockoutUtils, CoreRouter, ModuleRouterAdapter, KnockoutRouterAdapter, UrlParamAdapter, ArrayDataProvider, KnockoutTemplateUtils) {

     function ControllerViewModel() {

        this.KnockoutTemplateUtils = KnockoutTemplateUtils;
        this.login_id = ko.observable('');
        this.login_password = ko.observable('');

        var self = this;


console.log("hi");
        
        this.userAction = async (username) => {
  const response = await fetch('https://68c694bd-10d6-4e88-a383-397d6fdb4d91-asia-south1.apps.astra.datastax.com/api/rest/v2/keyspaces/coderelay/officers/'+username, {
    method: 'GET', // string or object
    headers: {
      'x-cassandra-token': 'AstraCS:jOZypTdfPpvKqInaITayGdka:5823f2f9c98e4b4d0333a87a3b6dd7271498f80828bf30d69c8e75f67c2bf949'
    }
  });
  const myJson = await response.json();
  return myJson["data"][0];
  //extract JSON from the http response
  // do something with myJson
}

 


/**
        const userAction = async () => {
  const response = await fetch('https://68c694bd-10d6-4e88-a383-397d6fdb4d91-asia-south1.apps.astra.datastax.com/api/rest/v2/keyspaces/coderelay/officers/', {
    method: 'POST',
    body: '{"OfficerEmailId":"p21narens@iimidr.ac.in","HierarchyLevel":"H4","OfficerName":"Narendran S","Password":"qwerty4","Type":"Officer"}',
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
 **/

        // Handle announcements sent when pages change, for Accessibility.
        this.manner = ko.observable('polite');
        this.message = ko.observable();
        this.useraccess = ko.observable(false);
        this.signinsuccess = ko.observable(true);
        let officers = (JSON.parse(jsondata))["Officers"];
        this.userLogin = ko.observable("guestuser@coderelay.com");
        let sample = this.userLogin();
        this.changed_userLogin = ko.observable(sample);
        this.changed_password = ko.observable();
        this.hierarchy = ko.observable();
        this.username = ko.observable();
        this.usertype = ko.observable();

       
this.adduser = async (emailid,password,name) => {
  let temp = '{"OfficerEmailId":"'+emailid+'","HierarchyLevel":"'+ self.hierarchy() +'","OfficerName":"'+ name+'","Password":"'+password+'","Type":"Student"}'
  console.log(temp);
  let x = JSON.parse(temp);
  console.log(x);
  const response = await fetch('https://68c694bd-10d6-4e88-a383-397d6fdb4d91-asia-south1.apps.astra.datastax.com/api/rest/v2/keyspaces/coderelay/officers', {
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




this.removeuser = async (emailid,password,name) => {
  
  const response = await fetch('https://68c694bd-10d6-4e88-a383-397d6fdb4d91-asia-south1.apps.astra.datastax.com/api/rest/v2/keyspaces/coderelay/officers/'+emailid, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
      'x-cassandra-token': 'AstraCS:jOZypTdfPpvKqInaITayGdka:5823f2f9c98e4b4d0333a87a3b6dd7271498f80828bf30d69c8e75f67c2bf949'
    }
  });
  //extract JSON from the http response
  // do something with myJson
}

this.updateuser = async (emailid,password,name) => {
  let temp = '{"OfficerEmailId":"'+emailid+'","HierarchyLevel":"'+ self.hierarchy() +'","OfficerName":"'+ name+'","Password":"'+password+'","Type":"Officer"}'
  console.log(temp);
  let x = JSON.parse(temp);
  console.log(x);
  const response = await fetch('https://68c694bd-10d6-4e88-a383-397d6fdb4d91-asia-south1.apps.astra.datastax.com/api/rest/v2/keyspaces/coderelay/officers/'+emailid, {
    method: 'PUT',
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




        let officer_found = 0;
        console.log(officers[0]);
        for(let i = 0; i<officers.length;i++){
          if(officers[i].OfficerEmailId == this.userLogin()){
            this.hierarchy(officers[i].HierarchyLevel);
            this.username(officers[i].OfficerName);
            this.usertype(officers[i].Type);
            officer_found = 1;
            this.useraccess(true);
          }
        }
        if(officer_found == 0){
          this.username("Guest User");
          this.usertype("Guest");
          this.hierarchy("H0");
          this.useraccess(false);
        }

        this.changed_username = ko.observable(this.username());
        localStorage.setItem("username", this.username());
        localStorage.setItem("useremailid", this.userLogin());
        localStorage.setItem("hierarchy", this.hierarchy());
        localStorage.setItem("usertype", this.usertype());


              this.menu_options_clicked = (event) => {
                  if(event.detail.selectedValue == "setting"){
                      document.getElementById("md1").open();
                  } else if(event.detail.selectedValue == "out"){
                      self.signinsuccess(false);
self.login_id('');
self.login_password(''); 
                    document.getElementById("up").open();                  }
              };

              this.save_and_close = (event) => {
                console.log('save and close');
if(self.changed_userLogin() != self.userLogin()){

  self.adduser(self.changed_userLogin(), self.changed_password(), self.changed_username());
  self.removeuser(self.userLogin());
    document.getElementById('md1').close();


  
/**

  for(let t = 0; t<officers.length; t++){
    if(officers[t].OfficerEmailId == self.userLogin()){
      if(self.userLogin() != self.changed_userLogin()){
      self.usertype("Student");
      self.hierarchy("H0");
      self.useraccess(false);
    }
      officers[t].OfficerEmailId = self.changed_userLogin();
      officers[t].OfficerName = self.changed_username();

        localStorage.setItem("username", self.username());
        localStorage.setItem("useremailid", self.userLogin());
        localStorage.setItem("hierarchy", self.hierarchy());
        localStorage.setItem("usertype", self.usertype());
    }
  }**/



} else if(self.changed_password()!="" && self.changed_username() != "") {
  document.getElementById('md7').open();
} else {
  document.getElementById('md7').open();
}
//document.getElementById("md1").close();
              };


              this.close_password_change = (event) => {
                document.getElementById('md7').close();
              }


              this.login = async (event) => {
                  let sample = await self.userAction(self.login_id());
                   
                  if(sample == null){

                    document.getElementById('md2').open();
                  } else if(sample.length>1){
                    console.log("erro1");
                    document.getElementById('md2').open();
                  } else if(sample["Password"] == self.login_password()){
                    console.log("succ");
                    document.getElementById("up").close();
                    self.userLogin(self.login_id());
                    self.hierarchy(sample["HierarchyLevel"]);
                    self.usertype(sample["Type"]);
                    self.username(sample["OfficerName"]);
                    self.changed_username(self.username());
                    self.changed_userLogin(self.login_id());
                    localStorage.setItem("username", self.username());
        localStorage.setItem("useremailid", self.userLogin());
        localStorage.setItem("hierarchy", self.hierarchy());
        if(self.hierarchy() == "H1" ||self.hierarchy() == "H2" ||self.hierarchy() == "H3"){
          self.useraccess(true);
        }
        localStorage.setItem("usertype", self.usertype());
        self.router.destroy();
        let navData1 = null;
         if(self.usertype() == "Student"){
             navData1 = [
        { path: '', redirect: 'dashboard' },
        { path: 'dashboard', disabled: 'true', detail: { label: 'Submit Complaint', iconClass: 'oj-ux-ico-bar-chart' } },
        { path: 'incidents', disabled: 'true',detail: { label: 'Track Complaints', iconClass: 'oj-ux-ico-fire' } }
        
      ];
          }else {
            navData1 = [
        { path: '', redirect: 'customers' },
        { path: 'customers', disabled: 'true', detail: { label: 'Manage Complaints', iconClass: 'oj-ux-ico-bar-chart' } },
        { path: 'about', disabled: 'true',detail: { label: 'View Complaints', iconClass: 'oj-ux-ico-fire' } }
      ];

              }
              self.router = new CoreRouter(navData1, {
        urlAdapter: new UrlParamAdapter()
      });
      await self.router.sync();

      self.moduleAdapter(new ModuleRouterAdapter(self.router));


      self.selection(new KnockoutRouterAdapter(self.router));
      console.log(self.selection().path());

      // Setup the navDataProvider with the routes, excluding the first redirected
      // route.
      self.navDataProvider(new ArrayDataProvider(navData1.slice(1), {keyAttributes: "path"}));
      if(self.usertype() == "Student"){
        self.router.sync();
        //self.router.go({path: 'dashboard'});

      } else {
        self.router.sync();
        //self.router.go({path: 'customers'});

      }

                  } else {

                    console.log("pfail");
                    document.getElementById('md2').open();

                  }



              }

              this.close_error = (event) => {
                    document.getElementById('md2').close();

              }

              this.close_user_setting = (event) => {

document.getElementById("md1").close();
              };

        console.log(this.usertype());

        announcementHandler = (event) => {
          this.message(event.detail.message);
          this.manner(event.detail.manner);
      };

      document.getElementById('globalBody').addEventListener('announce', announcementHandler, false);

      // Media queries for repsonsive layouts
      const smQuery = ResponsiveUtils.getFrameworkQuery(ResponsiveUtils.FRAMEWORK_QUERY_KEY.SM_ONLY);
      this.smScreen = ResponsiveKnockoutUtils.createMediaQueryObservable(smQuery);
      let navData = null;
      if(this.usertype() == "Student"){
        navData = [
        { path: '', redirect: 'dashboard' },
        { path: 'dashboard', disabled: 'true', detail: { label: 'Submit Complaint', iconClass: 'oj-ux-ico-bar-chart' } },
        { path: 'incidents', disabled: 'true',detail: { label: 'Track Complaints', iconClass: 'oj-ux-ico-fire' } }
        
      ];
    } else {
      navData = [
        { path: '', redirect: 'customers' },
        { path: 'customers', disabled: 'true', detail: { label: 'Manage Complaints', iconClass: 'oj-ux-ico-bar-chart' } },
        { path: 'about', disabled: 'true',detail: { label: 'View Complaints', iconClass: 'oj-ux-ico-fire' } }
      ];
    }
      // Router setup
      this.router = new CoreRouter(navData, {
        urlAdapter: new UrlParamAdapter()
      });
      this.router.sync();

      this.moduleAdapter = ko.observable(new ModuleRouterAdapter(this.router));
      console.log(self.moduleAdapter());
      //console.log(self.moduleAdapter.koObservableConfig);

      this.selection = ko.observable(new KnockoutRouterAdapter(this.router));
      console.log(self.selection().path());

      // Setup the navDataProvider with the routes, excluding the first redirected
      // route.
      this.navDataProvider = ko.observable(new ArrayDataProvider(navData.slice(1), {keyAttributes: "path"}));

      // Header
      // Application Name used in Branding Area
      this.appName = ko.observable("CodeRelay");
      // User Info used in Global Navigation area

      // Footer
      this.footerLinks = [
        {name: 'About Oracle', linkId: 'aboutOracle', linkTarget:'http://www.oracle.com/us/corporate/index.html#menu-about'},
        { name: "Contact Us", id: "contactUs", linkTarget: "http://www.oracle.com/us/corporate/contact/index.html" },
        { name: "Legal Notices", id: "legalNotices", linkTarget: "http://www.oracle.com/us/legal/index.html" },
        { name: "Terms Of Use", id: "termsOfUse", linkTarget: "http://www.oracle.com/us/legal/terms/index.html" },
        { name: "Your Privacy Rights", id: "yourPrivacyRights", linkTarget: "http://www.oracle.com/us/legal/privacy/index.html" },
      ];


     }

     // release the application bootstrap busy state
     Context.getPageContext().getBusyContext().applicationBootstrapComplete();

     return new ControllerViewModel();
  }
);
