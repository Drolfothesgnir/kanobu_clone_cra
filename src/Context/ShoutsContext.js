// import React, { Component } from 'react';
// import firebase, { db, storage } from '../../firebase';

// const {Provider, Consumer} = React.createContext();
// const dbRef = db.ref('/shouts');

// class ShoutsProvider extends Component {

//   messagesList = React.createRef()

//   state = {
//     shouts:[],
//     shoutsActive:true,
//     editor:false,
//     reply:false,
//     shoutToReplyId:null,
//     repliedShoutOrder:null,
//     message:'',
//     file:null,
//     fullOverview:null,
//     srcImage:null,
//     loadMore:true
// }

//   componentDidMount() {
//     dbRef.orderByChild('createdAt').limitToLast(5)
//      .on('child_added' , (snap) => {
//          const arr = [...this.state.shouts];
//          arr.push({
//              id:snap.key,
//              ...snap.val(),
//              repliesLength:Object.keys(snap.val().replies || 0).length 
//          });
//          this.setState({shouts:arr.sort((a,b) => b.createdAt - a.createdAt)});
//      })
//  }

//  componentWillUnmount() {dbRef.off()}

//  inputChangeHandler = e => this.setState({message:e.target.value});

//  activateNotifications = () => this.setState({shoutsActive:false});

//  activateShouts = () => this.setState({shoutsActive:true});

//  toggleEditor = () => this.setState(state => ({editor:!state.editor}));

//  fileChangeHandler = e => {
//   const reader = new FileReader();
//   const file = e.target.files[0];
//   reader.readAsDataURL(file);
//   reader.onloadend = () => this.setState({
//       srcImage:reader.result,
//       file
//   });
// }

// submitHandler = e => {
//   e.preventDefault();
//   const {file , message} = this.state;
//   const uploadTask = new Promise((res , rej) => {
//       if(!file) res(null);
//       storage.ref(`images/shouts/${this.props.user.id}/${file.name}`)
//           .put(file , {contentType:file.type}).then(snap => (
//               snap.ref.getDownloadURL().then(url => res(url))
//           )).catch(err => rej(err));
//   });
//   uploadTask.then(url => {
//       const data = {
//           user:this.props.user,
//           message,
//           url,
//           createdAt:firebase.database.ServerValue.TIMESTAMP
//       }
//       dbRef.push(data).then(() => {
//           this.setState({message:'' , file:null , srcImage:null})
//       });  
//   })
// }

// replyInit = (id, i) => this.setState({
// 	reply:true,
// 	editor:true,
// 	shoutToReplyId:id,
// 	repliedShoutOrder:i
// })

// replyHandler = (e) => {
//   e.preventDefault();
//   const {
//        file,
//        message,
//        shoutToReplyId,
//        repliedShoutOrder,
//        shouts
//       } = this.state;
//   const uploadTask = new Promise((res , rej) => {
//       if(!file) res(null);
//       storage.ref(`shoutsReplies/${shoutToReplyId}/${file.name}`)
//           .put(file , {contentType:file.type}).then(snap => (
//               snap.ref.getDownloadURL().then(url => res(url))
//           )).catch(err => rej(err))
//   });
//   uploadTask.then(url => {
//       const data = {
//           user:this.props.user,
//           message,
//           url,
//           createdAt:firebase.database.ServerValue.TIMESTAMP
//       }
//       dbRef.child(shoutToReplyId).child('replies').push({data})
//           .then(() => {
//               const newArr = [...shouts];
//               const item = {...shouts[repliedShoutOrder]};
//               item.repliesLength = (
//                   Object.keys(shouts[repliedShoutOrder].replies || 0)
//                       .length + 1
//               );
//               newArr[repliedShoutOrder] = item;
//               this.setState({
//                   shouts:newArr,
//                   reply:false,
//                   editor:false,
//                   message:'',
//                   file:null,
//                   srcImage:null
//               })
//           })
//   })
// }

// scrollHandler = ref => {
//   const {clientHeight , scrollTop , scrollHeight} = this.messagesList,
//   {shouts , loadMore} = this.state;
//   if(scrollTop === scrollHeight - clientHeight && loadMore){
//           dbRef.orderByChild('createdAt')
//           .endAt(shouts[shouts.length - 1].createdAt - 1)
//           .limitToLast(5)
//           .once('value').then((snap) => {
//               if(!snap.val()) return this.setState({loadMore:false});
//               const arr = [];
//               Object.keys(snap.val()).forEach(key => {
//                   arr.push({
//                       id:key,
//                       ...snap.val()[key],
//                       repliesLength:Object.keys(snap.val().replies || 0)
//                           .length
//                   })
//               });
//               const newArr = shouts
//               .concat(arr)
//               .sort((a,b) => b.createdAt - a.createdAt);
//               this.setState({shouts:newArr});
//           });
//   }
// }

// removeShoutHandler = id => {
//   dbRef.child(id).remove().then(() => {
//       this.setState(state => ({
//           shouts:state.shouts.filter(item => item.id !== id)
//       }))
//   })
// }

//   render() {
//     return (
//       <Provider value={{
//         ...this.state,
//         onInputChange:this.inputChangeHandler,
//         onFileChange:this.fileChangeHandler,
//         onSubmit:this.submitHandler,
//         onReply:this.replyHandler,
//         onScroll:this.scrollHandler,
//         onShoutRemove:this.removeShoutHandler,
// 				messagesRef:this.messagesList,
// 				activNots:this.activateNotifications,
// 				activShouts:this.activateShouts,
// 				onToggleEditor:this.toggleEditor
//       }}>
//         {this.props.children}
//       </Provider>
//     );
//   }
// }

// export { ShoutsProvider, Consumer as ShoutsConsumer };
