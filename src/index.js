
require("./main.scss"); 
const _contacts = require("../data/contacts").contacts;

function capitalizeFirst(word) {
    return word.substr(0, 1).toUpperCase() + word.substr(1).toLowerCase();
}
function capitalizeWords(phrase) {
    return phrase.split(" ").map(function (i) {
        return capitalizeFirst(i);
    }).join(" ");
}

function calculateAge(dob) {
    var birthday = new Date(dob);
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}
let Detail = React.createClass({
    propTypes:{
        contact:React.PropTypes.object
    },
    render: function(){
        
        if(!this.props.contact){
            return(
            React.createElement("div",{className:"detail-profile"},"Click one of Contacts List")
            )
        } else{
            return (
            React.createElement("div",{ className: "details" },
                React.createElement("h1",null,capitalizeWords(this.props.contact.name.first+" "+(this.props.contact.name.last))),
                React.createElement("p",null,
                    React.createElement("div",null,"Gender: "+this.props.contact.gender),
                    React.createElement("div", null,"DOB: "+this.props.contact.dob+" ("+calculateAge(this.props.contact.dob)+" years old)")),
                React.createElement("hr", null),
                    React.createElement("address",null,(this.props.contact.location.street)),
                    React.createElement("br"),React.createElement("p", {},(this.props.contact.location.city)+", "+(this.props.contact.location.state)),
                    React.createElement("br"), React.createElement("p",{},this.props.contact.location.postcode),
                React.createElement("hr", null),
                React.createElement("p",null,
                    React.createElement("div",null,"Email: ",
                        React.createElement("a",{ href: "mailto:" + this.props.contact.email },this.props.contact.email)
                    ),
                    React.createElement("div",null,"Phone: ",this.props.contact.cell)
                ),
                React.createElement("img", { src: this.props.contact.picture.large }))
            )
            }
        }
    });

let ContactItem = React.createClass({
    propTypes:{
        id: React.PropTypes.number,
        picture:React.PropTypes.object.isRequired,
        name: React.PropTypes.object.isRequired,
        dob: React.PropTypes.string.isRequired,
        onClick: React.PropTypes.func.isRequired
    },
    render: function(){
        return (
            React.createElement("li",{className:"contact",onClick:this.props.onClick,id:"contact-"+this.props.id},
                React.createElement("div",{className:"row"},
                   React.createElement("div",{className:"column pic"},
                       React.createElement("img",{src: this.props.picture.thumbnail})),
                    React.createElement("div",{className:"column data"},this.props.name.first+" "+this.props.name.last),
                    React.createElement("br"),
                    React.createElement("p",{},this.props.dob.split(" ")[0])
                )
            )
        )
    }
});


let List=React.createClass({
    propTypes:{
    contacts: React.PropTypes.array.isRequired,
    selectContact: React.PropTypes.func.isRequired
    },
    render:function(){
        var contactItems = [];
        for( var i = 0; i< this.props.contacts.length; i++){
            contactItems.push( React.createElement(ContactItem,{id: this.props.contacts[i].id,picture:this.props.contacts[i].picture,name: this.props.contacts[i].name,dob:this.props.contacts[i].dob,onClick: this.props.selectContact}));
        }
        return(
            React.createElement("div",{className:"column list"}, 
                React.createElement("ul",{},contactItems))
        );
    }
});

let Title = React.createClass({
    
        render:function(){
            return(
                React.createElement("div",{className:"colum title"},"Contact List")
            )
        }
    });


let Main  = React.createClass({
    propTypes:{
        contactList: React.PropTypes.array.isRequired,
        selectContact:React.PropTypes.func.isRequired,
        contact: React.PropTypes.object
    },
    render: function(){
        return (
            React.createElement("div",{className:"row"},
                React.createElement(Title,{}),
                React.createElement("div",{},
                    React.createElement(List,{contacts: this.props.contactList,selectContact:this.props.selectContact}),
                    React.createElement(Detail,{contact: this.props.contact})
                )
            )
        );
    }
})





// let Profile = React.createClass({
    // propTypes:{
    //     id:React.PropTypes.integer,
    //     key:React.PropTypes.integer,
    //     name:React.PropTypes.object,
    //     location:React.PropTypes.object,
    //     cell:React.PropTypes.string,
    //     dob:React.PropTypes.string,
    //     email:React.PropTypes.string,
    //     gender:React.PropTypes.string,
    //     phone:React.PropTypes.string,
    //     picture:React.PropTypes.array,
    //     onClick:React.PropTypes.func.isRequired
    // },
    // onShowDetailProfile: function(){
    //     alert("This is message");
    // }, 
    // render: function(){
    //     return(
    //         React.createElement("li",{id: "#/contact/"+this.props.id,onClick:this.onShowDetailProfile},
    //             React.createElement("P",{},
    //                 React.createElement("img", {src: this.props.picture.thumbnail})),
    //         React.createElement("p",{},this.props.name.first),
    //         React.createElement("p",{},this.props.dob)

    //         )
    //     )}
    // });

// let Profiles = React.createClass({
//     propTypes:{
//         profiles: React.PropTypes.array.isRequired
//     },
//     render: function(){
//         return(React.createElement("ul",{},this.props.profiles.map(i => React.createElement(Profile,i))))
//     }
// });

// let Header = React.createClass({
//     render: function(){
//         return(
//             React.createElement("h1",{},"CONTACTS")
//         )
//     }
// });
// let rootElement = React.createClass({
//     render: function(){
//         return (React.createElement("div",{},
//             React.createElement(Header,{},"MADD9135 Contact List"),
//             React.createElement("div",{className:"column list"},
//                 React.createElement(Profiles,{profiles:contacts})),
//             React.createElement("div",{className:"column"},"Detail Profile"))
//         )
//     }
// });
var state={};
var contactList = _contacts;

function setState(changes) {
    state = Object.assign({}, state, changes);

    state.selectContact = function (e) {
        var id = e.target.closest("li").id.split("-")[1];
        location.hash = "#/contact/" + id;
        var contact = contactList.find(function (i) {
            return i.id == id;
        });
        setState({ contact: contact });
    };

    ReactDOM.render(React.createElement(Main, state), document.getElementById("react-app"));
    // ReactDOM.render(React.createElement(component,componentProperties),document.getElementById("react-app"));
}

var contact = undefined;
if (location.hash.split("/").includes("contact")) {
    var id = location.hash.split("/");
    id = id[id.length - 1];
    contact = contactList.find(function (i) {
        return i.id == id;
    });
}

setState({ contactList: contactList, contact: contact });
// // case "newitem":
// // 	component = AddNewItemPage;
// // 	componentProperties = {newItem:state.newItem,items:state.items,onUpdateNewItemChange:updateNewItem,onSubmitNewItem:addNewItem};
//     // 	break;
//     case "item":
//     component = DetailProfile;
//     // componentProperties = gitems.find(i => i.key == splittedUrl[1]);
//     break;
    // default:
    // component = rootElement;//MainPage;
    // break;

// // ReactDOM.render(
// // 	React.createElement(component, componentProperties), document.getElementById("react-app")
//     // );
    
    // ReactDOM.render(React.createElement(component,componentProperties),document.getElementById("react-app"));
// }
// window.addEventListener("hashchange", ()=>setState({location: location.hash}));