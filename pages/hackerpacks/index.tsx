import Header from '../../components/AppHeader';
import Head from 'next/head';
import React from 'react';
import { useUser } from '../../lib/profile/user-data';
import { useAuthContext } from '../../lib/user/AuthContext';
import DocLink from './Components/DocLinks';

/**
 * NOTE: The current HackerPack contains dummy data (obviously) and needs to be updated.
 * A Notion page embed works just as well as typing everything in manually.
 * Use your best judgement in figuring out which option is better for your hackathon.
 */

/**
 * The hackerpack page.
 *
 * HackerPack: /
 */
export default function HackerPack() {
  const { isSignedIn, hasProfile } = useAuthContext();
  const user = useUser();
  const role = user.permissions?.length > 0 ? user.permissions[0] : '';

  return (
    <div className="flex flex-grow flex-wrap">
      <Head>
        <title>HackerPacks</title>
        <meta name="description" content="HackerPack Information" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* ghost section to fill in for fixed sidebar */}
      {/*
      Sidebar 
      <section
        id="Sidebar"
        className="flex justify-center h-screen fixed top-16 border-r-2 border-white w-1/4 md:w-1/6 2xl:w-1/8 text-xs md:text-xs lg:text-sm overflow-auto text-white"
      >
        <section id="options" className="relative px-6 py-4">
          <div className="font-bold mb-3">HackerPack</div>
          Sidebar selection options 
          Change hrefs(id) to jump to specific sections in main content
          <ul className="pl-4 pb-32">
            <li>
              General
              <ul className="pl-4">
                <li>
                  <a href="#Subsection1">Food</a>
                </li>
                <li>
                  <a href="#Subsection2">Mentors</a>
                </li>
              </ul>
            </li>
            
            <li>
              Tech Workshop Packs
              <ul className="pl-4">
                <li>
                  <a href="#Subsection3">Name of Workshop</a>
                </li>
                <li>
                  <a href="#Subsection4">Name of Workshop</a>
                </li>
                <li>
                  <a href="#Subsection5">Name of Workshop</a>
                </li>
                <li>
                  <a href="#Subsection6">Name of Workshop</a>
                </li>
              </ul>
            </li>
            <li>
              Comm Workshop Packs
              <ul className="pl-4">
                <li>
                  <a href="">Name of Workshop</a>
                </li>
                <li>
                  <a href="">Name of Workshop</a>
                </li>
                <li>
                  <a href="">Name of Workshop</a>
                </li>
                <li>
                  <a href="">Name of Workshop</a>
                </li>
              </ul>
            </li>
            <li>
              Sponsor Workshop Packs
              <ul className="pl-4">
                <li>
                  <a href="">Name of Workshop</a>
                </li>
                <li>
                  <a href="">Name of Workshop</a>
                </li>
                <li>
                  <a href="">Name of Workshop</a>
                </li>
                <li>
                  <a href="">Name of Workshop</a>
                </li>
              </ul>
            </li>
           
          </ul>
        </section>
        User greeting for bottom of sidebar 
         
        <div className="fixed bottom-0 border-t-2 border-r-2 border-gray-600 w-1/4 md:w-1/6 2xl:w-1/8 text-center py-3 bg-white">
          <div>
            Welcome,{' '}
            {!user || !isSignedIn ? 'hacker' : user.firstName !== '' ? user.firstName : 'hacker'}
          </div>
          <div className="text-indigo-500">{role}</div>
        </div>
      </section>
      */}

      {/* Main content section */}
      <section id="mainContent" className="px-6 py-3 w-3/4 md:wd-5/6 2xl:w-7/8 text-black">
        <div className="font-bold text-2xl text-yellow-250 md:text-4xl lg-text-6xl">Resources</div>

        {/*
        Document links 
        <section id="docLinks" className="bg-gray-200 rounded-lg my-6 p-5 w-5/6">
          Linked Documents:
          <div className="flex flex-wrap grid grid-cols-2 lg:grid-cols-3 ">
            <DocLink
              type="doc"
              link="https://docs.google.com/document/d/1adXBUwGyVwdzgt43W8JTWb67JMPAaiERei6QWopodVw/edit"
              title="Easy Mac and Cheese Recipe"
            />
            <DocLink
              type="pdf"
              link="https://cdn1.parksmedia.wdprapps.disney.com/media/blog/wp-content/uploads/2020/08/RECIPE_WDW_Epcot_FW_MacandCheeseMarketplace_GourmetMacandCheese.pdf"
              title="Easy Mac and Cheese Recipe"
            />
            <DocLink
              type="doc"
              link="https://docs.google.com/document/d/1adXBUwGyVwdzgt43W8JTWb67JMPAaiERei6QWopodVw/edit"
              title="Easy Mac and Cheese Recipe"
            />
            <DocLink
              type="doc"
              link="https://docs.google.com/document/d/1PCCYh-EUiYYK-CCYcZZ2PXQTVTpzY7HpAqHS3DT9p6U/edit"
              title="An Essay for Comm"
            />
            <DocLink
              type="doc"
              link="https://docs.google.com/document/d/1PCCYh-EUiYYK-CCYcZZ2PXQTVTpzY7HpAqHS3DT9p6U/edit"
              title="An Essay for Comm"
            />
            <DocLink
              type="doc"
              link="https://docs.google.com/document/d/1PCCYh-EUiYYK-CCYcZZ2PXQTVTpzY7HpAqHS3DT9p6U/edit"
              title="An Essay for Comm"
            />
          </div>
        </section>
        */}

        <div id="Subsection1" className="my-7">
          <div className="text-lg md:text-xl lg:text-3xl mb-4 text-yellow-250">
            {' '}
            <DocLink
              title="WEHack Hacker Guide"
              link="https://ultra-spell-68d.notion.site/WEHack-2023-Hacker-Guide-a660e7d4946e4a25b680846a45d5ce3d"
            />
          </div>
          <p className="text-yellow-250">More information about WEHack.</p>
          <p></p>
          <p>
            <br></br>
          </p>
        </div>

        {/* Section 1 */}
        <div id="Subsection1" className="my-7">
          <div className=" text-yellow-250 text-lg md:text-xl lg:text-3xl mb-4">
            {' '}
            <DocLink
              title="Ultimate 8 Step Guide to Winning Hackathons"
              link="https://medium.com/garyyauchan/ultimate-8-step-guide-to-winning-hackathons-84c9dacbe8e"
            />
          </div>

          <p className="text-yellow-250">
            What Gary-Yau Chan learned after 55 Hackathons, and what we think can help you succeed!
            Click on the link above to learn more.
          </p>
          <p>
            <br></br>
          </p>
        </div>

        {/* Section 2 */}
        <div id="Subsection1" className="my-7">
          <div className="text-yellow-250 text-lg md:text-xl lg:text-3xl mb-4">
            {' '}
            <DocLink title="SWE Website" link="https://sweutd.com/" />
          </div>

          <p className="text-yellow-250">
            Check out sweutd.com for some ideas! Click on the link above to learn more.
          </p>
          <p>
            <br></br>
          </p>
        </div>

        {/* Section 3 */}
        <div id="Subsection1" className="my-7">
          <div className="text-yellow-250 text-lg md:text-xl lg:text-3xl mb-4">
            {' '}
            <DocLink
              title="WEHack 2022 Projects"
              link="https://wehack-22.devpost.com/project-gallery"
            />
          </div>

          <p className="text-yellow-250">
            View projects from the last iteration of WEHack to get inspired! Click on the link above
            to learn more.
          </p>
          <p>
            <br></br>
          </p>
        </div>

        {/* Section 4 */}
        <div id="Subsection1" className="my-7">
          <div className="text-yellow-250 text-lg md:text-xl lg:text-3xl mb-4">
            {' '}
            <DocLink
              title="WEHack 2020 Projects"
              link="https://wehack-2020.devpost.com/project-gallery"
            />
          </div>

          <p className="text-yellow-250">
            View projects from the first iteration of WEHack to get inspired! Click on the link
            above to learn more.
          </p>
          <p>
            <br></br>
          </p>
        </div>

        {/* Section 4 */}
        <div id="Subsection1" className="my-7">
          <div className="text-yellow-250 text-lg md:text-xl lg:text-3xl mb-4">
            {' '}
            <p>HackUTD Workshop</p>
          </div>
        </div>

        {/* Section 5 */}
        <div id="Subsection1" className="my-7">
          <div className="text-yellow-250 text-lg md:text-xl lg:text-1xl mb-4">
            {' '}
            <DocLink title="Node JS Tutorial" link="https://www.javatpoint.com/nodejs-tutorial" />
            <DocLink title="HTML/CSS/JS Reference" link="https://www.w3schools.com/" />
            <DocLink title="Online IDE" link="https://glitch.com/" />
          </div>
        </div>

        {/* Section 6 */}
        <div id="Subsection1" className="my-7">
          <div className="text-yellow-250 text-lg md:text-xl lg:text-3xl mb-4">
            {' '}
            <p>Code Quantum Workshop</p>
          </div>
        </div>

        {/* Section 7 */}
        <div id="Subsection1" className="my-7">
          <div className="text-yellow-250 text-lg md:text-xl lg:text-1xl mb-4">
            {' '}
            <DocLink title="Download Ren'Py" link="https://www.renpy.org/latest.html" />
            <DocLink
              title="How to Install Ren'Py Documentation"
              link="https://www.renpy.org/doc/html/quickstart.html"
            />
            <DocLink
              title="Ren'Py Assets"
              link="https://https://github.com/Swapomtio/WeHacks-Ren-Py-Assets.renpy.org/latest.html"
            />
          </div>

          <p>
            <br></br>
          </p>
        </div>

        {/* Section 2 
        <div id="Subsection2" className="my-7">
          <div className="font-bold text-lg md:text-xl lg:text-3xl mb-4">SubHeading 2</div>
          <div className="flex grid grid-cols-2 gap-x-4 ">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et eu et vitae, in quis metus
              quam integer et. Luctus elit cursus a habitasse velit. Egestas nisi, vel, sodales
              proin vitae quam aenean ullamcorper. Fames enim nunc augue velit nunc neque, fermentum
              odio elementum.
            </p>
            <p>
              Luctus elit cursus a habitasse velit. Egestas nisi, vel, sodales proin vitae quam
              aenean ullamcorper. Fames enim nunc augue velit nunc neque, fermentum odio elementum.
              <ul className="list-disc list-inside">
                <li>Luctus elit cursus</li>
                <li>A habitasse velit </li>
                <li>Egestas nisi</li>
                <li>Vel Sodales proin vitae</li>
              </ul>
            </p>
          </div>
        </div>

        */}

        {/* Section 3 
        <div id="Subsection3" className="my-7">
          <div className="font-bold text-lg md:text-xl lg:text-3xl mb-4">SubHeading 3</div>
          <p>
            Arcu dui vivamus arcu felis bibendum ut tristique et egestas. Mauris nunc congue nisi
            vitae suscipit. Vestibulum morbi blandit cursus risus at ultrices mi tempus imperdiet.
            Mi proin sed libero enim sed. Sit amet nisl suscipit adipiscing bibendum. Enim sit amet
            venenatis urna cursus eget. Est lorem ipsum dolor sit amet consectetur adipiscing elit
            pellentesque. Donec pretium vulputate sapien nec sagittis aliquam malesuada bibendum
            arcu. Enim nulla aliquet porttitor lacus luctus accumsan tortor.
          </p>
        </div>

        */}

        {/* Section 4 
        <div id="Subsection4" className="my-7">
          <div className="font-bold text-lg md:text-xl lg:text-3xl mb-4">SubHeading 4</div>
          <p>
            Arcu dui vivamus arcu felis bibendum ut tristique et egestas. Mauris nunc congue nisi
            vitae suscipit. Vestibulum morbi blandit cursus risus at ultrices mi tempus imperdiet.
            Mi proin sed libero enim sed. Sit amet nisl suscipit adipiscing bibendum. Enim sit amet
            venenatis urna cursus eget. Est lorem ipsum dolor sit amet consectetur adipiscing elit
            pellentesque. Donec pretium vulputate sapien nec sagittis aliquam malesuada bibendum
            arcu. Enim nulla aliquet porttitor lacus luctus accumsan tortor.
          </p>
        </div>

        */}

        {/* Section 5 
        <div id="Subsection5" className="my-7">
          <div className="font-bold text-lg md:text-xl lg:text-3xl mb-4">SubHeading 5</div>
          <div>
            <p>
              Turpis egestas pretium aenean pharetra magna. Turpis in eu mi bibendum neque egestas
              congue quisque egestas. Egestas fringilla phasellus faucibus scelerisque. Tincidunt
              ornare massa eget egestas purus viverra accumsan in. Elit ut aliquam purus sit.
              Interdum varius sit amet mattis vulputate enim nulla. Lacinia quis vel eros donec ac
              odio.
              <ul className="list-disc list-inside">
                <li>Cu erat prompta his</li>
                <li>A habitasse velit </li>
                <li>Duis at tellus at urna</li>
                <li>Egestas nisi</li>
              </ul>
            </p>
          </div>
        </div>
        */}
        {/* Section 6 
        <div id="Subsection6" className="my-7">
          <div className="font-bold text-lg md:text-xl lg:text-3xl mb-4">SubHeading 6</div>
          <div className="flex grid grid-cols-2 gap-x-4 ">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et eu et vitae, in quis metus
              quam integer et. Luctus elit cursus a habitasse velit. Egestas nisi, vel, sodales
              proin vitae quam aenean ullamcorper. Fames enim nunc augue velit nunc neque, fermentum
              odio elementum.
            </p>
            <p>
              Lacinia quis vel eros donec ac odio tempor orci. Mauris cursus mattis molestie a
              iaculis at. Ipsum dolor sit amet consectetur adipiscing elit duis. Integer vitae justo
              eget magna fermentum. Leo in vitae turpis massa sed elementum tempus.
            </p>
          </div>
        </div>
        */}
      </section>
    </div>
  );
}
