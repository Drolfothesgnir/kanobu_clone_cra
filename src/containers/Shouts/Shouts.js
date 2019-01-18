import React , {Component , lazy , Suspense} from 'react';
import { faEdit , faTimes} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import withUser from '../../hoc/withUser';
import firebase , { db , storage} from '../../firebase';
import classes from './Shouts.module.css';
import Spinner from '../../components/UI/Spinners/Main/Spinner';
import Shout from '../../components/Shouts/Shout/Shout';

const Editor = lazy(() => import('../../components/Shouts/Editor/Editor'));
const FullImage = lazy(() => import('../../components/UI/FullImage/FullImage'));


const dbRef = db.ref('/shouts');

class Shouts extends Component{

    state = {
        shouts:[],
        shoutsActive:true,
        editor:false,
        reply:false,
        shoutToReplyId:null,
        repliedShoutOrder:null,
        message:'',
        file:null,
        fullOverview:null,
        srcImage:null,
        loadMore:true
    }

    componentDidUpdate(prevProps) {
      if(this.props.readyToLoad && !prevProps.readyToLoad){
        dbRef.orderByChild('createdAt').limitToLast(5)
        .on('child_added' , (snap) => {
            const arr = [...this.state.shouts];
            arr.push({
                id:snap.key,
                ...snap.val(),
                repliesLength:Object.keys(snap.val().replies || 0).length 
            });
            this.setState({shouts:arr.sort((a,b) => b.createdAt - a.createdAt)});
        })
      }
    }
    
    
    componentWillUnmount() {dbRef.off()}

    inputChangeHandler = e => this.setState({message:e.target.value});

    fileChangeHandler = e => {
        const reader = new FileReader();
        const file = e.target.files[0];
        reader.readAsDataURL(file);
        reader.onloadend = () => this.setState({
            srcImage:reader.result,
            file
        });
    }

    submitHandler = e => {
        e.preventDefault();
        const {file , message} = this.state;
        const uploadTask = new Promise((res , rej) => {
            if(!file) res(null);
            storage.ref(`images/shouts/${this.props.user.id}/${file.name}`)
                .put(file , {contentType:file.type}).then(snap => (
                    snap.ref.getDownloadURL().then(url => res(url))
                )).catch(err => rej(err));
        });
        uploadTask.then(url => {
            const data = {
                user:this.props.user,
                message,
                url,
                createdAt:firebase.database.ServerValue.TIMESTAMP
            }
            dbRef.push(data).then(() => {
                this.setState({message:'' , file:null , srcImage:null})
            });  
        })
    }

    initReplyHandler = id => {
      const i = this.state.shouts.findIndex(item => item.id === id);
      this.setState({
        message:'',
        reply:true,
        editor:true,
        shoutToReplyId:id,
        repliedShoutOrder:i
      })
    }

    replyHandler = (e) => {
        e.preventDefault();
        const {
             file,
             message,
             shoutToReplyId,
             repliedShoutOrder,
             shouts
            } = this.state;
        const uploadTask = new Promise((res , rej) => {
            if(!file) res(null);
            storage.ref(`shoutsReplies/${shoutToReplyId}/${file.name}`)
                .put(file , {contentType:file.type}).then(snap => (
                    snap.ref.getDownloadURL().then(url => res(url))
                )).catch(err => rej(err))
        });
        uploadTask.then(url => {
            const data = {
                user:this.props.user,
                message,
                url,
                createdAt:firebase.database.ServerValue.TIMESTAMP
            }
            dbRef.child(shoutToReplyId).child('replies').push({data})
                .then(() => {
                    const newArr = [...shouts];
                    const item = {...shouts[repliedShoutOrder]};
                    item.repliesLength = (
                        Object.keys(shouts[repliedShoutOrder].replies || 0)
                            .length + 1
                    );
                    newArr[repliedShoutOrder] = item;
                    this.setState({
                        shouts:newArr,
                        reply:false,
                        editor:false,
                        message:'',
                        file:null,
                        srcImage:null
                    })
                })
        })
    }

