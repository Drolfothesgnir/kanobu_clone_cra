import React, { Component } from 'react';

import classes from './Cropper.module.css';
import Spinner from '../../../../components/UI/Spinners/CircleSpinner/Spinner';

const initState = {
  x:0,
  y:0,
  iX:null,
  iY:null,
  down:false,
  file:null,
  loading:true,
  iW:null,
  iH:null,
  scale:1,
  cX:null,
  cY:null,
  type:null,
  name:null
}

class Cropper extends Component {

  state = initState

  componentDidMount() {
   const {file} = this.props;
   this.setState({name:file.name, type:file.type})
   const reader = new FileReader();
    const img = new Image();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      img.onload = () => {
        const {clientHeight:oH, clientWidth:oW} = this.refs.container;
        const iW = img.width===img.height?oW:img.width,
          iH = img.height===img.width?oH:img.height;
          this.setState({
            loading:false,
            file:reader.result, 
            iW, 
            iH,
            x:-(iW-oW)/2,
            y:-(iH-oH)/2,
            cX:oW/2+((iW-oW)/2),
            cY:oH/2+((iH-oH)/2)
          });
      }
      img.src = reader.result;
    }
  }

  moveHandler = e => {
    const {down, iX, iY} = this.state;
    if(!down) return;
    else{
      const {block} = this.refs;
      const {offsetLeft, offsetTop, clientWidth, clientHeight} = block.offsetParent;
      const mX = e.pageX-offsetLeft, mY = e.pageY-offsetTop;
      let nX = mX - iX;
      let nY = mY-iY;
      const cX = clientWidth/2-nX, cY = clientHeight/2-nY;
      this.setState(state => ({x:nX, y:nY, cX:cX/state.scale, cY:cY/state.scale}));
    }
  }

  downHandler = e => {
    const {block} = this.refs;
    const {offsetLeft, offsetTop} = block.offsetParent;
    const mX = e.pageX-offsetLeft, mY = e.pageY-offsetTop;
    const left = block.offsetLeft, top = block.offsetTop;
    const iX = mX-left, iY = mY-top;
    this.setState({iX, iY, down:true});
  }

  upHandler = () => {
    if(!this.state.down) return ;
     this.setState({iX:null, iY:null, down:false})
  }

  scaleChangeHandler = e => {
    const {cX, cY} = this.state;
    var {value} = e.target;
    this.setState(state => {
     const newX = cX*value-cX;
     const newY =  cY*value-cY;
     const prevX = -(cX*state.scale-cX);
     const prevY = -(cY*state.scale-cY);
    return {scale:value, x:state.x-prevX-newX, y:state.y-prevY-newY}
    })
   }

  cropHandler = () => {
    this.setState({loading:true});
    const ctx = this.refs.canvas.getContext('2d');
    const img = new Image();
    const {clientWidth:oW} = this.refs.container;
    const rScale = oW/150;
    const {x, y, scale, file, iW, iH, type, name} = this.state;
    img.onload = () => {
      const w = iW*scale/rScale, h = iH*scale/rScale;
      ctx.clearRect(0,0,150,150);
      ctx.drawImage(img, x/rScale, y/rScale, w, h);
      return this.refs.canvas.toBlob(blob => {
        const file = new File([blob], name, {type});
        return this.props.save(file);
      }, type)
    }
    img.src = file;
  }

  render() {
    const {file, iH, iW, x, y, scale, loading}= this.state;
    const img = (
      <img 
          height={iH*scale}
          width={iW*scale}
          draggable={false}
          src={file}
          ref='block'
          style={{top:Math.floor(y), left:Math.floor(x)}}
          onPointerDown={this.downHandler}
          alt='photo_change'/>
    );
      
    return (
      <div className={classes.Cropper}>
        <div 
          ref='container'
          onPointerLeave={this.upHandler}
          onPointerMove={this.moveHandler}
          onPointerUp={this.upHandler}
          className={classes.Container}>
          {loading ? <Spinner/> : img}
        </div>
        <label>
          <span>{`${scale}X`}</span>
          <input
            min='.1'
            max='5'
            step='.1'
            onChange={this.scaleChangeHandler}
            value={scale}
            type='range'/>
        </label>
        <button onClick={this.cropHandler}>
          Save
        </button>
        <button onClick={this.props.cancel}>
          Cancel
        </button>
        <canvas
          style={{display:'none'}}
          ref='canvas'
          height='150'
          width='150'>
          <h1>No canvas!</h1>
        </canvas>
      </div>
    )
  }
}

export default Cropper;