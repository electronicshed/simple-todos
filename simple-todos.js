/*global Meteor */
/*global Mongo */
/*global Template */

var Tasks = new Mongo.Collection("tasks");

if (Meteor.isClient) {
    // This code only runs on the client
    Template.body.helpers({
        tasks: function () {
            //"use strict";
            return Tasks.find({}, {sort: {createdAt: -1}});
        }
    });
    
    Template.body.events({
        "submit .new-task": function (event) {
            //"use strict";
            // Prevent default browser form submit
            event.preventDefault();

            // Get value from form element
            var text = event.target.text.value;

            // Insert a task into the collection
            Tasks.insert({
                text: text,
                createdAt: new Date() // current time
            });
 
            // Clear form
            event.target.text.value = "";
        }
    });
    
    Template.task.events({
        "click .toggle-checked": function () {
            //"use strict";
            // Set the checked property to the opposite of its current value
            Tasks.update(this._id, {
                $set: {checked: !this.checked}
            });
        },
        "click .delete": function () {
            //"use strict";
            Tasks.remove(this._id);
        }
    });
    
}