import Contact from "../model/contactList.model.js";

import path from "path";

export default class ContactListController {
  

  getContactList(req, res) {
    
    Contact.find({}).then((contact_list) => {
      console.log(contact_list);
      return res.render("layout",{contact_list:contact_list});
    }).catch((err) => {
      console.log(err);
    });
  }


  addContact(req, res) {
   Contact.create(req.body).then((contact) => {
      console.log(contact);
      return res.redirect("/");
    }).catch((err) => {
      console.log(err);
    });

}

deleteContact(req,res){
  let id = req.query.id;
  Contact.findByIdAndDelete(id).then((contact)=>{
    return res.redirect('/');
  }).catch((err)=>{
    console.log(err);
  }); 
}
}
