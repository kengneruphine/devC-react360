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
      ref: 'anatomy',
      name: 'Eye ball',
      author: 'wikipedia',
      description: 'The human eye is an organ that reacts to light and allows vision. Rod and cone cells in the retina allow conscious light perception and vision including color differentiation and the perception of depth.',
      format: 'gltf',
      source: '/explore/blue_eyeball_free/scene.gltf',
      preview: '/explore/eyeball.jpg',
    },
    {
      id: '2',
      ref: 'anatomy',
      name: 'digestive system',
      author: 'wikipedia',
      description: 'The human digestive system consists of the gastrointestinal tract plus the accessory organs of digestion (the tongue, salivary glands, pancreas, liver, and gallbladder). Digestion involves the breakdown of food into smaller and smaller components, until they can be absorbed and assimilated into the body.',
      format: 'gltf',
      source: '/explore/sistema_digestivo/scene.gltf',
      preview: '/explore/digestive.jpg',
    },
    {
      id: '3',
      ref: 'anatomy',
      name: 'human heart',
      author: 'wikipedia',
      description: 'The heart is a muscular organ in most animals, which pumps blood through the blood vessels of the circulatory system.[1] Blood provides the body with oxygen and nutrients, as well as assisting in the removal of metabolic wastes.[2] In humans, the heart is located between the lungs, in the middle compartment of the chest.[3]',
      source: '/explore/heart_animated/scene.gltf',
      preview: '/explore/heart.jpg',
    },
    {
      id: '4',
      ref: 'anatomy',
      name: 'Human lungs',
      author: 'Mathew, webmd.com',
      description: 'The lungs are a pair of spongy, air-filled organs located on either side of the chest (thorax). The trachea (windpipe) conducts inhaled air into the lungs through its tubular branches, called bronchi.',
      source: '/explore/lungs_with_animation/scene.gltf',
      preview: '/explore/lungs.jpg',
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