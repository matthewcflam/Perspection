import DarkVeil from './DarkVeil';

const BackgroundAnimation = () => {
  return (
      <div style={{ width: '100%', height: '100%', position: 'relative' }}>
          <DarkVeil speed={1.0}/>
      </div>
  );
};

export default BackgroundAnimation;