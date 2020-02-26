import React from "react";
import { connect } from "react-redux";
import { getData, addFriend, editFriend, saveEdit } from "../actions/actions";

class Friend extends React.Component {
  state = {
    newFriend: {
      name: "",
      age: "",
      email: ""
    },
    friendtoEdit: {
      id: 0,
      name:'',
      age: '',
      email: ''
    }
  };

  componentDidMount() {
    this.props.getData();
  }

  addFriends = e => {
    e.preventDefault();
    this.props.addFriend(this.state.newFriend);
  };

  editFriends = e => {
    e.preventDefault();
    this.props.editFriend();

  };

  changeHandler = e => {
    this.setState({
      newFriend: {
        ...this.state.newFriend,
        [e.target.name]: e.target.value
      }
    });
  };

  handleEdit = e => {
    e.preventDefault();
    this.props.saveEdit(this.state.friendtoEdit);
  }

  render() {
    return (
      <div>
        <>
          <h3>Add a New Friend</h3>
          <form onSubmit={this.addFriends}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              onChange={this.changeHandler}
              value={this.state.newFriend.name}
            />
            <input
              type="text"
              name="age"
              placeholder="age"
              onChange={this.changeHandler}
              value={this.state.newFriend.age}
            />
            <input
              type="text"
              name="email"
              placeholder="Email"
              onChange={this.changeHandler}
              value={this.state.newFriend.email}
            />
            <button type="submit" onClick={this.addFriend}>
              Add Friend!
            </button>
          </form>

          <div>
            <h1>Friends</h1>
            {this.props.isEditing ? (
              <>
                <h3>Edit Friend</h3>
                <form onSubmit={this.handleEdit}>
                  <input
                    type="text"
                    name="name"
                    placeholder={this.state.friendToEdit.name}
                    onChange={this.editFriends}
                    value={this.state.friendtoEdit.name}
                  />
                  <input
                    type="text"
                    name="age"
                    placeholder={this.state.friendToEdit.age}
                    onChange={this.editFriends}
                    value={this.state.friendToEdit.age}
                  />
                  <input
                    type="text"
                    name="email"
                    placeholder={this.state.friendToEdit.email}
                    onChange={this.editFriends}
                    value={this.state.friendToEdit.email}
                  />
                  <button type="submit">Save Edit</button>
                </form>
              </>
            ) : (
              <></>
            )}
            {this.props.friends.map(friend => {
              return (
                <div key={friend.id}>
                  <h2>Name: {friend.name}</h2>
                  <h2>Age: {friend.age}</h2>
                  <h2>Email: {friend.email}</h2>
                  <button onClick={this.editFriends}>Edit</button>
                  <button>Delete</button>
                </div>
              );
            })}
            ;
          </div>
        </>
      </div>
    );
  }
}


const mapStateToProps = state => {
  return {
    ...state,
    friends: state.friends,
    error: state.error,
    fetchingData: state.fetchingData,
    isEditing: state.isEditing
  };
};

export default connect(
    mapStateToProps, 
    { getData, addFriend, editFriend, saveEdit }
)(Friend);

