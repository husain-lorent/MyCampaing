// import "./styless.css";
// import Logo from "assets/images/logoblack.svg";
// import { Avatar } from "@mantine/core";
// import { Accordion } from "@mantine/core";
// import Logout from "../../../assets/images/log-out.svg";
// function Accardion({ setView }) {
//   return (
//     <>
//       <Accordion>
//         <section className="sidebar__wrapper">
//           <div className="Profile__sidebar-left">
//             <div className="logo">
//               <img src={Logo} alt="logo" />
//             </div>
//             <Accordion.Item value="customization">
//               <Accordion.Control>
//                 <div
//                   className="sidebar__user"
//                   onClick={() => {
//                     // setView("account");
//                     console.log();
//                   }}
//                 >
//                   <Avatar
//                     radius="xl"
//                     size="md"
//                     src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPT9mqiidTshsbvsr8SDUYnTLNv3f31RTL0JrQFOZd7ECP8OQ1h0mR_Ze3VlzMPknrUhs&usqp=CAU"
//                     alt="user"
//                   />
//                   <p>Saidamir Bakhromov</p>
//                 </div>
//               </Accordion.Control>
//               <Accordion.Panel>
//               <div className="sidebar__user-info">
//           <ul>
//             <li onClick={() => setView("edit")}>Hokage</li>
//             <li onClick={() => setView("edit")}>Vice president</li>
//             <li onClick={() => setView("edit")}>President</li>
//           </ul>
//         </div>
//         <div className="add__user">
//           <button className="add__btn" onClick={() => setView("create")}>
//             <span>+</span> Add election
//           </button>
//           <div className="sidebar__users">
//             <div className="sidebar__users-scroll">
//               <Avatar
//                 radius="xl"
//                 size="md"
//                 src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPT9mqiidTshsbvsr8SDUYnTLNv3f31RTL0JrQFOZd7ECP8OQ1h0mR_Ze3VlzMPknrUhs&usqp=CAU"
//                 alt="user"
//               />
//               <p>Alixoja Yunusxojaev</p>
//             </div>
//             {/* <div className="sidebar__users-scroll">
//               <Avatar
//                 radius="xl"
//                 size="md"
//                 src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPT9mqiidTshsbvsr8SDUYnTLNv3f31RTL0JrQFOZd7ECP8OQ1h0mR_Ze3VlzMPknrUhs&usqp=CAU"
//                 alt="user"
//               />
//               <p>Alixoja Yunusxojaev</p>
//             </div>
//             <div className="sidebar__users-scroll">
//               <Avatar
//                 radius="xl"
//                 size="md"
//                 src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPT9mqiidTshsbvsr8SDUYnTLNv3f31RTL0JrQFOZd7ECP8OQ1h0mR_Ze3VlzMPknrUhs&usqp=CAU"
//                 alt="user"
//               />
//               <p>Alixoja Yunusxojaev</p>
//             </div>
//             <div className="sidebar__users-scroll">
//               <Avatar
//                 radius="xl"
//                 size="md"
//                 src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPT9mqiidTshsbvsr8SDUYnTLNv3f31RTL0JrQFOZd7ECP8OQ1h0mR_Ze3VlzMPknrUhs&usqp=CAU"
//                 alt="user"
//               />
//               <p>Alixoja Yunusxojaev</p>
//             </div>
//                         <div className="sidebar__users-scroll">
//               <Avatar
//                 radius="xl"
//                 size="md"
//                 src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPT9mqiidTshsbvsr8SDUYnTLNv3f31RTL0JrQFOZd7ECP8OQ1h0mR_Ze3VlzMPknrUhs&usqp=CAU"
//                 alt="user"
//               />
//               <p>Alixoja Yunusxojaev</p>
//             </div>*/}
//           </div>
//         </div>

//         <div className="sidebar__lang">
//           <p>Language</p>
//           <p>Trash</p>
//         </div>
//         <div className="logout">
//           <img src={Logout} alt="logut" />
//           logout
//         </div>
//               </Accordion.Panel>
//             </Accordion.Item>
//           </div>
//         </section>
//       </Accordion>
//     </>
//   );
// }
// export default Accardion;
