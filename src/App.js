import React from 'react';


import './App.css';
import { Resizable, ResizableBox } from 'react-resizable';

const CustomResizeHandle = React.forwardRef((props, ref) => {
  const {handleAxis, ...restProps} = props;
  return (
    <div
      className={`custom-handle custom-handle-${handleAxis} custom-resize-handle-component`}
      ref={ref}
      {...restProps}
    ></div>
  );
});

export default class ExampleLayout extends React.Component<{}, {width: number, height: number}> {
  state = {
    width: 400,
    height: 500,
    absoluteWidth: 200,
    absoluteHeight: 200,
    absoluteLeft: 0,
    absoluteTop: 0,
  };

  onResetClick = () => {
    this.setState({ width: 200, height: 200, absoluteWidth: 200, absoluteHeight: 200 });
  };

  // On top layout
  onFirstBoxResize = (event, {element, size, handle}) => {
    this.setState({width: size.width, height: size.height});
  };

  // On bottom layout. Used to resize the center element around its flex parent.
  onResizeAbsolute = (event, {element, size, handle}) => {
    this.setState((state) => {
      let newLeft = state.absoluteLeft;
      let newTop = state.absoluteTop;
      const deltaHeight = size.height - state.absoluteHeight;
      const deltaWidth = size.width - state.absoluteWidth;
      if (handle[0] === 'n') {
        newTop -= deltaHeight;
      } else if (handle[0] === 's') {
        newTop += deltaHeight;
      }
      if (handle[handle.length - 1] === 'w') {
        newLeft -= deltaWidth;
      } else if (handle[handle.length - 1] === 'e') {
        newLeft += deltaWidth;
      }

      return {
        absoluteWidth: size.width,
        absoluteHeight: size.height,
        absoluteLeft: newLeft,
        absoluteTop: newTop,
      };
    });
  };

  render() {
    return (
      <div>

        <h3>Statically Positioned Layout</h3>
        <div className="layoutRoot">
        
          <ResizableBox className="box" width={190} height={300} minConstraints={[100, 100]} maxConstraints={[400, 600]} resizeHandles={['sw', 'se', 'nw', 'ne', 'w', 'e', 'n', 's']}>
            <span className="text">Resizable box, starting at 200x200. Min size is 150x150, max is 500x300.</span>
            <img src='https://cdn.mos.cms.futurecdn.net/upwpRURDz4zUn79YS3mBpb.jpg' />
          </ResizableBox>

          <ResizableBox className="box" width={600} height={300} minConstraints={[100, 100]} maxConstraints={[800, 600]} resizeHandles={['sw', 'se', 'nw', 'ne', 'w', 'e', 'n', 's']}>
            <span className="text">Resizable box, starting at 200x200. Min size is 150x150, max is 500x300.</span>
            <img src='https://cdn.mos.cms.futurecdn.net/upwpRURDz4zUn79YS3mBpb.jpg' />
          </ResizableBox>

          <ResizableBox className="box" width={700} height={300} minConstraints={[500, 200]} maxConstraints={[1200, 600]} resizeHandles={['sw', 'se', 'nw', 'ne', 'w', 'e', 'n', 's']}>
            <span className="text">
              
              Resizable box, starting at 200x200. Min size is 150x150, max is 500x300.</span>
              <img src='https://cdn.mos.cms.futurecdn.net/upwpRURDz4zUn79YS3mBpb.jpg' />

          </ResizableBox>

         
          
        </div>
      </div>
    );
  }
}
