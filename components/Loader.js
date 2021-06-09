function Loader({ extraClassName = "" }) {
  return (
    <div className={`loading_data ${extraClassName}`}>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
}
export const FailedTrailer = () => {
  return (
    <div className="failed_to_play_wrapper">
      <p>Sorry. Trailer can not be played</p>
    </div>
  );
};

export const Loading = ({ styling = {} }) => {
  return <div className="loading" style={styling}></div>;
};

export default Loader;
