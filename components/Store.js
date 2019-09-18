import * as React from 'react';

/**
 * If you want to share data between multiple root components, you'll need a
 * global store like Redux. This is similar to building a web app where you
 * want to synchronize data between a sidebar and a main view - just extended
 * into three dimensions.
 * To simplify this sample, we implement a trivial Redux-like store that will
 * ensure all of our elements are synchronized.
 */
const State = {
  posts: undefined,
  current: -1,
};

const listeners = new Set();

function updateComponents() {
  for (const cb of listeners.values()) {
    cb();
  }
}

export function initialize(apiKey) {
  State.posts = [
    {
      id: '1',
      name: 'mosquito',
      author: 'joel',
      description: 'This is a mosquito nothing more nothing less',
      source: 'sphere/scene.gltf',
      preview: 'mosquito.jpg',
    },
    {
      id: '2',
      name: 'mosquito',
      author: 'joel',
      description: 'This is a mosquito nothing more nothing less',
      source: 'sphere/scene.gltf',
      preview: 'mosquito.jpg',
    },
    {
      id: '3',
      name: 'mosquito',
      author: 'joel',
      description: 'This is a mosquito nothing more nothing less',
      source: 'sphere/scene.gltf',
      preview: 'mosquito.jpg',
    }
  ];
  updateComponents();
 
}

export function setCurrent(value) {
  State.current = value;
  updateComponents();
}

export function connect(Component) {
  return class Wrapper extends React.Component {
    state = {
      posts: State.posts,
      current: State.current,
    };

    _listener = () => {
      this.setState({
        posts: State.posts,
        current: State.current,
      });
    };

    componentDidMount() {
      listeners.add(this._listener);
    }

    componentWillUnmount() {
      listeners.delete(this._listener);
    }

    render() {
      return (
        <Component
          {...this.props}
          posts={this.state.posts}
          current={this.state.current}
        />
      );
    }
  };
}