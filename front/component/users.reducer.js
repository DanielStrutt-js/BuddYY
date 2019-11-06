export default function(id = '', action) {

    if(action.type == 'signUp') {
        // console.log('Dans mon reducer --->',action.id)
        return action.id;
        //name
    } else {
        return id;
    }
  }