    zoomHandler = (src) => this.setState({fullOverview:src})

    removeZoomHandler = () => this.setState({fullOverview:null})

    scrollHandler = () => {
        const {clientHeight , scrollTop , scrollHeight} = this.messagesRef,
        {shouts , loadMore} = this.state;
        if(scrollTop === scrollHeight - clientHeight && loadMore){
                dbRef.orderByChild('createdAt')
                .endAt(shouts[shouts.length - 1].createdAt - 1)
                .limitToLast(5)
                .once('value').then((snap) => {
                    if(!snap.val()) return this.setState({loadMore:false});
                    const arr = [];
                    Object.keys(snap.val()).forEach(key => {
                        arr.push({
                            id:key,
                            ...snap.val()[key],
                            repliesLength:Object.keys(snap.val().replies || 0)
                                .length
                        })
                    });
                    const newArr = shouts
                    .concat(arr)
                    .sort((a,b) => b.createdAt - a.createdAt);
                    this.setState({shouts:newArr});
                });
        }
      }

    removeShoutHandler = id => {
        dbRef.child(id).remove().then(() => {
            this.setState(state => ({
                shouts:state.shouts.filter(item => item.id !== id)
            }))
        })
    }

    removeFileHandler = () => this.setState({file:null})

    render(){
        const {
                shoutsActive ,
                editor ,
                message ,
                srcImage ,
                shouts,
                reply,
                fullOverview
        } = this.state;

        const {user, readyToLoad, mode} = this.props;

        const items = shouts.map(item => {
            return <Shout 
                        reply={this.initReplyHandler}
                        fullOverview={this.zoomHandler}
                        remove={this.removeShoutHandler}
                        isAuth={user !== null}
                        isMine={user && item.user.id === user.id} 
                        message={item} 
                        key={item.id}/>
        })

        return (
            <>
                <div className={[classes.Shouts , mode].join(' ')}>
                    <div className={classes.Head}>
                        <span>KANOBU LIVE</span>
                        <button
                            onClick = {this.props.close}>
                            &times;
                        </button>
                        <div className = {
                            shoutsActive ? 
                            [classes.Buttons , classes.shoutsActive].join(' ') :
                            [classes.Buttons , classes.notifActive].join(' ')
                        }>
                            <button
                                onClick = {() => this.setState({shoutsActive:false})}>
                                Notifications
                            </button>
                            <button
                                onClick = {() => this.setState({shoutsActive:true})}>
                                Shouts
                            </button>
                        </div>
                    </div>
                    <div 
                        onScroll={this.scrollHandler}
                        className={classes.Body} 
                        ref={el => this.messagesRef = el}>
                        {shouts.length && readyToLoad ? items : <Spinner/>}
                    </div>
                    <div className={classes.Footer}>
                        <button
                            onClick={
                                user ? 
                                () => this.setState(prevState => ({
                                    editor:!prevState.editor
                                })) :
                                this.props.login
                            }>
                            {user ? 'Write a shout' : 'Authorize first'}
                            <FontAwesomeIcon icon={editor ? faTimes : faEdit} size='lg'/>
                        </button>
                        {
                            editor &&
                            <Suspense fallback={null}>
                                <Editor 
                                    chooseFile={this.fileChangeHandler}
                                    send={reply ? 
                                        this.replyHandler : this.submitHandler}
                                    file={srcImage}
                                    removeFile={this.removeFileHandler}
                                    user={user}
                                    change={this.inputChangeHandler}
                                    value={message}/>
                            </Suspense>
                        }
                    </div>
                </div>
                {fullOverview && (
                    <Suspense fallback={null}>
                        <FullImage 
                            close={this.removeZoomHandler}
                            src={fullOverview}/>
                    </Suspense>
                )}
            </>
        );
    }
}

export default withUser(Shouts);

