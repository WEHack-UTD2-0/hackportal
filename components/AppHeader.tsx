import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import ProfileDialog from './ProfileDialog';
import { useUser } from '../lib/profile/user-data';
import { useAuthContext } from '../lib/user/AuthContext';
import { navItems } from '../lib/data';
import firebase from 'firebase/app';
import Image from 'next/image';
import wehacklogo from '../public/LogoSparkle.png';

/**
 * A global site header throughout the entire app.
 */
export default function AppHeader() {
  const [showMenu, setShowMenu] = useState(false);
  const { isSignedIn, hasProfile, profile } = useAuthContext();
  const [mobileIcon, setMobileIcon] = useState(true);
  const [showProfileDialog, setShowProfileDialog] = useState(false);
  const [dynamicNavItems, setDynamicNavItems] = useState(navItems);
  const user = useUser();

  useEffect(() => {
    if (firebase.auth().currentUser !== null && !firebase.auth().currentUser.emailVerified) {
      firebase
        .auth()
        .signOut()
        .then(() => {
          //signed out succesfully
        })
        .catch((error) => {
          console.warn('Could not sign out');
        });
    }

    //creating dynamic nav items
    if (
      isSignedIn &&
      profile &&
      (profile.user.permissions[0] === 'admin' || profile.user.permissions[0] === 'super_admin')
    ) {
      setDynamicNavItems((dynamicNavItems) => [
        ...dynamicNavItems,
        { text: 'Admin', path: '/admin' },
      ]);
    } else {
      setDynamicNavItems(navItems);
    }
  }, []);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
    setMobileIcon(!mobileIcon);
  };

  const dismissDialog = () => {
    setShowProfileDialog(false);
  };
  const toggleDialog = () => {
    setShowProfileDialog(!showProfileDialog);
  };

  document.addEventListener('mousedown', (event) => {
    const targetComponent = document.querySelector('.profileDialog');
    if (
      targetComponent !== null &&
      !document.querySelector('.profileDialog').contains(event.target as Node)
    ) {
      dismissDialog();
    }
  });

  return (
    <>
      <div className="min-h-[5rem]"></div>
      <header className="top-0 fixed justify-between flex flex-row w-full bg-transparent items-center h-16 z-10 p-4">
        <div className="flex w-6/12 max-w-[156px] justify-between items-center md:max-w-full md:justify-start md:w-9/12">
          <Link href="/">
            <a className="flex order-2 relative ml-[-6px] font-display self-center items-center w-[120px] md:order-1 md:ml-0 md:w-[120px]">
              <Image src={wehacklogo} alt="Logo" width={500} height={240} objectFit="contain" />
            </a>
          </Link>

          {/* Smartphone nav */}
          <div onClick={toggleMenu} className={'relative md:hidden'}>
            {mobileIcon ? <MenuIcon /> : <CloseIcon />}
            <ul
              className={`${
                showMenu ? 'translate-x-0' : '-translate-x-full'
              } transform transition-all ease-out duration-300 flex w-6/12 h-screen border-2 border-black flex-col bg-green-300 fixed top-0 left-0 z-[-1] pt-20`}
            >
              {dynamicNavItems.map((item) => (
                <Link key={item.text} href={item.path}>
                  <a className="border-b-2 first:border-t-2 border-black p-4 py-6 hover:bg-[#e0a269]">
                    <p className="text-lg font-bold">{item.text}</p>
                  </a>
                </Link>
              ))}
            </ul>
          </div>
          {/* PC nav */}
          <div className="hidden text-yellow-250 text-xs order-2 md:flex items-center md:text-left lg:ml-6">
            {dynamicNavItems.map((item) => (
              <Link key={item.text} href={item.path}>
                <a>
                  <p className="md:mx-5 text-xl font-bold">{item.text}</p>
                </a>
              </Link>
            ))}
          </div>
        </div>
        <div className="flex lg:mr-8">
          <button
            className="font-header font-bold bg-yellow-250 rounded-full border-2 border-green-100 text-sm px-8 py-1"
            onClick={toggleDialog}
          >
            {!user || !isSignedIn ? 'Sign in' : hasProfile ? 'Profile' : 'Register'}
          </button>
        </div>
        {showProfileDialog && <ProfileDialog onDismiss={dismissDialog} />}
      </header>
    </>
  );
}
