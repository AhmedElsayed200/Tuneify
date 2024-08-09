import { loader } from '../assets';

const Loader = () => (
  <div className="flex justify-center items-center flex-col w-full">
    <img src={loader} alt="music loader" className="w-48 h-48 object-contain" />
  </div>
);

export default Loader;
