export default function(userName = '', act) {

    if(act.type == 'Profile') {
        console.log('Dans mon reducer userName --->',act)
        return act.name;
        //name
    } else {
        return userName;
    }
  }