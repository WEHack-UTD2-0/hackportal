import { GetServerSideProps } from 'next';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import AboutHeader from '../../components/AboutHeader';
import MemberCard from '../../components/MemberCard';
import MemberCards from '../../components/MemberCards';
import { RequestHelper } from '../../lib/request-helper';

/**
 * The About page.
 *
 * This page contains some introduction about the hackathon in question. It also includes a section used
 * to introduce the team responsible for organizing the hackathon
 *
 * Route: /about
 */
export default function AboutPage({ fetchedMembers }: { fetchedMembers: TeamMember[] }) {
  const [loading, setLoading] = useState(true);
  const [members, setMembers] = useState<TeamMember[]>([]);

  useEffect(() => {
    setMembers(fetchedMembers.sort((a, b) => (a.rank > b.rank ? 1 : -1)));
    setLoading(false);
  }, [fetchedMembers]);

  const colorSchemes: ColorScheme[] = [
    {
      light: '#F2F3FF',
      dark: '#C1C8FF',
    },
    {
      light: '#D8F8FF',
      dark: '#B0F1FF',
    },
    {
      dark: '#FCD7FF',
      light: '#FDECFF',
    },
  ];

  if (loading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-grow bg-blue-850 text-white">
      <Head>
        <title>HackPortal - About</title>
        <meta name="description" content="HackPortal's About Page" />
      </Head>
      <AboutHeader active="/about" />
      <div className="top-6 p-4 flex flex-col gap-y-3 text-white">
        <h4 className="font-bold text-3xl text-white">The largest inclusive hackathon in Dallas</h4>
        <p>
          Women-driven tech organizations at UTD are excited to join forces and present our first
          all women, non-binary, 24-hour hackathon. Our goal is to create an inclusive environment
          that highlights and empowers women and non-binary students through technology. We aim to
          encourage more underrepresented people to harness their skills to create projects of their
          own.
        </p>
        <h4 className="font-bold text-3xl text-white">Get ready for WEHack 2022!</h4>
        <p>
          Happening from April 2nd-3rd (2022), we are planning on hosting the second iteration of
          WEHack in-person for the first time! Come join us for a great hacking experience, as well
          as free food and swag! There is also a workshop planned before the hackathon, more
          information TBA.
        </p>
      </div>

      <div className="my-2">
        <h4 className="font-bold text-3xl p-6 text-white">Meet Our Team :)</h4>
        <div className="flex flex-wrap justify-center md:px-2">
          {members.map(({ name, description, linkedin, github, personalSite, fileName }, idx) => (
            <MemberCards
              key={idx}
              name={name}
              description={description}
              fileName={fileName}
              linkedin={linkedin}
              github={github}
              personalSite={personalSite}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const protocol = context.req.headers.referer?.split('://')[0] || 'http';
  const { data } = await RequestHelper.get<TeamMember[]>(
    `${protocol}://${context.req.headers.host}/api/members`,
    {},
  );
  return {
    props: {
      fetchedMembers: data,
    },
  };
};
