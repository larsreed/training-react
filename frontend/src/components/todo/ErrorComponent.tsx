import oops from './img/ooops.png';

export default function ErrorComponent() {
  return (
    <div className='maxWidth'>
      <img src={oops} alt='oops' />
      <p>A strange error occurred!</p>
    </div>
  );
}
