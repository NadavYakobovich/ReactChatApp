// import React, {useContext, useState} from 'react';
// import {ListGroup} from "react-bootstrap";
// import {usersContext} from "../../App";
//
// function MyContacts({activeConv, setActiveConv}) {
//     const usersMaps = useContext(usersContext)
//     const {selectItem, setSelectItem} = useState(null)
//
//     function check(id ){
//         return activeConv === id
//     }
//
//     function getUser(idUser){
//         const index = usersMaps.findIndex(user => user.userId === idUser);
//         return usersMaps[index];
//     }
//
//     return (
//
//         <ListGroup variant="flush">
//             <div>  for check the id click  {activeConv}</div>
//             {usersMaps.map(contact => (
//                 <ListGroup.Item key={contact.userId} action
//                                 onClick={() => setActiveConv(contact.userId)}
//                                 active={check(contact.userId)}>
//                     {contact.name}
//                 </ListGroup.Item>
//             ))
//             }
//         </ListGroup>
//     );
// }
//
// export default MyContacts;