import { useRouter } from 'next/router';
import Image from 'next/image';
import React from 'react';
import { useAuthContext } from '../lib/user/AuthContext';

/**
 * A page that allows a user to modify app or profile settings and see their data.
 *
 * Route: /profile
 */
export default function ProfilePage() {
  const router = useRouter();
  const { isSignedIn, hasProfile, user, profile } = useAuthContext();

  if (!isSignedIn) {
    return <div className="p-4 flex-grow text-center">Sign in to see your profile!</div>;
  }

  if (!hasProfile) {
    router.push('/register');
    return <div></div>;
  }

  return (
    <div className="p-8 w-full">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold" style={{ color: '#FFE9D7' }}>
          User Profile
        </h1>
        <section className="w-full py-5">
          <div className="flex flex-col md:flex-row gap-x-10">
            <div
              className="bg-gray-300 w-full md:w-2/3 rounded-xl p-4 flex flex-col justify-around"
              style={{ minHeight: '500px' }}
            >
              <h1 className="font-bold text-xl text-center">WEHack</h1>
              <div className="mx-auto">
                {user.photoUrl && (
                  <Image
                    className="rounded-full object-cover"
                    src={user.photoUrl}
                    height={180}
                    width={180}
                    alt="Your profile"
                  />
                )}
              </div>
              <div>
                <h1 className="text-center font-bold text-xl">{`${profile.user.firstName} ${profile.user.lastName}`}</h1>
                <p className="text-center">{profile.user.permissions[0]}</p>
              </div>
            </div>
            <div className="w-full my-5">
              <div className="profile-view">
                <div className="profile-view-name flex flex-col gap-y-2">
                  <div className="font-bold text-xl" style={{ color: '#FFE9D7' }}>
                    Name
                  </div>
                  <h1
                    className="font-bold"
                    style={{ color: '#FFE9D7' }}
                  >{`${profile.user.firstName} ${profile.user.lastName}`}</h1>
                </div>
                <div className="profile-view-role flex flex-col gap-y-2">
                  <div className="font-bold text-xl" style={{ color: '#FFE9D7' }}>
                    Role
                  </div>
                  <h1 className="font-bold" style={{ color: '#FFE9D7' }}>
                    {profile.user.permissions[0]}
                  </h1>
                </div>
                <div className="profile-view-univ flex flex-col gap-y-2">
                  <div className="font-bold text-xl" style={{ color: '#FFE9D7' }}>
                    University
                  </div>
                  <h1 className="font-bold" style={{ color: '#FFE9D7' }}>
                    {profile.university}
                  </h1>
                </div>
                <div className="profile-view-major flex flex-col gap-y-2">
                  <div className="font-bold text-xl" style={{ color: '#FFE9D7' }}>
                    Major
                  </div>
                  <h1 className="font-bold" style={{ color: '#FFE9D7' }}>
                    {profile.major}
                  </h1>
                </div>
                <div className="profile-view-stlvl flex flex-col gap-y-2">
                  <div className="font-bold text-xl" style={{ color: '#FFE9D7' }}>
                    Level of Study
                  </div>
                  <h1 className="font-bold" style={{ color: '#FFE9D7' }}>
                    {profile.studyLevel}
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
