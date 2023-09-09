import { Link } from 'react-router-dom';
import useOnlineStatus from '../utils/useOnlineStatus';

import { useSelector } from 'react-redux';

const Header = () => {
  const onlineStatus = useOnlineStatus();

  // * Subscribing to the store using a Selector
  const cartItems = useSelector((store) => store.cart.items);
  // console.log(cartItems);

  return (
    <header className="flex flex-col md:flex-row justify-between items-center p-0 md:p-4 bg-pink-200 sm:bg-yellow-200 lg:bg-green-200 font-[500] shadow-md">
      <div className="logo-container">
        <Link to="/">
          <img
            src="https://cdn-icons-png.flaticon.com/128/3655/3655682.png"
            alt="Logo"
            className="w-16 mx-6 mt-2"
          />
        </Link>
      </div>
      <div className="flex items-center ">
        <ul className="flex items-center p-4 my-2">
          <li className="px-4">Online Status: {onlineStatus ? '✅' : '⛔'}</li>
          <li className="px-4 hover:text-green-500 duration-[.3s]">
            <Link to="/about">About Us</Link>
          </li>
          <li className="px-4 hover:text-green-500 duration-[.3s]">
            <Link to="/contact">Contact Us</Link>
          </li>
          <li className="px-4 hover:text-green-500 duration-[.3s]">
            <Link to="/cart">
              🛒 (
              {cartItems.length === 1
                ? `${cartItems.length} item`
                : `${cartItems.length} items`}
              )
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
