const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { DateTime } = require("luxon")
const AuthorSchema = new Schema({
    first_name: {type:String, required: true, maxLength: 100},
    family_name:  {type:String, required: true, maxLength: 100},
    date_of_birth: {type:Date},
    date_of_death: {type:Date},
});

AuthorSchema.virtual('name').get(function (){
    let fullname = "";
    if (this.first_name && this.family_name) {
        fullname = `${this.family_name}, ${this.first_name}`;
    }
    return fullname;
})

AuthorSchema.virtual("url").get(function (){
    return `/catalog/author/${this._id}`;
});

AuthorSchema.virtual("lifespan").get(function(){
    let dob = this.date_of_birth;
    let dod = this.date_of_death;
    if (!dob){
        dob = "";
    } else {
        dob = DateTime.fromJSDate(dob).toLocaleString(DateTime.DATE_MED);
    }
    if (!dod){
        dod = "";
    } else {
        dod = DateTime.fromJSDate(dod).toLocaleString(DateTime.DATE_MED);
    }
    return `${dob} - ${dod}`
})
module.exports = mongoose.model("Author", AuthorSchema);